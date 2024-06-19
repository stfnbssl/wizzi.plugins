/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\examples\ittf\error-f20.ts.ittf
    utc time: Sun, 09 Jun 2024 13:47:12 GMT
*/

export type ApiType = { 
    name: string;
    initialize: (app: express.Application, initValues: AppInitializerType) => void;
}
export type MiddlewareType = (app: express.Application) => void;
export type AppInitializerType = { 
    config: ConfigType;
}
