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
    const token = jwt.sign(
      {
        sub: address,
        aud: 'authenticated',
        iss: 'dobprotocol',
        role: 'authenticated',
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    return NextResponse.json({ token });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}