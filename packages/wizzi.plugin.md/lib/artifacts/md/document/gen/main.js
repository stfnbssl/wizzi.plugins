/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\artifacts\md\document\gen\main.js.ittf
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');
// var included_writers = require('./included_writers')

var myname = 'wizzi.plugin.md.artifacts.md.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'md') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "md". Received: ' + model.wzElement, model))
    }
    try {
        md.md(model, ctx, (err, notUsed) => {
        
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
md.md = function(model, ctx, callback) {
    md.genItems(model.elements, ctx, {
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
;
md.frontmatter = function(model, ctx, callback) {
    ctx.w("---");
    var i, i_items=model.attributes, i_len=model.attributes.length, a;
    for (i=0; i<i_len; i++) {
        a = model.attributes[i];
        var nv = verify.parseNameValue(a.wzName, a);
        ctx.w(nv.name() + ": " + nv.value())
    }
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w("---");
        return callback(null);
    }
    )
}
;
md.propertyOrValue = function(model, ctx, callback) {
    var p = verify.parseNameValue(model.wzName, model);
    ctx.w(p.name() + ": " + p.value())
    return callback(null);
}
;
md.element = function(model, ctx, callback) {
    md.writeHtml(model.wzName, model, ctx, callback);
}
;
md.div = function(model, ctx, callback) {
    md.writeHtml('div', model, ctx, callback);
}
;
md.h1 = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('h1', model, ctx, callback)
    }
    else {
        ctx.w("# " + model.wzName);
        return callback(null);
    }
}
;
md.h2 = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('h2', model, ctx, callback)
    }
    else {
        ctx.w("## " + model.wzName);
        return callback(null);
    }
}
;
md.h3 = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('h3', model, ctx, callback)
    }
    else {
        ctx.w("### " + model.wzName);
        return callback(null);
    }
}
;
md.h4 = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('h4', model, ctx, callback)
    }
    else {
        ctx.w("#### " + model.wzName);
        return callback(null);
    }
}
;
md.h5 = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('h5', model, ctx, callback);
    }
    else {
        ctx.w("##### " + model.wzName);
        return callback(null);
    }
}
;
md.h6 = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('h6', model, ctx, callback);
    }
    else {
        ctx.w("##### " + model.wzName);
        return callback(null);
    }
}
;
md.a = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('a', model, ctx, callback);
    }
    else {
        ctx.write('[' + model.wzName + ']');
        ctx.write('(' + model.href);
        if (verify.isString(model.title)) {
            ctx.write(' "' + model.title + '"');
        }
        ctx.w(')');
        return callback(null);
    }
}
;
md.ul = function(model, ctx, callback) {
    md.genItems(model.elements, ctx, callback);
}
;
md.li = function(model, ctx, callback) {
    ctx.write('* ');
    if (model.wzName && model.wzName.length > 0) {
        ctx.write(model.wzName + ' ' );
    }
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('');
        return callback(null);
    }
    )
}
;
md.ol = function(model, ctx, callback) {
    md.genItems(model.elements, ctx, {
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
;
md.img = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('img', model, ctx, callback);
    }
    else {
        ctx.write('![' + model.wzName + ']');
        ctx.write('(' + model.src);
        if (verify.isString(model.title)) {
            ctx.write(' "' + model.title + '"');
        }
        ctx.w(')');
        return callback(null);
    }
}
;
md.video = function(model, ctx, callback) {
    return callback(null);
}
;
md.table = function(model, ctx, callback) {
    ctx.w();
    ctx.w('<table>');
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</table>');
        ctx.w();
        return callback(null);
    }
    )
}
;
md.thead = function(model, ctx, callback) {
    ctx.w('<thead>');
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</thead>');
        return callback(null);
    }
    )
}
;
md.tbody = function(model, ctx, callback) {
    ctx.w('<tbody>');
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</tbody>');
        return callback(null);
    }
    )
}
;
md.tr = function(model, ctx, callback) {
    ctx.w('<tr>');
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('</tr>');
        return callback(null);
    }
    )
}
;
md.td = function(model, ctx, callback) {
    ctx.write('<td>');
    if (model.wzName) {
        ctx.write(model.wzName);
    }
    if (model.elements && model.elements.length > 0) {
        ctx.w();
        md.genItems(model.elements, ctx, {
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
    else {
        ctx.w('</td>');
        return callback(null);
    }
}
;
md.th = function(model, ctx, callback) {
    ctx.write('<th>');
    if (model.wzName) {
        ctx.write(model.wzName);
        return callback(null);
    }
    if (model.elements && model.elements.length > 0) {
        ctx.w();
        md.genItems(model.elements, ctx, {
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
    else {
        ctx.w('</th>');
        return callback(null);
    }
}
;
md.quote = function(model, ctx, callback) {
    return callback(null);
}
;
md.hr = function(model, ctx, callback) {
    ctx.w('* * *');
    return callback(null);
}
;
md.p = function(model, ctx, callback) {
    if (ctx.isHtml || (!ctx.isCode && model.elements.length > 0)) {
        md.writeHtml('p', model, ctx,callback);
    }
    else {
        ctx.w(model.wzName);
        if (ctx.isCode) {
            ctx.indent();
        }
        md.genItems(model.elements, ctx, {
            indent: false, 
            from: 0
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (ctx.isCode) {
                ctx.deindent();
            }
            ctx.w('');
            return callback(null);
        }
        )
    }
}
;
md.span = function(model, ctx, callback) {
    ctx.write(verify.replaceAll(model.wzName, '&nbsp;', ' '))
    md.genItems(model.elements, ctx, {
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
;
md.br = function(model, ctx, callback) {
    ctx.w();
    return callback(null);
}
;
md.i = function(model, ctx, callback) {
    ctx.write('*' + model.wzName);
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.write('*');
        return callback(null);
    }
    )
}
;
md.b = function(model, ctx, callback) {
    ctx.write('**' + model.wzName);
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.write('**');
        return callback(null);
    }
    )
}
;
md.blank = function(model, ctx, callback) {
    ctx.write(' ' + model.wzName);
    md.genItems(model.elements, ctx, {
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
;
md.plus = function(model, ctx, callback) {
    if (ctx.isCode) {
        ctx.w(model.wzName);
    }
    else {
        ctx.w("`" + model.wzName + "`");
    }
    ctx.indent();
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        return callback(null);
    }
    )
}
;
md.js = function(model, ctx, callback) {
    ctx.w("```javascript");
    ctx.isCode = true;
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.isCode = false;
        ctx.w("```");
        return callback(null);
    }
    )
}
;
md.html = function(model, ctx, callback) {
    ctx.w("```html");
    ctx.isCode = true;
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.isCode = false;
        ctx.w("```");
        return callback(null);
    }
    )
}
;
md.css = function(model, ctx, callback) {
    ctx.w("```css");
    ctx.isCode = true;
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.isCode = false;
        ctx.w("```");
        return callback(null);
    }
    )
}
;
md.bash = function(model, ctx, callback) {
    ctx.w("```bash");
    ctx.isCode = true;
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.isCode = false;
        ctx.w("```");
        return callback(null);
    }
    )
}
;
md.sh = function(model, ctx, callback) {
    ctx.w("```sh");
    ctx.isCode = true;
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.isCode = false;
        ctx.w("```");
        return callback(null);
    }
    )
}
;
md.code = function(model, ctx, callback) {
    ctx.w("```" + model.wzName);
    ctx.isCode = true;
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.isCode = false;
        ctx.w("```");
        return callback(null);
    }
    )
}
;
md.imgRef = function(model, ctx, callback) {
    ctx.write('![' + model.alt + ']');
    ctx.w('[' + model.wzName + ']');
    return callback(null);
}
;
md.ref = function(model, ctx, callback) {
    ctx.write('[' + model.wzName + ']');
    ctx.write(' ' + model.href);
    ctx.w(' "' + model.title + '"');
    return callback(null);
}
;
md.comment = function(model, ctx, callback) {
    ctx.write('');
    ctx.write('[comment]: # ' + model.wzName);
    return callback(null);
}
;
md.writeHtml = function(tag, model, ctx, callback) {
    var saveIsHtml = ctx.isHtml;
    ctx.isHtml = true;
    if (!saveIsHtml) {
        ctx.w();
    }
    ctx.write('<' + tag);
    var i, i_items=getAttributes(model), i_len=getAttributes(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttributes(model)[i];
        var nv = verify.parseNameValue(a.wzName, a);
        ctx.write(' ' + nv.name() + '="' + nv.value() + '"');
    }
    if (model.wzName.length > 0) {
        ctx.write('>' + model.wzName);
    }
    else {
        ctx.write('>');
    }
    md.genItems(model.elements, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.write('</' + tag + '>');
        if (!saveIsHtml) {
            ctx.w();
            ctx.w();
        }
        ctx.isHtml = saveIsHtml;
        return callback(null);
    }
    )
}
;
function isLineTag(model) {
    return ['p', 'br'].indexOf(model.wzElement) > -1;
}
var knownAttributes = [
    'href', 
    'src', 
    'title', 
    'id', 
    'alt'
];
function getAttributes(model) {
    var ret = [];
    var i, i_items=model.attributes, i_len=model.attributes.length, a;
    for (i=0; i<i_len; i++) {
        a = model.attributes[i];
        ret.push(a);
    }
    var i, i_items=knownAttributes, i_len=knownAttributes.length, name;
    for (i=0; i<i_len; i++) {
        name = knownAttributes[i];
        if (typeof model[name] !== 'undefined') {
            ret.push({
                wzName: name + ' ' + model[name]
             })
        }
    }
    return ret;
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

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.md/lib/artifacts/md/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
