/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.css\.wizzi-override\lib\artifacts\css\document\gen\main.js.ittf
    utc time: Thu, 25 Apr 2024 11:40:57 GMT
*/
'use strict';



var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var included_writers = require('./included_writers');
var postcss = require("postcss");
var colorFunction = require("postcss-color-function");
var rule = require('./rule');

var myname = 'wizzi.plugin.css.artifacts.css.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'css') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "css". Received: ' + model.wzElement, model));
    }
    try {
        rule.load(md);
        main_init(model, ctx)
        if (true) {
            ctx.__comment_level = 0;
            md.myGetGenItem(ctx)(model, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (ctx.artifactGenerationErrors.length > 0) {
                    return callback(ctx.artifactGenerationErrors);
                }
                else {
                    try {
                        var postCssResult = postcss().use(colorFunction({
                            preserveCustomProps: true
                         })).process(ctx.getContent()).css
                        ;
                    } 
                    catch (ex) {
                        if (ex.name === 'CssSyntaxError') {
                            return callback(null, ctx);
                        }
                    } 
                    ctx.hydrate({
                        lines: [
                            {
                                indentValue: 0, 
                                text: [
                                    postCssResult
                                ]
                             }
                        ]
                     })
                    return callback(null, ctx);
                }
            }
            )
        }
        else {
            md.css(model, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (ctx.artifactGenerationErrors.length > 0) {
                    return callback(ctx.artifactGenerationErrors);
                }
                // generation OK
                else {
                    return callback(null, ctx);
                }
            }
            )
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
md.css = function(model, ctx, callback) {
    ctx.w('<css>');
    md.genItems(model.nodes, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</css>');
        return callback(null);
    }
    )
}
;
md.css = function(model, ctx, callback) {
    // css is container only
    if (model.charset) {
        ctx.write('@charset "' + model.charset + '";');
    }
    emitResources(model.resources, ctx);
    md.genItems(model.statements, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.rules, ctx, {
            indent: false
         }, callback)
    }
    )
}
;
md.statement = function(model, ctx, callback) {
    ctx.w(model.wzName);
    return callback(null);
}
;

md.myGetGenItem = function(ctx) {
    return function(model, callback) {
            var stm = md[model.wzElement];
            if (stm) {
                stm(model, ctx, callback)
            }
            // this is an abnormal end
            else {
                throw ctx.error(myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model);
            }
        };
}
;

function main_init(model, ctx) {
    // loog 'css.document.gen.main, ctx.values', ctx.values, !!ctx.values.noGeneratorComments
    if ((!!ctx.values.noGeneratorComments) == false) {
        ctx.w('/*');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    package: @wizzi/plugin.css@0.8.7');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        if ((!!ctx.values.wzConfigIsPackageDeploy) == false) {
            ctx.w('    utc time: ' + new Date().toUTCString());
        }
        ctx.w('*/');
    }
}

function emitResources(requestedResources, ctx) {
    if (requestedResources.length > 0 && ctx.values.cssResources) {
        var resourceRepo = ctx.values.cssResources;
        resourceRepo.clearCssDependencies();
        var i, i_items=requestedResources, i_len=requestedResources.length, item;
        for (i=0; i<i_len; i++) {
            item = requestedResources[i];
            resourceRepo.addCssDependency(item.wzName);
        }
        resourceRepo.emitCssDependencies(ctx);
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
            method: 'wizzi.plugin.css/lib/artifacts/css/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
