import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@ui': path.resolve(__dirname, '../src/ui'),
      '@scenes': path.resolve(__dirname, '../src/scenes'),
      '@config': path.resolve(__dirname, '../src/config'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
        },
      },
    },
  },
  server: {
    port: 8080,
  },
});
