interface RemoteConfig {
    name: string;
    url: string;
    scope: string;
    module: string;
}

const remotes: { remotes: RemoteConfig[] } = {
    remotes: [
        {
            name: 'remote_app',
            url: 'http://localhost:5001/assets/remoteEntry.js',
            scope: 'remote_app',
            module: './Button',
        },
    ],
};

const remoteComponents: { [key: string]: string } = {
    "Button": "remoteApp/Button"
};

export const loadRemotes = () => {
    return {
        name: 'host_app',
        remotes: remotes.remotes.reduce((acc: Record<string, string>, remote: RemoteConfig) => {
            acc[remote.name] = remote.url;
            return acc;
        }, {}),
        shared: ['react', 'react-dom'],
    };
};

export const getRemoteComponents = () => {
    return Promise.resolve(remoteComponents);
};