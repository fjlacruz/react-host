import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { loadRemotes } from './src/services/remoteService';

export default defineConfig(async () => {
  const federationConfig = await loadRemotes();

  return {
    plugins: [
      react(),
      federation(federationConfig),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});