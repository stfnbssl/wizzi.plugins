/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wzschema\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');
var included_writers = require('./included_writers');

var myname = 'wizzi.plugin.wzschema.artifacts.wzschema.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'wzschema') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "wzschema". Received: ' + model.wzElement, model))
    }
    try {
        md.wzschema(model, ctx, (err, notUsed) => {
        
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
md.wzschema = function(model, ctx, callback) {
    ctx.write('<wzschema');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.elements, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</wzschema>');
        return callback(null);
    }
    )
}
;
md.element = function(model, ctx, callback) {
    ctx.write('<element');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.super && (model.super.length > 0 || model.super == true)) {
        ctx.write(' super="' + model.super.replace(/\"/g, "'") + '"')
    }
    if (model.tag && (model.tag.length > 0 || model.tag == true)) {
        ctx.write(' tag="' + model.tag.replace(/\"/g, "'") + '"')
    }
    if (model.isRoot && (model.isRoot.length > 0 || model.isRoot == true)) {
        ctx.write(' isRoot="' + model.isRoot.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.attributes, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.relations, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</element>');
            return callback(null);
        }
        )
    }
    )
}
;
md.attribute = function(model, ctx, callback) {
    ctx.write('<attribute');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.tag && (model.tag.length > 0 || model.tag == true)) {
        ctx.write(' tag="' + model.tag.replace(/\"/g, "'") + '"')
    }
    if (model.type && (model.type.length > 0 || model.type == true)) {
        ctx.write(' type="' + model.type.replace(/\"/g, "'") + '"')
    }
    if (model.default && (model.default.length > 0 || model.default == true)) {
        ctx.write(' default="' + model.default.replace(/\"/g, "'") + '"')
    }
    if (model.defaultWhenDeclared && (model.defaultWhenDeclared.length > 0 || model.defaultWhenDeclared == true)) {
        ctx.write(' defaultWhenDeclared="' + model.defaultWhenDeclared.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</attribute>');
    return callback(null);
}
;
md.relation = function(model, ctx, callback) {
    ctx.write('<relation');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.type && (model.type.length > 0 || model.type == true)) {
        ctx.write(' type="' + model.type.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</relation>');
    return callback(null);
}
;
md.jsInclude = function(model, ctx, callback) {
    ctx.write('<script');
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_js) {
        included_writers.writeIncludeJs(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        }
        )
    }
    else {
        ctx.w("</script>");
        return callback(null, true);
    }
}
;
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

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.wzschema/lib/artifacts/wzschema/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
