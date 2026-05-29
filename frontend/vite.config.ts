import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toda requisição que começar com /api será redirecionada para o backend
      '/api': {
        target: 'http://localhost:8080', // Substitua pela URL real do seu backend
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '') // Descomente se o backend não esperar o prefixo /api
      }
    }
  }
})