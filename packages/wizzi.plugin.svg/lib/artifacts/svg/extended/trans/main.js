/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.svg\.wizzi-override\lib\artifacts\svg\extended\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;
var errors = require('../../../../../errors');

var md = module.exports = {};
var myname = 'wizzi.plugin.svg.svg.extended.trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'svg') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "svg". Received: ' + model.wzElement, model))
    }
    
    try {
    } 
    catch (ex) {
        return callback(ex);
    } 
    callback(null, transformedModel);
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.svg/lib/artifacts/svg/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
