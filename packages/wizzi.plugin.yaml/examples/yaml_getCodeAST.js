/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi\examples\yaml_getCodeAST.js.ittf
    utc time: Mon, 04 Mar 2024 16:21:57 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var yamlwizzifier = require('../lib/wizzifiers/yaml/wizzifier');
var file = require('wizzi-utils').file;
var stringify = require('json-stringify-safe');

let arg = process.argv[2];
const moduleName = arg && arg.length > 0 ? arg : 'first';
async.map([
    moduleName
], getCodeAST, (err, result) => {

    console.log('');
    console.log('Terminated. result: ', result);
}
)
function getCodeAST(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.yaml');
    
    yamlwizzifier.getCodeAST(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.yaml.syntax')
     }, (err, syntax) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error gettting code AST: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.yaml.syntax.json'), stringify(syntax, null, 4))
        return callback(null, 'success ' + source);
    }
    )
}
