/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\document\gen\statement.js.ittf
*/
'use strict';

var myname = 'wizzi.js.artifacts.module.gen.statement';

var verify = require('wizzi-utils').verify;

var zvar = require('./statements/var');
var objects = require('./statements/objects');
var xfunction = require('./statements/function');
var xclass = require('./statements/class');
var ifswitch = require('./statements/if-switch');
var statements = require('./statements/statements');
var expressions = require('./statements/expressions');
var call = require('./statements/call');
var loops = require('./statements/loops');
var arrays = require('./statements/arrays');
var exceptions = require('./statements/exceptions');
var wz = require('./statements/wz');
var html = require('./statements/html');
var debug = require('./statements/debug');
var test = require('./statements/test');
var template = require('./statements/template');
var react = require('./statements/react');
var xittf = require('./statements/xittf_extensions');
var graphql = require('./statements/graphql');
var handlebar = require('./statements/handlebar');
var iife = require('./statements/iife');

var include_writers = require('./include_writers');

var u = require('./utils/stm');

var md = module.exports = {};
md.stm = {};

zvar.load(md);
objects.load(md);
xfunction.load(md);
xclass.load(md);
ifswitch.load(md);
statements.load(md);
expressions.load(md);
call.load(md);
loops.load(md);
arrays.load(md);
exceptions.load(md);
wz.load(md);
html.load(md);
debug.load(md);
test.load(md);
template.load(md);
react.load(md);
xittf.load(md);
graphql.load(md);
handlebar.load(md);
iife.load(md);

md.gen = function(model, ctx, callback) {
    md.genItem(model, ctx, callback);
}
;
md.genMany = function(models, ctx, callback) {
    // log 131
    var len_1 = models.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = models[index_1];
        md.genItem(item_1, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            })
        }
        )
    }
    repeater_1(0);
    function next_1() {
        // log 134, 'genMany'
        return callback(null);
    }
}
;
md.genItem = function(model, ctx, callback) {
    var key = model.wzElement;
    if (['styleJsx'].indexOf(key) >= 0 && model.get_css) {
        var global = model.global ? ' global' : '';
        ctx.write("<style jsx");
        if (model.global) {
            ctx.write(" global");
        }
        ctx.w(">{`");
        include_writers.writeIncludeCss(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w("`}</style>");
            return callback(null);
        }
        )
    }
    else if (['styled'].indexOf(key) >= 0 && model.get_css) {
        var global = model.global ? ' global' : '';
        var nv = verify.parseNameValue(model.wzName);
        if (model.statements.length == 1) {
            if (model.wzName && model.wzName.length > 0) {
                ctx.w("const " + nv.name() + " = styled" + nv.value() + "(");
            }
            else {
                ctx.w("return css`");
            }
            ctx.indent();
            md.genItem(model.statements[0], ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w(")`");
                include_writers.writeIncludeCss(ctx, model, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.w("`");
                    return callback(null);
                }
                )
            }
            )
        }
        else {
            if (model.wzName && model.wzName.length > 0) {
                ctx.w("const " + nv.name() + " = styled" + nv.value() + "`");
            }
            else {
                ctx.w("return css`");
            }
            include_writers.writeIncludeCss(ctx, model, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w("`");
                return callback(null);
            }
            )
        }
    }
    else if (['keyframes'].indexOf(key) >= 0 && model.get_css) {
        var global = model.global ? ' global' : '';
        var nv = verify.parseNameValue(model.wzName);
        if (model.wzName && model.wzName.length > 0) {
            ctx.w("const " + nv.name() + " = keyframes`");
        }
        else {
            ctx.w("keyframes`");
        }
        include_writers.writeIncludeCss(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w("`");
            return callback(null);
        }
        )
    }
    else if (['styledCss'].indexOf(key) >= 0 && model.get_css) {
        var nv = verify.parseNameValue(model.wzName);
        if (model.wzName && model.wzName.length > 0) {
            ctx.w("const " + nv.name() + " = css`");
        }
        else {
            ctx.w("css`");
        }
        include_writers.writeIncludeCss(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w("`");
            return callback(null);
        }
        )
    }
    // log 132, key
    else {
        if (key === 'wzVar') {
            key = 'xvar';
        }
        else if (key === 'wzConst') {
            key = 'xconst';
        }
        else if (key === 'wzFunction') {
            key = 'xfunction';
        }
        var stm = md.stm[key];
        
        // log 133, key
        if (stm) {
            stm(model, ctx, callback);
        }
        else {
            console.log(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model, __filename);
            return callback(ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model));
        }
    }
}
;
md.genItemAs = function(model, asWzElement, ctx, callback) {
    var save = model.wzElement;
    model.wzElement = asWzElement;
    md.genItem(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        model.wzElement = save;
        return callback(null);
    }
    )
}
;
md.genItems = function(statements, ctx, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent,
        first = true;
    if (indent) {
        ctx.indent();
    }
    var len_1 = statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = statements[index_1];
        if (options.sep && !first) {
            ctx.write(options.sep);
        }
        md.genItem(item_1, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            first = false;
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            })
        }
        )
    }
    repeater_1(from);
    function next_1() {
        if (indent) {
            ctx.deindent();
        }
        return callback(null);
    }
}
;
md.stm.codeline = function(model, ctx, callback) {
    // loog 'codeline ', model.wzName
    
    // _ ctx.w(model.wzName)
    if (u.isTopStatement(model, ctx)) {
        ctx.write(model.wzName);
    }
    else {
        ctx.write(model.wzName);
    }
    md.genItems(model.items, ctx, callback);
}
;
