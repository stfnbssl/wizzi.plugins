/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wfschema\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');
var included_writers = require('./included_writers');

var myname = 'wizzi.plugin.wzschema.artifacts.wfschema.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'wfschema') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "wfschema". Received: ' + model.wzElement, model))
    }
    try {
        md.wfschema(model, ctx, (err, notUsed) => {
        
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
    function terminate_gen(model, ctx) {
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
md.wfschema = function(model, ctx, callback) {
    ctx.write('<wfschema');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.preserveTags && (model.preserveTags.length > 0 || model.preserveTags == true)) {
        ctx.write(' preserveTags="' + model.preserveTags.replace(/\"/g, "'") + '"')
    }
    if (model.mTreeIsPreprocessed && (model.mTreeIsPreprocessed.length > 0 || model.mTreeIsPreprocessed == true)) {
        ctx.write(' mTreeIsPreprocessed="' + model.mTreeIsPreprocessed.replace(/\"/g, "'") + '"')
    }
    if (model.unknownElementReplacer && (model.unknownElementReplacer.length > 0 || model.unknownElementReplacer == true)) {
        ctx.write(' unknownElementReplacer="' + model.unknownElementReplacer.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.exportTos, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.requires, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.declares, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                md.genItems(model.methods, ctx, {
                    indent: true
                 }, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    md.genItems(model.elements, ctx, {
                        indent: true
                     }, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        md.genItems(model.comments, ctx, {
                            indent: true
                         }, (err, notUsed) => {
                        
                            if (err) {
                                return callback(err);
                            }
                            ctx.w('</wfschema>');
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
md.exportTo = function(model, ctx, callback) {
    ctx.write('<exportTo');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</exportTo>');
    return callback(null);
}
;
md.require = function(model, ctx, callback) {
    ctx.write('<require');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.kind && (model.kind.length > 0 || model.kind == true)) {
        ctx.write(' kind="' + model.kind.replace(/\"/g, "'") + '"')
    }
    if (model.declareVar && (model.declareVar.length > 0 || model.declareVar == true)) {
        ctx.write(' declareVar="' + model.declareVar.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</require>');
    return callback(null);
}
;
md.declare = function(model, ctx, callback) {
    ctx.write('<declare');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    // _md_gen_items( statements, indent )
    ctx.w('</declare>');
    return callback(null);
}
;
md.method = function(model, ctx, callback) {
    ctx.write('<method');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.emitkey && (model.emitkey.length > 0 || model.emitkey == true)) {
        ctx.write(' emitkey="' + model.emitkey.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.params, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.requires, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // _md_gen_items( statements, indent )
            ctx.w('</method>');
            return callback(null);
        }
        )
    }
    )
}
;
md.param = function(model, ctx, callback) {
    ctx.write('<param');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</param>');
    return callback(null);
}
;
md.element = function(model, ctx, callback) {
    ctx.write('<element');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.super && (model.super.length > 0 || model.super == true)) {
        ctx.write(' super="' + model.super.replace(/\"/g, "'") + '"')
    }
    if (model.isAbstract && (model.isAbstract.length > 0 || model.isAbstract == true)) {
        ctx.write(' isAbstract="' + model.isAbstract.replace(/\"/g, "'") + '"')
    }
    if (model.tagInternal && (model.tagInternal.length > 0 || model.tagInternal == true)) {
        ctx.write(' tagInternal="' + model.tagInternal.replace(/\"/g, "'") + '"')
    }
    if (model.xmlTagInternal && (model.xmlTagInternal.length > 0 || model.xmlTagInternal == true)) {
        ctx.write(' xmlTagInternal="' + model.xmlTagInternal.replace(/\"/g, "'") + '"')
    }
    if (model.tagType && (model.tagType.length > 0 || model.tagType == true)) {
        ctx.write(' tagType="' + model.tagType.replace(/\"/g, "'") + '"')
    }
    if (model.acceptAnyTag && (model.acceptAnyTag.length > 0 || model.acceptAnyTag == true)) {
        ctx.write(' acceptAnyTag="' + model.acceptAnyTag.replace(/\"/g, "'") + '"')
    }
    if (model.nameIsRequired && (model.nameIsRequired.length > 0 || model.nameIsRequired == true)) {
        ctx.write(' nameIsRequired="' + model.nameIsRequired.replace(/\"/g, "'") + '"')
    }
    if (model.addToChildren && (model.addToChildren.length > 0 || model.addToChildren == true)) {
        ctx.write(' addToChildren="' + model.addToChildren.replace(/\"/g, "'") + '"')
    }
    if (model.hasMTreeData && (model.hasMTreeData.length > 0 || model.hasMTreeData == true)) {
        ctx.write(' hasMTreeData="' + model.hasMTreeData.replace(/\"/g, "'") + '"')
    }
    if (model.suppressCollectionEmit && (model.suppressCollectionEmit.length > 0 || model.suppressCollectionEmit == true)) {
        ctx.write(' suppressCollectionEmit="' + model.suppressCollectionEmit.replace(/\"/g, "'") + '"')
    }
    if (model.isRoot && (model.isRoot.length > 0 || model.isRoot == true)) {
        ctx.write(' isRoot="' + model.isRoot.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.attributes, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.relations, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            md.genItems(model.restricts, ctx, {
                indent: true
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                md.genItems(model.methods, ctx, {
                    indent: true
                 }, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    md.genItems(model.includes, ctx, {
                        indent: true
                     }, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        md.genItems(model.comments, ctx, {
                            indent: true
                         }, (err, notUsed) => {
                        
                            if (err) {
                                return callback(err);
                            }
                            ctx.w('</element>');
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
md.attribute = function(model, ctx, callback) {
    ctx.write('<attribute');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.tagInternal && (model.tagInternal.length > 0 || model.tagInternal == true)) {
        ctx.write(' tagInternal="' + model.tagInternal.replace(/\"/g, "'") + '"')
    }
    if (model.type && (model.type.length > 0 || model.type == true)) {
        ctx.write(' type="' + model.type.replace(/\"/g, "'") + '"')
    }
    if (model.default && (model.default.length > 0 || model.default == true)) {
        ctx.write(' default="' + model.default.replace(/\"/g, "'") + '"')
    }
    if (model.isRequired && (model.isRequired.length > 0 || model.isRequired == true)) {
        ctx.write(' isRequired="' + model.isRequired.replace(/\"/g, "'") + '"')
    }
    if (model.isDataType && (model.isDataType.length > 0 || model.isDataType == true)) {
        ctx.write(' isDataType="' + model.isDataType.replace(/\"/g, "'") + '"')
    }
    if (model.isDataType && (model.isDataType.length > 0 || model.isDataType == true)) {
        ctx.write(' isDataType="' + model.isDataType.replace(/\"/g, "'") + '"')
    }
    if (model.defaultWhenDeclared && (model.defaultWhenDeclared.length > 0 || model.defaultWhenDeclared == true)) {
        ctx.write(' defaultWhenDeclared="' + model.defaultWhenDeclared.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.restricts, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.comments, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</attribute>');
            return callback(null);
        }
        )
    }
    )
}
;
md.restrict = function(model, ctx, callback) {
    ctx.write('<restrict');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.facets, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</restrict>');
        return callback(null);
    }
    )
}
;
md.enumFacet = function(model, ctx, callback) {
    ctx.write('<enumFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</enumFacet>');
    return callback(null);
}
;
md.maxLengthFacet = function(model, ctx, callback) {
    ctx.write('<maxLengthFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</maxLengthFacet>');
    return callback(null);
}
;
md.minLengthFacet = function(model, ctx, callback) {
    ctx.write('<minLengthFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</minLengthFacet>');
    return callback(null);
}
;
md.maxValueFacet = function(model, ctx, callback) {
    ctx.write('<maxValueFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</maxValueFacet>');
    return callback(null);
}
;
md.minValueFacet = function(model, ctx, callback) {
    ctx.write('<minValueFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</minValueFacet>');
    return callback(null);
}
;
md.regexpFacet = function(model, ctx, callback) {
    ctx.write('<regexpFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</regexpFacet>');
    return callback(null);
}
;
md.elementFacet = function(model, ctx, callback) {
    ctx.write('<elementFacet');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    ctx.w('</elementFacet>');
    return callback(null);
}
;
md.relation = function(model, ctx, callback) {
    ctx.write('<relation');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    if (model.isOneToOne && (model.isOneToOne.length > 0 || model.isOneToOne == true)) {
        ctx.write(' isOneToOne="' + model.isOneToOne.replace(/\"/g, "'") + '"')
    }
    if (model.noGetMethod && (model.noGetMethod.length > 0 || model.noGetMethod == true)) {
        ctx.write(' noGetMethod="' + model.noGetMethod.replace(/\"/g, "'") + '"')
    }
    if (model.hasAddOnce && (model.hasAddOnce.length > 0 || model.hasAddOnce == true)) {
        ctx.write(' hasAddOnce="' + model.hasAddOnce.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.comments, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</relation>');
        return callback(null);
    }
    )
}
;
md.comment = function(model, ctx, callback) {
    ctx.write('<comment');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.comments, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</comment>');
        return callback(null);
    }
    )
}
;
md.include = function(model, ctx, callback) {
    ctx.write('<include');
    console.log('model.wzName', model.wzName, __filename);
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(' wzName="' + model.wzName.replace(/\"/g, "'") + '"')
    }
    ctx.w('>');
    md.genItems(model.comments, ctx, {
        indent: true
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</include>');
        return callback(null);
    }
    )
}
;
md.jsInclude = function(model, ctx, callback) {
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
    if (model.get_js) {
        included_writers.writeIncludeJs(ctx, model, (err, notUsed) => {
        
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

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.wzschema/lib/artifacts/wfschema/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
