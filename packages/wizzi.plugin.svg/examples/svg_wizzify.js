/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.svg\.wizzi-override\examples\svg_wizzify.js.ittf
    utc time: Wed, 12 Jun 2024 10:55:37 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var svgwizzifier = require('../lib/wizzifiers/svg/wizzifier');
var file = require('@wizzi/utils').file;

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
    
    var source = path.join(__dirname, 'data', name + '.svg');
    
    svgwizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.svg.sinthax')
     }, (err, ittf) => {
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.svg.ittf'), ittf)
        return callback(null, 'success ' + source);
    }
    )
}