import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { loadRemotes } from './src/services/remoteService';

export default defineConfig({
  plugins: [
    react(),
    federation(loadRemotes()),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});