/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\es6\htmlReact.js.ittf
    utc time: Tue, 11 Apr 2023 14:28:54 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
var u = require('../utils/stm');
var md = module.exports = {};
var myname = 'wizzi.ts.artifacts.module.gen.codegen.es6.htmlReact';
md.htmlelement = function(cnt, model, tag, text, ctx, attrs, comments, callback) {
    // loog 'enter in htmlReact', 'tag', tag, 'model.wzElement', model.wzElement, 'u.parentIsHtmlElement(model)', u.parentIsHtmlElement(model), 'u.isArgumentOfCall(model)', u.isArgumentOfCall(model), 'u.isGraphEnclosed(tag)', u.isGraphEnclosed(tag), 'attrs.length', attrs.length
    if (u.isGraphEnclosed(tag)) {
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        ctx.w(tag);
        u.checkInlineExit(model, ctx);
        return callback(null);
    }
    // @style/_style is used as an attribute in react
    // see /statements/html for attrs extraction
    if (model.wzElement === '_style') {
        u.checkInlineExit(model, ctx);
        return callback(null);
    }
    if (u.parentIsHtmlElement(model) == false) {
        if (u.isArgumentOfCall(model)) {
            ctx.w();
        }
        else {
            ctx.write(' (');
            ctx.w();
        }
    }
    u.writeComments(model, ctx);
    u.checkInlineEnter(model, ctx);
    htmlelement_open(cnt, model, ctx, tag, attrs, comments, (err, done) => {
    
        if (err) {
            return callback(err);
        }
        if (done) {
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        else {
            htmlelement_end(cnt, model, ctx, tag, text, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // loog 'exit from htmlReact', tag
                u.checkInlineExit(model, ctx);
                return callback(null);
            }
            )
        }
    }
    )
}
;
function htmlelement_open(cnt, model, ctx, tag, attrs, comments, callback) {
    const singleline = attrs.length > 3 || comments.length > 0;
    
    // _ ctx.indent() // 23/3/21
    if (u.parentIsHtmlElement(model) == true) {
    }
    // begin open tag and write attributes
    // loog 'htmlelement_open.tag', tag
    ctx.write("<" + tag);
    u.genTSTypeParameterInsts(model, ctx, cnt, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.write(singleline ? ' ' : '');
        u.forceInlineOff(model, ctx);
        var len_1 = attrs.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = attrs[index_1];
            if (singleline) {
                ctx.indent();
            }
            htmlelement_attribute(cnt, item_1, ctx, singleline, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (singleline) {
                    ctx.deindent();
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            // loog 'htmlelement_open.model.statements.length', model.statements.length
            cnt.genItems(comments, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                
                // end of open tag
                if (model.__hasChildElements == true) {
                    ctx.w(">");
                    return callback(null, false);
                }
                // end of tag
                else {
                    ctx.w(" />");
                    htmlelement_tagclose(model, ctx)
                    return callback(null, true);
                }
            }
            )
        }
    }
    )
}
function htmlelement_attribute(cnt, a, ctx, singleline, callback) {
    const writer = singleline ? 'w' : 'write';
    const aindent = singleline ? '' : ' ';
    // loog 'htmlelement_attribute', a
    if (a.statements && a.statements.length > 0) {
        u.writeComments(a, ctx, true);
    }
    if (a.statements && a.statements.length > 0) {
        ctx.write(aindent + a.name + '={');
        cnt.genItems(a.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx[writer]('}');
            return callback(null);
        }
        )
    }
    else if (a.value.length || a.value.length == 0) {
        if (a.value.length == 0) {
            ctx[writer](aindent + a.name);
        }
        else {
            var quote = a.value.indexOf('{') >= 0 || u.isQuoted(a.value) ? '' : '"';
            ctx[writer](aindent + a.name + '=' + quote + a.value + quote);
        }
        return callback(null);
    }
    else {
        ctx[writer](aindent + a.name + '="' + a.value + '"');
        return callback(null);
    }
}
function htmlelement_end(cnt, model, ctx, tag, text, callback) {
    if (text) {
        ctx.w(verify.replaceAll(verify.replaceAll(text, '&lf;', '\n'), '&nbsp;', ' '))
    }
    cnt.genItems(model.statements, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w("</" + tag + ">");
        htmlelement_tagclose(model, ctx)
        return callback(null);
    }
    )
}
function htmlelement_tagclose(model, ctx) {
    
    // _ ctx.deindent() // 23/3/21
    
    // _ ctx.w() // 20/3/21
    if (u.parentIsHtmlElement(model)) {
    }
    else {
        
        // _ ctx.write(')')
        if (u.isArgumentOfCall(model)) {
        }
        // _ ctx.w(');') // 7/4/2017
        else {
            var ind = ctx.indent > 0;
            if (ind) {
                ctx.deindent();
            }
            ctx.w(')');
            if (ind) {
                ctx.indent();
            }
        }
    }
    u.checkInlineExit(model, ctx);
}
