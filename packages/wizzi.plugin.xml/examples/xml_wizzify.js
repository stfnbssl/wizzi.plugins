/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.xml\.wizzi-override\examples\xml_wizzify.js.ittf
    utc time: Mon, 06 May 2024 14:26:01 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var xmlwizzifier = require('../lib/wizzifiers/xml/wizzifier');
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
    
    var source = path.join(__dirname, 'data', name + '.xml');
    
    xmlwizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.xml.syntax')
     }, (err, ittf) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.xml.ittf'), ittf)
        return callback(null, 'success ' + source);
    }
    )
}
