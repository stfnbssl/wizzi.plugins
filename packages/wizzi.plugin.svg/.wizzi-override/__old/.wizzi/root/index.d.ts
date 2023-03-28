interface provides {
    schemas: string[];
    modelTransformers: string[];
    artifactGenerators: string[];
}

interface FactoryPlugin {
}

interface wizziPackage {
}

interface PluginOptions {
}

export function createFactoryPlugin(wizziPackage: wizziPackage, options: PluginOptions, callback: cb<FactoryPlugin>): void;