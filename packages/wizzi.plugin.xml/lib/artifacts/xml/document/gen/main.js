/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.xml\.wizzi-override\lib\artifacts\xml\document\gen\main.js.ittf
    utc time: Sat, 20 Apr 2024 03:00:16 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.xml.artifacts.xml.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'xml') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "xml". Received: ' + model.wzElement, model));
    }
    try {
        ctx.w('<?xml version="1.0"' + (model.encoding ? ' encoding="' + model.encoding + '"' : '') + (model.standalone ? ' standalone="' + model.standalone + '"' : '') + '>')
        var i, i_items=model.elements, i_len=model.elements.length, el;
        for (i=0; i<i_len; i++) {
            el = model.elements[i];
            md.genItem(el, ctx);
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
md.genItem = function(model, ctx) {
    if (model.tag) {
        if (model.tag == '<--') {
            ctx.w('<-- ' + model.text + ' -->');
        }
        else {
            ctx.write('<' + model.tag);
            var i, i_items=model.attributes, i_len=model.attributes.length, item;
            for (i=0; i<i_len; i++) {
                item = model.attributes[i];
                ctx.write(' ' + item.name + '="');
                ctx.write(item.value)
                ctx.write('"');
            }
            if ((model.elements && model.elements.length > 0) || model.text) {
                ctx.write('>');
                if (model.text) {
                    ctx.write(model.text);
                }
                if (model.elements && model.elements.length > 0) {
                    ctx.w();
                    ctx.indent();
                    var i, i_items=model.elements, i_len=model.elements.length, item;
                    for (i=0; i<i_len; i++) {
                        item = model.elements[i];
                        md.genItem(item, ctx);
                    }
                    ctx.deindent();
                }
                ctx.w('</' + model.tag + '>');
            }
            else {
                ctx.w(' />');
            }
        }
    }
    else {
        ctx.write(model.text);
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
            method: 'wizzi.plugin.xml/lib/artifacts/xml/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
