/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: json:/___template/wizzi.config.lastsafe.js.ittf
    utc time: Tue, 05 Nov 2024 04:00:05 GMT
*/
const path = require('path');
module.exports = {
    wzjobName: "wizzi.plugin.ai-override/job", 
    wzjobPath: path.join(__dirname, '.wizzi-override', 'generate.wfjob.ittf'), 
    destPath: __dirname, 
    plugins: [
        "./wizzi.plugin.css/index.js", 
        "./wizzi.plugin.html/index.js", 
        "./wizzi.plugin.ittf/index.js", 
        "./wizzi.plugin.js/index.js", 
        "./wizzi.plugin.json/index.js", 
        "./wizzi.plugin.md/index.js", 
        "./wizzi.plugin.text/index.js", 
        "./wizzi.plugin.wzjob/index.js", 
        "./wizzi.plugin.wfschema/index.js"
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.lastsafe.plugins/packages", 
    schemas: [
        'ai'
    ], 
    globalContext: {
        wzConfigIsDevelopment: true, 
        wzConfigIsPackageDeploy: false, 
        wzConfigIsDocumentation: true, 
        ___: ___
     }
 };