/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.first\.wizzi\lib\artifacts\first\extended\trans\main.js.ittf
    utc time: Fri, 07 Apr 2023 14:53:54 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;
var errors = require('../../../../../errors');

var md = module.exports = {};
var myname = 'wizzi.plugin.first.first.extended.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'first') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "first". Received: ' + model.wzElement, model));
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

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.first/lib/artifacts/first/extended/trans/main.' + method, 
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
