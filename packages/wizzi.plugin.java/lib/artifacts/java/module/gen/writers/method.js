/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.java\.wizzi-override\lib\artifacts\java\module\gen\writers\method.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var errors = require('wizzi-utils').errors;
var h = require('./helpers');

var myname = 'method';
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
    mainWriter.statementsContainer.method = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in container.stm: ' + myname + '.method');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.method. Got: ' + callback);
        }
        var name = model.wzName.trim();
        h.writeComments(model, ctx);
        h.genTSDecorators(model, ctx, mainWriter, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            h.genAccessorsAndExtra(model, ctx)
            if (model.public) {
                ctx.write('public ');
            }
            if (model.protected) {
                ctx.write('protected ');
            }
            if (model.private) {
                ctx.write('private ');
            }
            if (model.static) {
                ctx.write('static ');
            }
            if (model.abstract) {
                ctx.write('abstract ');
            }
            if (model.final) {
                ctx.write('final ');
            }
            if (model.native) {
                ctx.write('native ');
            }
            if (model.synchronized) {
                ctx.write('synchronized ');
            }
            if (model.transient) {
                ctx.write('transient ');
            }
            if (model.volatile) {
                ctx.write('volatile ');
            }
            if (model.strictfp) {
                ctx.write('strictfp ');
            }
            if (model.typeReturn) {
                mainWriter.statementsContainer.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    method_step_1(model, ctx, callback)
                }
                )
            }
            else {
                ctx.write('void ');
                method_step_1(model, ctx, callback)
            }
        }
        )
    }
    ;
    function method_step_1(model, ctx, callback) {
        var method = model.wzName;
        ctx.write(method);
        h.genTSTypeParameters(model, ctx, mainWriter, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            h.genTSParams(model, ctx, mainWriter, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                method_step_2(model, ctx, callback)
            }
            )
        }
        )
    }
    function method_step_2(model, ctx, callback) {
        ctx.w(' {');
        ctx.indent();
        mainWriter.genMany(model.statements, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
}
;
