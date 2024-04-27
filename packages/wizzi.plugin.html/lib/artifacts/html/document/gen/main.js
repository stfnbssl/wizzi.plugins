/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\artifacts\html\document\gen\main.js.ittf
    utc time: Thu, 25 Apr 2024 11:41:03 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var included_writers = require('./included_writers');
var utilNode = require('../../../utils/utilNode');
var lineParser = require('../../../utils/lineParser');
var lorem = require('@wizzi/utils').lorem;
var pretty = require('@wizzi/utils').pretty;
var myname = 'wizzi.plugin.html.artifacts.document.gen.main';
var myGenItemsStackCount = 0;

var myname = 'wizzi.plugin.html.artifacts.html.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'html') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "html". Received: ' + model.wzElement, model));
    }
    try {
        main_init(model, ctx)
        if (true) {
            md.myGetGenItem(ctx)(model, (err, notUsed) => {
            
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
        else {
            md.html(model, ctx, (err, notUsed) => {
            
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
md.myGetGenItem = function(ctx) {
    return function(model, callback) {
            // loog 'wizzi-web.artifacts.html.main', model.wzElement
            
            // model.wzName is a TEXTNODE
            
            // VIA 22/10/18 see wizzi-mtree.loader.nodifier blank escapes ( \b )
            
            // preserve a blank first char (coded between single hyphens)
            
            // var text = verify.startsWith(model.wzName, "' '") ? '&nbsp;' + model.wzName.substr(3) : model.wzName;
            
            // loog 'text', text
            if (['_text','_textLF'].indexOf(model.wzElement) >= 0) {
                var text = model.wzName;
                if (ctx.__iscode || model.wzElement === '_textLF') {
                    ctx.w(text);
                }
                else {
                    ctx.write(text);
                }
                return md.myGenItems(model.elements, ctx, {
                        indent: false
                     }, callback);
            }
            
            // must be here because _style with model.get_css undefined
            
            // has its handler
            else if (['_style'].indexOf(model.wzElement) >= 0 && model.get_css) {
                included_writers.writeIncludeCss(ctx, model, callback)
            }
            else if (md[model.wzElement]) {
                md[model.wzElement](model, ctx, (err, done) => {
                
                    if (err) {
                        return callback(err);
                    }
                    
                    // ok, processed
                    if (done) {
                        return callback();
                    }
                    else {
                        return process.nextTick(() => 
                            
                                md.standardElement(model, ctx, callback)
                            );
                    }
                }
                )
            }
            else {
                return process.nextTick(() => 
                    
                        md.standardElement(model, ctx, callback)
                    );
            }
        };
}
;
md.myGenItems = function(items, ctx, options, callback) {
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
    myGenItemsStackCount++;
    async.mapSeries(goitems, md.myGetGenItem(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        myGenItemsStackCount--;
        return callback();
    }
    )
}
;
md.standardElement = function(model, ctx, callback) {
    preprocess(model, ctx);
    var voidEl = (model.wzTag in voidElements);
    ctx.write('<' + model.wzTag);
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
    if (voidEl) {
        ctx.w(' />');
        postprocess(model, ctx);
        return callback();
    }
    ctx.write('>');
    // check if the element has text line coded as children of the $. ittf command
    // FIXME this hack require refactoring
    var lt;
    if (model.wzName === '__TS__') {
        lt = {
            text: model.wzName
         };
    }
    else {
        lt = utilNode.inlinedTextToTextLines(model.wzName);
    }
    
    // preserve a blank first char (coded between single hyphens)
    if (lt.text) {
        var text = verify.startsWith(lt.text, "' '") ? '&nbsp;' + lt.text.substr(3) : lt.text;
        ctx.write(text);
    }
    if (lt.lines) {
        ctx.w();
        var saveIndent;
        
        // we are inside a pre element, temporaly reset
        
        // to 0 the indentation depending from the node depth
        if (ctx.__iscodeTag) {
            saveIndent = ctx.forceIndent(0);
        }
        else {
            ctx.indent();
        }
        var i, i_items=lt.lines, i_len=lt.lines.length, line;
        for (i=0; i<i_len; i++) {
            line = lt.lines[i];
            ctx.w(line);
        }
        
        // restore indentation
        if (ctx.__iscodeTag) {
            ctx.forceIndent(saveIndent);
        }
        else {
            ctx.deindent();
        }
    }
    if (model.elements && model.elements.length > 0) {
        if (ctx.__iscodeTag && !ctx.__iscodeTag_started) {
            ctx.w('');
            ctx.__iscodeTag_started = true;
            var saveIndent = ctx.forceIndent(0);
            md.myGenItems(model.elements, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.forceIndent(saveIndent);
                ctx.__iscodeTag_started = false;
                ctx.w('</' + model.wzTag + '>');
                postprocess(model, ctx);
                return callback();
            }
            )
        }
        else {
            var noinline = inline.indexOf(model.wzTag) < 0;
            if (noinline) {
                ctx.w('');
            }
            md.myGenItems(model.elements, ctx, {
                indent: noinline
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('</' + model.wzTag + '>');
                postprocess(model, ctx);
                return callback();
            }
            )
        }
    }
    else {
        ctx.w('</' + model.wzTag + '>');
        postprocess(model, ctx);
        return callback();
    }
}
;
md.html = function(model, ctx, callback) {
    console.log('html.ctx.values', ctx.values, __filename);
    if (!!ctx.values.noDocType == false) {
        if (model.doctype) {
            ctx.w('<!doctype ' + model.doctype + '>');
        }
        else {
            ctx.w('<!doctype html>');
        }
    }
    if (!!ctx.values.noHtmlRoot == false) {
        ctx.write('<html');
        var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
        for (i=0; i<i_len; i++) {
            a = getAttrs(model)[i];
            if (a.name != 'doctype') {
                if ((a.name in attrsneedsvalue) || a.value && a.value.length > 0) {
                    ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
                }
                else {
                    ctx.write(' ' + a.name);
                }
            }
        }
        ctx.w('>');
    }
    async.mapSeries(model.elements, md.myGetGenItem(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (!!ctx.values.noHtmlRoot == false) {
            ctx.w();
            ctx.w('</html>');
        }
        return callback(null, true);
    }
    )
}
;
md.jsBabel = function(model, ctx, callback) {
    
    // is link to a js file not a script element
    if (model.statements.length === 0) {
        return callback(null, false);
    }
    ctx.w("<script>");
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        js_statement.gen(item, ctx);
    }
    ctx.w("</script>");
    return callback(null, true);
}
;
md.lorem = function(model, ctx, callback) {
    var count = parseInt(model.wzName.trim());
    var string = lorem({
        count: count, 
        units: model.units, 
        htmlTag: model.htmlTag, 
        sentenceLowerBound: model.minWords, 
        sentenceUpperBound: model.maxWords, 
        paragraphLowerBound: model.minSentences, 
        paragraphUpperBound: model.maxSentences
     });
    ctx.w(string);
    return callback(null, true);
}
;
md.ready = function(model, ctx, callback) {
    ctx.w("<script>");
    ctx.indent();
    if (model.kind === 'jquery') {
        ctx.w('$(function() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            js_statement.gen(item, ctx);
        }
        ctx.deindent();
        ctx.w('});');
    }
    else {
        ctx.w('window.onload = function() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            js_statement.gen(item, ctx);
        }
        ctx.deindent();
        ctx.w('};');
    }
    ctx.deindent();
    ctx.w("</script>");
    return callback(null, true);
}
;
md.ittfPanel = function(model, ctx, callback) {
    ctx.w("<div class='ittf-panel'>");
    if (model.wzMTreeData.title) {
        ctx.w("<div class='ittf-panel-title'>" + model.wzMTreeData.title + "</div>");
    }
    ctx.w("<pre class='prettyprint'><code>");
    prettifyIttf(model.wzMTreeData, (err, result) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w("<div>" + result.ittfPretty + '</div>');
        ctx.w("</code></pre></div>");
        return callback(null, true);
    }
    )
}
;
md.jsPanel = function(model, ctx, callback) {
    ctx.w("<div class='js-panel'>");
    if (model.wzMTreeData.title) {
        ctx.w("<div class='js-panel-title'>" + model.wzMTreeData.title + "</div>");
    }
    prettifyJs(model.wzMTreeData, (err, result) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('<pre><code class="hljs">' + result.jsPretty + '</code></pre>');
        ctx.w('</div>');
        return callback(null, true);
    }
    )
}
;
md.bashPanel = function(model, ctx, callback) {
    ctx.w("<div class='bash-panel'>");
    if (model.wzMTreeData.title) {
        ctx.w("<div class='bash-panel-title'>" + model.wzMTreeData.title + "</div>");
    }
    prettifyBash(model.wzMTreeData, (err, result) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('<pre><code class="hljs">' + result.bashPretty + '</code></pre>');
        ctx.w('</div>');
        return callback(null, true);
    }
    )
}
;
md.comment = function(model, ctx, callback) {
    if (ctx.__iscode) {
        ctx.w("// " + model.wzName);
        return callback(null, true);
    }
    if (model.elements.length == 0) {
        if (ctx.__inside_comment) {
            ctx.w(model.wzName ? (' ' + model.wzName) : '');
        }
        else {
            ctx.w("<!-- " + model.wzName + " -->");
        }
        ctx.__needs_crlf = false;
        return callback(null, true);
    }
    var enter_inside_comment = ctx.__inside_comment;
    if (!ctx.__inside_comment) {
        ctx.w('<!-- ');
    }
    ctx.indent();
    if (model.wzName.length > 0) {
        ctx.w(model.wzName)
    }
    ctx.__inside_comment = true;
    md.myGenItems(model.elements, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.__inside_comment = enter_inside_comment;
        ctx.deindent();
        if (!enter_inside_comment) {
            ctx.w(' -->');
        }
        ctx.__needs_crlf = false;
        return callback(null, true);
    }
    )
}
;

md.cssInclude = function(model, ctx, callback) {
    ctx.write('<style');
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
    if (model.get_css) {
        included_writers.writeIncludeCss(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w("</style>");
            return callback(null, true);
        }
        )
    }
    else {
        ctx.w("</style>");
        return callback(null, true);
    }
}
;
md.script = function(model, ctx, callback) {
    ctx.write('<' + model.wzTag);
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
        md.genItems(model.elements, ctx, {
            indent: true
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        }
        )
    }
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
md.readyInclude = function(model, ctx, callback) {
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
        if (model.kind === 'jquery') {
            ctx.w('$(function() {');
            ctx.indent().included_writers.writeIncludeJs(ctx, model, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w('});');
                ctx.w("</script>");
                return callback(null, true);
            }
            )
        }
        else {
            ctx.w('window.onload = function() {');
            ctx.indent();
            included_writers.writeIncludeJs(ctx, model, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w('};');
                ctx.w("</script>");
                return callback(null, true);
            }
            )
        }
    }
    else {
        ctx.w("</script>");
        return callback(null, true);
    }
}
;
md.img = function(model, ctx, callback) {
    // loog '***** known element', model.wzElement, model.get_svg
    // may be here because img with model.get_svg undefined
    // has no specific handler (is standard element)
    if (model.get_svg) {
        return included_writers.writeIncludeSvg(ctx, model, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                return callback(null, true);
            }
            );
    }
    else {
        return callback(null, false);
    }
}
;
md.svgInclude = function(model, ctx, callback) {
    // loog '***** known element', model.wzElement, model.get_svg
    if (model.get_svg) {
        return included_writers.writeIncludeSvg(ctx, model, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                return callback(null, true);
            }
            );
    }
    else {
        return callback(null, false);
    }
}
;
md.jsonObjectInclude = function(model, ctx, callback) {
    // loog '***** known element', model.wzElement, model.get_json
    if (model.get_json) {
        ctx.w('<script type="application/json" id="' + model.wzName + '" >');
        included_writers.writeIncludeJson(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</script>');
            return callback(null, true);
        }
        )
    }
    else {
        return callback(null, false);
    }
}
;
md.jsonArrayInclude = function(model, ctx, callback) {
    // loog '***** known element', model.wzElement, model.get_json
    if (model.get_json) {
        ctx.w('<script type="application/json" id="' + model.wzName + '" >');
        included_writers.writeIncludeJson(ctx, model, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('</script>');
            return callback(null, true);
        }
        )
    }
    else {
        return callback(null, false);
    }
}
;

function main_init(model, ctx) {
    if ((!!ctx.values.noGeneratorComments) == false) {
        ctx.w('<!--');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    package: @wizzi/plugin.html@0.8.10');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        if ((!!ctx.values.wzConfigIsPackageDeploy) == false) {
            ctx.w('    utc time: ' + new Date().toUTCString());
        }
        ctx.w('-->');
    }
}
function prettifyIttf(mTreeData, callback) {
    var schema = mTreeData.schema;
    var title = mTreeData.title;
    var mTree = mTreeData.mTree;
    var item = mTreeData.ittf;
    var itemResult = {};
    if (item.children.length == 1) {
        
        // is already ok, has the correct root
        if ((schema === 'json' && (item.children[0].n === '{' || item.children[0].n === '[')) || item.children[0].n === ittfRootFromSchema(schema) || ittfRootFromSchema(schema) === 'any') {
            itemResult[item.n] = mTree.toIttf(item.children[0]);
            itemResult[item.n + 'Wrapped'] = itemResult[item.n];
        }
        // wrap it
        else {
            var ittfNode = wrapperForSchema(schema);
            var i, i_items=item.children, i_len=item.children.length, node;
            for (i=0; i<i_len; i++) {
                node = item.children[i];
                ittfNode.children.push(node)
            }
            itemResult[item.n] = mTree.toIttf(item.children[0]);
            itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
        }
    }
    // wrap them
    else {
        var ittfNode = wrapperForSchema(schema);
        var i, i_items=item.children, i_len=item.children.length, node;
        for (i=0; i<i_len; i++) {
            node = item.children[i];
            ittfNode.children.push(node)
        }
        itemResult[item.n] = mTree.toIttf(item.children[0]);
        itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
    }
    pretty.prettifyIttfHtmlFromString(itemResult.ittf, (err, pretty) => {
    
        if (err) {
            return callback(err);
        }
        itemResult.ittfPretty = pretty;
        // loog 'prettifyIttf', itemResult
        return callback(null, itemResult);
    }
    )
}
function wrapperForSchema(schema) {
    if (schema === 'js') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                     }
                ]
             };
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
             };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
             };
    }
}
var schemaIttfRootMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'module', 
    json: '{', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'module', 
    vtt: 'vtt'
 };
function ittfRootFromSchema(schema) {
    // loog 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}
var schemaPrismLanguageMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'javascript', 
    json: 'json', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'typescript', 
    vtt: 'vtt'
 };
function prettifyJs(mTreeData, callback) {
    var schema = mTreeData.schema;
    var title = mTreeData.title;
    var mTree = mTreeData.mTree;
    var item = mTreeData.ittf;
    // loog 'prettifyJs.mTreeData', mTreeData
    var itemResult = {};
    var lines = [];
    if (mTreeData.ittf && mTreeData.ittf.children && mTreeData.ittf.children.length > 0) {
        var i, i_items=mTreeData.ittf.children, i_len=mTreeData.ittf.children.length, child;
        for (i=0; i<i_len; i++) {
            child = mTreeData.ittf.children[i];
            codifyMTreeData(child, lines, '')
        }
    }
    itemResult.jsPretty = lines.join('\n');
    return callback(null, itemResult);
}
function prettifyBash(mTreeData, callback) {
    var schema = mTreeData.schema;
    var title = mTreeData.title;
    var mTree = mTreeData.mTree;
    var item = mTreeData.ittf;
    // loog 'prettifyBash.mTreeData', mTreeData
    var itemResult = {};
    var lines = [];
    if (mTreeData.ittf && mTreeData.ittf.children && mTreeData.ittf.children.length > 0) {
        var i, i_items=mTreeData.ittf.children, i_len=mTreeData.ittf.children.length, child;
        for (i=0; i<i_len; i++) {
            child = mTreeData.ittf.children[i];
            codifyMTreeData(child, lines, '')
        }
    }
    itemResult.bashPretty = lines.join('\n');
    return callback(null, itemResult);
}
function codifyMTreeData(mTreeData, lines, spaces) {
    lines.push(spaces + mTreeData.n + ' ' + mTreeData.v)
    if (mTreeData.children && mTreeData.children.length > 0) {
        var i, i_items=mTreeData.children, i_len=mTreeData.children.length, child;
        for (i=0; i<i_len; i++) {
            child = mTreeData.children[i];
            codifyMTreeData(child, lines, spaces + '    ')
        }
    }
}
function preprocess(model, ctx) {
    if (model.wzTag == '.') {
        model.wzTag = 'div';
        model.class = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '#') {
        model.wzTag = 'div';
        model.id = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '<') {
        var p = lineParser.parseNameValueRaw(model.wzName, model);
        model.wzTag = p.name();
        if (p.hasValue()) {
            model.wzName = p.value();
        }
        else {
            model.wzName = null;
        }
    }
    else if (model.wzTag == 'js') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag === 'css') {
        model.wzTag = 'link';
        model.href = model.wzName;
        model.rel = 'stylesheet';
        model.wzName = null;
    }
    else if (model.wzTag === '@title') {
        model.wzTag = 'title';
    }
    else if (model.wzTag === '@style') {
        model.wzTag = 'style';
    }
    else if (model.wzTag === 'js-babel') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.type = 'text/babel';
    }
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = true;
    }
    if (['code'].indexOf(model.wzTag) > -1) {
        ctx.__iscodeTag = true;
    }
}
function postprocess(model, ctx) {
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = false;
    }
    if (['code'].indexOf(model.wzTag) > -1) {
        ctx.__iscodeTag = false;
    }
}
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
var inline = [
    'a', 
    'img', 
    'input', 
    'li', 
    'textarea'
];
var incode = [
    'js', 
    'css', 
    'script', 
    'style', 
    'ready'
];
var attrsneedsvalue = {
    __proto__: null
 };
var voidElements = 
// common self closing svg elements
{
    __proto__: null, 
    area: true, 
    base: true, 
    basefont: true, 
    br: true, 
    col: true, 
    command: true, 
    embed: true, 
    frame: true, 
    hr: true, 
    img: true, 
    input: true, 
    isindex: true, 
    keygen: true, 
    link: true, 
    meta: true, 
    param: true, 
    source: true, 
    track: true, 
    wbr: true, 
    path: true, 
    circle: true, 
    ellipse: true, 
    line: true, 
    rect: true, 
    use: true, 
    stop: true, 
    polyline: true, 
    polygone: true
 };

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
            method: 'wizzi.plugin.html/lib/artifacts/html/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
