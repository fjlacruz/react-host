import fs from 'fs';
import path from 'path';

interface RemoteConfig {
    name: string;
    url: string;
    scope: string;
    module: string;
}

export const loadRemotes = () => {
    // Ruta al archivo remotes.json
    const remotesPath = path.resolve(__dirname, '../../remotes.json');
    const remotesData = fs.readFileSync(remotesPath, 'utf-8');
    const { remotes } = JSON.parse(remotesData);

    return {
        name: 'host_app',
        remotes: remotes.reduce((acc: Record<string, string>, remote: RemoteConfig) => {
            acc[remote.name] = remote.url;
            return acc;
        }, {}),
        shared: ['react', 'react-dom'],
    };
};