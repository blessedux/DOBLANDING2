/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.ctfassets.net'],
  },
  experimental: {
    optimizeCss: true,
  },
  // Ensure static assets are properly handled
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
}

module.exports = nextConfig 