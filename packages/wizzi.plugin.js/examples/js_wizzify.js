/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\examples\js_wizzify.js.ittf
    utc time: Wed, 10 Jan 2024 14:54:18 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var jswizzifier = require('../lib/wizzifiers/js/wizzifier');
var file = require('wizzi-utils').file;

let arg = process.argv[2];
const moduleName = arg && arg.length > 0 ? arg : 'first';
async.map([
    moduleName
], wizzify, (err, result) => {

    console.log('');
    console.log('Terminated. result: ', result);
}
)
function wizzify(name, callback) {
    
    var source = path.join(__dirname, 'data', name + '.js');
    
    jswizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.js.sinthax')
     }, (err, ittf) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.js.ittf'), ittf)
        return callback(null, 'success ' + source);
    }
    )
}
