/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wfschema\.wizzi-override\lib\artifacts\wfschema\json_schemaboot\gen\main.js.ittf
    utc time: Wed, 20 Mar 2024 07:13:55 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('wizzi-utils').helpers.lineParser;
var errors = require('../../../../../errors');
var wizzi = require('wizzi');
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;
var stringify = require('json-stringify-safe');

var myname = 'wizzi.plugin.wzschema.artifacts.wfschema.json_schemaboot.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'wfschema') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "wfschema". Received: ' + model.wzElement, model))
    }
    try {
        var bootWizziModel = new BootWizziSchema(model.wzName);
        bootWizziModel.loadFromWizziModel(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            var jsonObject = bootWizziModel.toJson();
            ctx.w(stringify(jsonObject, null, 4))
            return callback(null, ctx);
        }
        )
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
    function terminate_gen(model, ctx) {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            return callback(null, ctx);
        }
    }
}
;

// ITTF Fragment lib/artifacts/tfolder/async-md-gen-items.js.ittf
md.genItems = function(items, ctx, options, callback) {
    if (typeof callback == 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.mapItem(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        process.nextTick(callback)
    }
    )
}
;
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
}
;
md.genItem = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
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
            method: 'wizzi.plugin.wzschema/lib/artifacts/wfschema/json_schemaboot/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
