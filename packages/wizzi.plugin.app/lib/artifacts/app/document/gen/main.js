/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.app\.wizzi-override\lib\artifacts\app\document\gen\main.js.ittf
    utc time: Mon, 20 Jan 2025 16:29:21 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var included_writers = require('./included_writers');

var myname = 'wizzi.plugin.app.artifacts.app.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    var modelTypeIsValid = verify.isObject(model);
    if (!modelTypeIsValid) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'app') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "app". Received: ' + model.wzElement, model));
    }
    try {
        md.app(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            // generation OK
            else {
                return callback(null, ctx);
            }
        }
        )
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
    function terminate_gen(model, ctx, callback) {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            return callback(null, ctx);
        }
    }
}
;

// ITTF Fragment lib/artifacts/tfolder/async-md-gen-items.js.ittf
md.genItems = function(items, ctx, options, callback) {
    if (typeof callback == 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.mapItem(ctx), (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        process.nextTick(callback)
    }
    )
}
;
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
}
;
md.genItem = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
    }
}
;
md.app = function(model, ctx, callback) {
    ctx.w('<app>');
    md.genItems(model.items, ctx, {
        indent: true
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('</app>');
        return callback(null);
    }
    )
}
;
md.jsonInclude = function(model, ctx, callback) {
    ctx.write('<script');
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_json) {
        included_writers.writeIncludeJson(ctx, model, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        }
        )
    }
    else {
        ctx.w("</script>");
        return callback(null, true);
    }
}
;

/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.app/lib/artifacts/app/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}