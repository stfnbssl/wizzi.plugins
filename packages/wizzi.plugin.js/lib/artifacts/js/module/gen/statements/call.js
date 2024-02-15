/*
    artifact generator: C:\My\wizzi\stfnbssl\previous\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\statements\call.js.ittf
    utc time: Sun, 28 Jan 2024 14:34:30 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.call';
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
    cnt.stm.call = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.call');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.call. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        if (xmodel.__templateChild) {
            ctx.write('${');
        }
        if (model.wzParent.wzElement == 'htmlelement') {
            ctx.w('{');
        }
        var name = (xmodel.wzName || '').trim();
        var hasParens = u.hasArguments(name);
        if (hasParens == false && ctx.__artifact === 'xittf/document') {
            if (ctx.__functionNames.indexOf(name) < 0) {
                name = ctx.__functionProvider + '.' + name;
            }
        }
        if (xmodel.statements.length > 0 || (xmodel.typeParameterInsts && xmodel.typeParameterInsts.length > 0)) {
            doCallChildStatements_one(xmodel, name, (xmodel.typeParameterInsts && xmodel.typeParameterInsts.length > 0) ? false : hasParens, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (xmodel.__templateChild || model.wzParent.wzElement == 'htmlelement') {
                    ctx.write('}');
                }
                return callback(null);
            }
            )
        }
        // loog 'call', 'u.isTopStatement(xmodel, ctx)', u.isTopStatement(xmodel, ctx), "u.isDescendentOf(xmodel, 'iif')", u.isDescendentOf(xmodel, 'iif')
        else {
            name = hasParens ? name : (name + '()');
            ctx.write(name);
            if (u.isTopStatement(xmodel, ctx) && u.isChildOf(xmodel, 'iif') == false) {
                ctx.w(u.semicolon(name))
            }
            if (xmodel.__templateChild || model.wzParent.wzElement == 'htmlelement') {
                ctx.write('}');
            }
            return callback(null);
        }
    }
    ;
    cnt.stm.memberCall = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.memberCall');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.memberCall. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        var name = (xmodel.wzName || '').trim();
        var hasParens = u.hasArguments(name);
        if (xmodel.statements.length > 0) {
            doCallChildStatements_one(xmodel, ('.' + name), hasParens, ctx, callback);
        }
        else {
            name = hasParens ? ('.' + name) : ('.' + name) + '()';
            ctx.write(name);
            if (u.isTopStatement(xmodel, ctx)) {
                ctx.w(u.semicolon(name))
            }
            return callback(null);
        }
    }
    ;
    cnt.stm.decoratorCall = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.decoratorCall');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.decoratorCall. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        var name = ('@' + xmodel.wzName).trim();
        var hasParens = u.hasArguments(name);
        if (xmodel.statements.length > 0) {
            doCallChildStatements_one(xmodel, name, hasParens, ctx, callback);
        }
        else {
            name = hasParens ? name : (name + '()');
            ctx.write(name);
            if (u.isTopStatement(xmodel, ctx) && (u.isDescendentOf(xmodel, 'iif') == false)) {
                ctx.w(u.semicolon(name))
            }
            return callback(null);
        }
    }
    ;
    cnt.stm.callOnValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.callOnValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.callOnValue. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        var hasParens = false;
        if (xmodel.wzParent && xmodel.wzParent.wzElement === 'arrowfunction') {
            ctx.write('(' + (xmodel.wzName || ''));
            if (xmodel.statements.length == 1) {
                cnt.genItem(xmodel.statements[0], ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(')');
                    return callback(null);
                }
                )
            }
            else {
                ctx.write(')');
                return callback(null);
            }
        }
        else if (xmodel.wzParent && xmodel.wzParent.wzElement === 'call' && xmodel.statements.length == 1) {
            ctx.write('(' + (xmodel.wzName || ''));
            cnt.genItem(xmodel.statements[0], ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null);
            }
            )
        }
        else if (xmodel.statements.length > 0) {
            doCallChildStatements_one(xmodel, '', hasParens, ctx, callback);
        }
        else {
            ctx.write('()');
            return callback(null);
        }
    }
    ;
    function doCallChildStatements_one(model, name, hasParens, ctx, callback) {
        // loog 'doCallChildStatements_one.model', model
        ctx.write(name);
        if (model.typeParameterInsts && model.typeParameterInsts.length > 0) {
            ctx.write('<');
            var len_1 = model.typeParameterInsts.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.typeParameterInsts[index_1];
                if (index_1 > 0) {
                    ctx.write(', ');
                }
                if (item_1.statements.length == 0) {
                    ctx.write(item_1.wzName);
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                else if (item_1.statements.length == 1) {
                    cnt.genItem(item_1.statements[0], ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        })
                    }
                    )
                }
                else {
                    ctx.write('*** js.module.statements.call.doCallChildStatements_two not managed ***');
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
            }
            repeater_1(0);
            function next_1() {
                ctx.write('>');
                doCallChildStatements_two(model, name, hasParens, ctx, callback);
            }
        }
        else {
            doCallChildStatements_two(model, name, hasParens, ctx, callback);
        }
    }
    function doCallChildStatements_two(model, name, hasParens, ctx, callback) {
        // loog 'doCallChildStatements_two', name, hasParens
        
        // loog 'doCallChildStatements_two 1', model.wzElement
        
        // VIA 20/2/19 if name.length > 0
        
        // restored 19/3/21 for call template (`lit), waiting for damage
        if (hasParens === false) {
            if (name.length > 0 || model.wzElement == 'callOnValue') {
                ctx.write('(');
            }
        }
        var first = true;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if ((u.isCallArgument(item_1) && hasParens) || u.isMemberAccess(item_1)) {
                if ((hasParens === false) && u.isMemberAccess(item_1)) {
                    if (name.length > 0) {
                        ctx.write(')');
                    }
                }
                if (u.isCallArgument(item_1)) {
                    ctx.write('.');
                }
                var remainings = [];
                for (var j = (index_1 + 1); j < model.statements.length; j++) {
                    remainings.push(model.statements[j]);
                }
                return doCallChildStatements_call(item_1, ctx, remainings, callback);
            }
            if (!first) {
                ctx.write(', ');
            }
            // loog 'doCallChildStatements_two', item_1
            if (item_1.wzElement == 'comment') {
                ctx.w();
            }
            cnt.genItem(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (item_1.wzElement != 'comment') {
                    first = false;
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            ;
            // loog 'doCallChildStatements_two 2'
            if (hasParens === false) {
                ctx.write(')');
            }
            if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
                ctx.w();
            }
            // 2/11/17 _ ctx.w()
            else {
            }
            return callback(null);
        }
    }
    function doCallChildStatements_call(model, ctx, remainings, callback) {
        cnt.genItem(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            var len_1 = remainings.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = remainings[index_1];
                if (u.isCallArgument(item_1)) {
                    ctx.write('.');
                }
                cnt.genItem(item_1, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                )
            }
            repeater_1(0);
            function next_1() {
                
                // loog 'doCallChildStatements_call. w()', model.wzElement, model.wzName
                if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false && model.wzElement !== 'decoratorCall' && !u.parentIs(model, 'arrowfunction')) {
                    ctx.w(';');
                }
                // loog 'doCallChildStatements_call. w()', model.wzElement, model.wzName
                // TODO when inside a statement // 13/6/2018
                // _ ctx.write()
                else {
                    ctx.w();
                }
                return callback(null);
            }
        }
        )
    }
    cnt.stm.memberAccess = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.memberAccess');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.memberAccess. Got: ' + callback);
        }
        if (ctx.__inside_html || (model.wzParent.wzElement === 'xreturn' && ctx.__jskind === 'react')) {
            var classTag = ctx.__jskind === 'react' ? 'className' : 'class';
            model.statements.unshift({
                wzElement: 'jsPropertyOrValue', 
                wzName: classTag + ' ' + model.wzName, 
                wzParent: model
             })
            model.wzElement = 'htmlelement';
            model.wzName = 'div';
            cnt.stm.htmlelement(model, ctx, callback);
        }
        else {
            ctx.write('.' + model.wzName);
            return callback(null);
        }
    }
    ;
    cnt.stm.memberAccessComputed = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.memberAccessComputed');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.memberAccessComputed. Got: ' + callback);
        }
        if (!model.statements || model.statements.length < 1) {
            ctx.write('[' + model.wzName + ']');
            return callback(null);
        }
        ctx.write('[');
        var first = true;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (u.isMemberAccess(item_1)) {
                ctx.write(']');
                cnt.genItem(item_1, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
                        ctx.w(';');
                    }
                    return callback(null);
                }
                )
            }
            else {
                if (!first) {
                    ctx.write(', ');
                }
                cnt.genItem(item_1, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.first = false;
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                )
            }
        }
        repeater_1(0);
        function next_1() {
            ctx.write(']');
            return callback(null);
        }
    }
    ;
}
;
