/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.c\.wizzi-override\lib\artifacts\c\module\gen\writers\index.js.ittf
*/
'use strict';

var myname = 'wizzi.plugins.c.lib.artifacts.module.gen.writers.index';

var verify = require('wizzi-utils').verify;

var xfunction = require('./function');
var set = require('./set');
var control = require('./control');
var debug = require('./debug');

var md = module.exports = {};
md.statementsContainer = {};
md.statementsContainer.codeline = function(model, ctx, callback) {
    ctx.w(model.wzTag + ' ' + model.wzName);
    md.genItems(model.statements, ctx, callback);
}
;
md.statementsContainer.statement = function(model, ctx, callback) {
    ctx.w('// ' + model.wzName);
    md.genItems(model.statements, ctx, callback);
}
;
md.statementsContainer.plusline = function(model, ctx, callback) {
    ctx.w(model.wzName);
    md.genItems(model.statements, ctx, callback);
}
;
md.statementsContainer.multilinecomment = function(model, ctx, callback) {
    ctx.w(model.wzTag + ' ' + model.wzName);
    ctx.indent();
    md.writeLinesTreeAsIs(model, ctx)
    ctx.deindent();
    ctx.w('*/');
    return callback(null);
}
;
md.writeLinesTreeAsIs = function(model, ctx) {
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        ctx.w(item.wzTag + ' ' + item.wzName);
        ctx.indent();
        md.writeLinesTreeAsIs(item, ctx)
        ctx.deindent();
    }
}
;
md.gen = function(model, ctx, callback) {
    md.genItem(model, ctx, callback);
}
;
md.genMany = function(models, ctx, callback) {
    var item_count = 0;
    (function next() {
        var item = models[item_count++];
        if (!item) {
            return callback(null);
        }
        md.genItem(item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            next();
        }
        )
    })();
}
;
md.genItem = function(model, ctx, callback) {
    var stm = md.statementsContainer[model.wzElement];
    if (stm) {
        stm(model, ctx, callback);
    }
    else {
        console.log("[31m%s[0m", myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
        return callback(ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model));
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
        sep = opt.sep,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent,
        first = true;
    if (indent) {
        ctx.indent();
    }
    var item_count = 0;
    (function next() {
        var item = statements[item_count++];
        if (!item) {
            if (indent) {
                ctx.deindent();
            }
            return callback(null);
        }
        if (sep && !first) {
            ctx.write(sep);
        }
        md.genItem(item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            first = false;
            next();
        }
        )
    })();
}
;
md.isTopStatement = function(model) {
    if (!model.wzParent) {
        return true;
    }
    var prnElement = model.wzParent.wzElement;
    return notTopElement.indexOf(prnElement) < 0;
}
;
md.withSemicolon = function(text) {
    return text.endsWith(';') ? text : text + ';';
}
;
md.getFirstChildren = function(model, elements) {
    elements = elements || [];
    if (model.statements && model.statements.length > 0) {
        var i, i_items=model.statements, i_len=model.statements.length, stm;
        for (i=0; i<i_len; i++) {
            stm = model.statements[i];
            if (elements.indexOf(stm.wzElement) > -1) {
                return stm;
            }
        }
    }
    return null;
}
;

var notTopElement = [
    'set', 
    'call', 
    'object', 
    'array'
];

xfunction.loadStatementWriters(md);
set.loadStatementWriters(md);
control.loadStatementWriters(md);
debug.loadStatementWriters(md);

