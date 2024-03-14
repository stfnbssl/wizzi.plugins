/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi-override\examples\yaml_json.js.ittf
    utc time: Wed, 13 Mar 2024 07:15:01 GMT
*/
'use strict';
var path = require('path');
const yaml_parser = require('js-yaml');

var file = require('wizzi-utils').file;

let arg = process.argv[2];
const moduleName = arg && arg.length > 0 ? arg : 'first';
var yamlsource = path.join(__dirname, 'data', moduleName + '.yaml');
const yamlText = file.read(yamlsource);
const jsonContent =  yaml_parser.load(yamlText);
file.write(path.join(__dirname, 'results', moduleName + '.json'), JSON.stringify(jsonContent, null, 4))
file.write(path.join(__dirname, 'results', moduleName + '.json.yaml'), yaml_parser.dump(jsonContent))
