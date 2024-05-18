/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\es6\method.js.ittf
    utc time: Thu, 16 May 2024 11:37:38 GMT
*/
'use strict';
var u = require('../utils/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.method';
md.gen = function(model, ctx, callback) {
    var method = model.wzName;
    u.writeComments(model, ctx);
    u.genTSDecorators(model, ctx, statement, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        u.genAccessorsAndExtra(model, ctx)
        if (model.static) {
            ctx.write('static ');
        }
        if (model.async) {
            ctx.write('async ');
        }
        ctx.write(method);
        u.genTSTypeParameters(model, ctx, statement, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(model, ctx, statement, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    statement.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        method_step_1(model, ctx, callback)
                    }
                    )
                }
                else {
                    method_step_1(model, ctx, callback)
                }
            }
            )
        }
        )
    }
    )
}
;
function method_step_1(model, ctx, callback) {
    ctx.w(' {');
    ctx.indent();
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
