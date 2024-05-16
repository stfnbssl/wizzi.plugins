/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.bin\.wizzi-override\examples\bin_getCodeAST.js.ittf
    utc time: Thu, 09 May 2024 13:28:11 GMT
*/
'use strict';


import async;
import path;
import util;

var binwizzifier = require('../lib/wizzifiers/bin/wizzifier');
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
    
    var source = path.join(__dirname, 'data', name + '.bin');
    
    binwizzifier.getCodeAST(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.bin.syntax')
     }, (err, syntax) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error gettting code AST: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.bin.syntax.json'), stringify(syntax, null, 4))
        return callback(null, 'success ' + source);
    }
    )
}
