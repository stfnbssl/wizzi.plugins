/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\document\gen\statements\html.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');
var _ = require('lodash');
var lineParser = require('../utils/lineParser');
var verify = require('wizzi-utils').verify;
var html_react = require('../react/html');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.html';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment' && item.wzElement != 'commentmultiline') {
            count++;
        }
    }
    return count;
}
function writeComments(model, ctx) {
    var temp = [];
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment') {
            __writeComments(item, ctx, false)
        }
        else if (item.wzElement == 'commentmultiline') {
            __writeComments(item, ctx, true)
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return model;
}
function __writeComments(model, ctx, multi) {
    // loog '__writeComments-model', model
    if (multi || model.statements.length > 0) {
        ctx.w('/**');
        ctx.indent();
        if (verify.isNotEmpty(model.wzName)) {
            ctx.w(model.wzName);
        }
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            __writeCommentLine(item, ctx)
        }
    }
    else {
        ctx.w('// ' + model.wzName);
    }
    if (multi || model.statements.length > 0) {
        ctx.deindent();
        ctx.w('*/');
    }
}
function __writeCommentLine(model, ctx) {
    ctx.w('// ' + model.wzName);
    if (model.statements.length > 0) {
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            __writeCommentLine(item, ctx)
        }
        ctx.deindent();
    }
}
md.load = function(cnt) {
    
    var __tags = "a abbr address area article aside audio b base bdi bdo big blockquote body br" + " button canvas caption cite code col colgroup data datalist dd del details dfn" + " dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5" + " h6 head header hr html i iframe img input ins kbd keygen label legend li link" + " main map mark menu menuitem meta meter nav noscript object ol optgroup option" + " output p param picture pre progress q rp rt ruby s samp script section select" + " small source span strong _style sub summary sup svg table tbody td textarea tfoot th" + " thead time title tr track u ul var video wbr" + " altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform" + " circle clipPath color-profile cursor defs desc discard ellipse" + " @filter font font-face font-face-format font-face-name font-face-src font-face-uri" + " foreignObject g glyph glyphRef hatch hatchpath hkern image line linearGradient" + " marker mask metadata missing-glyph mpath @param path pattern polygon polyline radialGradient" + " rect solidcolor stop style svg switch symbol text textPath tref tspan" + " unknown use video view vkern";
    
    var fb_html_supported_tags = __tags.split(' ');
    
    var __events = "copy cut paste " + " compositionEnd compositionStart compositionUpdate" + " keyDown keyPress keyUp" + " focus blur" + " change input submit" + " click contextMenu doubleClick" + " drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop" + " mouseDown mouseEnter mouseLeave mouseMove mouseOut mouseOver mouseUp" + " select" + " touchCancel touchEnd touchMove touchStart" + " scroll" + " wheel" + " abort canPlay canPlayThrough durationChange emptied encrypted"+ " ended error loadedData loadedMetadata loadStart pause play" + " playing progress rateChange seeked seeking stalled suspend" + " timeUpdate volumeChange waiting" + " load" + " transitionEnd";
    var fb_html_supported_events = __events.split(' ');
    
    var html_supported_onEvents = [];
    var i, i_items=fb_html_supported_events, i_len=fb_html_supported_events.length, item;
    for (i=0; i<i_len; i++) {
        item = fb_html_supported_events[i];
        html_supported_onEvents.push('on' + _.capitalize(item))
    }
    
    var i, i_items=fb_html_supported_tags, i_len=fb_html_supported_tags.length, item;
    for (i=0; i<i_len; i++) {
        item = fb_html_supported_tags[i];
        cnt.stm[item] = function(model, ctx, callback) {
            md._htmlelement(cnt, model, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // @ callback
                // loog 'exit fb_html_supported_tags &&&&&&&&&&&&&&&&&&&&&&&&&', model.wzElement
                return callback(null);
            }
            )
        }
        ;
    }
    
    cnt.stm.htmlelement = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.htmlelement');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.htmlelement. Got: ' + callback);
        }
        var p = lineParser.parseNameValueRaw(model.wzName, model),
            tag = p.name(),
            text = p.value();
        // loog 'enter htmlelement $$$$$$$$$$$$$$$$$$$', tag
        // loog 'statements/html/htmlelement', tag, text
        md._htmlelement(cnt, model, tag, text, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // @ callback
            // loog 'exit htmlelement $$$$$$$$$$$$$$$$$$$', tag
            return callback(null);
        }
        )
    }
    ;
    /**
        TODO
        var i, i_items=html_supported_onEvents, i_len=html_supported_onEvents.length, item;
        for (i=0; i<i_len; i++) {
            item = html_supported_onEvents[i];
            cnt.stm[item] = function() {
            }
            ;
        }
    */
    cnt.stm.js = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.js');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.js. Got: ' + callback);
        }
        ctx.w("__html.push('<script src=\"" + model.wzName + "\"></script>')");
        return callback(null);
    }
    ;
    cnt.stm.css = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.css');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.css. Got: ' + callback);
        }
        ctx.w("__html.push('<link href=\"" + model.wzName + "\" rel=\"stylesheet\">')");
        return callback(null);
    }
    ;
    cnt.stm.doctype = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.doctype');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.doctype. Got: ' + callback);
        }
        ctx.w("__html.push('<doctype " + model.wzName + ">')");
        return callback(null);
    }
    ;
    cnt.stm.ready = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.ready');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.ready. Got: ' + callback);
        }
        if (model.kind === 'jquery') {
            ctx.w('$(function() {');
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('});');
                return callback(null);
            }
            )
        }
        else {
            ctx.w('window.onload = function() {');
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('};');
                return callback(null);
            }
            )
        }
    }
    ;
    cnt.stm.tohtml = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.tohtml');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.tohtml. Got: ' + callback);
        }
        if (model.kind === 'dom') {
            cnt.stm.html_dom(model, ctx, callback);
        }
        else if (model.kind === 'nh') {
            cnt.stm.html_ng(model, ctx, callback);
        }
        else if (model.kind === 'hb') {
            cnt.stm.html_hb(model, ctx, callback);
        }
        else {
            cnt.stm.html_f(model, ctx, callback);
        }
    }
    ;
    cnt.stm.html_f = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.html_f');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.html_f. Got: ' + callback);
        }
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.__inside_html = false;
            ctx.w("return __html.join('');");
            ctx.deindent();
            ctx.w("}");
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.html_dom = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.html_dom');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.html_dom. Got: ' + callback);
        }
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.__inside_html = false;
            ctx.w("return $(__html.join(''));");
            ctx.deindent();
            ctx.w("}");
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.html_hb = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.html_hb');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.html_hb. Got: ' + callback);
        }
        ctx.w('function ' + model.wzName + '(ctx) {');
        ctx.indent();
        ctx.w('var __html = [];');
        ctx.__inside_html = true;
        ctx.__inside_handlebar = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.__inside_handlebar = false;
            ctx.__inside_html = false;
            ctx.w("return Handlebars.compile(__html.join(''));");
            ctx.deindent();
            ctx.w("}");
            return callback(null);
        }
        )
    }
    ;
    md._htmlelement = function(cnt, model, tag, text, ctx, callback) {
        if (typeof (callback) === 'undefined') {
            callback = text;
            ctx = tag;
            text = model.wzName;
            tag = model.wzElement;
        }
        // loog 'enter _htmlelement ----------------', tag
        var attrs = getAttrs(model, ctx);
        var statements = null,
            value = null;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (item_1.isEvent) {
                var name = item_1.wzElement;
                if (item_1.statements && item_1.statements.length > 0) {
                    value = null;
                    statements = item_1.statements;
                }
                else {
                    if (item_1.wzName.trim().length > 0) {
                        value = item_1.wzName.trim();
                    }
                    else {
                        value = '{this.' + item_1.wzElement + '}';
                    }
                    statements = null;
                }
                attrs.push({
                    name: name, 
                    value: value, 
                    statements: statements
                 })
            }
            else if (item_1.wzElement === '_style') {
                name = 'style';
                if (item_1.statements && item_1.statements.length > 0) {
                    value = null;
                    statements = item_1.statements;
                }
                else {
                    value = item_1.wzName.trim();
                    statements = null;
                }
                attrs.push({
                    name: name, 
                    value: value, 
                    statements: statements
                 })
            }
            else if (item_1.wzElement === 'jsPropertyOrValue') {
                var p = lineParser.parseNameValueRaw(item_1.wzName, item_1),
                    name = p.name(),
                    value = p.value();
                if (value) {
                    if (ctx.__jskind === 'react') {
                        ;
                    }
                    else {
                        var ip = lineParser.parseInterpolation(value, model, ctx.__inside_handlebar, ctx.__inside_ng);
                        value = ip.join();
                    }
                }
                statements = item_1.statements && item_1.statements.length > 0 ? item_1.statements : null;
                attrs.push({
                    name: name, 
                    value: value.trim(), 
                    statements: statements
                 })
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            })
        }
        repeater_1(0);
        function next_1() {
            _htmlelement_end(cnt, model, tag, text, ctx, attrs, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // @ callback
                // loog 'exit _htmlelement ----------------', tag
                return callback(null);
            }
            )
        }
    }
    ;
    function _htmlelement_end(cnt, model, tag, text, ctx, attrs, callback) {
        if (ctx.__jskind === 'react') {
            var save___inside_html = ctx.__inside_html;
            ctx.__inside_html = true;
            html_react.htmlelement(cnt, model, tag, text, ctx, attrs, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.__inside_html = save___inside_html;
                return callback(null);
            }
            )
        }
        else {
            var attrs_string = [];
            attrs.forEach(function(a) {
                if (['multiple'].indexOf(a.name) >= 0) {
                    attrs_string.push('\' + ( ' + a.value + ' ? \' ' + a.name + '\' : \'\' ) + \'');
                }
                else if (a.value !== '@@null') {
                    if (a.value.length == 0) {
                        attrs_string.push((' ' + a.name));
                    }
                    else {
                        attrs_string.push(' ' + a.name + '="\' + ' + a.value + ' + \'"');
                    }
                }
            })
            var isCode = ['script', 'style'].indexOf(tag) >= 0;
            var lf = isCode ? '\\n' : '';
            if (isCode) {
                ctx.__incode = true;
            }
            ctx.w("__html.push('" + lf + "<" + tag + attrs_string.join('') + ">" + lf + "');");
            if (text) {
                text = text.trim();
                var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
                ctx.w("__html.push(" + ip.join() + ");");
            }
            cnt.genItems(model.statements, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w("__html.push('</" + tag + ">" + lf + "');");
                if (isCode) {
                    ctx.__incode = false;
                }
                return callback(null);
            }
            )
        }
    }
    function getAttrs(model, ctx) {
        var name,
            value,
            retval = [];
        for (var a in model) {
            value = null;
            if (html_supported_onEvents.indexOf(a) > -1) {
                if (model[a] == true) {
                    name = a;
                    value = '{this.' +  a + '}';
                }
            }
            else if (isAttrValue(a, model[a])) {
                name = verify.replaceAll(a, '_', '-');
                value = model[a];
            }
            else if (a.substr(0, 3) === 'ng-') {
                name = a;
                value = model[a];
            }
            else if (a.substr(0, 5) === 'data-') {
                name = a;
                value = model[a];
            }
            else if (a.substr(0, 5) === 'aria-') {
                name = a;
                value = model[a];
            }
            if (value) {
                if (ctx.__jskind === 'react') {
                    if (name == 'class') {
                        name = 'className';
                    }
                }
                else {
                    var ip = lineParser.parseInterpolation(value, model, ctx.__inside_handlebar, ctx.__inside_ng);
                    value = ip.join();
                }
                retval.push({
                    name: name, 
                    value: value
                 })
            }
        }
        return retval;
    }
    function isAttrValue(a, v) {
        if (noattrs.indexOf(a) > -1) {
            return false;
        }
        if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
            return false;
        }
        return true;
    }
    var noattrs = [
        'wzTag', 
        'wzName', 
        'wzElement', 
        'wzParent', 
        'wzSourceLineInfo', 
        '___exportName'
    ];
}
;
