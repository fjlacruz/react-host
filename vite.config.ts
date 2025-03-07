import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import fs from 'fs';
import path from 'path';

// Leer los remotes desde un archivo externo
const remotesPath = path.resolve(__dirname, 'remotes.json');
let remotes = {};

if (fs.existsSync(remotesPath)) {
  try {
    const remotesData = JSON.parse(fs.readFileSync(remotesPath, 'utf-8'));
    console.log('Contenido de remotes.json:', remotesData);

    if (Array.isArray(remotesData)) {
      remotes = remotesData.reduce((acc, remote) => {
        acc[remote.name] = `${remote.url}/assets/remoteEntry.js`;
        return acc;
      }, {});
    } else {
      console.error('Error: remotes.json no contiene un array válido.');
    }
  } catch (error) {
    console.error('Error leyendo remotes.json:', error);
  }
}

export default defineConfig({
  plugins: [
    federation({
      name: 'host-app',
      remotes,
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5000,
  },
  build: {
    target: 'esnext',
    minify: false,
  }
});
