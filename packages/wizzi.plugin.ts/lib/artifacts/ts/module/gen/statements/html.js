/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\html.js.ittf
    utc time: Tue, 02 Apr 2024 18:13:56 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');
var htmlReact = require('../es6/htmlReact');
// entry point for html tags in code
// preprocessed by [js|ts]-mtree-preprocessor

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.html';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment' && item.wzElement != 'commentmultiline' && item.wzElement != 'decorator') {
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
function writeDecorators(model, ctx) {
    var temp = [];
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'decorator') {
            __writeDecorator(item, ctx)
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return model;
}
function __writeDecorator(model, ctx) {
    var name = (model.__name || '');
    ctx.write('@' + name);
    if (model.statements && model.statements.length > 0) {
        ctx.write('(');
        u.checkInlineEnter(model, ctx);
        cnt.genItems(model.statements, ctx, {}, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            u.checkInlineExit(model, ctx);
            ctx.w(')');
            return callback(null);
        }
        )
    }
    else {
        return callback(null);
    }
}
md.load = function(cnt) {
    
    var __events = "copy cut paste " + " compositionEnd compositionStart compositionUpdate" + " keyDown keyPress keyUp" + " focus blur" + " change input submit" + " click contextMenu doubleClick" + " drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop" + " mouseDown mouseEnter mouseLeave mouseMove mouseOut mouseOver mouseUp" + " select" + " touchCancel touchEnd touchMove touchStart" + " scroll" + " wheel" + " abort canPlay canPlayThrough durationChange emptied encrypted"+ " ended error loadedData loadedMetadata loadStart pause play" + " playing progress rateChange seeked seeking stalled suspend" + " timeUpdate volumeChange waiting" + " load" + " transitionEnd";
    var fb_html_supported_events = __events.split(' ');
    
    var html_supported_onEvents = [];
    var i, i_items=fb_html_supported_events, i_len=fb_html_supported_events.length, item;
    for (i=0; i<i_len; i++) {
        item = fb_html_supported_events[i];
        html_supported_onEvents.push('on' + verify.capitalize(item))
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
        // loog 'enter statements/html/htmlelement', tag, text
        md._htmlelement(cnt, model, tag, text, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // @ callback
            // loog 'exit statements/html/htmlelement', tag, text
            return callback(null);
        }
        )
    }
    ;
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
    md._htmlelement = function(cnt, model, tag, text, ctx, callback) {
        if (typeof (callback) === 'undefined') {
            callback = text;
            ctx = tag;
            text = model.wzName;
            tag = model.wzElement;
        }
        // loog 'enter _htmlelement ----------------', tag
        var attrs = getAttrs(model, ctx);
        var comments = [];
        var statements = null,
            value = null,
            childStatements = [],
            typeParameters = [];
        model.__hasChildElements = text && text.length > 0;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            // loog 'html.md._htmlelement', item_1.wzElement
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
                statements = item_1.statements && item_1.statements.length > 0 ? item_1.statements : null;
                attrs.push({
                    name: name, 
                    value: value.trim(), 
                    statements: statements
                 })
            }
            
            // will be written by u.writeComments
            else if (['comment','commentmultiline'].indexOf(item_1.wzElement) > -1) {
                childStatements.push(item_1)
            }
            else if (['htmlelement','statement','jsObject','iif','call'].indexOf(item_1.wzElement) > -1) {
                model.__hasChildElements = true;
                childStatements.push(item_1)
            }
            else if (u.isTSSimpleType(item_1)) {
                typeParameters.push(item_1)
            }
            else {
                console.log("[31m%s[0m", 'Error.model', model);
                throw new errors.WizziModelDOMNodeError('In ts._htmlelement wzElement not managed: ' + item_1.wzElement, item_1);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            })
        }
        repeater_1(0);
        function next_1() {
            model.statements = childStatements;
            model.typeParameterInsts = typeParameters;
            _htmlelement_end(cnt, model, tag, text, ctx, attrs, comments, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // @ callback
                // loog 'exit _htmlelement', tag
                return callback(null);
            }
            )
        }
    }
    ;
    function _htmlelement_end(cnt, model, tag, text, ctx, attrs, comments, callback) {
        var save___inside_html = ctx.__inside_html;
        ctx.__inside_html = true;
        htmlReact.htmlelement(cnt, model, tag, text, ctx, attrs, comments, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.__inside_html = save___inside_html;
            return callback(null);
        }
        )
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
                if (name == 'class') {
                    name = 'className';
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
