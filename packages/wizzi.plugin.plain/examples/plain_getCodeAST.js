/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.plain\.wizzi-override\examples\plain_getCodeAST.js.ittf
    utc time: Wed, 13 Mar 2024 07:02:11 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var plainwizzifier = require('../lib/wizzifiers/plain/wizzifier');
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
    
    var source = path.join(__dirname, 'data', name + '.plain');
    
    plainwizzifier.getCodeAST(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.plain.syntax')
     }, (err, syntax) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error gettting code AST: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.plain.syntax.json'), stringify(syntax, null, 4))
        return callback(null, 'success ' + source);
    }
    )
}
