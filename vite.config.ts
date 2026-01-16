import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Remove process.env polyfill as we're using import.meta.env
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  build: {
    // Production optimizations
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react'],
          ai: ['@google/generative-ai']
        }
      }
    },
    // Security: Remove console logs in production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    // Development server security
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  },
  preview: {
    // Preview server security
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    }
  }
});