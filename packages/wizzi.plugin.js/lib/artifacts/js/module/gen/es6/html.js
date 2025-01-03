/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\es6\html.js.ittf
    utc time: Sat, 03 Aug 2024 03:24:07 GMT
*/
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.es6.html';
md.gen = function(model, ctx, callback) {
    var method = model.wzName,
        args = (model.getParams && model.getParams()) || '';
    ctx.w(method + '(' + args + ') {');
    ctx.indent();
    ctx.w('var __html = [];');
    ctx.__inside_html = true;
    statement.genMany(model.statements, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__inside_html = false;
        ctx.w("return __html.join('');");
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    }
    )
}
;