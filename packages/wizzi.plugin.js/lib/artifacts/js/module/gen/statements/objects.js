/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\statements\objects.js.ittf
    utc time: Thu, 25 Apr 2024 11:41:10 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');
var jstparser = require('./jsonStatementTree');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.objects';
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
function hasComments(model) {
    return countComments(model) > 0;
}
function countComments(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment') {
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
    cnt.stm.jsonStatementTree = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsonStatementTree');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsonStatementTree. Got: ' + callback);
        }
        var statements = jstparser.getStatements(model);
        cnt.genItems(statements, ctx, {
            indent: false
         }, callback)
    }
    ;
    cnt.stm.jsPropertyOrValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsPropertyOrValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsPropertyOrValue. Got: ' + callback);
        }
        if (model.__templateChild) {
            ctx.write('${' + (model.wzName || ''));
            cnt.genItems(model.statements, ctx, {
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
        else {
            if (u.hasStatementChildren(model)) {
                jsPropertyOrValue_with_stm_children(model, ctx, callback)
            }
            else {
                jsPropertyOrValue_no_stm_children(model, ctx, callback)
            }
        }
    }
    ;
    cnt.stm.jsPropertyOrValueComputed = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsPropertyOrValueComputed');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsPropertyOrValueComputed. Got: ' + callback);
        }
        ctx.write('[');
        cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(']: ');
            cnt.genItems(model.statements.slice(1), ctx, {}, callback)
        }
        )
    }
    ;
    cnt.stm.jsRest = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsRest');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsRest. Got: ' + callback);
        }
        ctx.write('...');
        if (model.statements.length > 0) {
            if (['jsArray','jsObject'].indexOf(model.statements[0].wzElement) > -1) {
                cnt.genItems(model.statements, ctx, {}, callback)
            }
            else {
                ctx.write('(');
                cnt.genItems(model.statements, ctx, {}, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(')');
                    return callback(null);
                }
                )
            }
        }
        else {
            ctx.write(model.wzName);
            return callback(null);
        }
    }
    ;
    function jsPropertyOrValue_with_stm_children(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsPropertyOrValue_with_stm_children');
        }
        // loog 'js.module.statements.object.model.wzName, model.statements.length', model.wzName, model.statements.length
        var colon = ((ctx.isGraphql && !ctx.isNamedCallParam) || model.wzParent.wzElement == 'call') ? ' ' : ': ';
        
        // Attributes have been already processed
        if (u.parentIsHtmlElement(model)) {
            return callback(null);
        }
        else if (model.isDslCall) {
            u.writeComments(model, ctx);
            ctx.write(model.wzName + '(');
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null);
            }
            )
        }
        else if (u.isObjectProperty(model) || u.isParamValue(model) || u.isValue(model)) {
            u.writeComments(model, ctx);
            colon = u.onlyChildIs(model, 'initValue') ? '=' : colon;
            if (model.wzName.length > 0) {
                ctx.write(model.wzName + colon);
                cnt.genItems(model.statements, ctx, {
                    indent: false
                 }, callback)
            }
            else if (model.statements.length == 2) {
                cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(colon);
                    cnt.genItem(model.statements[1], ctx, callback)
                }
                )
            }
            else {
                cnt.genItems(model.statements, ctx, {
                    indent: false
                 }, callback)
            }
        }
        else if (ctx.__ecma === 'es6') {
            u.writeComments(model, ctx);
            ctx.w('@' + model.wzName + '(');
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w(')');
                return callback(null);
            }
            )
        }
        else {
            return callback(ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model));
        }
    }
    function jsPropertyOrValue_no_stm_children(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsPropertyOrValue_no_stm_children');
        }
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        if (u.isParamValue(model) || u.isValue(model)) {
            ctx.write(model.wzName)
            return callback(null);
        }
        else if (u.isEnumValue(model)) {
            u.writeComments(model, ctx);
            var p = lineParser.parseNameValueRaw(model.wzName, model, {
                objectProperty: true
             });
            ctx.write(p.name())
            if (p.value()) {
                ctx.write(' = ' + p.value())
            }
            return callback(null);
        }
        else if (u.isObjectProperty(model)) {
            u.writeComments(model, ctx);
            var tk,
                p = lineParser.parseNameValueRaw(model.wzName, model, {
                    objectProperty: true
                 });
            if (p.hasValue()) {
                ctx.write(p.name() + colon);
                ctx.write(p.value())
            }
            else {
                if (ctx.__ecma === 'es5') {
                    console.log(ctx.error(myname + '. Invalid object property: ' + model.wzName, model))
                    return callback(ctx.error(myname + '. Invalid object property: ' + model.wzName, model));
                }
                else {
                    ctx.write(p.name())
                }
            }
            cnt.genItems(model.statements, ctx, {
                indent: false
             }, callback)
        }
        else if (u.parentIsHtmlElement(model)) {
            return callback(null);
        }
        else {
            u.writeComments(model, ctx);
            if (ctx.__ecma === 'es6') {
                ctx.w('@' + model.wzName);
            }
            else if (ctx.__artifact === 'xittf/document') {
                ctx.write(model.wzName)
            }
            else {
                return callback(ctx.error(myname + '. Invalid jsPropertyOrValue: ' + model.wzName, model));
            }
            return callback(null);
        }
    }
    cnt.stm.jsObject = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsObject');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsObject. Got: ' + callback);
        }
        // loog 'model.jsPropertyOrValues', model.jsPropertyOrValues && model.jsPropertyOrValues.length
        if (model.jsPropertyOrValues && model.jsPropertyOrValues.length > 0) {
            if (!model.statements) {
                model.statements = [];
            }
            var i, i_items=model.jsPropertyOrValues, i_len=model.jsPropertyOrValues.length, item;
            for (i=0; i<i_len; i++) {
                item = model.jsPropertyOrValues[i];
                model.statements.push(item)
            }
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ',
            save__is_react_class = ctx.__is_react_class;
        if (model.isDslCall) {
            jsObject_is_dslCall(model, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                jsObject_close(model, ctx, callback)
            }
            )
        }
        // loog '++++ start', ctx.__ecma
        else {
            
            // is an object property
            if (model.wzName && model.wzName.length > 0) {
                ctx.w(model.wzName + colon + '{');
            }
            else {
                if (model.statements.length == 0) {
                    ctx.write('{}');
                    u.checkInlineExit(model, ctx);
                    return callback(null);
                }
                if (ctx.__inline) {
                    ctx.write('{ ');
                }
                else {
                    ctx.w('{');
                }
            }
            ctx.indent();
            if (ctx.__ecma === 'es6') {
                ctx.__is_react_class = true;
            }
            jsObject_close(model, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                
                // loog '++++ end', ctx.__ecma
                if (ctx.__ecma === 'es6') {
                    ctx.__is_react_class = save__is_react_class;
                }
                u.checkInlineExit(model, ctx);
                return callback(null);
            }
            )
        }
    }
    ;
    function jsObject_is_dslCall(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsObject_is_dslCall');
        }
        var first = true,
            comma = true;
        ctx.w(model.wzName + '(');
        ctx.indent();
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (item_1.wzElement == 'namedCallParam') {
                if (comma && !first) {
                    ctx.w(', ');
                }
                first = false;
                cnt.genItem(item_1, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                )
            }
            else {
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
        }
        repeater_1(0);
        function next_1() {
            ctx.w('');
            ctx.deindent();
            ctx.w(')');
            ctx.w('{');
            ctx.indent();
            return callback(null);
        }
    }
    function jsObject_close(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.jsObject_close');
        }
        var first = true,
            comma = true;
        // loog 'jsObject_close 1'
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            
            // skip
            
            // loog 'jsObject_close 2'
            if (model.isDslCall && item_1.wzElement == 'namedCallParam') {
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            // loog 'js.module.gen.jsObject_close.item_1', item_1.wzElement, u.isMemberAccessOrCall(item_1)
            else {
                
                // loog 'jsObject_close 3'
                if (u.isMemberAccessOrCall(item_1)) {
                    if (!!ctx.__inline == false) {
                        ctx.w('');
                    }
                    ctx.deindent();
                    ctx.write('}');
                    cnt.genItem(item_1, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        var len_2 = model.statements.length;
                        function repeater_2(index_2) {
                            if (index_2 === len_2) {
                                return next_2();
                            }
                            var item_2 = model.statements[index_2];
                            if (u.isCallArgument(item_2)) {
                                ctx.write('.');
                            }
                            cnt.genItem(item_2, ctx, (err, notUsed) => {
                            
                                if (err) {
                                    return callback(err);
                                }
                                process.nextTick(function() {
                                    repeater_2(index_2 + 1);
                                })
                            }
                            )
                        }
                        repeater_2(index_1 + 1);
                        function next_2() {
                            u.checkInlineExit(model, ctx);
                            return callback(null);
                        }
                    }
                    )
                }
                else if (item_1.wzElement == 'typeAs') {
                    ctx.w('');
                    ctx.deindent();
                    ctx.write('}');
                    cnt.genItem(item_1, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        u.checkInlineExit(model, ctx);
                        return callback(null);
                    }
                    )
                }
                else {
                    if (comma && !first) {
                        if (ctx.__inline) {
                            ctx.write(', ');
                        }
                        else {
                            ctx.w(', ');
                        }
                    }
                    first = false;
                    cnt.genItem(item_1, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        // loog 'js.module.gen.jsObject_close.after.genItem'
                        comma = ['comment', 'handlebar'].indexOf(item_1.wzElement) < 0;
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        })
                    }
                    )
                }
            }
        }
        repeater_1(0);
        function next_1() {
            ;
            // loog 'jsObject_close 4'
            if (!!ctx.__inline == false) {
                ctx.w('');
            }
            ctx.deindent();
            if (u.parentIsHtmlElement(model) && !!ctx.__inline == false) {
                ctx.w('}');
            }
            else {
                ctx.write(' }');
            }
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
    }
    cnt.stm.jsArray = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsArray');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsArray. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        var colon = (ctx.isGraphql && !ctx.isNamedCallParam) ? ' ' : ': ';
        // loog '600 jsArray'
        
        // is an array property
        if (model.wzName && model.wzName.length > 0) {
            ctx.w(model.wzName + colon + '[');
        }
        else {
            
            // loog '601 jsArray'
            if (model.statements.length == 0) {
                ctx.write('[' + (model.wzName || '') + ']');
                u.checkInlineExit(model, ctx);
                return callback(null);
            }
            if (ctx.__inline) {
                ctx.write('[');
            }
            else {
                ctx.w('[');
            }
        }
        ctx.indent();
        var needs_comma = false;
        // loog '602 jsArray'
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            // loog '607 jsArray'
            
            // loog '605 jsArray'
            if (u.isMemberAccessOrCall(item_1)) {
                if (!!ctx.__inline == false) {
                    ctx.w('');
                }
                ctx.deindent();
                ctx.write(']');
                return cnt.genItem(item_1, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        // loog '603 jsArray'
                        var len_2 = model.statements.length;
                        function repeater_2(index_2) {
                            if (index_2 === len_2) {
                                return next_2();
                            }
                            var item_2 = model.statements[index_2];
                            if (u.isCallArgument(item_2)) {
                                ctx.write('.');
                            }
                            cnt.genItem(item_2, ctx, (err, notUsed) => {
                            
                                if (err) {
                                    return callback(err);
                                }
                                process.nextTick(function() {
                                    repeater_2(index_2 + 1);
                                })
                            }
                            )
                        }
                        repeater_2(index_1 + 1);
                        function next_2() {
                            u.checkInlineExit(model, ctx);
                            return callback(null);
                        }
                    }
                    );
            }
            // loog '606 jsArray'
            if (needs_comma) {
                if (ctx.__inline) {
                    ctx.write(', ');
                }
                else {
                    ctx.w(', ');
                }
                needs_comma = false;
            }
            cnt.genItem(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // loog '604 jsArray'
                if (!u.isComment(item_1)) {
                    needs_comma = true;
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            ;
            if (!!ctx.__inline == false) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.write(']');
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
    }
    ;
    cnt.stm.get = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.get');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.get. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        if (model.static) {
            ctx.write('static ');
        }
        ctx.w('get ' + model.wzName + '() {');
        ctx.indent();
        cnt.genItems(model.statements, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        )
    }
    ;
}
;
