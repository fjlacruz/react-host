
import { defineConfig, loadEnv } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const remotes = {
    remoteApp: 'http://localhost:5001/assets/remoteEntry.js',

  };

  return {
    plugins: [
      react(),
      federation({
        name: 'app',
        remotes: remotes,
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    clearScreen: false,
    define: {
      'import.meta.env.VITE_REMOTES': JSON.stringify(Object.keys(remotes)),
    },
  };
});


