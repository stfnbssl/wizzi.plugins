/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.xml\.wizzi-override\examples\xml_getCodeAST.js.ittf
    utc time: Sat, 20 Apr 2024 03:00:16 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var xmlwizzifier = require('../lib/wizzifiers/xml/wizzifier');
var file = require('@wizzi/utils').file;
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
    
    var source = path.join(__dirname, 'data', name + '.xml');
    
    xmlwizzifier.getCodeAST(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.xml.syntax')
     }, (err, syntax) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error gettting code AST: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.xml.syntax.json'), stringify(syntax, null, 4))
        return callback(null, 'success ' + source);
    }
    )
}
