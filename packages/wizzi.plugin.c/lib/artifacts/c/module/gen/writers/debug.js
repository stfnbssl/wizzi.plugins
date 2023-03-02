/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.c\.wizzi-override\lib\artifacts\c\module\gen\writers\debug.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;

var myname = 'wizzi.plugins.c.lib.artifacts.module.gen.writers.debug';
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
md.loadStatementWriters = function(mainWriter) {
    mainWriter.statementsContainer.log = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.log');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.log. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('printf(' + name + ');printf("\\n");');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.info = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.info');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.info. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('printf(' + name + ');printf("\\n");');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.success = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.success');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.success. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('printf(' + name + '); printf("\\n");');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.warn = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.warn');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.warn. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('printf(' + name + '); printf("\\n");');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.error = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.error');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.error. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('printf(' + name + '); printf("\\n");');
        return callback(null);
    }
    ;
}
;
