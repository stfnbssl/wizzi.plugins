/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\loops.js.ittf
    utc time: Wed, 19 Jun 2024 05:25:25 GMT
*/
'use strict';
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.loops';
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
    cnt.stm.xfor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xfor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xfor. Got: ' + callback);
        }
        if (model.statements.length > 1 && model.statements[0].wzElement == 'xleft' && (model.statements[1].wzElement == 'xof' || model.statements[1].wzElement == 'xin')) {
            var bodystatementes = model.statements.slice(2);
            ctx.write('for (');
            ctx.__inline = true;
            ctx.__nosemicolon = true;
            cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(model.statements[1].wzElement == 'xin' ? ' in ' : ' of ');
                cnt.genItem(model.statements[1], ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.__inline = false;
                    ctx.__nosemicolon = false;
                    ctx.w(') {');
                    cnt.genItems(bodystatementes, ctx, {
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
                )
            }
            )
        }
        else {
            u.emitBlock(cnt, 'for', model, model.statements, model.statements.length, ctx, callback)
        }
    }
    ;
    cnt.stm.xleft = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xleft');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xleft. Got: ' + callback);
        }
        if (model.statements.length > 0) {
            cnt.genItems(model.statements, ctx, {}, callback)
        }
        else {
            ctx.write(model.wzName);
            return callback(null);
        }
    }
    ;
    cnt.stm.xof = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xof');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xof. Got: ' + callback);
        }
        if (model.statements.length > 0) {
            cnt.genItems(model.statements, ctx, {}, callback)
        }
        else {
            ctx.write(model.wzName);
            return callback(null);
        }
    }
    ;
    cnt.stm.xin = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xin');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xin. Got: ' + callback);
        }
        if (model.statements.length > 0) {
            cnt.genItems(model.statements, ctx, {}, callback)
        }
        else {
            ctx.write(model.wzName);
            return callback(null);
        }
    }
    ;
    cnt.stm.foreach = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.foreach');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.foreach. Got: ' + callback);
        }
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length != 3 || ss[1] !== 'in') {
            return callback(ctx.error("Malformed foreach. Should be: foreach <item> in <coll>. Is " + model.wzName, model));
        }
        var item = ss[0],
            coll = ss[2];
        var nidif = (ctx.__for_nidif || 0);
        if (nidif >= max_for_nidif) {
            return callback(ctx.error(myname + '. Maximum number of nested foreach loop is ' + max_for_nidif, model));
        }
        var letter = forloopLetters[nidif];
        var items = (letter + '_items');
        var len = (letter + '_len');
        ctx.__for_nidif = (nidif + 1);
        ctx.w('var ' + letter + ', ' + items + '=' + coll + ', ' + len + '=' + coll + '.length, ' + item + ';');
        ctx.w('for (' + letter + '=0; ' + letter + '<' + len + '; ' + letter + '++) {');
        ctx.w('    ' + item + ' = ' + coll + '[' + letter + '];');
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            ctx.__for_nidif = (ctx.__for_nidif - 1);
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.backeach = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.backeach');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.backeach. Got: ' + callback);
        }
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length != 3 || ss[1] !== 'in') {
            return callback(ctx.error("Malformed backeach. Should be: backeach <item> in <coll>. Is " + model.wzName, model));
        }
        var item = ss[0],
            coll = ss[2];
        var nidif = (ctx.__for_nidif || 0);
        if (nidif >= max_for_nidif) {
            return callback(ctx.error(myname + '. Maximum number of nested backeach loop is ' + max_for_nidif, model));
        }
        var letter = forloopLetters[nidif];
        var len = (letter + '_len');
        ctx.__for_nidif = (nidif + 1);
        ctx.w('var ' + letter + ', ' + len + '=' + coll + '.length, ' + item + ';');
        ctx.w('for (' + letter + '= (' + len + '-1); ' + letter + '>-1; ' + letter + '--) {');
        ctx.w('    ' + item + ' = ' + coll + '[' + letter + '];');
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            ctx.__for_nidif = ctx.__for_nidif - 1;
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.xbreak = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xbreak');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xbreak. Got: ' + callback);
        }
        ctx.write('break');
        ctx.write((model.wzName || '').trim().length > 0 ? (' ' + model.wzName) : '');
        ctx.w(';');
        return callback(null);
    }
    ;
    cnt.stm.xcontinue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xcontinue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xcontinue. Got: ' + callback);
        }
        ctx.write('continue');
        ctx.write((model.wzName || '').trim().length > 0 ? (' ' + model.wzName) : '');
        ctx.w(';');
        return callback(null);
    }
    ;
    cnt.stm.xwhile = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xwhile');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xwhile. Got: ' + callback);
        }
        u.emitBlock(cnt, 'while', model, model.statements, model.statements.length, ctx, callback)
    }
    ;
    cnt.stm.xdo = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdo');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdo. Got: ' + callback);
        }
        var items = model.statements;
        var count = model.statements.length;
        ctx.write('do');
        if (ctx.values.__preserveBlock) {
            if ((count > 1) || (count == 1 && items[0].wzElement === 'block')) {
                ctx.w(' {');
            }
            else {
                ctx.w('');
            }
        }
        else {
            ctx.w(' {');
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.values.__preserveBlock) {
                if ((count > 1) || (count == 1 && items[0].wzElement === 'block')) {
                    ctx.write('}');
                }
            }
            else {
                ctx.write('}');
            }
            ctx.w(' while (' + u.unparen(model.wzName) + ')');
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.xlabel = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xlabel');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xlabel. Got: ' + callback);
        }
        ctx.w(model.wzName + ':');
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, callback)
    }
    ;
    var forloopLetters = "ijklmn";
    var max_for_nidif = forloopLetters.length;
}
;