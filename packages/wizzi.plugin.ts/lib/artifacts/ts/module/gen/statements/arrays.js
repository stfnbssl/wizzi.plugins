/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\arrays.js.ittf
    utc time: Thu, 16 May 2024 04:18:27 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.arrays';
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
    cnt.stm.concat = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.concat');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.concat. Got: ' + callback);
        }
        var coll = lineParser.parseNameValueRaw(model.wzName, model);
        var arr = coll.name();
        var value = null;
        if (arr.substr(-1) === '.') {
            arr = arr.slice(0, -1);
        }
        if (coll.hasValue()) {
            value = coll.value();
            if (value[0] === '.') {
                value = value.substr(1);
            }
        }
        ctx.write(coll.name() + '.concat(');
        if (value) {
            ctx.write(value);
        }
        if (model.statements.length > 0) {
            if (value) {
                ctx.write(', ');
            }
            cnt.genItems(model.statements, ctx, {
                indent: false, 
                sep: ', '
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w(');');
                return callback(null);
            }
            )
        }
        else {
            ctx.w(');');
            return callback(null);
        }
    }
    ;
    cnt.stm.each = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.each');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.each. Got: ' + callback);
        }
        arrayMethod('forEach', model, ctx, callback)
    }
    ;
    cnt.stm.filter = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.filter');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.filter. Got: ' + callback);
        }
        arrayMethod('filter', model, ctx, callback)
    }
    ;
    cnt.stm.find = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.find');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.find. Got: ' + callback);
        }
        arrayMethod('find', model, ctx, callback)
    }
    ;
    cnt.stm.reduce = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.reduce');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.reduce. Got: ' + callback);
        }
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length < 3 || ss.length > 4 || ss[1] !== 'in') {
            return callback(ctx.error("Malformed foreach. Should be: each <item> in <coll> [initialValue]. Is " + model.wzName, model));
        }
        var item = ss[0],
            coll = ss[2],
            _initValue = ss.length == 4 ? (ss[3] === 'null' ? null : ss[3]) : 'this';
        ctx.w(coll + '.reduce( (acc, ' + item + ', ' + item + '_index, array) => {');
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('}' + (_initValue ? ', ' + _initValue : '') + ');');
            return callback(null);
        }
        )
    }
    ;
    function arrayMethod(method, model, ctx, callback) {
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length < 3 || ss.length > 4 || ss[1] !== 'in') {
            return callback(ctx.error("Malformed foreach. Should be: each <item> in <coll> [this]. Is " + model.wzName, model));
        }
        var item = ss[0],
            coll = ss[2],
            _this = ss.length == 4 ? (ss[3] === 'null' ? null : ss[3]) : 'this';
        ctx.w(coll + '.' + method + '(function(' + item + ', ' + item + '_index, array) {');
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('}' + (_this ? ', ' + _this : '') + ');');
            return callback(null);
        }
        )
    }
}
;
