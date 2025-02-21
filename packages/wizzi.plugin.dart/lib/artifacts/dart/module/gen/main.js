/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.dart\.wizzi-override\lib\artifacts\dart\module\gen\main.js.ittf
    utc time: Fri, 15 Mar 2024 19:45:56 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('wizzi-utils').helpers.lineParser;
var errors = require('../../../../../errors');
var writers = require('./writers/index');

var myname = '.artifacts.dart.package.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'dart') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "dart". Received: ' + model.wzElement, model));
    }
    try {
        var item_count = 0;
        (function next() {
        
            var item = model.statements[item_count++];
            if (!item) {
                return terminate_gen(model, ctx, callback);
            }
            writers.gen(item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                next();
            }
            )
        })();
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
    function terminate_gen(model, ctx, callback) {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            return callback(null, ctx);
        }
    }
}
;
function mainStart(model, ctx) {
}
function mainFinish(model, ctx) {
}

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
            method: '/lib/artifacts/dart/package/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
