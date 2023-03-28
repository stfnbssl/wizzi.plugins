/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.svg\.wizzi-override\lib\artifacts\svg\document\gen\main.js.ittf
*/
'use strict';
// Language artifact that targets
// the Scalable Vector Graphics (SVG) 1.1 (Second Edition) specification.
// It implements a minimal set of elements
//
// This is a code write based artifact generator.
//

var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');
// gen also has a 'lineparser' function from wizzi-utils
var myLineParser = require('../../../utils/lineParser');
var included_writers = require('./included_writers');

var myname = 'wizzi.plugin.svg.artifacts.svg.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'svg') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "svg". Received: ' + model.wzElement, model))
    }
    try {
        
        // this for md.checkSchema: false
        
        // allow generations from non root elements
        if (false) {
            md.myGetGenItem(ctx)(model, (err, notUsed) => {
            
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
        // this for md.checkSchema: true
        else {
            md.svg(model, ctx, (err, notUsed) => {
            
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
md.svg = function(model, ctx, callback) {
    if (ctx.values.forCssImage || ctx.values.forHtmlSvgElement) {
    }
    else {
        ctx.w('<?xml version="1.0"?>');
    }
    writeBeginTag(ctx, 'svg')
    ctx.write(" xmlns='http://www.w3.org/2000/svg'");
    writeAttributes(model, ctx);
    writeCloseBegin(ctx)
    md.myGenItems(model.elements, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        writeEndTag(ctx, 'svg')
        callback(null, true);
    }
    )
}
;
md.standardElement = function(model, ctx, callback) {
    // loog '***** standard element', model.wzElement
    writeBeginTag(ctx, model.wzTag)
    writeAttributes(model, ctx);
    if (model.elements.length > 0) {
        writeCloseBegin(ctx)
        if (model.wzName && model.wzName.length > 0) {
            ctx.write(model.wzName);
        }
        md.myGenItems(model.elements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            writeEndTag(ctx, model.wzTag)
            return callback();
        }
        )
    }
    else {
        ctx.write(closeSym(ctx))
        ctx.write((model.wzName && model.wzName.length > 0 ? model.wzName : ''))
        writeEndTag(ctx, model.wzTag)
        return callback();
    }
}
;
/**
    md.linearGradient = function(model, ctx, callback) {
        writeBeginTag(ctx, 'linearGradient')
        writeAttributes(model, ctx);
        writeCloseBegin(ctx)
         TODO
        writeEndTag(ctx, 'linearGradient', callback(null, true))
    }
*/
md.myGenItems = function(elements, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goelements = [];
    for (var i = from; i < elements.length; i++) {
        goelements.push(elements[i]);
    }
    async.mapSeries(goelements, md.myGetGenItem(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        return callback();
    }
    )
}
;
md.myGetGenItem = function(ctx) {
    return function(model, callback) {
            
            // loog '***** known element', model.wzElement
            if (md[model.wzElement]) {
                md[model.wzElement](model, ctx, (err, done) => {
                
                    if (err) {
                        return callback(err);
                    }
                    
                    // ok, processed
                    if (done) {
                        return callback();
                    }
                    else {
                        return md.standardElement(model, ctx, callback);
                    }
                }
                )
            }
            else {
                return md.standardElement(model, ctx, callback);
            }
        };
}
;
function writeAttributes(model, ctx) {
    var v;
    var i, i_items=model.getAttributes(), i_len=model.getAttributes().length, a;
    for (i=0; i<i_len; i++) {
        a = model.getAttributes()[i];
        v = encodeValue(ctx, a.value);
        ctx.write(" " + a.name + "='" + v + "'")
    }
    if (model.attributes) {
        var i, i_items=model.attributes, i_len=model.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = model.attributes[i];
            var p = myLineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                ctx.write(" " + p.name() + "='" + p.value() + "'")
            }
            else {
                ctx.write(" " + p.name())
            }
        }
    }
    var styles = model.getStyleAttributes();
    if (styles.length > 0) {
        var sb = [];
        var i, i_items=styles, i_len=styles.length, style;
        for (i=0; i<i_len; i++) {
            style = styles[i];
            v = encodeValue(ctx, style.value);
            sb.push(style.tag + ':' + v + ';')
        }
        ctx.write(" style='" + sb.join('') + "'")
    }
}
function encodeValue(ctx, value) {
    if (ctx.values.forCssImage) {
        var v = verify.replaceAll(value, '%','%25');
        return verify.replaceAll(v, '#','%23');
    }
    else {
        return value;
    }
}
function openSym(ctx) {
    return ctx.values.forCssImage ? '%3C' : '<';
}
function closeSym(ctx) {
    return ctx.values.forCssImage ? '%3E' : '>';
}
function writeBeginTag(ctx, name) {
    ctx.write(openSym(ctx) + name)
}
function writeCloseBegin(ctx) {
    if (ctx.values.forCssImage) {
        ctx.write(closeSym(ctx))
    }
    else {
        ctx.w(closeSym(ctx))
    }
}
function writeEndTag(ctx, name) {
    if (name) {
        __w(ctx, openSym(ctx) + '/' + name + closeSym(ctx))
    }
    else {
        __w(ctx, '/' + closeSym(ctx))
    }
}
function __w(ctx, text) {
    if (ctx.values.forCssImage) {
        ctx.write(text);
    }
    else {
        ctx.w(text);
    }
}
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
            method: 'wizzi.plugin.svg/lib/artifacts/svg/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
