/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\es6\get.js.ittf
    utc time: Thu, 16 May 2024 04:18:27 GMT
*/
'use strict';
var u = require('../utils/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.ts.artifacts.module.gen.codegen.es6.get';
md.gen = function(model, ctx, callback) {
    u.writeComments(model, ctx);
    u.genAccessorsAndExtra(model, ctx)
    if (model.static) {
        ctx.write('static ');
    }
    ctx.write('get ' + model.wzName + '()');
    if (model.typeReturn) {
        ctx.write(': ');
        statement.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            get_step_1(model, ctx, callback)
        }
        )
    }
    else {
        get_step_1(model, ctx, callback)
    }
}
;
function get_step_1(model, ctx, callback) {
    ctx.w(' {');
    statement.genItems(model.statements, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null);
    }
    )
}
