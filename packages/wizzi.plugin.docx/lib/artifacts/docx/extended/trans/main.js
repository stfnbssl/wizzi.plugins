/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docx\.wizzi-override\lib\artifacts\docx\extended\trans\main.js.ittf
    utc time: Wed, 13 Mar 2024 07:01:26 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = verify.lineParser;
var errors = require('../../../../../errors');

var md = module.exports = {};
var myname = 'wizzi.plugin.docx.docx.extended.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'docx') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "docx". Received: ' + model.wzElement, model));
    }
    
    try {
        transformedModel = {};
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, transformedModel)
        }
        callback(null, transformedModel)
    } 
    catch (ex) {
        return callback(ex);
    } 
}
;

/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.docx/lib/artifacts/docx/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj)
    }
}
var functors = {};
