/*
    artifact generator: C:\My\wizzi\stfnbssl\previous\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\html.js.ittf
    utc time: Sun, 28 Jan 2024 14:34:30 GMT
*/
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.html';
md.gen = function(model, ctx, callback) {
    var clazz = model.wzParent.wzName,
        method = model.wzName;
    ctx.w(clazz + '.prototype.' + method + ' = function(ctx) {');
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
