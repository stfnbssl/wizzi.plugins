/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\function.js.ittf
    utc time: Wed, 13 Mar 2024 07:14:49 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.function';
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
    cnt.stm.exportfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.exportfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.exportfunction. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var xdefault = model.__default ? 'default ' : '';
        var name = (model.__name || '');
        ctx.write('export ' + xdefault + 'function ' + name + '(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (model.typeReturn) {
                ctx.write(': ');
                cnt.stm.typeReturn(model.typeReturn, ctx, () => {});
            }
            ctx.w(' {');
            u.forceInlineOff(model, ctx);
            ctx.indent();
            cnt.genItems(model.statements, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.write('}');
                return callback(null);
            }
            )
        }
        )
    }
    ;
    cnt.stm.xfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xfunction. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var name = model.wzName.trim(),
            aster = ctx.__aster || '',
            xasync = model.xasync ? 'async ' : '';
        var f,
            iifeInvoke,
            iife = model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'memberCall';
        if (iife) {
            f = '(' + (name.length > 0 ? (xasync + 'function' + aster + ' ' + name) : (xasync + 'function'));
            iifeInvoke = model.statements[(model.statements.length - 1)];
            iifeInvoke.wzParent = {
                wzElement: 'call'
             };
            model.statements.splice((model.statements.length - 1), 1);
        }
        else {
            f = name.length > 0 ? (xasync + 'function' + aster + ' ' + name) : (xasync + 'function' + aster);
        }
        ctx.write(f);
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        xfunction_end(model, ctx, iife, callback)
                    }
                    )
                }
                else {
                    xfunction_end(model, ctx, iife, callback)
                }
            }
            )
        }
        )
    }
    ;
    function xfunction_end(model, ctx, iife, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.xfunction_end');
        }
        ctx.w(' {');
        u.forceInlineOff(model, ctx);
        ctx.indent();
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.write('}');
            if (iife) {
                return cnt.genItems([
                        iifeInvoke
                    ], ctx, {
                        indent: false
                     }, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.write(')');
                        if (u.isTopStatement(model, ctx)) {
                            ctx.w('');
                        }
                        return callback(null);
                    }
                    );
            }
            if (u.isTopStatement(model, ctx)) {
                ctx.w('');
            }
            return callback(null);
        }
        )
    }
    cnt.stm.iife = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.iife');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.iife. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var invokeCall = null;
        if (model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'callOnValue') {
            invokeCall = model.statements[model.statements.length - 1];
            model.statements.splice(model.statements.length - 1, 1);
        }
        if (model.unary_prefix) {
            ctx.write(model.unary_prefix)
        }
        var iifeName = model.wzName.length > 0 ? ' ' + model.wzName : '';
        ctx.write('(function' + iifeName + '(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (model.typeReturn) {
                ctx.write(': ');
                cnt.stm.typeReturn(model.typeReturn, ctx, () => {});
            }
            ctx.w(' {');
            u.forceInlineOff(model, ctx);
            ctx.indent();
            cnt.genItems(model.statements, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.write('})');
                if (invokeCall) {
                    cnt.genItem(invokeCall, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        return callback(null);
                    }
                    )
                }
                else {
                    ctx.w('();');
                    return callback(null);
                }
            }
            )
        }
        )
    }
    ;
    cnt.stm.generatorfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.generatorfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.generatorfunction. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        ctx.__aster = '*';
        cnt.stm.xfunction(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.__aster = null;
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.asyncfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.asyncfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.asyncfunction. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        model.xasync = true;
        cnt.stm.xfunction(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.__aster = null;
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.xyield = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xyield');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xyield. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var name = model.wzName.trim();
        if (hasStatements(model) == false) {
            ctx.write('yield ' + name);
            if (u.isTopStatement(model, ctx)) {
                ctx.w(u.semicolon(name));
            }
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        ctx.write('yield ');
        cnt.genItems(model.statements, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (u.isTopStatement(model, ctx)) {
                ctx.w(u.semicolon(name));
            }
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.xawait = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xawait');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xawait. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        ctx.write('await ');
        var name = model.wzName.trim();
        if (hasStatements(model) == false) {
            ctx.write(name);
            if (u.isTopStatement(model, ctx)) {
                ctx.w(u.semicolon(name));
            }
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        else {
            cnt.genItems(model.statements, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(u.semicolon(name));
                }
                u.checkInlineExit(model, ctx);
                return callback(null);
            }
            )
        }
    }
    ;
    cnt.stm.asyncarrowfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.asyncarrowfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.asyncarrowfunction. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        model.xasync = true;
        cnt.stm.arrowfunction(model, ctx, callback)
    }
    ;
    cnt.stm.arrowfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.arrowfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.arrowfunction. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        var async_str = model.xasync ? 'async ' : '';
        u.genAccessorsAndExtra(model, ctx)
        if (ctx.__is_react_class && model.wzParent.wzElement == 'reactComponent') {
            var implicitReturn = u.isImplicitReturn(model);
            var firstChildIsTemplate = u.firstChildIs(model, ['template']);
            ctx.w(model.wzName + ' = ' + async_str + ' = (');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        arrowfunction_body(model, ctx, cnt, implicitReturn, firstChildIsTemplate, callback)
                    }
                    )
                }
                else {
                    arrowfunction_body(model, ctx, cnt, implicitReturn, firstChildIsTemplate, callback)
                }
            }
            )
        }
        else if (u.onlyChildIs(model, 'callOnValue') || u.onlyChildIsHtmlElement(model)) {
            if (model.wzName.length > 0) {
                ctx.write(model.wzName + async_str + ' = (');
            }
            else {
                ctx.write(async_str + '(');
            }
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                // TODO what if it needs generateParams ?
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        arrowfunction_body(model, ctx, cnt, true, false, callback)
                    }
                    )
                }
                else {
                    arrowfunction_body(model, ctx, cnt, true, false, callback)
                }
            }
            )
        }
        else if (u.onlyChildIs(model, 'arrowfunction')) {
            if (model.wzName.length > 0) {
                ctx.write(model.wzName + async_str + ' = (');
            }
            else {
                ctx.write(async_str + '(');
            }
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        arrowfunction_body(model, ctx, cnt, false, false, callback)
                    }
                    )
                }
                else {
                    arrowfunction_body(model, ctx, cnt, false, false, callback)
                }
            }
            )
        }
        
        // loog 'isImplicitReturn', model.wzElement, model.wzName
        
        // loog 'function.isSingleParam', isSingleParam
        
        // loog 'function.firstChildIs template', firstChildIsTemplate
        else if (u.isImplicitReturn(model)) {
            var isSingleParam = u.isSingleParamForArrowFunction(model);
            var firstChildIsTemplate = u.firstChildIs(model, ['template']);
            if (model.wzName.length > 0) {
                ctx.write(model.wzName + ' = ' + async_str + (isSingleParam ? '' : '('));
            }
            else {
                ctx.write(async_str + (isSingleParam ? '' : '('));
            }
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(isSingleParam ? '' : ')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        arrowfunction_body(model, ctx, cnt, true, firstChildIsTemplate, callback)
                    }
                    )
                }
                else {
                    arrowfunction_body(model, ctx, cnt, true, firstChildIsTemplate, callback)
                }
            }
            )
        }
        else {
            if (model.wzName.length > 0) {
                ctx.write(model.wzName + ' = ' + async_str + '(');
            }
            else {
                ctx.write(async_str + '(');
            }
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        arrowfunction_body(model, ctx, cnt, false, false, callback)
                    }
                    )
                }
                else {
                    arrowfunction_body(model, ctx, cnt, false, false, callback)
                }
            }
            )
        }
    }
    ;
    function arrowfunction_body(model, ctx, cnt, implicitReturn, firstChildIsTemplate, callback) {
        if (firstChildIsTemplate) {
            ctx.write(' => ' + (implicitReturn ? '' : '{'));
        }
        else {
            ctx.w(' => ' + (implicitReturn ? '' : '{'));
            u.forceInlineOff(model, ctx);
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w((implicitReturn ? '' : '}'));
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        )
    }
    cnt.stm.xreturn = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xreturn');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xreturn. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        if (hasStatements(model) == false) {
            ctx.w('return ' + (model.wzName || '') + u.semicolon(model.wzName));
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        ctx.write('return ');
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (model.statements.length == 1) {
                ctx.w(';');
            }
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        )
    }
    ;
    function generateReturnType(model, ctx) {
        var rtype = u.extractTS(model, 'typeReturn');
        if (rtype) {
            cnt.stm[rtype.wzElement](rtype, ctx, () => {});
        }
    }
    function generateParams(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
        return callback(null);
    }
}
;
