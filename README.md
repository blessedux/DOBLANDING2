# DOB Protocol Landing Page

A modern, optimized landing page for DOB Protocol built with Next.js, TypeScript, and Tailwind CSS. The site features smooth animations, responsive design, and optimal performance through static site generation.

## 🚀 Features

- Static Site Generation (SSG) for optimal performance
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Dark/Light mode support
- Optimized image loading
- SEO-friendly with automatic sitemap generation
- Security headers and caching optimization
- TypeScript for type safety

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn-ui
- **Build Tool**: SWC
- **Package Manager**: npm/yarn

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dob-landing.git
cd dob-landing
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory (if needed):

```env
NEXT_PUBLIC_SITE_URL=your-site-url
```

## 🚀 Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Build & Deployment

### Static Site Generation (Recommended)

For optimal performance, we use static site generation:

```bash
# Build and export static site
npm run static
# or
yarn static
```

This will:

1. Build the Next.js application
2. Generate static HTML files
3. Create a sitemap for SEO
4. Optimize assets and images

The static files will be generated in the `out` directory.

### Performance Optimizations

The project includes several performance optimizations:

1. **Static Site Generation**

   - Enabled through `output: 'export'` in `next.config.js`
   - Pre-renders all pages at build time
   - Enables CDN deployment

2. **Image Optimization**

   - Automatic WebP/AVIF conversion
   - Lazy loading
   - Responsive image sizes
   - Configured in `next.config.js`

3. **Caching Strategy**

   - Static assets: 1-year cache
   - Dynamic content: 60-second cache with stale-while-revalidate
   - Implemented through middleware

4. **Bundle Optimization**
   - Tree shaking enabled
   - Code splitting
   - SWC minification
   - Production source maps disabled

### Deployment Options

1. **Vercel (Recommended)**

   ```bash
   vercel
   ```

2. **Netlify**

   - Connect your repository
   - Build command: `npm run static`
   - Publish directory: `out`

3. **GitHub Pages**

   - Enable GitHub Actions
   - Deploy from the `out` directory

4. **Custom Server**
   - Deploy the `out` directory to any static hosting service
   - Configure your server to serve the static files

## 🔧 Configuration

### Build Configuration

The project uses several configuration files:

1. **next.config.js**

   - Static export settings
   - Image optimization
   - Webpack configuration
   - Security headers

2. **middleware.ts**

   - Security headers
   - Caching rules
   - Request handling

3. **utils/cache.ts**
   - In-memory caching
   - TTL configuration
   - Cache management

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=your-site-url
```

## 📊 Performance Monitoring

To analyze bundle size and performance:

```bash
npm run analyze
# or
yarn analyze
```

This will generate a report in `.next/analyze`.

## 🔍 SEO

The site includes:

- Automatic sitemap generation
- Meta tags optimization
- Semantic HTML structure
- Performance optimization for Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn-ui](https://ui.shadcn.com/)
