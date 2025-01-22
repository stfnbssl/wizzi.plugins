/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: json:/___template/wizzi.config.override.js.ittf
    utc time: Mon, 20 Jan 2025 16:28:10 GMT
*/
const path = require('path');
module.exports = {
    wzjobName: "wizzi.plugin.app-override/job", 
    wzjobPath: path.join(__dirname, '.wizzi-override', 'generate.wzjob.ittf'), 
    destPath: __dirname, 
    plugins: [
        "./wizzi.plugin.css/index.js", 
        "./wizzi.plugin.html/index.js", 
        "./wizzi.plugin.ittf/index.js", 
        "./wizzi.plugin.js/index.js", 
        "./wizzi.plugin.json/index.js", 
        "./wizzi.plugin.md/index.js", 
        "./wizzi.plugin.text/index.js", 
        "./wizzi.plugin.svg/index.js", 
        "./wizzi.plugin.wzjob/index.js", 
        "./wizzi.plugin.wzschema/index.js"
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
    schemas: [
        'app'
    ], 
    globalContext: {
        wzConfigIsDevelopment: true, 
        wzConfigIsPackageDeploy: false, 
        wzConfigIsDocumentation: true
     }
 };