/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wfschema\schemaboot\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;
var wizzi = require('wizzi');
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;

var md = module.exports = {};
var myname = 'wizzi.plugin.wzschema.wfschema.schemaboot.trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'wfschema') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "wfschema". Received: ' + model.wzElement, model))
    }
    
    try {
        transformedModel = new BootWizziSchema(model.wzName);
        bootWizziModel.loadFromWizziModel(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
        }
        )
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
            method: 'wizzi.plugin.wzschema/lib/artifacts/wfschema/schemaboot/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
