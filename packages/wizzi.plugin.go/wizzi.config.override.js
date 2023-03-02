/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.cli\packages\wizzi.cli.meta\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi.cli/packages/wizzi.cli.meta/resources/create/templates/__temp/js-wizzi-plugin/wizzi.plugin.go/wizzi.config.override.js.ittf
*/
'use strict';
const path = require('path');
module.exports = {
    wfjobName: "wizzi.plugin.go-override/job", 
    wfjobPath: path.join(__dirname, '.wizzi-override', 'generate.wfjob.ittf'), 
    destPath: __dirname, 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js'
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi/packages", 
    schemas: [
        'go'
    ], 
    globalContext: {
        wzConfigIsDevelopment: true
     }
 };
