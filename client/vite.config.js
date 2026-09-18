import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/sitemap.xml': {
        target: 'https://imagetech-server.onrender.com',
        changeOrigin: true,
        rewrite: () => '/sitemap.xml?domain=www.doctorblade.co.in',
      },
    },
  },
})
