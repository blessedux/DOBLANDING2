/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com'], // Add any external image domains you're using
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Optimize for static generation
  webpack: (config, { dev, isServer }) => {
    // Optimize for static generation
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    return config
  },
  // Disable server-side features
  poweredByHeader: false,
  reactStrictMode: true,
  // Add compression
  compress: true,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: {
      cssModules: true,
      fontLoaders: true,
    },
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  }
}

module.exports = nextConfig 