type cb<T> = (err: any, result: T) => void;

/**
 * Source map of an element of a wizzi model.
 */
declare interface SourceLineInfo {
    row: number;
    col: number;
    sourceKey: string;
}

/**
 * Context object used during validation and initialization of a wizzi model.
 * Internally created by ??? TODO
 */
declare interface WizziModelLoadContext {
    validationErrors: string[];
    schemaIsValid(): boolean;
    addError(message: string, node?: WizziModelElement): void;
    verifyEnum(
        valueType: string, valueName: string, value: string, allowed: string[], node?: WizziModelElement
    ): void
}

/**
 * An element of a wizzi model.
 */
declare interface WizziModelElement {
    wzTag: string;
    wzName: string;
    wzElement: string;
    wzSourceLineInfo: SourceLineInfo;
    wzRoot(): WizziModelRoot;
    wzSourceFilepath(): string;
    wzVerify(ctx: WizziModelLoadContext): void;
    wzInitialize(ctx: WizziModelLoadContext): void;
}

/**
 * The root element of a wizzi model.
 */
declare interface WizziModelRoot extends WizziModelElement {
    /**
     * see the WizziModelLoadHistory interface in packages\wizzi\index.d.ts
     */
    loadHistory: object/*WizziModelLoadHistory*/;
}

/**
 * A wizzi model returned by the loadModel function.
 */
declare interface WizziModel extends WizziModelRoot { }


interface provides {
    schemas: string[];
    modelTransformers: string[];
    artifactGenerators: string[];
}

interface FactoryWizziObject {
    loadMTree() : void
    file: object,
    errors: object
}

interface loadModelRequestContext {

}

declare function loadModel(ittfDocumentUri: string, requestContext: loadModelRequestContext, callback: cb<WizziModel>): void;

interface WizziModelFactory {
	createLoadModel(wizziObject: FactoryWizziObject) : loadModel;
}

interface FactoryPlugin {
    getName() : string,
    getFilename() : string,
    getProvides() : provides,
    /**
         Retrieve a WizziModelFactory by its wizzischema name
         searching the loader in this WizziPackage.
         No search up in "node_modules" folders.
    */
    getModelFactory(schemaName: string) : WizziModelFactory;
}

interface wizziPackage {
    /**
     * see the WizziFile interface in packages\wizzi\index.d.ts
     */
    file: object
}

interface PluginOptions {
}

export function createFactoryPlugin(wizziPackage: wizziPackage, options: PluginOptions, callback: cb<FactoryPlugin>): void;