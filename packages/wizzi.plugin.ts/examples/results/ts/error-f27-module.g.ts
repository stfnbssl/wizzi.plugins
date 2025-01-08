/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\examples\ittf\error-f27.ts.ittf
    utc time: Fri, 03 Jan 2025 09:53:49 GMT
*/
const request = {
    get: async <T>(url: string) => {
        axios.defaults.baseURL = BASE_URL;
        return axios.get<T>(url).then(responseBody)
        ;
    }
    
 };
