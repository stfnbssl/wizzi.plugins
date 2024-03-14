/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\interface.js.ittf
    utc time: Wed, 13 Mar 2024 07:14:49 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.interface';
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
    cnt.stm.typeInterface = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeInterface');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInterface. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        // loog 'stm( typeInterface', model.extends
        ctx.write('interface ' + model.wzName);
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w(' {');
            cnt.genItems(model.statements, ctx, (err, notUsed) => {
            
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
    ;
    cnt.stm.typeProperty = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeProperty');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeProperty. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        u.genAccessorsAndExtra(model, ctx)
        ctx.write(model.wzName);
        if (model.typeOptional) {
            ctx.write('?');
        }
        var ptype = u.extractTSSimpleType(model);
        if (ptype) {
            ctx.write(': ');
            cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                var ivalue = u.extractTS(model, 'typeInitValue');
                if (ivalue) {
                    ctx.write(' = ');
                    statement.stm[ivalue.wzElement](ivalue, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        return callback(null);
                    }
                    )
                }
                else if (model.statements.length > 0) {
                    ctx.indent();
                    model.wzElement = 'jsObject';
                    cnt.genItem(model, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        model.wzElement = ':p';
                        ctx.deindent();
                        ctx.w('');
                        return callback(null);
                    }
                    )
                }
                else {
                    ctx.w(";");
                    return callback(null);
                }
            }
            )
        }
        else if (model.statements.length == 1) {
            ctx.write(': ');
            cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w(';');
                return callback(null);
            }
            )
        }
        else {
            callback(ctx.error(':type typeProperty must have one children. found: ' + model.statements.length, model))
        }
    }
    ;
    cnt.stm.typeMethod = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeMethod');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeMethod. Got: ' + callback);
        }
        var model = writeComments(model, ctx);
        u.genAccessorsAndExtra(model, ctx)
        var atype = u.extractTSSimpleType(model);
        // loog 'typeMethod atype', atype
        ctx.write(model.wzName);
        ctx.write('(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (atype) {
                if (!cnt.stm[atype.wzElement]) {
                    console.log("[31m%s[0m", 'ts.module.gen.item.wzElement not managed', atype.wzElement);
                }
                ctx.write(': ');
                cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    cnt.genItems(model.statements, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        return callback(null);
                    }
                    )
                }
                )
            }
            else {
                cnt.genItems(model.statements, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null);
                }
                )
            }
        }
        )
    }
    ;
}
;
