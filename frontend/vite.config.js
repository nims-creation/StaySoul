import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Pre-bundle heavy dependencies so Vite doesn't discover & transform them
  // on the first request (eliminates the "waterfall" slowdown on dev startup)
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'framer-motion',
      'lucide-react',
      'leaflet',
      'react-leaflet',
      'jwt-decode',
    ],
  },

  build: {
    // Split vendor chunks to improve caching and parallel loading
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-map': ['leaflet', 'react-leaflet'],
          'vendor-misc': ['axios', 'lucide-react', 'jwt-decode'],
        },
      },
    },
  },
})
