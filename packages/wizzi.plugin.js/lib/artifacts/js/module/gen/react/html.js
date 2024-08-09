/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\react\html.js.ittf
    utc time: Sat, 03 Aug 2024 03:24:07 GMT
*/
var u = require('../utils/stm');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.react.html';
md.htmlelement = function(cnt, model, tag, text, ctx, attrs, callback) {
    // loog 'enter in react/html *****************', tag
    if (u.isGraphEnclosed(tag)) {
        ctx.w(tag);
        return callback(null);
    }
    // @style/_style is used as an attribute in react
    // see /statements/html for attrs extraction
    if (model.wzElement === '_style') {
        return callback(null);
    }
    // loog 'react.html.htmlelement', 1 , tag
    
    // loog 'react.html.htmlelement', 2  , tag
    if (u.parentIsHtmlElement(model) == false) {
        
        // loog 'react.html.htmlelement', 3  , tag
        if (u.isArgumentOfCall(model)) {
            ctx.w();
        }
        // loog 'react.html.htmlelement', 4  , tag
        else {
            ctx.write(' (');
            ctx.w();
        }
    }
    htmlelement_open(cnt, model, ctx, tag, text, attrs, (err, done) => {
        if (err) {
            return callback(err);
        }
        
        // loog 'react.html.htmlelement', 5  , tag
        if (done) {
            if (u.parentIsHtmlElement(model) == false && u.isArgumentOfCall(model) == false) {
                ctx.w(' )');
            }
            ctx.deindent();
            return callback(null);
        }
        // loog 'react.html.htmlelement', 6  , tag
        else {
            htmlelement_end(cnt, model, ctx, tag, text, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                // loog 'exit from react/html *****************', tag
                // @ callback
                return callback(null);
            }
            )
        }
    }
    )
}
;
function htmlelement_open(cnt, model, ctx, tag, text, attrs, callback) {
    ctx.indent();
    // begin open tag and write attributes
    ctx.write("<" + tag);
    var len_1 = attrs.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = attrs[index_1];
        htmlelement_attribute(cnt, item_1, ctx, (err, notUsed) => {
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
        // loog 'htmlelement_open.model.statements.length', model.statements.length
        
        // end of open tag
        if (model.statements.length > 0) {
            if (text && text.length > 0) {
                ctx.write(">");
                ctx.w(text);
            }
            else {
                ctx.w(">");
            }
            return callback(null, false);
        }
        // end of tag
        else {
            if (text && text.length > 0) {
                ctx.write(">");
                ctx.write(text);
                ctx.write("</");
                ctx.write(tag);
                ctx.w(">");
            }
            else {
                ctx.w(" />");
            }
            return callback(null, true);
        }
    }
}
function htmlelement_attribute(cnt, a, ctx, callback) {
    if (a.statements && a.statements.length > 0) {
        ctx.write(' ' + a.name + '={');
        cnt.genItems(a.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write('}');
            return callback(null);
        }
        )
    }
    else if (a.value.length || a.value.length == 0) {
        if (a.value.length == 0) {
            ctx.write(' ' + a.name);
        }
        else {
            var quote = a.value.indexOf('{') >= 0 || u.isQuoted(a.value) ? '' : '"';
            ctx.write(' ' + a.name + '=' + quote + a.value + quote);
        }
        return callback(null);
    }
    else {
        ctx.write(' ' + a.name + '="' + a.value + '"');
        return callback(null);
    }
}
function htmlelement_end(cnt, model, ctx, tag, text, callback) {
    if (text) {
    }
    cnt.genItems(model.statements, ctx, {
        indent: false
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w("</" + tag + ">");
        ctx.deindent();
        // loog 'react.html.htmlelement', 11
        
        // loog 'react.html.htmlelement', 12
        if (u.parentIsHtmlElement(model)) {
            ctx.w();
        }
        // loog 'react.html.htmlelement', 13
        else {
            
            // loog 'react.html.htmlelement', 14
            
            // _ ctx.write(')')
            if (u.isArgumentOfCall(model)) {
            }
            // loog 'react.html.htmlelement', 15
            // _ ctx.w(');') // 7/4/2017
            else {
                ctx.w(')');
            }
        }
        return callback(null);
    }
    )
}