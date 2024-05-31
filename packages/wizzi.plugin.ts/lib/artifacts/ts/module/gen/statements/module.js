/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\module.js.ittf
    utc time: Fri, 24 May 2024 16:39:28 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.module';
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
    cnt.stm.typeDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeDeclare. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        var len_1 = xmodel.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = xmodel.statements[index_1];
            ctx.write('declare ');
            cnt.genItem(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                return process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
            }
            )
        }
        repeater_1(0);
        function next_1() {
            return callback(null);
        }
    }
    ;
    cnt.stm.typeModule = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeModule');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeModule. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        ctx.write('module ' + xmodel.wzName);
        ctx.w(' {');
        cnt.genItems(xmodel.statements, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.typeTypeAlias = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeTypeAlias');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTypeAlias. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        ctx.write('type ' + xmodel.wzName);
        u.genTSTypeParameters(xmodel, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (xmodel.statements.length == 1) {
                ctx.write(' = ');
                cnt.genItem(xmodel.statements[0], ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null);
                }
                )
            }
            else {
                return callback(ctx.error(':type typeTypeAlias must have one children. found: ' + xmodel.statements.length, xmodel));
            }
        }
        )
    }
    ;
    cnt.stm.typeFunctionDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeFunctionDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeFunctionDeclare. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        ctx.write('function ' + xmodel.wzName);
        // loog 'typeFunctionDeclare enter 1'
        u.genTSTypeParameters(xmodel, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'typeFunctionDeclare enter 2'
            ctx.write('(');
            u.genTSParams(xmodel, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // loog 'typeFunctionDeclare cb 1'
                ctx.write(')');
                
                // loog 'typeFunctionDeclare typeReturn', xmodel.typeReturn.wzElement
                if (xmodel.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(xmodel.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        // loog 'typeFunctionDeclare exit 1'
                        return callback(null);
                    }
                    )
                }
                // loog 'typeFunctionDeclare exit 2'
                else {
                    return callback(null);
                }
            }
            )
        }
        )
    }
    ;
}
;
