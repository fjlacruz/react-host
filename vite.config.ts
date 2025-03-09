// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { simulatedRemoteConfig } from './src/remoteModules'; // Importa simulatedRemoteConfig

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Recorre simulatedRemoteConfig y extrae las URLs de remoteApp
  const remotes = simulatedRemoteConfig.reduce((acc, config) => {
    // Extrae el nombre del remoto de config.module.ref (ej: remoteAppButton -> remoteApp)
    const remoteName = config.module.ref.replace('Button', '');

    // Agrega el nombre del remoto y la URL al objeto remotes
    acc[remoteName] = config.remoteApp;
    return acc;
  }, {});

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
    resolve: {
      alias: {
        remoteApp: '/@remoteApp',
      },
    },
    clearScreen: false,
    define: {
      'import.meta.env.VITE_REMOTES': JSON.stringify(Object.keys(remotes)),
    },
  };
});