# Deployment Guide

This document provides instructions for deploying tsDice to various hosting platforms.

## Build Configuration

The project uses Vite for building. The production build is optimized with:

- ES2020 target for modern browsers
- Code splitting (tsParticles, lz-string, and main app code)
- Minification via esbuild
- Hashed filenames for optimal caching

### Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist` directory.

## Cloudflare Pages

**Current deployment:** https://tsdice.pages.dev

### Configuration

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 22 (specified in `.node-version`)

### Environment Variables

No environment variables are required for this project.

### Deployment Steps

1. Connect your GitHub repository to Cloudflare Pages
2. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Deploy

Cloudflare Pages will automatically read the `.node-version` file and use Node.js 22.

## Vercel

### Configuration

Create a `vercel.json` file (optional, recommended):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Deployment Steps

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or connect your GitHub repository to Vercel dashboard.

## Netlify

### Configuration

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deployment Steps

1. Connect your GitHub repository to Netlify
2. Netlify will auto-detect the settings from `netlify.toml`
3. Deploy

## GitHub Pages

### Configuration

1. Update `vite.config.js` base path:
   ```javascript
   base: '/tsdice/' // or your repo name
   ```

2. Add deployment script to `package.json`:
   ```json
   "scripts": {
     "deploy:gh-pages": "npm run build && gh-pages -d dist"
   }
   ```

3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

### Deployment Steps

```bash
npm run deploy:gh-pages
```

## Static File Server

You can deploy to any static file hosting service:

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your hosting provider
3. Ensure your server is configured to serve `index.html` for all routes

## Performance Optimization

The production build includes:

- Gzip compression ready (enable on your server)
- Asset hashing for cache busting
- Separate chunks for better caching
- Minified JavaScript and CSS
- Optimized for modern browsers (ES2020+)

## Troubleshooting

### Build Fails on Deployment Platform

- Ensure Node.js version is >= 18.0.0
- Check that `npm install` completes successfully
- Verify the build command is `npm run build` (not `vite build`)
- Clear build cache and try again

### Assets Not Loading

- Check the `base` path in `vite.config.js`
- Ensure relative paths are used (`base: './'` for flexible deployment)
- Verify all files in `dist` directory are uploaded

### Performance Issues

- Enable gzip/brotli compression on your server
- Enable HTTP/2 if available
- Set proper cache headers for hashed assets (1 year cache)
- Set shorter cache for `index.html` (no-cache or short TTL)
