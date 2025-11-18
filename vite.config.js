import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served
  base: './',

  // Build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for production
    sourcemap: false,
    // Minify the output (esbuild is faster and default)
    minify: 'esbuild',
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'tsparticles': ['@tsparticles/engine', '@tsparticles/all'],
          'lz-string': ['lz-string']
        }
      }
    }
  },

  // Server options for development
  server: {
    port: 3000,
    open: true,
    cors: true
  },

  // Preview server options
  preview: {
    port: 3000,
    open: true
  }
});
