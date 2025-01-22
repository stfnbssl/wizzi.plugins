/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\artifacts\prisma\document\gen\main.js.ittf
    utc time: Sat, 14 Dec 2024 12:38:23 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var functionAttributes = ['default', 'relation', 'map'];

var myname = 'wizzi.plugin.prisma.artifacts.prisma.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    var modelTypeIsValid = verify.isObject(model);
    if (!modelTypeIsValid) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'prisma') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "prisma". Received: ' + model.wzElement, model));
    }
    try {
        md.prisma(model, ctx, (err, notUsed) => {
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
md.prisma = function(model, ctx, callback) {
    md.genItems(model.datasources, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        md.genItems(model.generators, ctx, {
            indent: false, 
            from: 0
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            md.genItems(model.models, ctx, {
                indent: false, 
                from: 0
             }, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
md.datasource = function(model, ctx, callback) {
    ctx.w('datasource ' + model.wzName + ' {');
    md.genItems(model.configs, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        ctx.w();
        return callback(null);
    }
    )
}
;
md.generator = function(model, ctx, callback) {
    ctx.w('generator ' + model.wzName + ' {');
    md.genItems(model.configs, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        ctx.w();
        return callback(null);
    }
    )
}
;
md.model = function(model, ctx, callback) {
    ctx.w('model ' + model.wzName + ' {');
    md.genItems(model.fields, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        md.genItems(model.blockAttributes, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            ctx.w();
            return callback(null);
        }
        )
    }
    )
}
;
md.config = function(model, ctx, callback) {
    ctx.write(model.wzName + ' = ');
    if (model.valueAssign) {
        ctx.write(model.valueAssign.getValueString())
    }
    ctx.w();
    return callback(null);
}
;
md.field = function(model, ctx, callback) {
    ctx.write(model.wzName);
    var space = model.wzName.length > 0 ? ' ' : '';
    ctx.write(space + model.getTypeString());
    md.genItems(model.fieldAttributes, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w();
        return callback(null);
    }
    )
}
;
md.fieldAttribute = function(model, ctx, callback) {
    var nv = lineParser.parseNameValueRaw(model.wzName, model);
    var name = nv.name();
    var value = nv.value();
    ctx.write(' @' + name);
    if (functionAttributes.indexOf(name) > - 1) {
        ctx.write('(');
    }
    if (model.valueAssigns.length > 0) {
        var seen = false;
        var i, i_items=model.valueAssigns, i_len=model.valueAssigns.length, item;
        for (i=0; i<i_len; i++) {
            item = model.valueAssigns[i];
            if (functionAttributes.indexOf(name) < 0) {
                ctx.write(' ')
            }
            else if (seen) {
                ctx.write(', ')
            }
            ctx.write(item.getValueString())
            seen = true;
        }
    }
    else {
        ctx.write(value)
    }
    if (functionAttributes.indexOf(name) > - 1) {
        ctx.write(')');
    }
    return callback(null);
}
;
md.blockAttribute = function(model, ctx, callback) {
    ctx.write('@@' + model.wzName + '(');
    var i, i_items=model.valueAssigns, i_len=model.valueAssigns.length, item;
    for (i=0; i<i_len; i++) {
        item = model.valueAssigns[i];
        ctx.write(item.getValueString())
    }
    ctx.w(')');
    return callback(null);
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
            method: 'wizzi.plugin.prisma/lib/artifacts/prisma/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}