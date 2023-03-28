/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wfschema\test\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var legacy = require('../../../../../legacy');
var md = module.exports = {};
var myname = 'wizzischema.test.main';
md.gen = function(model, ctx, callback) {
    // log myname + 'model', model
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'wizzischema-test.js.ittf');
    var mTreeBuildupContext = {
        schema: model, 
        request: {
            emitKey: ctx.emitKey || 'node-js', 
            toJson: ctx.toJson || false
         }
     };
    legacy.jsModule(ittfDocumentPath, mTreeBuildupContext, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    })
}
;
