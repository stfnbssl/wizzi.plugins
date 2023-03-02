/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.c\.wizzi-override\lib\artifacts\c\module\gen\writers\control.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;

var myname = 'wizzi.plugins.c.lib.artifacts.module.gen.writers.control';
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
    mainWriter.statementsContainer.xif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xif. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('if (' + name + ') {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.xelse = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xelse');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xelse. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('else {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.elif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.elif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.elif. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('else if (' + name + ') {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.xfor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xfor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xfor. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('for (' + name + ') {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.xwhile = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xwhile');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xwhile. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('while (' + name + ') {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.xdo = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xdo');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdo. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('do {');
        mainWriter.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            ctx.w('while (' + name + ');');
            return callback(null);
        }
        )
    }
    ;
    mainWriter.statementsContainer.xswitch = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xswitch');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xswitch. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('switch (' + name + ') {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.xcase = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xcase');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xcase. Got: ' + callback);
        }
        var name = model.wzName.trim();
        // _ ctx.w('case ' + name + ': {')
        ctx.w('case ' + name + ':');
        mainWriter.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // _ ctx.w('}')
            return callback(null);
        }
        )
    }
    ;
    mainWriter.statementsContainer.xdefault = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.xdefault');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdefault. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('default: {');
        mainWriter.genItems(model.statements, ctx, {
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
    ;
    mainWriter.statementsContainer.label = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.label');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.label. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var save = ctx.forceIndent(1);
        ctx.w(name + ':');
        mainWriter.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.forceIndent(save);
            return callback(null);
        }
        )
    }
    ;
}
;
