import { usePrivy } from '@privy-io/react-auth';
import { headers } from 'next/headers';

export async function getPrivyUser() {
  const headersList = headers();
  const token = headersList.get('authorization')?.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    const response = await fetch('https://auth.privy.io/api/v1/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching Privy user:', error);
    return null;
  }
}

export function usePrivyAuth() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    unlinkWallet,
  } = usePrivy();

  return {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    unlinkWallet,
  };
} 