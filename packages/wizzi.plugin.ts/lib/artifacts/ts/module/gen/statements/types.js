/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\types.js.ittf
    utc time: Thu, 08 Jun 2023 18:57:57 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.types';
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
    cnt.stm.typeNumber = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNumber. Got: ' + callback);
        }
        ctx.write('number');
        return callback(null);
    }
    ;
    cnt.stm.typeString = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeString. Got: ' + callback);
        }
        ctx.write('string');
        return callback(null);
    }
    ;
    cnt.stm.typeBoolean = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeBoolean. Got: ' + callback);
        }
        ctx.write('boolean');
        return callback(null);
    }
    ;
    cnt.stm.typeAny = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeAny. Got: ' + callback);
        }
        ctx.write('any');
        return callback(null);
    }
    ;
    cnt.stm.typeArray = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeArray. Got: ' + callback);
        }
        // loog 'typeArray model.statements.length', model.statements.length
        
        // loog 'typeArray item.wzElement', item.wzElement
        if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write('[]');
                // loog 'typeArray item.wzElement exit', item.wzElement
                return callback(null);
            }
            )
        }
        // TODO
        else {
            ctx.write('MISSING[]');
            return callback(null);
        }
    }
    ;
    cnt.stm.typeObject = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeObject. Got: ' + callback);
        }
        ctx.write('object');
        return callback(null);
    }
    ;
    cnt.stm.typeObjectLiteral = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeObjectLiteral. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        ctx.w('{ ');
        ctx.indent();
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            
            // (19/1/21 It seems are separated by ';') _ ctx.write(', ')
            if (index_1 > 0) {
            }
            // loog 'typeObjectLiteral.item_1.wzElement', item_1.wzElement, item_1.wzName
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
            ctx.deindent();
            // 21/3/2021 _ ctx.w('} ')
            ctx.write('}');
            return callback(null);
        }
    }
    ;
    cnt.stm.typeVoid = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeVoid. Got: ' + callback);
        }
        ctx.write('void');
        return callback(null);
    }
    ;
    cnt.stm.typeNull = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNull. Got: ' + callback);
        }
        ctx.write('null');
        return callback(null);
    }
    ;
    cnt.stm.typeUndefined = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUndefined. Got: ' + callback);
        }
        ctx.write('undefined');
        return callback(null);
    }
    ;
    cnt.stm.typeUnknown = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUnknown. Got: ' + callback);
        }
        ctx.write('unknown');
        return callback(null);
    }
    ;
    cnt.stm.typeNever = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNever. Got: ' + callback);
        }
        ctx.write('never');
        return callback(null);
    }
    ;
    cnt.stm.typeTypeof = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTypeof. Got: ' + callback);
        }
        ctx.write('typeof ' + model.wzName);
        return callback(null);
    }
    ;
    cnt.stm.typeReference = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeReference. Got: ' + callback);
        }
        // loog 'typeReference.model', model
        var model = writeComments(model, ctx);
        if (model.statements.length == 1) {
            ctx.write('<' + model.wzName + '>');
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        else if (kind === 'typeParameterDecl') {
            ctx.write(' extends ' + model.wzName);
            return callback(null);
        }
        else {
            ctx.write(model.wzName);
            if (model.typeParameterInsts.length > 0) {
                var graphs = false;
                var i, i_items=model.typeParameterInsts, i_len=model.typeParameterInsts.length, item;
                for (i=0; i<i_len; i++) {
                    item = model.typeParameterInsts[i];
                    if (item.statements.length == 1 && item.statements[0].wzElement == 'typeMapped') {
                        graphs = true;
                    }
                }
                ctx.write('<' + (graphs ? '{' : ''));
                var len_1 = model.typeParameterInsts.length;
                function repeater_1(index_1) {
                    if (index_1 === len_1) {
                        return next_1();
                    }
                    var item_1 = model.typeParameterInsts[index_1];
                    if (index_1 > 0) {
                        ctx.write(', ');
                    }
                    if (!cnt.stm[item_1.wzElement]) {
                        console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item_1.wzElement);
                    }
                    cnt.stm[item_1.wzElement](item_1, ctx, (err, notUsed) => {
                    
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
                    ctx.write((graphs ? '}' : '') + '>');
                    return callback(null);
                }
            }
            else {
                return callback(null);
            }
        }
    }
    ;
    cnt.stm.typeParameterInst = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParameterInst. Got: ' + callback);
        }
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null);
        }
        
        // loog 'typeParameterInst,item.wzElement', item.wzElement
        else if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(ctx.error(':param typeParameterInst not managed. children: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeConditional = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeConditional. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var item = model.typeCheck.statements[0];
        if (!cnt.stm[item.wzElement]) {
            console.log("[31m%s[0m", 'ts.module.gen.typeConditional.wzElement not managed', item.wzElement);
        }
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(' extends ');
            var item = model.typeExtends.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.typeExtends.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(' ? ');
                var item = model.typeThen.statements[0];
                if (!cnt.stm[item.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.typeThen.wzElement not managed', item.wzElement);
                }
                cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' : ');
                    var item = model.typeElse.statements[0];
                    if (!cnt.stm[item.wzElement]) {
                        console.log("[31m%s[0m", 'ts.module.gen.typeElse.wzElement not managed', item.wzElement);
                    }
                    cnt.stm[item.wzElement](item, ctx, callback)
                }
                )
            }
            )
        }
        )
    }
    ;
    cnt.stm.typeInfer = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInfer. Got: ' + callback);
        }
        ctx.write(' infer ');
        var item = model.statements[0];
        if (!cnt.stm[item.wzElement]) {
            console.log("[31m%s[0m", 'ts.module.gen.typeThen.wzElement not managed', item.wzElement);
        }
        cnt.stm[item.wzElement](item, ctx, callback)
    }
    ;
    cnt.stm.typeParenthesized = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParenthesized. Got: ' + callback);
        }
        ctx.write('(');
        if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null);
            }
            )
        }
        else {
            return callback(ctx.error(':paren typeParenthesized not managed. children: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeTuple = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTuple. Got: ' + callback);
        }
        ctx.write('[');
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' , ');
            }
            // loog 'typeTuple.item_1.wzElement', item_1.wzElement, item_1.wzName
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
            ctx.write(']');
            return callback(null);
        }
    }
    ;
    cnt.stm.typeEnum = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeEnum. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        ctx.w('enum ' + model.wzName + ' {');
        ctx.indent();
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.w(' , ');
            }
            // loog 'typeEnum.item_1.wzElement', item_1.wzElement, item_1.wzName
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
            ctx.deindent();
            ctx.w();
            ctx.w('}');
            return callback(null);
        }
    }
    ;
    cnt.stm.typeReturn = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeReturn. Got: ' + callback);
        }
        if (model.statements.length == 1) {
            var item = model.statements[0];
            ctx.write(' ');
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(ctx.error(':{ typeReturn must have one children. found: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeInitValue = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInitValue. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            ctx.write(model.wzName);
            return callback(null);
        }
        else if (model.statements.length == 1) {
            cnt.genItem(model.statements[0], ctx, callback)
        }
        else if (model.statements.length > 1) {
            cnt.genItems(model.statements, ctx, callback)
        }
        else {
            return callback(ctx.error(':{ typeReturn must have wzName or children. found: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeKeyOf = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeKeyOf. Got: ' + callback);
        }
        if (kind === 'mapped') {
            ctx.write(' in ');
        }
        ctx.write(' keyof ');
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' , ');
            }
            // loog 'typeKeyOf.item_1.wzElement', item_1.wzElement, item_1.wzName
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
            return callback(null);
        }
    }
    ;
    cnt.stm.typeParameterDecl = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParameterDecl. Got: ' + callback);
        }
        var atype = u.extractTSSimpleType(model);
        if (atype) {
            ctx.write(model.wzName);
            if (kind == 'mapped') {
                ctx.write(' in ');
            }
            else {
                ctx.write(' extends ');
            }
            if (!cnt.stm[atype.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.typeParameterDecl.item.wzElement not managed', atype.wzElement);
            }
            cnt.stm[atype.wzElement](atype, ctx, callback)
        }
        else {
            ctx.write(model.wzName);
            return callback(null);
        }
    }
    ;
    cnt.stm.typeUnion = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUnion. Got: ' + callback);
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' | ');
            }
            // loog 'typeUnion.item_1.wzElement', item_1.wzElement, item_1.wzName
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
            return callback(null);
        }
    }
    ;
    cnt.stm.typeIntersect = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIntersect. Got: ' + callback);
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' & ');
            }
            // loog 'typeIntersect.item_1.wzElement', item_1.wzElement, item_1.wzName
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
            return callback(null);
        }
    }
    ;
    cnt.stm.typeNotNull = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNotNull. Got: ' + callback);
        }
        ctx.write( model.wzName || '');
        if (model.statements.length == 0) {
            ctx.write('!');
            return callback(null);
        }
        else {
            cnt.genItems(model.statements, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write('!');
                return callback(null);
            }
            )
        }
    }
    ;
    cnt.stm.typePredicate = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typePredicate. Got: ' + callback);
        }
        if (model.statements.length == 1) {
            ctx.write(model.wzName + ' is ');
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(ctx.error(':predicate typePredicate must have one children. found: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeIndexedAccess = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIndexedAccess. Got: ' + callback);
        }
        if (model.statements.length == 2) {
            var item = model.statements[0];
            var gr = u.indexedTSNeedsGraphs(item);
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            if (gr) {
                ctx.write('{');
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (gr) {
                    ctx.write('}');
                }
                ctx.write('[');
                var item = model.statements[1];
                if (!cnt.stm[item.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
                }
                cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(']');
                    return callback(null);
                }
                )
            }
            )
        }
        else {
            return callback(ctx.error(':mapped typeMapped must have two children. found: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeIndex = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIndex. Got: ' + callback);
        }
        var atype = u.extractTSSimpleType(model);
        u.genAccessorsAndExtra(model, ctx)
        ctx.write('[');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // loog '11'
            ctx.write(']');
            if (atype) {
                ctx.write(': ');
                if (!cnt.stm[atype.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
                }
                cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null);
                }
                )
            }
            else {
                return callback(null);
            }
        }
        )
    }
    ;
    cnt.stm.typeAs = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeAs. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        // loog 'typeAs.model.statements 1', model.statements
        var atype = u.extractTSSimpleType(model);
        // loog 'typeAs atype', atype
        // loog 'typeAs.model.statements 2', model.statements
        ctx.setLastNotEmptyLine();
        ctx.write(' as ');
        if (atype) {
            if (!cnt.stm[atype.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', atype.wzElement);
            }
            cnt.stm[atype.wzElement](atype, ctx, callback)
        }
        else {
            cnt.genItems(model.statements, ctx, callback)
        }
    }
    ;
    cnt.stm.typeLiteral = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeLiteral. Got: ' + callback);
        }
        ctx.write(model.wzName);
        return callback(null);
    }
    ;
    cnt.stm.typeMapped = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeMapped. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        
        // loog 'ts.module.gen.typeMapped', item.wzElement
        if (model.statements.length == 2) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            ctx.write('[');
            cnt.stm[item.wzElement](item, ctx, 'mapped', (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(']');
                ctx.write(' : ');
                var item = model.statements[1];
                if (!cnt.stm[item.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
                }
                cnt.stm[item.wzElement](item, ctx, callback)
            }
            )
        }
        else {
            return callback(ctx.error(':mapped typeMapped must have two children. found: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeArrowFunction = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeArrowFunction. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var atype = u.extractTSSimpleType(model);
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        typeArrowFunction_close(model, ctx, atype, callback)
                    }
                    )
                }
                else {
                    typeArrowFunction_close(model, ctx, atype, callback)
                }
            }
            )
        }
        )
    }
    ;
    function typeArrowFunction_close(model, ctx, atype, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.typeArrowFunction_close');
        }
        ctx.write(' => ');
        if (atype) {
            if (!cnt.stm[atype.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
            }
            cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                cnt.genItems(model.statements, ctx, callback)
            }
            )
        }
        else {
            cnt.genItems(model.statements, ctx, callback)
        }
    }
    cnt.stm.typeExportAssignment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeExportAssignment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExportAssignment. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        ctx.w('export = ' + model.wzName + ';');
        return callback(null);
    }
    ;
    cnt.stm.typeImport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeImport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeImport. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var name = model.wzName || '';
        if (model.xas) {
            if (name.length > 0) {
                name += ', ';
            }
            name += '* as ' + model.xas;
        }
        ctx.write("import type " + name);
        if (model.specifiers.length > 0) {
            if (name.length > 0) {
                ctx.write(', ');
            }
            ctx.write('{');
            var i, i_items=model.specifiers, i_len=model.specifiers.length, item;
            for (i=0; i<i_len; i++) {
                item = model.specifiers[i];
                if (i > 0) {
                    ctx.write(', ');
                }
                ctx.write(item.wzName);
                if (item.xas) {
                    ctx.write(' as ' + item.xas);
                }
            }
            ctx.write('}');
            ctx.write(' from ' + model.from);
        }
        else {
            if (model.from && model.from.length > 0) {
                if (name.trim().length > 0) {
                    ctx.write(' from');
                }
                ctx.write(' ' + model.from);
            }
        }
        ctx.w(u.semicolon(name));
        return callback(null);
    }
    ;
    cnt.stm.typeImportEqualsDeclaration = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeImportEqualsDeclaration');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeImportEqualsDeclaration. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        ctx.write('import ' + model.wzName + ' = ');
        if (model.statements.length == 1) {
            ctx.w('require( ' + model.statements[0].wzName + ');');
            return callback(null);
        }
        else {
            return callback(ctx.error(':import typeImportEqualsDeclaration must have one children. found: ' + model.statements.length, model));
        }
    }
    ;
    cnt.stm.typeNamespaceExportDeclaration = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeNamespaceExportDeclaration');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNamespaceExportDeclaration. Got: ' + callback);
        }
        ctx.w('export as namespace ' + model.wzName + ';');
        return callback(null);
    }
    ;
    cnt.stm.typeCTorDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeCTorDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCTorDeclare. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        var atype = u.extractTSSimpleType(model);
        ctx.write('(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (atype) {
                ctx.write(': ');
                if (!cnt.stm[atype.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
                }
                cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null);
                }
                )
            }
            else {
                ctx.w(';');
                return callback(null);
            }
        }
        )
    }
    ;
    cnt.stm.typeCTor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeCTor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCTor. Got: ' + callback);
        }
        ctx.w('*** :ctor ' + model.wzName + ';');
        return callback(null);
    }
    ;
    cnt.stm.typeConditional = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeConditional');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeConditional. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        if (!model.typeCheck || model.typeCheck.statements.length < 1) {
            return callback(ctx.error('ts.modeule.typeConditional missing typeCheck element', model));
        }
        if (!model.typeThen || model.typeThen.statements.length < 1) {
            return callback(ctx.error('ts.modeule.typeConditional missing typeThen element', model));
        }
        if (!model.typeElse || model.typeElse.statements.length < 1) {
            return callback(ctx.error('ts.modeule.typeConditional missing typeElse element', model));
        }
        var item = model.typeCheck.statements[0];
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            typeConditional_extends(model, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(' ? ');
                item = model.typeThen.statements[0];
                cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' : ');
                    item = model.typeElse.statements[0];
                    cnt.stm[item.wzElement](item, ctx, callback)
                }
                )
            }
            )
        }
        )
    }
    ;
    function typeConditional_extends(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.typeConditional_extends');
        }
        if (model.typeExtends) {
            ctx.write(' extends ');
            var item = model.typeExtends.statements[0];
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(null);
        }
    }
    function doCallMembers_call(model, ctx, remainings, callback) {
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
            return callback(null);
        }
    }
}
;
