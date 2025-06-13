import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // Set this in your .env.local

export async function POST(req: NextRequest) {
  const { address, message, signature } = await req.json();

  try {
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Issue JWT
    const payload = {
      sub: address,
      aud: 'authenticated',
      iss: 'dobprotocol',
      role: 'authenticated',
    };
    console.log('JWT_SECRET (first 8 chars):', JWT_SECRET.slice(0, 8));
    console.log('JWT payload:', payload);
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token:', token);
    return NextResponse.json({ token });
  } catch (err: any) {
    console.error('JWT Auth Error:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 