/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.raml\.wizzi-override\lib\artifacts\raml\nodejs_server\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'raml.nodejs.server.main';
md.gen = function(model, ctx, callback) {
    var ittfDocumentPath = path.join(__dirname, 'ittf', 'nodejs-server.js.ittf');
    var jsContext = {
        raml: model, 
        request: {}
     };
    wizzi.jsModule(ittfDocumentPath, jsContext, function(err, result) {
        if (err) {
            throw new Error(err);
        }
        ctx.w(result);
        callback(null, ctx);
    })
}
;
