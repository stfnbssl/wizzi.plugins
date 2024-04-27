/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\if-switch.js.ittf
    utc time: Thu, 25 Apr 2024 11:41:26 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.if-switch';
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
    cnt.stm.xif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xif. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.emitBlock(cnt, 'if', model, model.statements, model.statements.length, ctx, callback)
    }
    ;
    cnt.stm.elif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.elif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.elif. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.emitBlock(cnt, 'else if', model, model.statements, model.statements.length, ctx, callback)
    }
    ;
    cnt.stm.xelse = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xelse');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xelse. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        if (xmodel.wzParent.wzElement === 'iif') {
            if (xmodel.statements.length > 0) {
                cnt.genItems(xmodel.statements, ctx, {
                    indent: true
                 }, callback)
            }
            else {
                ctx.write(xmodel.wzName)
                return callback(null);
            }
        }
        else {
            u.emitBlock(cnt, 'else', xmodel, xmodel.statements, xmodel.statements.length, ctx, callback)
        }
    }
    ;
    cnt.stm.xswitch = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xswitch');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xswitch. Got: ' + callback);
        }
        function doCases() {
            cnt.genItems(model.statements, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('}');
                return callback(null);
            }
            )
        }
        u.writeComments(model, ctx);
        if (verify.isEmpty(model.wzName)) {
            var condition;
            var temp = [];
            var i, i_items=model.statements, i_len=model.statements.length, item;
            for (i=0; i<i_len; i++) {
                item = model.statements[i];
                if (['xcase', 'xdefault'].indexOf(item.wzElement) < 0) {
                    condition = item;
                }
                else {
                    temp.push(item)
                }
            }
            model.statements = temp;
            ctx.write('switch (');
            cnt.genItem(condition, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w(') {');
                doCases();
            }
            )
        }
        else {
            ctx.w('switch (' + u.unparen(model.wzName) + ') {');
            doCases();
        }
    }
    ;
    cnt.stm.xcase = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xcase');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xcase. Got: ' + callback);
        }
        var items = model.statements,
            count = model.statements.length,
            tag = 'case';
        if (count === 0) {
            ctx.w(tag + ' ' + model.wzName + ':');
            return callback(null);
        }
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w(tag + ' ' + model.wzName + ': {');
            }
            else {
                ctx.w(tag + ' ' + model.wzName + ':');
            }
        }
        else {
            ctx.w(tag + ' ' + model.wzName + ': {');
        }
        cnt.genItems(items, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (ctx.values.__preserveBlock) {
                if (count > 0 && items[0].wzElement === 'block') {
                    ctx.w('}');
                }
                else {
                    ;
                }
            }
            else {
                ctx.w('}');
            }
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.xdefault = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdefault');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdefault. Got: ' + callback);
        }
        var items = model.statements,
            count = model.statements.length,
            tag = 'default';
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w(tag + ': {');
            }
            else {
                ctx.w(tag + ':');
            }
        }
        else {
            ctx.w(tag + ': {');
        }
        cnt.genItems(items, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (ctx.values.__preserveBlock) {
                if (count > 0 && items[0].wzElement === 'block') {
                    ctx.w('}');
                }
                else {
                    ;
                }
            }
            else {
                ctx.w('}');
            }
            return callback(null);
        }
        )
    }
    ;
}
;
