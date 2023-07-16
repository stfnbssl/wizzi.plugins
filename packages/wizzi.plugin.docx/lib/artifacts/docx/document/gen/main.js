/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docx\.wizzi-override\lib\artifacts\docx\document\gen\main.js.ittf
    utc time: Fri, 26 May 2023 08:48:05 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('wizzi-utils').helpers.lineparser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.docx.artifacts.docx.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'docx') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "docx". Received: ' + model.wzElement, model));
    }
    try {
        md.docx(model, ctx, (err, notUsed) => {
        
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

const noindent = {
    indent: false
 };

function respace(text) {
    text = verify.replaceAll(text, '&nbsp;', ' ');
    return verify.replaceAll(text, '"', '\\"');
}
function revalue(text) {
    if (text.startsWith('= ')) {
        return text.substring(2);
    }
    else if (text.startsWith('=')) {
        return text.substring(1);
    }
    else {
        return '"' + respace(text) + '"';
    }
}

md.docx = function(model, ctx, callback) {
    ctx.values.docxStack = [];
    ctx.values.docxCounter = 0;
    ctx.values.docxMainObject = 'docx_MainObject';
    ctx.values.bulletLevel = 0;
    var docxNode = "docx_doc_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.values.docxMainInternalObject = docxNode;
    ctx.w('const fs = require("fs");');
    ctx.w('const docx = require("docx");');
    ctx.w('const convertInchesToTwip = docx.convertInchesToTwip;');
    ctx.w('const convertMillimetersToTwip = docx.convertMillimetersToTwip;');
    ctx.w('');
    ctx.w('const ' + docxNode + ' = { sections: [], styles: [] };');
    if (model.evenAndOddHeaderAndFooters) {
        ctx.w(docxNode + '.evenAndOddHeaderAndFooters = true;');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('');
        ctx.w('const ' + ctx.values.docxMainObject + ' = new docx.Document(' + ctx.values.docxMainInternalObject + ');');
        ctx.w('');
        ctx.w('docx.Packer.toBuffer(' + ctx.values.docxMainObject + ').then((buffer) => {');
        ctx.w('    fs.writeFileSync("' + model.wzName + '.docx", buffer);');
        ctx.w('    console.log("DONE written")');
        ctx.w('});');
        return callback(null);
    }
    )
}
;
md.numberingDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_numberingDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.config = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.numbering = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.config = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_config_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.levels = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.reference)) {
            ctx.w(docxNode + '.reference = ' + revalue(model.reference) + ';');
        }
        ctx.w(docxParent + '.config.push(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.level = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_level_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxNode + '.level = ' + model.wzName + ';');
        if (verify.isNotEmpty(model.format)) {
            ctx.w(docxNode + '.format = docx.LevelFormat.' + model.format + ';');
        }
        if (verify.isNotEmpty(model.text)) {
            ctx.w(docxNode + '.text = ' + revalue(model.text) + ';');
        }
        if (verify.isNotEmpty(model.alignment)) {
            ctx.w(docxNode + '.alignment = docx.AlignmentType.' + model.alignment + ';');
        }
        ctx.w(docxParent + '.levels.push(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.numbering = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_numbering_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.reference)) {
            ctx.w(docxNode + '.reference = "' + model.reference + '";');
        }
        if (verify.isNotEmpty(model.level)) {
            ctx.w(docxNode + '.level = ' + model.level + ';');
        }
        if (verify.isNotEmpty(model.instance)) {
            ctx.w(docxNode + '.instance = ' + model.instance + ';');
        }
        ctx.w(docxParent + '.numbering = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.formatType = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.formatType = docx.NumberFormat.' + model.wzName + ';');
    return callback(null);
}
;
md.header = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_header_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    var name = verify.isEmpty(model.wzName) ? 'default' : model.wzName;
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Header(' + docxNode + ');');
        ctx.w(docxParent + '.headers.' + name + ' = ' + docxNode + 'Obj;');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.footer = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_footer_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    var name = verify.isEmpty(model.wzName) ? 'default' : model.wzName;
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Footer(' + docxNode + ');');
        ctx.w(docxParent + '.footers.' + name + ' = ' + docxNode + 'Obj;');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.imageDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_imageDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.data = fs.readFileSync("' + verify.replaceAll(model.src, '\\', '\\\\') + '");');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const imageRun_' + model.wzName + ' = new docx.ImageRun(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.transformation = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_transformation_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.width)) {
            ctx.w(docxNode + '.width = ' + model.width + ';');
        }
        if (verify.isNotEmpty(model.height)) {
            ctx.w(docxNode + '.height = ' + model.height + ';');
        }
        ctx.w(docxParent + '.transformation = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.floating = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_floating_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxNode + '.horizontalPosition = { offset: ' + model.h + '};');
        ctx.w(docxNode + '.verticalPosition = { offset: ' + model.v + '};');
        ctx.w(docxParent + '.floating = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.margins = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_margins_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.top)) {
            ctx.w(docxNode + '.top = ' + model.top + ';');
        }
        if (verify.isNotEmpty(model.bottom)) {
            ctx.w(docxNode + '.bottom = ' + model.bottom + ';');
        }
        if (verify.isNotEmpty(model.left)) {
            ctx.w(docxNode + '.left = ' + model.left + ';');
        }
        if (verify.isNotEmpty(model.right)) {
            ctx.w(docxNode + '.right = ' + model.right + ';');
        }
        ctx.w(docxParent + '.margins = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.wrap = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_wrap_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxNode + '.type = docx.TextWrappingType.' + model.type + ';');
        ctx.w(docxNode + '.side = docx.TextWrappingSide.' + model.side + ';');
        ctx.w(docxParent + '.wrap = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.imageRef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.children.push(imageRun_' + model.wzName + ');');
    return callback(null);
}
;
md.tabStopsDef = function(model, ctx, callback) {
    ctx.w('const tabStops_' + model.wzName + ' = [];');
    ctx.values.docxStack.push('tabStops_' + model.wzName);
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.tabStopDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_tabStopDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.type)) {
            ctx.w(docxNode + '.type = docx.TabStopType.' + model.type + ';');
        }
        if (verify.isNotEmpty(model.position)) {
            ctx.w(docxNode + '.position = ' + model.position + ';');
        }
        ctx.w(docxParent + '.push(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.tabStops = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.tabStops = tabStops_' + model.wzName + ';');
    return callback(null);
    return callback(null);
}
;

md.text = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_txt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    if (verify.isEmpty(model.wzName)) {
        ctx.w(docxNode + '.children = [];');
    }
    else {
        ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TextRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.literal = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.children.push(' + revalue(model.wzName) + ');');
    return callback(null);
}
;
md.valueText = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.children.push(' + respace(model.wzName) + ');');
    return callback(null);
}
;
md.bold = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_txt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    if (verify.isEmpty(model.wzName)) {
        ctx.w(docxNode + '.children = [];');
    }
    else {
        ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    }
    ctx.w(docxParent + '.bold = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TextRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.italics = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_txt_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    if (verify.isEmpty(model.wzName)) {
        ctx.w(docxNode + '.children = [];');
    }
    else {
        ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    }
    ctx.w(docxParent + '.italics = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TextRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.boldProp = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.bold = ' + true + ';');
    return callback(null);
}
;
md.italicsProp = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.italics = ' + true + ';');
    return callback(null);
}
;
md.emphasisMark = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.emphasisMark = ' + true + ';');
    return callback(null);
}
;
md.strike = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.strike = ' + true + ';');
    return callback(null);
}
;
md.vanish = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.vanish = ' + true + ';');
    return callback(null);
}
;
md.specVanish = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.specVanish = ' + true + ';');
    return callback(null);
}
;
md.doubleStrike = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.doubleStrike = ' + true + ';');
    return callback(null);
}
;
md.superScript = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.superScript = ' + true + ';');
    return callback(null);
}
;
md.subScript = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.subScript = ' + true + ';');
    return callback(null);
}
;
md.smallCaps = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.smallCaps = ' + true + ';');
    return callback(null);
}
;
md.allCaps = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.allCaps = ' + true + ';');
    return callback(null);
}
;
md.symbol = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_symbol_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.char = ' + revalue(model.wzName) + ';');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.SymbolRun(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.xbreak = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.break = ' + true + ';');
    return callback(null);
}
;
md.size = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.size = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.height = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.height = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.scale = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.scale = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.color = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.color = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.fill = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.fill = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.xname = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.name = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.highlight = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.highlight = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.line = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.line = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.lineRule = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.lineRule = docx.LineRuleType.' + model.wzName + ';');
    return callback(null);
}
;
md.link = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.link = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.linkText = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.text = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.value = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.value = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.space = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.space = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.widow = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.widowControl = ' + true + ';');
    return callback(null);
}
;
md.outline = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.outlineLevel = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.bullet = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    return callback(null);
}
;
md.xtype = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    if (model.wzParent.wzElement == 'section') {
        ctx.w(docxParent + '.properties.type = docx.SectionType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'shading') {
        ctx.w(docxParent + '.type = docx.ShadingType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'width') {
        ctx.w(docxParent + '.type = docx.WidthType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'tabStop') {
        ctx.w(docxParent + '.type = docx.TabStopType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'underline') {
        ctx.w(docxParent + '.type = docx.UnderlineType.' + model.wzName + ';');
    }
    else {
        ctx.w(docxParent + '.type = "' + model.wzName + '";');
    }
    return callback(null);
}
;
md.position = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    if (model.wzParent.wzElement == 'tabStop') {
        if (verify.isNumber(model.wzName)) {
            ctx.w(docxParent + '.position = ' + model.wzName + ';');
        }
        else {
            ctx.w(docxParent + '.position = docx.TabStopPosition.' + model.wzName + ';');
        }
    }
    else {
        ctx.w(docxParent + '.position = ' + model.wzName + ';');
    }
    return callback(null);
}
;
md.align = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.alignment = docx.AlignmentType.' + model.wzName + ';');
    return callback(null);
}
;

md.font = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    if (model.wzParent.wzElement == 'symbol') {
        ctx.w(docxParent + '.symbolfont = "' + model.wzName + '";');
    }
    else {
        ctx.w(docxParent + '.font = "' + model.wzName + '";');
    }
    return callback(null);
}
;

md.shading = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_shading_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.shading = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.table = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_table_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.rows = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Table(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.tr = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_tr_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TableRow(' + docxNode + ');');
        ctx.w(docxParent + '.rows.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.td = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_td_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.TableCell(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.valign = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.verticalAlign = docx.VerticalAlign.' + model.wzName + ';');
    return callback(null);
}
;
md.textDirection = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.textDirection = docx.TextDirection.' + model.wzName + ';');
    return callback(null);
}
;
md.columnSpan = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.columnSpan = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.width = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_width_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.width = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.underline = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_underline_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.underline = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.tabStop = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_tabStop_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.tabStops.push(' + docxNode + ');');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.border = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_border_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.border = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.borders = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_borders_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.borders = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.top = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_top_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.top = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.left = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_left_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.left = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.right = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_right_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.right = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.bottom = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_bottom_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.bottom = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.columnWidths = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.columnWidths = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.ul = function(model, ctx, callback) {
    ctx.values.bulletLevel++;
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.values.bulletLevel--;
        return callback(null);
    }
    )
}
;
md.ol = function(model, ctx, callback) {
    ctx.values.bulletLevel++;
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.values.bulletLevel--;
        return callback(null);
    }
    )
}
;
md.li = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_li_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    ctx.w(docxNode + '.tabStops = [];');
    ctx.w(docxNode + '.bullet = { level: ' + (ctx.values.bulletLevel-1) + '};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.footnoteDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxMainInternalObject;
    var docxNode = "docx_footnote_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: [] };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('if (!' + docxParent + '.footnotes) { ' + docxParent + '.footnotes = {} };');
        ctx.w(ctx.values.docxMainInternalObject + '.footnotes[' + model.wzName + '] = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.footnoteRef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.children.push(new docx.FootnoteReferenceRun(' + model.wzName + '));');
    return callback(null);
}
;
md.hyperlink = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_hyperlink_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.anchor = "' + (model.href || model.wzName) + '";');
    ctx.w(docxNode + '.children = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Hyperlink(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.bookmark = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_bookmark_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.id = "' + model.wzName + '";');
    ctx.w(docxNode + '.children = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Bookmark(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageReference = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageReference_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.PageReference(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.internalHyperlink = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_internalHyperlink_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.anchor = "' + (model.href || model.wzName) + '";');
    ctx.w(docxNode + '.children = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.InternalHyperlink(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.section = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_sect_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { properties: {}, headers:{}, footers:{}, children: [] };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.titlePage)) {
            ctx.w(docxNode + '.properties.titlePage = ' + model.titlePage + ';');
        }
        ctx.w(ctx.values.docxMainInternalObject + '.sections.push(' + docxNode + ')');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.page = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_page_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (model.orientation) {
            ctx.w('if (!' + docxNode + '.size) { ' + docxNode + '.size = {} };');
            ctx.w(docxNode + '.size.orientation = docx.PageOrientation.' + model.orientation + ';');
        }
        if (model.width) {
            ctx.w('if (!' + docxNode + '.size) { ' + docxNode + '.size = {} };');
            ctx.w(docxNode + '.size.width = ' + model.width + ';');
        }
        if (model.height) {
            ctx.w('if (!' + docxNode + '.size) { ' + docxNode + '.size = {} };');
            ctx.w(docxNode + '.size.height = ' + model.height + ';');
        }
        ctx.w(docxParent + '.properties.page = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageBreak = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageBreak_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.PageBreak(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.thematicBreak = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.thematicBreak = ' + true + ';');
    return callback(null);
}
;
md.pageBreakBefore = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.pageBreakBefore = ' + true + ';');
    return callback(null);
}
;
md.keepLines = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.keepLines = ' + true + ';');
    return callback(null);
}
;
md.keepNext = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.keepNext = ' + true + ';');
    return callback(null);
}
;
md.margin = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_margin_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.top)) {
            ctx.w(docxNode + '.top = ' + model.top + ';');
        }
        if (verify.isNotEmpty(model.right)) {
            ctx.w(docxNode + '.right = ' + model.right + ';');
        }
        if (verify.isNotEmpty(model.bottom)) {
            ctx.w(docxNode + '.bottom = ' + model.bottom + ';');
        }
        if (verify.isNotEmpty(model.left)) {
            ctx.w(docxNode + '.left = ' + model.left + ';');
        }
        if (verify.isNotEmpty(model.gutter)) {
            ctx.w(docxNode + '.gutter = ' + model.gutter + ';');
        }
        if (verify.isNotEmpty(model.header)) {
            ctx.w(docxNode + '.header = ' + model.header + ';');
        }
        if (verify.isNotEmpty(model.footer)) {
            ctx.w(docxNode + '.footer = ' + model.footer + ';');
        }
        ctx.w(docxParent + '.margin = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.column = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_column_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.space)) {
            ctx.w(docxNode + '.space = ' + model.space + ';');
        }
        if (verify.isNotEmpty(model.count)) {
            ctx.w(docxNode + '.count = ' + model.count + ';');
        }
        if (verify.isNotEmpty(model.separate)) {
            ctx.w(docxNode + '.separate = ' + model.separate + ';');
        }
        ctx.w(docxParent + '.properties.column = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageBorderTop = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageBorderTop_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('if (!' + docxParent + '.borders) { ' + docxParent + '.borders = {} };');
        ctx.w(docxParent + '.borders.pageBorderTop = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageBorderRight = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageBorderRight_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('if (!' + docxParent + '.borders) { ' + docxParent + '.borders = {} };');
        ctx.w(docxParent + '.borders.pageBorderRight = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageBorderBottom = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageBorderBottom_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('if (!' + docxParent + '.borders) { ' + docxParent + '.borders = {} };');
        ctx.w(docxParent + '.borders.pageBorderBottom = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageBorderLeft = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageBorderLeft_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('if (!' + docxParent + '.borders) { ' + docxParent + '.borders = {} };');
        ctx.w(docxParent + '.borders.pageBorderLeft = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageBorders = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageBorders_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.display)) {
            ctx.w(docxNode + '.display = docx.PageBorderDisplay.' + model.display + ';');
        }
        if (verify.isNotEmpty(model.offsetFrom)) {
            ctx.w(docxNode + '.offsetFrom = docx.PageBorderOffsetFrom.' + model.offsetFrom + ';');
        }
        if (verify.isNotEmpty(model.zOrder)) {
            ctx.w(docxNode + '.zOrder = docx.PageBorderZOrder.' + model.zOrder + ';');
        }
        ctx.w('if (!' + docxParent + '.borders) { ' + docxParent + '.borders = {} };');
        ctx.w(docxParent + '.borders.pageBorders = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.pageNumbers = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_pageNumbers_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.pageNumbers = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.start = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.start = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.orientation = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w('if (!' + docxParent + '.size) { ' + docxParent + '.size = {} };');
    ctx.w(docxParent + '.size.orientation = docx.PageOrientation.' + model.wzName + ';');
    return callback(null);
}
;
md.paragraph = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_paragraph_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    ctx.w(docxNode + '.children = [];');
    ctx.w(docxNode + '.tabStops = [];');
    if (!verify.isEmpty(model.wzName)) {
        ctx.w(docxNode + '.text = ' + revalue(model.wzName) + ';');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.h1 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_1;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.h2 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_2;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.h3 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_3;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.h4 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_4;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.h5 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_5;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.h6 = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.HEADING_6;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.htitle = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_par_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = { children: []};');
    ctx.w(docxNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(docxNode + '.heading = docx.HeadingLevel.TITLE;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.Paragraph(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.spacing = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_spacing_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.spacing = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.before = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.before = ' + model.wzName + ';');
    return callback(null);
}
;
md.after = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.after = ' + model.wzName + ';');
    return callback(null);
}
;
md.positionalTab = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_positionalTab_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    if (!verify.isEmpty(model.alignment)) {
        ctx.w(docxNode + '.alignment = docx.PositionalTabAlignment.' + model.alignment + ';');
    }
    if (!verify.isEmpty(model.relativeTo)) {
        ctx.w(docxNode + '.relativeTo = docx.PositionalTabRelativeTo.' + model.relativeTo + ';');
    }
    if (!verify.isEmpty(model.leader)) {
        ctx.w(docxNode + '.leader = docx.PositionalTabLeader.' + model.leader + ';');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + docxNode + 'Obj = new docx.PositionalTab(' + docxNode + ');');
        ctx.w(docxParent + '.children.push(' + docxNode + 'Obj);');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.stylesDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_stylesDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.styles = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.styleDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_styleDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    if (model.wzParent.wzElement == 'paragraphStyles' || model.wzParent.wzElement == 'characterStyles') {
        ctx.w(docxNode + '.id = "' + model.wzName + '";');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'xdefault') {
            ctx.w(docxParent + '.' + model.wzName + ' = ' + docxNode + ';');
        }
        else {
            ctx.w(docxParent + '.push(' + docxNode + ');');
        }
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.next = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.next = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.basedOn = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.basedOn = ' + revalue(model.wzName) + ';');
    return callback(null);
}
;
md.quickFormat = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    ctx.w(docxParent + '.quickFormat = ' + true + ';');
    return callback(null);
}
;
md.xdefault = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_xdefault_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.default = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.paragraphStyles = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_paragraphStyles_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.paragraphStyles = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.characterStyles = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_characterStyles_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.characterStyles = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.paragraphDef = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_paragraphDef_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.paragraph = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.run = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_run_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(docxParent + '.run = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.indent = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    var docxNode = "docx_indent_" + (++ctx.values.docxCounter);
    ctx.values.docxStack.push(docxNode);
    ctx.w('const ' + docxNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (verify.isNotEmpty(model.left)) {
            ctx.w(docxNode + '.left = ' + revalue(model.left) + ';');
        }
        if (verify.isNotEmpty(model.hanging)) {
            ctx.w(docxNode + '.hanging = ' + revalue(model.hanging) + ';');
        }
        ctx.w(docxParent + '.indent = ' + docxNode + ';');
        ctx.values.docxStack.pop();
        return callback(null);
    }
    )
}
;
md.style = function(model, ctx, callback) {
    var docxParent = ctx.values.docxStack[ctx.values.docxStack.length-1];
    if (['pageBorderTop','pageBorderRight','pageBorderBottom','pageBorderLeft'].indexOf(model.wzParent.wzElement) > -1) {
        ctx.w(docxParent + '.style = docx.BorderStyle.' + model.wzName + ';');
    }
    else if (['top','right','bottom','left'].indexOf(model.wzParent.wzElement) > -1) {
        ctx.w(docxParent + '.style = docx.BorderStyle.' + model.wzName + ';');
    }
    else {
        ctx.w(docxParent + '.style = ' + revalue(model.wzName) + ';');
    }
    return callback(null);
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.docx/lib/artifacts/docx/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
