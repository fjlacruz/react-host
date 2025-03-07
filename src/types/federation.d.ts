interface FederationContainer {
    init(sharedScope: unknown): void;
    get(module: string): Promise<() => any>;
}

interface Window {
    [key: string]: FederationContainer;
}