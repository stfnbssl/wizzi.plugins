/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.graphql\.wizzi\examples\graphql_wizzify.js.ittf
    utc time: Sat, 08 Apr 2023 04:30:08 GMT
*/
'use strict';


var async = require('async');
var path = require('path');
var util = require('util');

var graphqlwizzifier = require('../lib/wizzifiers/graphql/wizzifier');
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
    
    var source = path.join(__dirname, 'data', name + '.graphql');
    
    graphqlwizzifier.getWizziIttf(file.read(source), {
        syntaxOutFile: path.join(__dirname, 'data', 'output', name + '.graphql.syntax')
     }, (err, ittf) => {
    
        if (err) {
            console.log("[31m%s[0m", 'error wizzifying: ' + source);
            console.log("[31m%s[0m", 'err', err);
            return callback(null, 'error ' + source);
        }
        file.write(path.join(__dirname, 'data', 'output', name + '.graphql.ittf'), ittf)
        return callback(null, 'success ' + source);
    }
    )
}