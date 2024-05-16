/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\examples\ittf\error-f8.ts.ittf
    utc time: Mon, 13 May 2024 16:27:12 GMT
*/
isRouteErrorResponse(error) ? (statusHandlers?[error.status] ?? defaultStatusHandler)({
        error, 
        params
     }) : unexpectedErrorHandler(error)
