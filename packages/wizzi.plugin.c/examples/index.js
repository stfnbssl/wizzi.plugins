/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.c\.wizzi-override\examples\index.js.ittf
    utc time: Wed, 13 Mar 2024 07:01:14 GMT
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
