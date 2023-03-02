/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.py\.wizzi-override\lib\artifacts\py\module\gen\writers\class.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;

var myname = 'xclass';
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
    mainWriter.statementsContainer.xclass = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xclass');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xclass. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var name = model.wzName.trim();
        ctx.w('class ' + name + ':');
        mainWriter.genItems(model.statements, ctx, {
            indent: true
         }, callback)
    }
    ;
    mainWriter.statementsContainer.property = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.property');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.property. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var name = model.wzName.trim();
        ctx.w(name);
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.ctor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.ctor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.ctor. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('def __init__(self');
        var param_count = 0;
        (function next() {
            var param = model.params[param_count++];
            if (!param) {
                ctx.w('):');
                return body();
            }
            ctx.write(', ');
            ctx.write(param.wzName);
            next();
        })();
        function body() {
            mainWriter.genItems(model.statements, ctx, {
                indent: true
             }, callback)
        }
    }
    ;
    mainWriter.statementsContainer.destructor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.destructor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.destructor. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('def __del__(self):');
        mainWriter.genItems(model.statements, ctx, {
            indent: true
         }, callback)
    }
    ;
    mainWriter.statementsContainer.method = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.method');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.method. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var name = model.wzName.trim();
        ctx.write('def ' + name + '(self');
        var param_count = 0;
        (function next() {
            var param = model.params[param_count++];
            if (!param) {
                ctx.w('):');
                return body();
            }
            ctx.write(', ');
            ctx.write(param.wzName);
            next();
        })();
        function body() {
            mainWriter.genItems(model.statements, ctx, {
                indent: true
             }, callback)
        }
    }
    ;
}
;
