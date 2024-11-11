/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\wziife.js.ittf
    utc time: Wed, 30 Oct 2024 04:22:27 GMT
*/
var _ = require('lodash');
var statement = require('./statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.wziife';
md.gen = function(model, ctx, callback) {
    var invokeCall = null;
    if (model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'callOnValue') {
        invokeCall = model.statements[model.statements.length - 1];
        model.statements.splice(model.statements.length - 1, 1);
    }
    var parameters = _.concat([
        '__'
    ], model.paramNames);
    ctx.w('var ' + model.wzName + ' = (function(' + parameters.join(',') + ') {');
    // constraints
    ctx.indent();
    // sync function
    generateParamConstraints('iife ' + model.wzName, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            // loog 'wizzi-js.wziife', item_1.wzElement, item_1.wzName
            statement.gen(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                return process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
            }
            )
        }
        repeater_1(0);
        function next_1() {
            var seen = false;
            ctx.w('return {');
            var i, i_items=model.__wzItems.vars, i_len=model.__wzItems.vars.length, item;
            for (i=0; i<i_len; i++) {
                item = model.__wzItems.vars[i];
                if (seen) {
                    ctx.w(',');
                }
                var ss = item.wzName.split(' ');
                ctx.write('    ' + ss[0] + ': ' + ss[0]);
                seen = true;
            }
            var i, i_items=model.__wzItems.consts, i_len=model.__wzItems.consts.length, item;
            for (i=0; i<i_len; i++) {
                item = model.__wzItems.consts[i];
                if (seen) {
                    ctx.w(', ');
                }
                var ss = item.wzName.split(' ');
                ctx.write('    ' + ss[0] + ': ' + ss[0]);
                seen = true;
            }
            var i, i_items=model.__wzItems.functions, i_len=model.__wzItems.functions.length, item;
            for (i=0; i<i_len; i++) {
                item = model.__wzItems.functions[i];
                if (seen) {
                    ctx.w(', ');
                }
                ctx.write('    ' + item.wzName + ': ' + item.wzName);
                seen = true;
            }
            var i, i_items=model.__wzItems.classes, i_len=model.__wzItems.classes.length, item;
            for (i=0; i<i_len; i++) {
                item = model.__wzItems.classes[i];
                if (seen) {
                    ctx.w(', ');
                }
                ctx.write('    ' + item.wzName + ': ' + item.wzName);
                seen = true;
            }
            if (seen) {
                ctx.w('');
            }
            ctx.w('};');
            ctx.deindent();
            ctx.w('})');
            if (invokeCall) {
                statement.gen(invokeCall, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null);
                }
                )
            }
            else {
                ctx.w('()');
                ctx.w(';');
                return callback(null);
            }
        }
    }
    )
}
;