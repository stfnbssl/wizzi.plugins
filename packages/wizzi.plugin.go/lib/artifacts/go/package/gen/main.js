/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.go\.wizzi-override\lib\artifacts\go\package\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');
var writers = require('./writers/index');

var myname = '.artifacts.go.package.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'go') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "go". Received: ' + model.wzElement, model))
    }
    try {
        mainStart(model, ctx)
        var item_count = 0;
        (function next() {
            var item = model.statements[item_count++];
            if (!item) {
                return terminate_gen(model, ctx);
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
    function terminate_gen(model, ctx) {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            mainFinish(model, ctx)
            return callback(null, ctx);
        }
    }
}
;
function mainStart(model, ctx) {
    var name = model.wzName || 'main';
    ctx.w('package ' + name);
    ctx.w('');
    ctx.w('import "fmt"');
    ctx.w('');
}
function mainFinish(model, ctx) {
}

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: '/lib/artifacts/go/package/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
