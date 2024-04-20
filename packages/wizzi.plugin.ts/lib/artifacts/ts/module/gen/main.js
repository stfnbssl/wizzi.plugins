/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\main.js.ittf
    utc time: Sat, 20 Apr 2024 03:37:17 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var statement = require('./statement');
// old var wzIife = require('./wziife')

var myname = 'wizzi.plugin.ts.artifacts.ts.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'xmodule') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "xmodule". Received: ' + model.wzElement, model));
    }
    try {
        ctx.__ecma = 'es6';
        ctx.__jskind = 'react';
        main_init(model, ctx)
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            statement.gen(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            else {
                return callback(null, ctx);
            }
        }
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
function main_init(model, ctx) {
    if ((!!ctx.values.noGeneratorComments) == false) {
        ctx.w('/*');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    package: @wizzi/plugin.ts@');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        ctx.w('    utc time: ' + new Date().toUTCString());
        ctx.w('*/');
    }
}
var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isAttrValue(a, v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}
function getAttrs(e) {
    var retval = [];
    for (var a in e) {
        if (isAttrValue(a, e[a])) {
            retval.push({ name: verify.replaceAll(a, '_', '-'), value: e[a] });
        }
        else if (a.substr(0, 3) === 'ng-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'data-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'aria-') {
            retval.push({ name: a, value: e[a] });
        }
    }
    if (e.attributes) {
        var i, i_items=e.attributes, i_len=e.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = e.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                retval.push({ name: p.name(), value: p.value() });
            }
            else {
                retval.push({ name: p.name() });
            }
        }
    }
    return retval;
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
            method: 'wizzi.plugin.ts/lib/artifacts/ts/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
