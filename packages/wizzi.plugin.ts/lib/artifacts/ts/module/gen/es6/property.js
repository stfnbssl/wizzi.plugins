/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\es6\property.js.ittf
    utc time: Sat, 20 Apr 2024 03:37:17 GMT
*/
'use strict';
var u = require('../utils/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.ts.artifacts.module.gen.codegen.es6.property';
md.gen = function(model, ctx, callback) {
    u.writeComments(model, ctx);
    u.genTSDecorators(model, ctx, statement, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        u.genAccessorsAndExtra(model, ctx)
        if (model.static) {
            ctx.write('static ');
        }
        ctx.write(model.wzName);
        var ptype = u.extractTSSimpleType(model);
        if (ptype) {
            ctx.write(': ');
            statement.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                property_step_1(model, ctx, callback)
            }
            )
        }
        else {
            property_step_1(model, ctx, callback)
        }
    }
    )
}
;
function property_step_1(model, ctx, callback) {
    // loog 'property_step_1', model
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
    else if (model.statements.length > 0 && model.statements[0].wzElement === 'jsPropertyOrValue') {
        ctx.indent();
        model.wzElement = 'jsObject';
        statement.gen(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            model.wzElement = 'p';
            ctx.deindent();
            ctx.w(';');
            return callback(null);
        }
        )
    }
    else if (model.statements.length == 1) {
        ctx.write(' = ');
        statement.gen(model.statements[0], ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w(';');
            return callback(null);
        }
        )
    }
    else if (model.statements.length > 1) {
        return callback(ctx.error('es6.property more than 1children not managed. children: ' + model.statements.length, model));
    }
    else {
        ctx.w(';');
        return callback(null);
    }
}
