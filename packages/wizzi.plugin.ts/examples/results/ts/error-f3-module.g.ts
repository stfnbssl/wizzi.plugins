/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\examples\ittf\error-f3.ts.ittf
    utc time: Fri, 10 May 2024 16:46:31 GMT
*/
export function GeneralErrorBoundary({
    defaultStatusHandler=({
        error
     }) => 
         (
        <p
        >
            {error.status}
            {error.data}
        </p>
        )
    
    , 
    statusHandlers, 
    unexpectedErrorHandler=(error) => 
         (
        <p
        >
            {getErrorMessage(error)}
        </p>
        )
    
    
 }: { 
    defaultStatusHandler?: StatusHandler;
    statusHandlers?: Record<number, StatusHandler>;
    unexpectedErrorHandler?: (error: unknown) => JSX.Element | null;
}) {
    const error = useRouteError();
    captureRemixErrorBoundaryError(error);
    const params = useParams();
    if (typeof document !== 'undefined') {
        console.error(error);
    }
    return  (
        <div
         className="container flex items-center justify-center p-20 text-h2">
            {
                isRouteErrorResponse(error) ? (statusHandlers?[error.status] ?? defaultStatusHandler)({
                        error, 
                        params
                     }) : unexpectedErrorHandler(error)
            }
        </div>
        )
    ;
}
