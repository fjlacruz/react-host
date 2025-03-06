import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'HOST',
      filename: 'remoteEntry.js',
      exposes: {},
      remotes: {
        Remote1: 'http://localhost:3001/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }

})