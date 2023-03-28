/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.java\.wizzi-override\lib\artifacts\java\module\gen\writers\types.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;

var myname = 'types';
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
    mainWriter.statementsContainer.typeNumber = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeNumber');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNumber. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('number');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeString = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeString');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeString. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('string');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeBoolean = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeBoolean');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeBoolean. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('boolean');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeAny = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeAny');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeAny. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('any');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeArray = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeArray');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeArray. Got: ' + callback);
        }
        var name = model.wzName.trim();
        // loog 'typeArray model.statements.length', model.statements.length
        
        // loog 'typeArray item.wzElement', item.wzElement
        if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeObject = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeObject');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeObject. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('object');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeObjectLiteral = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeObjectLiteral');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeObjectLiteral. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        ctx.w('{ ');
        ctx.indent();
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            
            // log 0
            
            // (19/1/21 It seems are separated by ';') _ ctx.write(', ')
            if (index_1 > 0) {
            }
            // loog 'typeObjectLiteral.item_1.wzElement', item_1.wzElement, item_1.wzName
            mainWriter.genItem(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                // log 1
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
            // log 2
            return callback(null);
        }
    }
    ;
    mainWriter.statementsContainer.typeVoid = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeVoid');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeVoid. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('void');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeNull = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeNull');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNull. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('null');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeUndefined = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeUndefined');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUndefined. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('undefined');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeUnknown = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeUnknown');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUnknown. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('unknown');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeNever = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeNever');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNever. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('never');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeTypeof = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeTypeof');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTypeof. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('typeof ' + model.wzName);
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeReference = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeReference');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeReference. Got: ' + callback);
        }
        var name = model.wzName.trim();
        // loog 'typeReference.model', model
        var model = writeComments(model, ctx);
        if (model.statements.length == 1) {
            ctx.write('<' + model.wzName + '>');
            var item = model.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
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
                    if (!mainWriter.statementsContainer[item_1.wzElement]) {
                        console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item_1.wzElement);
                    }
                    mainWriter.statementsContainer[item_1.wzElement](item_1, ctx, (err, notUsed) => {
                    
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
    mainWriter.statementsContainer.typeParameterInst = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeParameterInst');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParameterInst. Got: ' + callback);
        }
        var name = model.wzName.trim();
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null);
        }
        
        // loog 'typeParameterInst,item.wzElement', item.wzElement
        else if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(ctx.error(':param typeParameterInst not managed. children: ' + model.statements.length, model));
        }
    }
    ;
    mainWriter.statementsContainer.typeConditional = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeConditional');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeConditional. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        var item = model.typeCheck.statements[0];
        if (!mainWriter.statementsContainer[item.wzElement]) {
            console.log("[31m%s[0m", 'ts.module.gen.typeConditional.wzElement not managed', item.wzElement);
        }
        mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(' extends ');
            var item = model.typeExtends.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.typeExtends.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(' ? ');
                var item = model.typeThen.statements[0];
                if (!mainWriter.statementsContainer[item.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.typeThen.wzElement not managed', item.wzElement);
                }
                mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' : ');
                    var item = model.typeElse.statements[0];
                    if (!mainWriter.statementsContainer[item.wzElement]) {
                        console.log("[31m%s[0m", 'ts.module.gen.typeElse.wzElement not managed', item.wzElement);
                    }
                    mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
                }
                )
            }
            )
        }
        )
    }
    ;
    mainWriter.statementsContainer.typeInfer = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeInfer');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInfer. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write(' infer ');
        var item = model.statements[0];
        if (!mainWriter.statementsContainer[item.wzElement]) {
            console.log("[31m%s[0m", 'ts.module.gen.typeThen.wzElement not managed', item.wzElement);
        }
        mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
    }
    ;
    mainWriter.statementsContainer.typeParenthesized = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeParenthesized');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParenthesized. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write('(');
        if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeTuple = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeTuple');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTuple. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
            mainWriter.genItem(item_1, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeEnum = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeEnum');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeEnum. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
            mainWriter.genItem(item_1, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeReturn = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeReturn');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeReturn. Got: ' + callback);
        }
        var name = model.wzName.trim();
        if (model.statements.length == 0) {
            ctx.write(model.wzName + ' ');
            return callback(null);
        }
        else if (model.statements.length == 1) {
            var item = model.statements[0];
            ctx.write(' ');
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(ctx.error(':{ typeReturn must have zero or one children. found: ' + model.statements.length, model));
        }
    }
    ;
    mainWriter.statementsContainer.typeInitValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeInitValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInitValue. Got: ' + callback);
        }
        var name = model.wzName.trim();
        if (model.wzName && model.wzName.length > 0) {
            ctx.write(model.wzName);
            return callback(null);
        }
        else if (model.statements.length == 1) {
            mainWriter.genItem(model.statements[0], ctx, callback)
        }
        else if (model.statements.length > 1) {
            mainWriter.genItems(model.statements, ctx, callback)
        }
        else {
            return callback(ctx.error(':{ typeReturn must have wzName or children. found: ' + model.statements.length, model));
        }
    }
    ;
    mainWriter.statementsContainer.typeKeyOf = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeKeyOf');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeKeyOf. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
            mainWriter.genItem(item_1, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeParameterDecl = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeParameterDecl');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParameterDecl. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var atype = u.extractTSSimpleType(model);
        if (atype) {
            ctx.write(model.wzName);
            if (kind == 'mapped') {
                ctx.write(' in ');
            }
            else {
                ctx.write(' extends ');
            }
            if (!mainWriter.statementsContainer[atype.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.typeParameterDecl.item.wzElement not managed', atype.wzElement);
            }
            mainWriter.statementsContainer[atype.wzElement](atype, ctx, callback)
        }
        else {
            ctx.write(model.wzName);
            return callback(null);
        }
    }
    ;
    mainWriter.statementsContainer.typeUnion = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeUnion');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUnion. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
            mainWriter.genItem(item_1, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeIntersect = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeIntersect');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIntersect. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
            mainWriter.genItem(item_1, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typeNotNull = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeNotNull');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNotNull. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write( model.wzName || '');
        if (model.statements.length == 0) {
            ctx.write('!');
            return callback(null);
        }
        else {
            mainWriter.genItems(model.statements, ctx, (err, notUsed) => {
            
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
    mainWriter.statementsContainer.typePredicate = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typePredicate');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typePredicate. Got: ' + callback);
        }
        var name = model.wzName.trim();
        if (model.statements.length == 1) {
            ctx.write(model.wzName + ' is ');
            var item = model.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
        }
        else {
            return callback(ctx.error(':predicate typePredicate must have one children. found: ' + model.statements.length, model));
        }
    }
    ;
    mainWriter.statementsContainer.typeIndexedAccess = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeIndexedAccess');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIndexedAccess. Got: ' + callback);
        }
        var name = model.wzName.trim();
        if (model.statements.length == 2) {
            var item = model.statements[0];
            var gr = u.indexedTSNeedsGraphs(item);
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            if (gr) {
                ctx.write('{');
            }
            mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (gr) {
                    ctx.write('}');
                }
                ctx.write('[');
                var item = model.statements[1];
                if (!mainWriter.statementsContainer[item.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
                }
                mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
                
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
    mainWriter.statementsContainer.typeIndex = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeIndex');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIndex. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var atype = u.extractTSSimpleType(model);
        u.genAccessorsAndExtra(model, ctx)
        ctx.write('[');
        u.genTSParams(model, ctx, mainWriter, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // loog '11'
            ctx.write(']');
            if (atype) {
                ctx.write(': ');
                if (!mainWriter.statementsContainer[atype.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
                }
                mainWriter.statementsContainer[atype.wzElement](atype, ctx, (err, notUsed) => {
                
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
    mainWriter.statementsContainer.typeAs = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeAs');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeAs. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        // loog 'typeAs.model.statements 1', model.statements
        var atype = u.extractTSSimpleType(model);
        // loog 'typeAs atype', atype
        // loog 'typeAs.model.statements 2', model.statements
        ctx.setLastNotEmptyLine();
        ctx.write(' as ');
        if (atype) {
            if (!mainWriter.statementsContainer[atype.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', atype.wzElement);
            }
            mainWriter.statementsContainer[atype.wzElement](atype, ctx, callback)
        }
        else {
            mainWriter.genItems(model.statements, ctx, callback)
        }
    }
    ;
    mainWriter.statementsContainer.typeLiteral = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeLiteral');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeLiteral. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.write(model.wzName);
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeMapped = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeMapped');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeMapped. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        
        // loog 'ts.module.gen.typeMapped', item.wzElement
        if (model.statements.length == 2) {
            var item = model.statements[0];
            if (!mainWriter.statementsContainer[item.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            ctx.write('[');
            mainWriter.statementsContainer[item.wzElement](item, ctx, 'mapped', (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(']');
                ctx.write(' : ');
                var item = model.statements[1];
                if (!mainWriter.statementsContainer[item.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', item.wzElement);
                }
                mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
            }
            )
        }
        else {
            return callback(ctx.error(':mapped typeMapped must have two children. found: ' + model.statements.length, model));
        }
    }
    ;
    mainWriter.statementsContainer.typeArrowFunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeArrowFunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeArrowFunction. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        var atype = u.extractTSSimpleType(model);
        u.genTSTypeParameters(model, ctx, mainWriter, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(model, ctx, mainWriter, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    mainWriter.statementsContainer.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
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
            if (!mainWriter.statementsContainer[atype.wzElement]) {
                console.log("[31m%s[0m", 'ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
            }
            mainWriter.statementsContainer[atype.wzElement](atype, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                mainWriter.genItems(model.statements, ctx, callback)
            }
            )
        }
        else {
            mainWriter.genItems(model.statements, ctx, callback)
        }
    }
    mainWriter.statementsContainer.typeExportAssignment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeExportAssignment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExportAssignment. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        ctx.w('export = ' + model.wzName + ';');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeImport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeImport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeImport. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
    mainWriter.statementsContainer.typeImportEqualsDeclaration = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeImportEqualsDeclaration');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeImportEqualsDeclaration. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
    mainWriter.statementsContainer.typeNamespaceExportDeclaration = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeNamespaceExportDeclaration');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNamespaceExportDeclaration. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('export as namespace ' + model.wzName + ';');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeCTorDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeCTorDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCTorDeclare. Got: ' + callback);
        }
        var name = model.wzName.trim();
        var model = writeComments(model, ctx);
        var atype = u.extractTSSimpleType(model);
        ctx.write('(');
        u.genTSParams(model, ctx, mainWriter, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (atype) {
                ctx.write(': ');
                if (!mainWriter.statementsContainer[atype.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
                }
                mainWriter.statementsContainer[atype.wzElement](atype, ctx, (err, notUsed) => {
                
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
    mainWriter.statementsContainer.typeCTor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeCTor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCTor. Got: ' + callback);
        }
        var name = model.wzName.trim();
        ctx.w('*** :ctor ' + model.wzName + ';');
        return callback(null);
    }
    ;
    mainWriter.statementsContainer.typeConditional = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.typeConditional');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeConditional. Got: ' + callback);
        }
        var name = model.wzName.trim();
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
        mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            typeConditional_extends(model, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(' ? ');
                item = model.typeThen.statements[0];
                mainWriter.statementsContainer[item.wzElement](item, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' : ');
                    item = model.typeElse.statements[0];
                    mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
                }
                )
            }
            )
        }
        )
    }
    ;
}
;
function typeConditional_extends(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.typeConditional_extends');
    }
    if (model.typeExtends) {
        ctx.write(' extends ');
        var item = model.typeExtends.statements[0];
        mainWriter.statementsContainer[item.wzElement](item, ctx, callback)
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
