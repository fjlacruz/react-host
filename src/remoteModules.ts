export const simulatedRemoteConfig = [
    {
        route: '/remote-button',
        module: {
            importPath: () => import('remoteApp/Button'),
            ref: 'remoteAppButton',
        },
    },
    {
        route: '/remote-button2',
        module: {
            importPath: () => import('remoteApp2/Button'),
            ref: 'remoteApp2Button',
        },
    },
]