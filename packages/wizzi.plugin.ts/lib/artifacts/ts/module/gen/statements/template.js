/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\template.js.ittf
    utc time: Tue, 07 Jan 2025 04:22:48 GMT
*/
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.template';
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
    cnt.stm.template = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.template');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.template. Got: ' + callback);
        }
        var indented = u.writeComments_template(model, ctx, true, true);
        // loog 'template.model.statements.length', model.statements.length
        ctx.write('`');
        ctx.isInsideTemplate = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            // w -> write 1/3/19
            ctx.write('`');
            ctx.isInsideTemplate = false;
            if (indented) {
                ctx.deindent();
            }
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.taggedTemplate = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.taggedTemplate');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.taggedTemplate. Got: ' + callback);
        }
        var indented = u.writeComments_template(model, ctx, true, true);
        ctx.write('`');
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            // w -> write 1/3/19
            ctx.write('`');
            if (indented) {
                ctx.deindent();
            }
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.tagFunctionCall = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.tagFunctionCall');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.tagFunctionCall. Got: ' + callback);
        }
        var indented = u.writeComments_template(model, ctx, true, true);
        ctx.write( model.wzName + '`');
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write( '`');
            if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
                ctx.write(';');
            }
            if (indented) {
                ctx.deindent();
            }
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.macroExpr = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.macroExpr');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.macroExpr. Got: ' + callback);
        }
        var indented = u.writeComments_template(model, ctx, true, true);
        ctx.write('${' + (model.wzName || ''));
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write('}');
            if (indented) {
                ctx.deindent();
            }
            return callback(null);
        }
        )
    }
    ;
}
;