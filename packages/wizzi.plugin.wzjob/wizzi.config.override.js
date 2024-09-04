/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.cli\packages\wizzi.cli.meta\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi.cli/packages/wizzi.cli.meta/meta-templates/__temp/js-wizzi-plugin/wizzi.plugin.wzjob/wizzi.config.override.js.ittf
*/
'use strict';
const path = require('path');
module.exports = {
    wzjobName: "wizzi.plugin.wzjob-override/job", 
    wzjobPath: path.join(__dirname, '.wizzi-override', 'generate.wzjob.ittf'), 
    destPath: __dirname, 
    plugins: [
        "@wizzi/plugin.css", 
        "@wizzi/plugin.html", 
        "@wizzi/plugin.ittf", 
        "@wizzi/plugin.js", 
        "@wizzi/plugin.json", 
        "@wizzi/plugin.md", 
        "@wizzi/plugin.text", 
        "@wizzi/plugin.wzjob", 
        "@wizzi/plugin.wzschema", 
    ], 
    // pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages", 
    schemas: [
        'wzjob'
    ], 
    globalContext: {
        wzConfigIsDevelopment: true, 
        wzConfigIsPackageDeploy: false, 
        wzConfigIsDocumentation: true
     }
 };
