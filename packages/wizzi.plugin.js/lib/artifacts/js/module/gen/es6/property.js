/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\es6\property.js.ittf
    utc time: Sat, 03 Aug 2024 03:24:07 GMT
*/
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.es6.property';
md.gen = function(model, ctx, callback) {
    var hasChildren = model.statements.length > 0;
    if (hasChildren) {
        if (model.static) {
            ctx.write('static ' + model.wzName + ' = ');
        }
        else {
            ctx.write(model.wzName + ' = ');
        }
        ctx.indent();
        var saveName = model.wzName;
        model.wzName = '';
        model.wzElement = 'jsObject';
        statement.gen(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            model.wzElement = 'p';
            model.wzName = saveName;
            ctx.deindent();
            ctx.w('');
            return callback(null);
        }
        )
    }
    else {
        if (model.static) {
            ctx.write('static ' + model.wzName + ';');
        }
        else {
            ctx.write(model.wzName + ';');
        }
        ctx.w('');
        return callback(null);
    }
}
;