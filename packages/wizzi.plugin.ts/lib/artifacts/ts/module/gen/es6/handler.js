/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\es6\handler.js.ittf
    utc time: Wed, 13 Mar 2024 07:14:49 GMT
*/
'use strict';
var u = require('../utils/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.handler';
md.gen = function(model, ctx, callback) {
    var method = model.wzName;
    u.writeComments(model, ctx);
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
        var isSingleParam = u.isSingleParamForArrowFunction(model);
        ctx.write(' = ' + (isSingleParam ? '' : '('));
        u.genTSParams(model, ctx, statement, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(isSingleParam ? '' : ')');
            function writeBody() {
                var ir = u.isImplicitReturn(model);
                var ts = u.isTopStatement(model, ctx);
                ctx.w(' => ' + (ir ? '' : '{'));
                ctx.indent();
                statement.genMany(model.statements, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.deindent();
                    ctx.write(ir ? '' : '}');
                    ctx.w(ts ? ';' : '');
                    return callback(null);
                }
                )
            }
            if (model.typeReturn) {
                ctx.write(': ');
                statement.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    writeBody();
                }
                )
            }
            else {
                writeBody();
            }
        }
        )
    }
    )
}
;
