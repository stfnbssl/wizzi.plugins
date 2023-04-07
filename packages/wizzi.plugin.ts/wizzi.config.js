/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.cli\packages\wizzi.cli.meta\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi.cli/packages/wizzi.cli.meta/meta-templates/__temp/js-wizzi-plugin/wizzi.plugin.ts/wizzi.config.js.ittf
*/
'use strict';
const path = require('path');
module.exports = {
    wfjobName: "wizzi.plugin.ts/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: __dirname, 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js'
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.v07/packages", 
    schemas: [
        'ts'
    ], 
    globalContext: {
        wzConfigIsDevelopment: true, 
        wzConfigIsPackageDeploy: false, 
        wzConfigIsDocumentation: true
     }
 };
