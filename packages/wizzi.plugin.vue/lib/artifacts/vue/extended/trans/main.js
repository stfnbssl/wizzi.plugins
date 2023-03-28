/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.vue\.wizzi-override\lib\artifacts\vue\extended\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;
var errors = require('../../../../../errors');

var md = module.exports = {};
var myname = 'wizzi.plugin.vue.vue.extended.trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'vue') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "vue". Received: ' + model.wzElement, model))
    }
    
    try {
        transformedModel = {};
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, transformedModel)
        }
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
            method: 'wizzi.plugin.vue/lib/artifacts/vue/extended/trans/main.' + method, 
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
