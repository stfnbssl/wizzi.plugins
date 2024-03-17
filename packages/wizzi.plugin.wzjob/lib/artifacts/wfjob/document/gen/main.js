/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzjob\.wizzi-override\lib\artifacts\wfjob\document\gen\main.js.ittf
    utc time: Fri, 15 Mar 2024 07:53:19 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('wizzi-utils').helpers.lineParser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.wzjob.artifacts.wfjob.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'wfjob') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "wfjob". Received: ' + model.wzElement, model));
    }
    try {
        md.wfjob(model, ctx, (err, notUsed) => {
        
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
md.wfjob = function(model, ctx, callback) {
    ctx.write('<wfjob');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.modelsBaseFolder && (model.modelsBaseFolder.length > 0 || model.modelsBaseFolder == true)) {
        ctx.write(' modelsBaseFolder=' + model.modelsBaseFolder);
    }
    if (model.destBaseFolder && (model.destBaseFolder.length > 0 || model.destBaseFolder == true)) {
        ctx.write(' destBaseFolder=' + model.destBaseFolder);
    }
    if (model.title && (model.title.length > 0 || model.title == true)) {
        ctx.write(' title=' + model.title);
    }
    ctx.w('>');
    md.genItems(model.requires, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.models, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.lines, ctx, {
                indent: true, 
                from: 0
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                md.genItems(model.productions, ctx, {
                    indent: true, 
                    from: 0
                 }, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    md.genItems(model.execFiles, ctx, {
                        indent: true, 
                        from: 0
                     }, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        md.genItems(model.comments, ctx, {
                            indent: true, 
                            from: 0
                         }, (err, notUsed) => {
                        
                            if (err) {
                                return callback(err);
                            }
                            ctx.w('</wfjob>');
                            return callback(null);
                        }
                        )
                    }
                    )
                }
                )
            }
            )
        }
        )
    }
    )
}
;
md.require = function(model, ctx, callback) {
    ctx.write('<require');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    ctx.w('>');
    ctx.w('</require>');
    return callback(null);
}
;
md.model = function(model, ctx, callback) {
    ctx.write('<model');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.src && (model.src.length > 0 || model.src == true)) {
        ctx.write(' src=' + model.src);
    }
    if (model.schema && (model.schema.length > 0 || model.schema == true)) {
        ctx.write(' schema=' + model.schema);
    }
    if (model.format && (model.format.length > 0 || model.format == true)) {
        ctx.write(' format=' + model.format);
    }
    if (model.dumpFile && (model.dumpFile.length > 0 || model.dumpFile == true)) {
        ctx.write(' dumpFile=' + model.dumpFile);
    }
    if (model.exportName && (model.exportName.length > 0 || model.exportName == true)) {
        ctx.write(' exportName=' + model.exportName);
    }
    ctx.w('>');
    md.genItems(model.modelRefs, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.comments, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</model>');
            return callback(null);
        }
        )
    }
    )
}
;
md.modelRef = function(model, ctx, callback) {
    ctx.write('<modelRef');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.exportName && (model.exportName.length > 0 || model.exportName == true)) {
        ctx.write(' exportName=' + model.exportName);
    }
    ctx.w('>');
    md.genItems(model.transformers, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.modelCollections, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.comments, ctx, {
                indent: true, 
                from: 0
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('</modelRef>');
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
md.modelCollection = function(model, ctx, callback) {
    ctx.write('<modelCollection');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.itemName && (model.itemName.length > 0 || model.itemName == true)) {
        ctx.write(' itemName=' + model.itemName);
    }
    ctx.w('>');
    md.genItems(model.pathTemplateValues, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.comments, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</modelCollection>');
            return callback(null);
        }
        )
    }
    )
}
;
md.pathTemplateValue = function(model, ctx, callback) {
    ctx.write('<pathTemplateValue');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.attribute && (model.attribute.length > 0 || model.attribute == true)) {
        ctx.write(' attribute=' + model.attribute);
    }
    if (model.function && (model.function.length > 0 || model.function == true)) {
        ctx.write(' function=' + model.function);
    }
    if (model.token && (model.token.length > 0 || model.token == true)) {
        ctx.write(' token=' + model.token);
    }
    ctx.w('>');
    md.genItems(model.comments, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</pathTemplateValue>');
        return callback(null);
    }
    )
}
;
md.comment = function(model, ctx, callback) {
    ctx.write('<comment');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    ctx.w('>');
    ctx.w('</comment>');
    return callback(null);
}
;
md.line = function(model, ctx, callback) {
    ctx.write('<line');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.cwdFolder && (model.cwdFolder.length > 0 || model.cwdFolder == true)) {
        ctx.write(' cwdFolder=' + model.cwdFolder);
    }
    if (model.destFolder && (model.destFolder.length > 0 || model.destFolder == true)) {
        ctx.write(' destFolder=' + model.destFolder);
    }
    ctx.w('>');
    md.genItems(model.artifacts, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.comments, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</line>');
            return callback(null);
        }
        )
    }
    )
}
;
md.artifact = function(model, ctx, callback) {
    ctx.write('<artifact');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.src && (model.src.length > 0 || model.src == true)) {
        ctx.write(' src=' + model.src);
    }
    if (model.ignore && (model.ignore.length > 0 || model.ignore == true)) {
        ctx.write(' ignore=' + model.ignore);
    }
    if (model.schema && (model.schema.length > 0 || model.schema == true)) {
        ctx.write(' schema=' + model.schema);
    }
    if (model.format && (model.format.length > 0 || model.format == true)) {
        ctx.write(' format=' + model.format);
    }
    if (model.isCompile && (model.isCompile.length > 0 || model.isCompile == true)) {
        ctx.write(' isCompile=' + model.isCompile);
    }
    if (model.isWfJob && (model.isWfJob.length > 0 || model.isWfJob == true)) {
        ctx.write(' isWfJob=' + model.isWfJob);
    }
    if (model.isWfModelType && (model.isWfModelType.length > 0 || model.isWfModelType == true)) {
        ctx.write(' isWfModelType=' + model.isWfModelType);
    }
    if (model.generator && (model.generator.length > 0 || model.generator == true)) {
        ctx.write(' generator=' + model.generator);
    }
    if (model.destPath && (model.destPath.length > 0 || model.destPath == true)) {
        ctx.write(' destPath=' + model.destPath);
    }
    if (model.extension && (model.extension.length > 0 || model.extension == true)) {
        ctx.write(' extension=' + model.extension);
    }
    if (model.collection && (model.collection.length > 0 || model.collection == true)) {
        ctx.write(' collection=' + model.collection);
    }
    if (model.noOutput && (model.noOutput.length > 0 || model.noOutput == true)) {
        ctx.write(' noOutput=' + model.noOutput);
    }
    if (model.noOutput && (model.noOutput.length > 0 || model.noOutput == true)) {
        ctx.write(' noOutput=' + model.noOutput);
    }
    ctx.w('>');
    md.genItems(model.transformers, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.modelRefs, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.comments, ctx, {
                indent: true, 
                from: 0
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('</artifact>');
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
md.transformer = function(model, ctx, callback) {
    ctx.write('<transformer');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.type && (model.type.length > 0 || model.type == true)) {
        ctx.write(' type=' + model.type);
    }
    ctx.w('>');
    ctx.w('</transformer>');
    return callback(null);
}
;
md.production = function(model, ctx, callback) {
    ctx.write('<production');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.destFolder && (model.destFolder.length > 0 || model.destFolder == true)) {
        ctx.write(' destFolder=' + model.destFolder);
    }
    ctx.w('>');
    md.genItems(model.lineRefs, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.modelRefs, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.comments, ctx, {
                indent: true, 
                from: 0
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('</production>');
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
md.lineRef = function(model, ctx, callback) {
    ctx.write('<lineRef');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    md.genItems(model.comments, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</lineRef>');
        return callback(null);
    }
    )
}
;
md.env = function(model, ctx, callback) {
    ctx.write('<env');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.__name && (model.__name.length > 0 || model.__name == true)) {
        ctx.write(' __name=' + model.__name);
    }
    if (model.__value && (model.__value.length > 0 || model.__value == true)) {
        ctx.write(' __value=' + model.__value);
    }
    if (model.type && (model.type.length > 0 || model.type == true)) {
        ctx.write(' type=' + model.type);
    }
    ctx.w('>');
    ctx.w('</env>');
    return callback(null);
}
;
md.arg = function(model, ctx, callback) {
    ctx.write('<arg');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.__name && (model.__name.length > 0 || model.__name == true)) {
        ctx.write(' __name=' + model.__name);
    }
    if (model.__value && (model.__value.length > 0 || model.__value == true)) {
        ctx.write(' __value=' + model.__value);
    }
    if (model.type && (model.type.length > 0 || model.type == true)) {
        ctx.write(' type=' + model.type);
    }
    ctx.w('>');
    ctx.w('</arg>');
    return callback(null);
}
;
md.execFile = function(model, ctx, callback) {
    ctx.write('<execFile');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.exePath && (model.exePath.length > 0 || model.exePath == true)) {
        ctx.write(' exePath=' + model.exePath);
    }
    if (model.title && (model.title.length > 0 || model.title == true)) {
        ctx.write(' title=' + model.title);
    }
    if (model.cwd && (model.cwd.length > 0 || model.cwd == true)) {
        ctx.write(' cwd=' + model.cwd);
    }
    if (model.encoding && (model.encoding.length > 0 || model.encoding == true)) {
        ctx.write(' encoding=' + model.encoding);
    }
    if (model.timeout && (model.timeout.length > 0 || model.timeout == true)) {
        ctx.write(' timeout=' + model.timeout);
    }
    ctx.w('>');
    ctx.write('<options');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName=' + model.wzName);
    }
    if (model.cwd && (model.cwd.length > 0 || model.cwd == true)) {
        ctx.write(' cwd=' + model.cwd);
    }
    if (model.encoding && (model.encoding.length > 0 || model.encoding == true)) {
        ctx.write(' encoding=' + model.encoding);
    }
    if (model.timeout && (model.timeout.length > 0 || model.timeout == true)) {
        ctx.write(' timeout=' + model.timeout);
    }
    ctx.w('>');
    ctx.w('</options>');
    md.genItems(model.args, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.env, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.comments, ctx, {
                indent: true, 
                from: 0
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('</execFile>');
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isAttrValue(a, v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}
function getAttrs(e) {
    var retval = [];
    for (var a in e) {
        if (isAttrValue(a, e[a])) {
            retval.push({ name: verify.replaceAll(a, '_', '-'), value: e[a] });
        }
        else if (a.substr(0, 3) === 'ng-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'data-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'aria-') {
            retval.push({ name: a, value: e[a] });
        }
    }
    if (e.attributes) {
        var i, i_items=e.attributes, i_len=e.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = e.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                retval.push({ name: p.name(), value: p.value() });
            }
            else {
                retval.push({ name: p.name() });
            }
        }
    }
    return retval;
}

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
            method: 'wizzi.plugin.wzjob/lib/artifacts/wfjob/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
