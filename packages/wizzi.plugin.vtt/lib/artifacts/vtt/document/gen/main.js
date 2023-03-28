/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.vtt\.wizzi-override\lib\artifacts\vtt\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.vtt.artifacts.vtt.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'vtt') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "vtt". Received: ' + model.wzElement, model))
    }
    try {
        md.vtt(model, ctx, (err, notUsed) => {
        
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
md.vtt = function(model, ctx, callback) {
    ctx.w( 'WEBVTT' );
    ctx.w();
    writeComments(ctx, model)
    md.genItems(model.styles, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.regions, ctx, {
            indent: false, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.vttCues, ctx, {
                indent: false, 
                from: 0
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
md.vttCue = function(model, ctx, callback) {
    writeComments(ctx, model)
    writeCueTime( ctx, model );
    if (typeof model.region !== 'undefined') {
        ctx.write( ' region:' + model.region);
    }
    if (typeof model.direction !== 'undefined') {
        ctx.write( ' vertical:' + model.direction);
    }
    if (typeof model.line !== 'undefined') {
        ctx.write( ' line:' + model.line);
    }
    if (typeof model.position !== 'undefined') {
        ctx.write( ' position:' + model.position);
    }
    if (typeof model.size !== 'undefined') {
        ctx.write( ' size:' + model.size);
    }
    if (typeof model.align !== 'undefined') {
        ctx.write( ' align:' + model.align);
    }
    if (typeof model.lineAlign !== 'undefined') {
        ctx.write( ' line-align:' + model.lineAlign);
    }
    if (typeof model.positionAlign !== 'undefined') {
        ctx.write( ' position-align:' + model.positionAlign);
    }
    ctx.w();
    md.genItems(model.cueTexts, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w();
        return callback(null);
    }
    )
}
;
md.cueText = function(model, ctx, callback) {
    ctx.write( model.wzName );
    var saveIsInsideText = !!ctx.isInsideText;
    ctx.isInsideText = true;
    md.genItems(model.cueTexts, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (saveIsInsideText == false) {
            ctx.w();
        }
        ctx.isInsideText = saveIsInsideText;
        return callback(null);
    }
    )
}
;
md.p = function(model, ctx, callback) {
    ctx.write( '- ' + model.wzName );
    var saveIsInsideText = !!ctx.isInsideText;
    ctx.isInsideText = true;
    md.genItems(model.cueTexts, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (saveIsInsideText == false) {
            ctx.w();
        }
        ctx.isInsideText = saveIsInsideText;
        return callback(null);
    }
    )
}
;
md.u = function(model, ctx, callback) {
    writeCueText(ctx, model, 'u', callback)
}
;
md.i = function(model, ctx, callback) {
    writeCueText(ctx, model, 'i', callback)
}
;
md.b = function(model, ctx, callback) {
    writeCueText(ctx, model, 'b', callback)
}
;
md.c = function(model, ctx, callback) {
    writeCueText(ctx, model, 'c', callback)
}
;
md.voiceSpan = function(model, ctx, callback) {
    writeCueText(ctx, model, 'v', callback)
}
;
md.lang = function(model, ctx, callback) {
    writeCueText(ctx, model, 'lang', callback)
}
;
md.time = function(model, ctx, callback) {
    ctx.write( '<' + tag );
    ctx.write(formatTime( model.wzName ))
    ctx.w('<');
    return callback(null);
}
;
md.componentClass = function(model, ctx, callback) {
    ctx.write( '.' + model.wzName );
    return callback(null);
}
;
md.style = function(model, ctx, callback) {
    ctx.w( 'STYLE' );
    md.genItems(model.rules, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w();
        return callback(null);
    }
    )
}
;
md.cueRule = function(model, ctx, callback) {
    ctx.w( '::cue(' + model.wzName + ') {' );
    ctx.indent();
    async.mapSeries(model.getProperties(), getWriteProperty(ctx), function() {
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    })
}
;
function getWriteProperty(ctx) {
    return function writeProperty(prop, callback) {
            var name = prop.name;
            var value = prop.value;
            if (name === "appearance") {
                ctx.w("-webkit-appearance: " + value  + ";");
                ctx.w("-moz-appearance: " + value  + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "background-image") {
                if (value && value.indexOf && value.indexOf("linear-gradient") >= 0) {
                    ctx.w(name + ": " + value.replace("linear-gradient", "-webkit-linear-gradient") + ";");
                    ctx.w(name + ": " + value.replace("linear-gradient", "-moz-linear-gradient") + ";");
                    ctx.w(name + ": " + value.replace("linear-gradient", "-o-linear-gradient") + ";");
                    ctx.w(name + ": " + value.replace("linear-gradient", "-ms-linear-gradient") + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else {
                    ctx.w(name + ": " + value + ";");
                }
            }
            else if (name === "border-radius") {
                ctx.w("-webkit-border-radius: " + value + ";");
                ctx.w("-khtml-border-radius: " + value + ";");
                ctx.w("-moz-border-radius: " + value + ";");
                ctx.w("-o-border-radius: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "box-shadow") {
                ctx.w("-webkit-box-shadow: " + value + ";");
                ctx.w("-moz-box-shadow: " + value + ";");
                ctx.w("-o-box-shadow: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "display" && value === 'flex') {
                ctx.w(name + ": -ms-flexbox;");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex") {
                ctx.w("-ms-flex: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flexbox") {
                ctx.w("-webkit-box: " + value + ";");
                ctx.w("-webkit-flex: " + value + ";");
                ctx.w("-moz-box: " + value + ";");
                ctx.w("-ms-flexbox: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-basis") {
                ctx.w("-ms-flex-preferred-size: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-grow") {
                ctx.w("-ms-flex-positive: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-wrap") {
                ctx.w("-ms-flex-wrap: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "order") {
                ctx.w("-ms-flex-order: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-flow") {
                ctx.w("-webkit-flex-flow: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "justify-content") {
                ctx.w("-webkit-justify-content: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "transition") {
                ctx.w("-webkit-transition: " + value + ";");
                ctx.w("-moz-transition: " + value + ";");
                ctx.w("-o-transition: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "user-select") {
                ctx.w("-webkit-user-select: " + value + ";");
                ctx.w("-moz-user-select: " + value + ";");
                ctx.w("-ms-user-select: " + value + ";");
                ctx.w("-o-user-select: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else {
                ctx.w(name + ": " + value + ";");
            }
            process.nextTick(callback)
        };
}
md.region = function(model, ctx, callback) {
    ctx.w( 'REGION' );
    ctx.w( 'id:' + model.wzName );
    if (typeof model.width !== 'undefined') {
        ctx.w( 'width:' + model.width);
    }
    if (typeof model.lines !== 'undefined') {
        ctx.w( 'lines:' + model.lines);
    }
    if (typeof model.regionAnchor !== 'undefined') {
        ctx.w( 'regionanchor:' + model.regionAnchor);
    }
    if (typeof model.viewportAnchor !== 'undefined') {
        ctx.w( 'viewportanchor:' + model.viewportAnchor);
    }
    if (typeof model.scroll !== 'undefined') {
        ctx.w( 'scroll:' + model.scroll);
    }
    ctx.w();
    return callback(null);
}
;
function writeComments(ctx, model) {
    if (model.comments.length == 1) {
        ctx.w( 'NOTE ' + model.comments[0].wzName );
        ctx.w();
    }
    if (model.comments.length > 1) {
        ctx.w( 'NOTE' );
        var i, i_items=model.comments, i_len=model.comments.length, item;
        for (i=0; i<i_len; i++) {
            item = model.comments[i];
            ctx.w( item.wzName );
        }
        ctx.w();
    }
}
function writeCueText(ctx, model, tag, callback) {
    ctx.write( '<' + tag );
    md.genItems(model.componentClasses, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.write( '>' + model.wzName );
        var saveIsInsideText = !!ctx.isInsideText;
        ctx.isInsideText = true;
        md.genItems(model.cueTexts, ctx, {
            indent: false, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write( '</' + tag + '>' );
            if (saveIsInsideText == false) {
                ctx.w();
            }
            ctx.isInsideText = saveIsInsideText;
            return callback(null);
        }
        )
    }
    )
}
function writeCueTime(ctx, model) {
    if (typeof model.id !== 'undefined') {
        ctx.w( model.id );
    }
    var ss = model.wzName.split(' ').filter(function(el) {
        return el != null;
    });
    ctx.write(formatTime( ss.length == 1 ? 0 : ss[0] ))
    ctx.write(' --> ')
    ctx.write(formatTime( ss.length == 1 ? ss[0] : ss[1] ))
}
function formatTime(t) {
    var ss = t.split(':');
    if (ss.length == 1) {
        return '00:00:' + zeroPad(ss[0], 2) + '.000';
    }
    else if (ss.length == 2) {
        return '00:' + zeroPad(ss[0], 2) + ':' + zeroPad(ss[1], 2) + '.000';
    }
    else if (ss.length == 3) {
        return zeroPad(ss[0], 2) + ':' + zeroPad(ss[1], 2) + ':' + zeroPad(ss[2], 2);
    }
    else {
        return zeroPad(ss[0], 2) + ':' + zeroPad(ss[0], 2) + ':' + zeroPad(ss[1], 2) + ':' + zeroPad(ss[2], 3);
    }
}
function zeroPad(n, len) {
    n = parseInt(n);
    if (len == 2) {
        return n > 9 ? n : '0' + n;
    }
    else {
        return n > 99 ? n : n > 9 ? '0' + n : '00' + n;
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

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.vtt/lib/artifacts/vtt/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
