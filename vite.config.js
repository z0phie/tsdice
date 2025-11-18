import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served (relative paths for flexible deployment)
  base: './',

  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',

    // Generate sourcemaps for production debugging (disabled for smaller builds)
    sourcemap: false,

    // Minify the output (esbuild is faster than terser and default)
    minify: 'esbuild',

    // Target modern browsers for optimal performance
    target: 'es2020',

    // Reduce chunk size warnings threshold (default is 500kb)
    chunkSizeWarningLimit: 600,

    // Rollup-specific options
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching
        manualChunks: {
          // Separate tsParticles into its own chunk (largest dependency)
          'tsparticles': ['@tsparticles/engine', '@tsparticles/all'],
          // Separate lz-string for URL compression
          'lz-string': ['lz-string']
        },

        // Better file naming for caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Report compressed size (can be slow on large projects)
    reportCompressedSize: true,

    // Emit manifest for advanced deployment scenarios
    manifest: false
  },

  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: [
      '@tsparticles/engine',
      '@tsparticles/all',
      'lz-string'
    ],
    // Force re-optimization on changes
    force: false
  },

  // Server options for development
  server: {
    port: 3000,
    open: true,
    cors: true,

    // Enable HTTP/2 for better performance
    strictPort: false,

    // Faster HMR updates
    hmr: {
      overlay: true
    }
  },

  // Preview server options
  preview: {
    port: 3000,
    open: true,
    strictPort: false
  },

  // Enable esbuild for faster transforms
  esbuild: {
    // Remove console.log in production
    drop: [],
    // Enable legal comments
    legalComments: 'none'
  }
});
