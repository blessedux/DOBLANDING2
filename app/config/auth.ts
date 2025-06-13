// Get whitelisted addresses from environment variable
const getWhitelistedAddresses = (): string[] => {
  const addresses = process.env.NEXT_PUBLIC_WHITELISTED_ADDRESSES || '';
  return addresses.split(',').map(addr => addr.toLowerCase().trim());
};

// Check if an address is whitelisted
export const isWhitelistedAddress = (address: string): boolean => {
  const whitelistedAddresses = getWhitelistedAddresses();
  return whitelistedAddresses.includes(address.toLowerCase());
};

// Export the whitelisted addresses for use in components
export const WHITELISTED_ADDRESSES = getWhitelistedAddresses(); 