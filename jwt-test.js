const jwt = require('jsonwebtoken');

// Paste your Supabase JWT secret here:
const secret = '/UgU7UbUoPjSmZZJT8/SGJs/vUaJDKB0U31SVv+6UU7SC9olrT4SOaCxZIuwkyDkbjLm/9IfaiLvIacwvJWt6A==';

const token = jwt.sign(
  {
    sub: '0xbe76b786e4d9a6039b9e9f188e0ee0a955cae5c8',
    aud: 'authenticated',
    iss: 'dobprotocol',
    role: 'authenticated',
  },
  secret,
  { expiresIn: '1h' }
);

console.log('Generated JWT:', token); 