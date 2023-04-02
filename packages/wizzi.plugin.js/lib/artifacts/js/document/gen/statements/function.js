/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\document\gen\statements\function.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.function';
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
    cnt.stm.exportfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.exportfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.exportfunction. Got: ' + callback);
        }
        var xdefault = model.__default ? 'default ' : '';
        var name = (model.__name || '');
        ctx.w('export ' + xdefault + 'function ' + name + '(' + model.paramNames.join(', ') + ') {');
        ctx.indent();
        generateParamConstraints(name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
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
            ctx.w(async_str + model.wzName + ' = (');
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
            ctx.write(async_str + '(');
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
            ctx.write(async_str + '(');
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
            ctx.write(async_str + (isSingleParam ? '' : '('));
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
            ctx.write(async_str + '(');
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
    cnt.stm.xfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xfunction. Got: ' + callback);
        }
        var name = '',
            aster = ctx.__aster || '',
            xasync = model.xasync ? 'async ' : '';
        if (model.paramNames.length > 0) {
            name = model.wzName.trim();
        }
        else {
            var p = lineParser.parse(model.wzName, model);
            if (p.tokens.length > 0) {
                var state = 0;
                for (var i = 0; i < p.tokens.length; i++) {
                    var text = p.tokens[i].text;
                    if (text === '(') {
                        state = 1;
                    }
                    else if (text === ')') {
                        ;
                    }
                    else if (i == 0 && state == 0) {
                        name = text;
                        state = 1;
                    }
                    else {
                        model.paramNames.push(text);
                    }
                }
            }
        }
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
        ctx.w(f + '(' + model.paramNames.join(', ') + ') {');
        // constraints
        ctx.indent();
        generateParamConstraints(iife ? 'iife' : aster + name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
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
        var name = model.wzName.trim();
        if (hasStatements(model) == false) {
            ctx.w('yield ' + name + u.semicolon(name));
            return callback(null);
        }
        ctx.write('yield ');
        cnt.genItems(model.statements, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w(u.semicolon(name));
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
        var name = model.wzName.trim();
        ctx.write('await ');
        if (hasStatements(model) == false) {
            ctx.write(name);
            if (u.isTopStatement(model, ctx)) {
                ctx.w(u.semicolon(name));
            }
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
        var async_str = model.xasync ? 'async ' : '';
        /**
             loog '++++ arrowfunction', model.wzName, async_str, model.xasync, model.statements[0]
             loog 'ctx.__is_react_class', ctx.__is_react_class
             loog 'model.wzParent.wzElement', model.wzParent.wzElement
             loog 'u.onlyChildIs(model, "callOnValue")', u.onlyChildIs(model, 'callOnValue')
             loog 'u.onlyChildIsHtmlElement(model)', u.onlyChildIsHtmlElement(model)
             loog 'u.onlyChildIs(model, "arrowfunction")', u.onlyChildIs(model, 'arrowfunction')
            console.log("u.isImplicitReturn(model)", u.isImplicitReturn(model), __filename);
        */
        if (ctx.__is_react_class && model.wzParent.wzElement == 'reactComponent') {
            var implicitReturn = u.isImplicitReturn(model);
            ctx.w(model.wzName + ' = ' + async_str + '(' + model.paramNames.join(', ') + ') =>' + (implicitReturn ? '' : '{'));
            ctx.indent();
            generateParamConstraints(name, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                cnt.genItems(model.statements, ctx, {
                    indent: false
                 }, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.deindent();
                    ctx.w(implicitReturn ? '' : '}');
                    return callback(null);
                }
                )
            }
            )
        }
        
        // TODO what if it needs generateParamConstraints ?
        else if (u.onlyChildIs(model, 'callOnValue') || u.onlyChildIsHtmlElement(model)) {
            ctx.write(async_str + '(' + model.paramNames.join(', ') + ') => ');
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, callback)
        }
        
        // log "u.onlyChildIs(model, 'arrowfunction')", model.statements[0].paramNames
        else if (u.onlyChildIs(model, 'arrowfunction')) {
            ctx.write(async_str + '(' + model.paramNames.join(', ') + ') => ');
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, callback)
        }
        
        // loog 'isImplicitReturn', model.wzElement, model.wzName
        
        // loog 'function.isSingleParam', isSingleParam
        
        // loog 'function.firstChildIs template', firstChildIsTemplate
        else if (u.isImplicitReturn(model)) {
            var isSingleParam = u.isSingleParamForArrowFunction(model);
            var firstChildIsTemplate = u.firstChildIs(model, ['template']);
            ctx.write(async_str + (isSingleParam ? '' : '('));
            u.genParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(isSingleParam ? '' : ')');
                arrowfunction_body(model, ctx, cnt, true, firstChildIsTemplate, callback)
            }
            )
        }
        else {
            ctx.write(async_str + '(' + model.paramNames.join(', ') + ')');
            arrowfunction_body(model, ctx, cnt, false, false, callback)
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
    function generateParamConstraints(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
        if (hasCallback) {
            ctx.w("if (typeof(callback) !== 'function') {");
            ctx.w("    throw new Error(");
            ctx.w("        error('InvalidArgument', '" + methodName + "', 'The callback parameter must be a function. Received: ' + callback)");
            ctx.w("    );");
            ctx.w("};");
        }
        else if (hasOptionsCallback) {
            ctx.w("if (verify.isFunction(callback) === false && verify.isFunction(options) === true) {");
            ctx.indent();
            ctx.w("callback = options;");
            ctx.w("options = {};");
            ctx.deindent();
            ctx.w("}");
            ctx.w("if (verify.isFunction(callback) === false) {");
            ctx.w("    throw new Error(");
            ctx.w("        error('InvalidArgument', '" + methodName + "', 'The callback parameter must be a function. Received: ' + callback)");
            ctx.w("    );");
            ctx.w("};");
        }
        var i, i_items=parameters, i_len=parameters.length, p;
        for (i=0; i<i_len; i++) {
            p = parameters[i];
            var state = prmAnalizeParam(p);
            // loog 'wizzi-codegen.js2.function.generateParamConstraints.state', state
            var j, j_items=state.candidates, j_len=state.candidates.length, item;
            for (j=0; j<j_len; j++) {
                item = state.candidates[j];
                var k, k_items=item.constraints, k_len=item.constraints.length, c;
                for (k=0; k<k_len; k++) {
                    c = item.constraints[k];
                    if (c.constraintType === 'required') {
                        if (c.paramType === 'string') {
                            ctx.w("if (verify.isNotEmpty(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a string', hasCallback, ctx);
                        }
                        else if (c.paramType === 'number') {
                            ctx.w("if (verify.isNumber(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a number', hasCallback, ctx);
                        }
                        else if (c.paramType === 'date') {
                            ctx.w("if (verify.isDate(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a date', hasCallback, ctx);
                        }
                        else if (c.paramType === 'boolean') {
                            ctx.w("if (verify.isBoolean(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a boolean', hasCallback, ctx);
                        }
                        else if (c.paramType === 'object') {
                            ctx.w("if (verify.isObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an object', hasCallback, ctx);
                        }
                        else if (c.paramType === 'array') {
                            ctx.w("if (verify.isArray(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array', hasCallback, ctx);
                        }
                        else if (c.paramType === 'arrayOrObject') {
                            ctx.w("if (verify.isArrayOrObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array or an object', hasCallback, ctx);
                        }
                        else if (c.paramType === 'function') {
                            ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                        }
                        
                        // do nothing
                        else if (c.paramType === 'any') {
                        }
                        
                        // done already
                        
                        // see above "if hasOptionsCallback" statement
                        else if (c.paramType === 'optionsCallback') {
                        }
                        
                        // done already
                        
                        // see above "if hasCallback" statement
                        else if (c.paramType === 'callback') {
                        }
                        else {
                            return callback(ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm));
                        }
                    }
                    if (c.constraintType === 'optional') {
                        if (c.paramType === 'string') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isNotEmpty(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a string', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'number') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isNumber(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a number', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'date') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isDate(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a date', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'boolean') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isBoolean(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a boolean', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'object') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an object', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'array') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isArray(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'arrayOrObject') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isArrayOrObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array or an object', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'function') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        
                        // do nothing
                        else if (c.paramType === 'any') {
                        }
                        
                        // done already
                        
                        // see above "if hasOptionsCallback" statement
                        else if (c.paramType === 'optionsCallback') {
                        }
                        
                        // done already
                        
                        // see above "if hasCallback" statement
                        else if (c.paramType === 'callback') {
                        }
                        else {
                            return callback(ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm));
                        }
                    }
                }
            }
        }
        return callback(null);
    }
    function invalidParam(methodName, name, type, hasCallback, ctx) {
        // loog 'wizzi-codegen.js2.function.invalidParam.methodName', methodName, name, type
        if (hasCallback) {
            ctx.w("    return callback(error(");
            ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
            ctx.w("    ));");
            ctx.w("}");
        }
        else if (methodName === 'ctor' || methodName === 'iife') {
            ctx.w("    throw new Error(error(");
            ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
            ctx.w("    ));");
            ctx.w("}");
        }
        else {
            ctx.w("    return error(");
            ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
            ctx.w("    );");
            ctx.w("}");
        }
    }
    function prmAnalizeParam(prm) {
        var state = {
            candidates: []
         };
        var candidate = {
            prm: prm, 
            accessPath: prm.wzName, 
            parent: null, 
            isRequired: false, 
            constraints: []
         };
        state.candidates.push(candidate);
        prmSelectAnalizer(candidate, state);
        return state;
    }
    function prmSelectAnalizer(candidate, state) {
        // loog 'wizzi-codegen.js2.paramAnalizer.prmSelectAnalizer.candidate.name', candidate.prm.wzElement, candidate.prm.wzName
        if (candidate.prm.wzElement === 'objectParam') {
            prmAnalizeObject(candidate, state);
        }
        else if (candidate.prm.wzElement === 'arrayParam') {
            prmAnalizeArray(candidate, state);
        }
        else {
            prmAnalizeLeaf(candidate, state);
        }
    }
    function prmAnalizeObject(candidate, state) {
        prmAnalizeLeaf(candidate, state);
        // loog 'wizzi-codegen.js2.paramAnalizer.prmAnalizeObject.candidate.name', candidate.prm.wzElement, candidate.prm.wzName
        var i, i_items=candidate.prm.params, i_len=candidate.prm.params.length, item;
        for (i=0; i<i_len; i++) {
            item = candidate.prm.params[i];
            var subcandidate = {
                prm: item, 
                accessPath: candidate.accessPath + '.' + item.wzName, 
                parent: candidate, 
                isRequired: false, 
                constraints: []
             };
            state.candidates.push(subcandidate);
            prmSelectAnalizer(subcandidate, state);
        }
    }
    function prmAnalizeArray(candidate, state) {
        prmAnalizeLeaf(candidate, state);
        
        // TODO assume arrayOf ???
        if (candidate.prm.params.length == 1) {
        }
    }
    function prmAnalizeLeaf(candidate, state) {
        // loog 'wizzi-codegen.js2.paramAnalizer.prmAnalizeLeaf.candidate.name', candidate.prm.wzElement, candidate.prm.wzName, candidate.accessPath
        if (candidate.prm.isRequired || candidate.prm.isOptional) {
            candidate.constraints.push({
                constraintType: (candidate.prm.isRequired ? 'required' : 'optional'), 
                paramName: candidate.prm.wzName, 
                paramType: prmTypeFromElement(candidate.prm.wzElement), 
                accessPath: candidate.accessPath
             })
            candidate.isRequired = true;
            if (candidate.prm.isRequired) {
                requireParents(candidate);
            }
        }
    }
    function requireParents(candidate) {
        var ancestor = candidate.parent;
        while (ancestor) {
            if (!ancestor.isRequired) {
                ancestor.constraints.push({
                    constraintType: 'required', 
                    paramName: ancestor.prm.wzName, 
                    paramType: prmTypeFromElement(ancestor.prm.wzElement), 
                    accessPath: ancestor.accessPath
                 })
                ancestor.isRequired = true;
            }
            ancestor = ancestor.parent;
        }
    }
    function prmTypeFromElement(wzElement) {
        if (wzElement === 'stringParam') {
            return 'string';
        }
        else if (wzElement === 'numberParam') {
            return 'number';
        }
        else if (wzElement === 'booleanParam') {
            return 'boolean';
        }
        else if (wzElement === 'anyParam') {
            return 'any';
        }
        else if (wzElement === 'functionParam') {
            return 'function';
        }
        else if (wzElement === 'objectParam') {
            return 'object';
        }
        else if (wzElement === 'arrayParam') {
            return 'array';
        }
        else if (wzElement === 'arrayOrObjectParam') {
            return 'arrayOrObject';
        }
        else if (wzElement === 'callbackParam') {
            return 'callback';
        }
        else if (wzElement === 'optionsCallbackParam') {
            return 'optionsCallback';
        }
    }
}
;
