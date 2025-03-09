export const simulatedRemoteConfig = [
    {
        id: 1,
        route: '/remote-button',
        module: {
            importPath: () => import('remoteApp/Button'),
            ref: 'remoteAppButton',
        },
        remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
        status: 1
    },
    {
        id: 2,
        route: '/remote-button2',
        module: {
            importPath: () => import('remoteApp2/Button'),
            ref: 'remoteApp2Button',
        },
        remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
        status: 1
    },
];