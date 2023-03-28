/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.java\.wizzi-override\examples\index.js.ittf
*/
'use strict';
var async = require('async');
var samples = [
    require('./step_1_go')
];
function execute(callback) {
    async.map(samples, function(sample, callback) {
        sample((err, result) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        }
        )
    }, function(err, results) {
        var msg = 'package.wizzi.plugin.java - Level 0';
        console.log(msg, __filename);
        if (err) {
            console.log("[31m%s[0m", msg + ' error.', err);
            throw err;
        }
        console.log(msg + ' done.', __filename);
        if (callback) {
            return callback(null, msg);
        }
    })
}
module.exports = execute;
if (typeof require != 'undefined' && require.main==module) {
    execute();
}
