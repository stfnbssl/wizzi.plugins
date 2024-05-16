/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\statements\handlebar.js.ittf
    utc time: Mon, 06 May 2024 15:21:28 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.handlebar';
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
    cnt.stm.handlebar = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.handlebar');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.handlebar. Got: ' + callback);
        }
        ctx.w('{{' + model.wzName + '}}');
        return callback(null);
    }
    ;
}
;
