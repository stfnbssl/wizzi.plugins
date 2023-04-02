/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\document\gen\statements\debug.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.debug';
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
    cnt.stm.inspect = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.inspect');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.inspect. Got: ' + callback);
        }
        var ss = model.wzName.split(','), name, value;
        if (ss.length == 2) {
            name = u.unquote(ss[0].trim());
            value = ss[1].trim();
        }
        else {
            var nv = lineParser.parseNameValueRaw(ss[0], model);
            if (nv.name() && nv.value()) {
                name = u.unquote(nv.name().trim());
                value = nv.value().trim();
            }
            else {
                name = ss[0];
                value = ss[0];
            }
        }
        ctx.w('console.log("' + name + '" + " " + util.inspect(' + value + ', { depth: null } ), __filename)')
        return callback(null);
    }
    ;
    cnt.stm.debug = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.debug');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.debug. Got: ' + callback);
        }
        ctx.w('debug(' + model.wzName + ')' + u.semicolon(model.wzName));
        return callback(null);
    }
    ;
    cnt.stm.log = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.log');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.log. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            var text = model.wzName.trim().endsWith(',') ? model.wzName + '__filename' : model.wzName + ', __filename';
            ctx.w('console.log(' + text + ')' + u.semicolon(model.wzName));
        }
        // log 151
        return callback(null);
    }
    ;
    cnt.stm.info = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.info');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.info. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            ctx.w('console.log(' + model.wzName + ');');
        }
        return callback(null);
    }
    ;
    cnt.stm.success = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.success');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.success. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            ctx.w('console.log("\x1b[32m%s\x1b[0m", ' + model.wzName + ');');
        }
        return callback(null);
    }
    ;
    cnt.stm.warn = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.warn');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.warn. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            ctx.w('console.log("\x1b[33m%s\x1b[0m", ' + model.wzName + ');');
        }
        return callback(null);
    }
    ;
    cnt.stm.error = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.error');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.error. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            ctx.w('console.log("\x1b[31m%s\x1b[0m", ' + model.wzName + ');');
        }
        return callback(null);
    }
    ;
    cnt.stm.chalk = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.chalk');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.chalk. Got: ' + callback);
        }
        var sw = [];
        var i, i_items=model.wzName.split(','), i_len=model.wzName.split(',').length, item;
        for (i=0; i<i_len; i++) {
            item = model.wzName.split(',')[i];
            var nv = lineParser.parseNameValueRaw(item, model);
            if (nv.value()) {
                sw.push('chalk.' + nv.name() + '(' + nv.value() + ')')
            }
            else {
                sw.push('chalk.red(' + nv.name() + ')')
            }
        }
        ctx.w('console.log(' + sw.join(', ') + ')')
        return callback(null);
    }
    ;
}
;
