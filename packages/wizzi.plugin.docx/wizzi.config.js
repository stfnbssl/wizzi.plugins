/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi/packages/wizzi-cli/dist/resources/create/templates/wizzi_plugin/wizzi.config.js.ittf
    utc time: Wed, 24 Feb 2021 09:08:30 GMT
*/
'use strict';
const path = require('path');
module.exports = {
    wfjobName: "/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'dist'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    s_schemas: [
        "docx"
    ], 
    schemas: [
        "docx"
    ], 
    globalContext: {
        wzConfigIsDevelopment: true
    }
};
