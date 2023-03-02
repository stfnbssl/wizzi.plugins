/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.c\.wizzi-override\examples\index.js.ittf
*/
'use strict';
var async = require('async');
var samples = [
    require('./step_3_go')
];
function execute(callback) {
    async.series(samples, (err, notUsed) => {
    
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            throw err;
        }
        var msg = 'package.wizzi-lab.schema.c - Level 0 samples - done.';
        console.log(msg, __filename);
        if (callback) {
            return callback(null, msg);
        }
    }
    )
}
module.exports = execute;
if (typeof require != 'undefined' && require.main==module) {
    execute();
}
