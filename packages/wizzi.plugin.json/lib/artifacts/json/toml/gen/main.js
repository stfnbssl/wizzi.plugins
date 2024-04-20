/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.json\.wizzi-override\lib\artifacts\json\toml\gen\main.js.ittf
    utc time: Sat, 20 Apr 2024 04:42:59 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.json.artifacts.json.toml.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    var modelTypeIsValid = verify.isObject(model) || verify.isArray(model);
    if (!modelTypeIsValid) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object or an array. Received: ' + model, model));
    }
    try {
        // loog 'model', model
        delete model.___exportName
        var i, i_items=Object.keys(model), i_len=Object.keys(model).length, key;
        for (i=0; i<i_len; i++) {
            key = Object.keys(model)[i];
            var item = model[key];
            // loog 'key', key
            if (verify.isObject(item)) {
                ctx.w('[' + key + ']')
                writeObject(item, ctx, true)
            }
            else if (verify.isArray(item)) {
                ctx.w(key + ' = [' + writeArray(item, ctx) + ']')
            }
            // loog 'key', key, 'value', verify.isString(item) ? '"' + item + '"' : item
            else {
                ctx.w(key + ' = ' + (verify.isString(item) ? ('"' + item + '"') : item))
            }
        }
        return callback(null, ctx);
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
            method: 'wizzi.plugin.json/lib/artifacts/json/toml/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function writeArray(arr, ctx, sb) {
    var sb = sb || [];
    var first = true;
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        if (!first) {
            sb.push(', ');
        }
        if (verify.isObject(item)) {
            sb.push('{' + writeObject(item, ctx, sb) + '}' + '\n')
        }
        else if (verify.isArray(item)) {
            sb.push('[' + writeArray(item, ctx, sb) + ']' + '\n')
        }
        else {
            sb.push(verify.isString(item) ? '"' + item + '"' : item + '\n')
        }
        first = false;
    }
    return sb.join('');
}
function writeObject(obj, ctx, top, sb) {
    var sb = sb || [];
    if (top) {
        var i, i_items=Object.keys(obj), i_len=Object.keys(obj).length, key;
        for (i=0; i<i_len; i++) {
            key = Object.keys(obj)[i];
            var item = obj[key];
            if (verify.isObject(item)) {
                sb.push(key + ' = ' + '\n')
                writeObject(item, ctx, false, sb)
            }
            else if (verify.isArray(item)) {
                sb.push(key + ' = [' + writeArray(item, ctx, sb) + ']' + '\n')
            }
            else {
                sb.push(key + ' = ' + (verify.isString(item) ? ('"' + item + '"') : item))
            }
        }
    }
    return sb.join('');
}
