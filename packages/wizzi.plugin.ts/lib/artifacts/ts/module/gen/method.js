/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\method.js.ittf
    utc time: Thu, 16 May 2024 04:18:27 GMT
*/
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.method';
md.gen = function(model, ctx, callback) {
    var clazz = model.wzParent.wzName,
        method = model.wzName;
    if (model.static) {
        ctx.write('static ');
    }
    if (model.async) {
        ctx.write('async ');
    }
    if (ctx.__is_react_class) {
        ctx.w(method + '(' + model.paramNames.join(', ') + ') {');
    }
    else if (model.static) {
        ctx.w(clazz + '.' + method + ' = function(' + model.paramNames.join(', ') + ') {');
    }
    else {
        ctx.w(clazz + '.prototype.' + method + ' = function(' + model.paramNames.join(', ') + ') {');
    }
    ctx.indent();
    generateParams(model.wzName, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        statement.genMany(model.statements, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
    )
}
;
function generateReturnType(model, ctx) {
    var rtype = u.extractTS(model, 'typeReturn');
    if (rtype) {
        cnt.stm[rtype.wzElement](rtype, ctx, () => {});
    }
}
function generateParams(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
    return callback(null);
}
