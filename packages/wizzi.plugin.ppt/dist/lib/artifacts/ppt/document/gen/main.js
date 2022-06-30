/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.plugin.ppt\.wizzi\ittf\lib\artifacts\ppt\document\gen\main.js.ittf
    utc time: Wed, 17 Mar 2021 09:59:13 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var errors = require('../../../../../errors');

var myname = '.artifacts.ppt.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'ppt') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "ppt". Received: ' + model.wzElement, model))
    }
    try {
        md.ppt(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            else {
                // generation OK
                return callback(null, ctx);
            }
        })
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
};

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
    })
};
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
};
md.genItem = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
    }
};

const noindent = {
    indent: false
};

function respace(text) {
    text = verify.replaceAll(text, '&nbsp;', ' ');
    return verify.replaceAll(text, '"', '\\"');
}
function numOrPerc(text) {
    if (text[text.length-1] == '%') {
        return '"' + text + '"';
    }
    else {
        return text;
    }
}

md.ppt = function(model, ctx, callback) {
    // log "ctx.keys", Object.keys(ctx)
    // log "ctx.values property", ctx.values
    // log 'tag ppt, nodes', model.nodes.length
    ctx.values.pptStack = [];
    ctx.values.pptCounter = 0;
    ctx.values.pptMainObject = 'ppt_MainObject';
    ctx.values.mainObjectCreated = false;
    var pptNode = "ppt_doc_" + (++ctx.values.pptCounter);
    ctx.values.pptMainInstance = pptNode;
    ctx.values.pptStack.push({
        node: pptNode, 
        arrayName: null
    })
    ctx.values.pptMainInternalObject = pptNode;
    ctx.w('const fs = require("fs");');
    ctx.w('const pptx = require("pptxgenjs");');
    ctx.w('');
    ctx.w('const ' + ctx.values.pptMainInstance + ' = new pptx();');
    ctx.w('const ' + ctx.values.pptMainInstance + '_debug = { defaultStyle: {}, styles: {}, slides: [] };');
    ctx.w('const defaultStyle = { content: {} };');
    ctx.w('const styles = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('');
        ctx.w('// Dump for test');
        ctx.w('    fs.writeFileSync(__dirname + "/' + model.wzName + '.ppt.json", JSON.stringify(' + ctx.values.pptMainInstance + '_debug, null, "\t"));');
        ctx.w('');
        ctx.w('// Make Ppt');
        ctx.w('');
        ctx.w('var now = new Date();');
        ctx.w('');
        ctx.w(ctx.values.pptMainInstance + '.writeFile(');
        ctx.w('    __dirname + "/' + (model.wzName || 'created') + '.ppt"');
        ctx.w(').then(fileName => {');
        ctx.w('    console.log(`created file: ${fileName}`);');
        ctx.w('    console.log("DONE written", new Date() - now)');
        ctx.w('});');
        return callback(null);
    })
};
md.comment = function(model, ctx, callback) {
    ctx.w('// ' + model.wzName);
    return callback(null);
};

md.slide = function(model, ctx, callback) {
    var master = verify.isEmpty(model.wzName) == false ? '"' + model.wzName + '"' : '';
    // log 'tag slide, master', master
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1];
    var pptNode = "ppt_slide_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode, 
        arrayName: null
    })
    ctx.w('const ' + pptNode + ' = ' + ctx.values.pptMainInstance + '.addSlide(' + master + ');');
    ctx.w('const ' + pptNode + '_debug = { items: [] };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(ctx.values.pptMainInstance + '_debug.slides.push(' + pptNode + '_debug);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};

md.number = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_number_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.number = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.p = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_p_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('var ' + pptNode + ' = Object.assign({}, defaultStyle.content);');
    ctx.w('const ' + pptNode + '_text = "' + respace(model.wzName) + '";');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptNode + '.isTextBox = true;');
            ctx.w(pptParent + '.addText(' + pptNode + '_text, ' + pptNode + ');');
        }
        else if (model.wzParent.wzElement == 'pStack') {
            ctx.w(pptParent + '_items.push({ text: ' + pptNode + '_text, options: ' + pptNode + ' });');
        }
        else {
            ctx.w(pptParent + '.content = { text: ' + pptNode + '_text, options: ' + pptNode + ' };');
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptParent + '_debug.items.push({ text: ' + pptNode + '_text, options: ' + pptNode + ' });');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.pStack = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_pStack_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = [];');
    ctx.w('const ' + pptNode + '_items = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptNode + '.isTextBox = true;');
            ctx.w(pptParent + '.addText(' + pptNode + '_items, ' + pptNode + ');');
        }
        else {
            ctx.w(pptParent + '.content = { text: ' + pptNode + '_items, options: ' + pptNode + ' };');
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptParent + '_debug.items.push({ pStack: ' + pptNode + '_items, options: ' + pptNode + ' });');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.image = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_image_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    if (verify.isEmpty(model.wzName) == false) {
        ctx.w(pptNode + '.path = "' + model.wzName + '";');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptParent + '.addImage(' + pptNode + ');');
        }
        else {
            throw new Error("Image not child of slide not managed");
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptParent + '_debug.items.push({ image: ' + pptNode + ' });');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.shape = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_shape_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptParent + '.addShape(' + ctx.values.pptMainInstance + '.shapes.' + model.wzName + ', ' + pptNode + ');');
        }
        else {
            throw new Error("Image not child of slide not managed");
        }
        if (model.wzParent.wzElement == 'slide') {
            ctx.w(pptParent + '_debug.items.push({ shape_' + model.wzName + ': ' + pptNode + ' });');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.link = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_link_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.hyperlink = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.border = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_border_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.border = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.fill = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_fill_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.fill = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.bulletObj = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_bulletObj_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.bullet = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.top = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_top_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzName == 'null') {
            ctx.w(pptParent + '.top = null;');
        }
        else {
            ctx.w(pptParent + '.top = ' + pptNode + ';');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.right = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_right_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzName == 'null') {
            ctx.w(pptParent + '.right = null;');
        }
        else {
            ctx.w(pptParent + '.right = ' + pptNode + ';');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.bottom = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_bottom_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzName == 'null') {
            ctx.w(pptParent + '.bottom = null;');
        }
        else {
            ctx.w(pptParent + '.bottom = ' + pptNode + ';');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.left = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_left_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.wzName == 'null') {
            ctx.w(pptParent + '.left = null;');
        }
        else {
            ctx.w(pptParent + '.left = ' + pptNode + ';');
        }
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.sizing = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_sizing_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.sizing = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.line = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_line_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.line = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.shadow = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_shadow_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.shadow = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.imageDef = function(model, ctx, callback) {
    if (ctx.values.mainObjectCreated == false) {
        ctx.w('const ' + ctx.values.pptMainObject + ' = new ppt.Document(' + ctx.values.pptMainInternalObject + ');');
        ctx.values.mainObjectCreated = true;
    }
    ctx.w('const ' + model.wzName + ' = ppt.Media.addImage(');
    // _ ctx.w('  ' + ctx.values.pptMainObject + ', 300, 300,')
    ctx.w('  ' + ctx.values.pptMainObject + ',');
    ctx.w('  fs.readFileSync("' + verify.replaceAll(model.src, '\\', '\\\\') + '")');
    ctx.w(');');
    return callback(null);
};
md.imageRef = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1];
    ctx.w(pptParent + '.children.push(' + model.wzName + ');');
    return callback(null);
};

md.h1 = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_par_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.heading = ppt.HeadingLevel.HEADING_1;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pptNode + 'Obj = new ppt.Paragraph(' + pptNode + ');');
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.h2 = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_par_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.heading = ppt.HeadingLevel.HEADING_2;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pptNode + 'Obj = new ppt.Paragraph(' + pptNode + ');');
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.h3 = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_par_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.heading = ppt.HeadingLevel.HEADING_3;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pptNode + 'Obj = new ppt.Paragraph(' + pptNode + ');');
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.h4 = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_par_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.heading = ppt.HeadingLevel.HEADING_4;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pptNode + 'Obj = new ppt.Paragraph(' + pptNode + ');');
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.h5 = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_par_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.heading = ppt.HeadingLevel.HEADING_5;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pptNode + 'Obj = new ppt.Paragraph(' + pptNode + ');');
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.h6 = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_par_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.heading = ppt.HeadingLevel.HEADING_6;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pptNode + 'Obj = new ppt.Paragraph(' + pptNode + ');');
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.text = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_txt_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.bold = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_txt_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.bold = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.italic = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_txt_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.italic = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.underline = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_txt_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pptNode + '.underline = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.style = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + ' = Object.assign({},' + pptParent + ', (styles["' + model.wzName + '"] || {}));');
    return callback(null);
};
md.before = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.before = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.after = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.after = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.space = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.space = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.margin = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.margin = [' + respace(model.wzName) + '];');
    return callback(null);
};
md.columnGap = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.columnGap = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.x = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.x = ' + numOrPerc(model.wzName) + ';');
    return callback(null);
};
md.y = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.y = ' + numOrPerc(model.wzName) + ';');
    return callback(null);
};
md.pt = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.pt = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.pageOrientation = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.pageOrientation = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.pageSize = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.pageSize = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.pageMargins = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.pageMargins = [' + respace(model.wzName) + '];');
    return callback(null);
};
md.boldProp = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.bold = ' + true + ';');
    return callback(null);
};
md.italicProp = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.italic = ' + true + ';');
    return callback(null);
};
md.underlineProp = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.underline = ' + true + ';');
    return callback(null);
};
md.font = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.fontFace = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.xbreak = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.breakLine = ' + true + ';');
    return callback(null);
};
md.xname = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.name = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.href = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.url = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.background = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.bkgd = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.alignment = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.align = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.valignment = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.valign = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.charSpace = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.characterSpace = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.charCode = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.characterCode = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.slideHref = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.slide = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.width = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.width = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.height = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.height = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.fontSize = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.fontSize = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.size = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.size = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.indent = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.indent = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.indentLevel = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.indentLevel = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.rotate = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.rotate = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.rounding = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.rounding = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.colspan = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.colspan = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.rowspan = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.rowspan = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.opacity = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.opacity = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.blur = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.blur = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.angle = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.angle = ' + respace(model.wzName) + ';');
    return callback(null);
};
md.offset = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.offset = ' + respace(model.wzName) + ';');
    return callback(null);
};
// nodeProperty.js( fontSize, fontSize )
// ...
md.noWrap = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.noWrap = ' + true + ';');
    return callback(null);
};
md.subScript = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.subScript = ' + true + ';');
    return callback(null);
};
md.smallCaps = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.smallCaps = ' + true + ';');
    return callback(null);
};
md.emphasisMark = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.emphasisMark = ' + true + ';');
    return callback(null);
};
md.strike = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.strike = ' + true + ';');
    return callback(null);
};
md.doubleStrike = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.doubleStrike = ' + true + ';');
    return callback(null);
};
md.superScript = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.superScript = ' + true + ';');
    return callback(null);
};
md.allCaps = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.allCaps = ' + true + ';');
    return callback(null);
};
md.bullet = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.bullet = ' + true + ';');
    return callback(null);
};
md.flipH = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.flipH = ' + true + ';');
    return callback(null);
};
md.flipV = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.flipV = ' + true + ';');
    return callback(null);
};
// nodeProperty.js( noWrap, noWrap, true )
// ...
md.bkgd = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.bkgd = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.color = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.color = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.highlight = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.highlight = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.value = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.value = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.layout = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.layout = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.align = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.align = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.valign = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.valign = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.path = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.path = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.characterCode = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.characterCode = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.characterSpace = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.characterSpace = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.dashType = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.dashType = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.beginArrowType = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.beginArrowType = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.endArrowType = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.endArrowType = "' + respace(model.wzName) + '";');
    return callback(null);
};
md.code = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    ctx.w(pptParent + '.code = "' + respace(model.wzName) + '";');
    return callback(null);
};
// nodeProperty.js( bkgd, bkgd, string )
// ...
md.xtype = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    if (model.wzParent.wzElement == 'xxx') {
        ctx.w(pptParent + '.type = ppt.Xxx.' + model.wzName + ';');
    }
    else {
        ctx.w(pptParent + '.type = "' + model.wzName + '";');
    }
    return callback(null);
};
md.w = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    if (model.wzParent.wzElement == 'colW') {
        ctx.w(pptParent + '.push(' + numOrPerc(model.wzName) + ');');
    }
    else {
        ctx.w(pptParent + '.w =' +  numOrPerc(model.wzName) + ';');
    }
    return callback(null);
};
md.h = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    if (model.wzParent.wzElement == 'rowH') {
        ctx.w(pptParent + '.push(' + numOrPerc(model.wzName) + ');');
    }
    else {
        ctx.w(pptParent + '.h =' +  numOrPerc(model.wzName) + ';');
    }
    return callback(null);
};
md.title = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    if (model.wzParent.wzElement == 'link') {
        ctx.w(pptParent + '.tooltip = "' + model.wzName + '";');
    }
    else {
        ctx.w(pptParent + '.type = "' + model.wzName + '";');
    }
    return callback(null);
};

md.shading = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_shd_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.shading = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.table = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_table_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '_rows = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.addTable(' + pptNode + '_rows, ' + pptNode + ');');
        ctx.w(pptParent + '_debug.items.push({ table: ' + pptNode + '_rows, options: ' + pptNode + ' });');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.tr = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_tr_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '_rows.push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.td = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_td_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.push(' + pptNode + '.content);');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.underline = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_underline_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptNode + '.underline = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.styles = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_styles_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.styles = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.xdefault = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_xdefault_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.default = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.styleDef = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_styleDef_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('styles["' + model.wzName + '"] = ' + pptNode + ';');
        ctx.w(ctx.values.pptMainInstance + '_debug.styles["' + model.wzName + '"] = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.defaultStyleDef = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_defaultStyleDef_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('defaultStyle.content = ' + pptNode + ';');
        ctx.w(ctx.values.pptMainInstance + '_debug.defaultStyle = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.spacing = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_spacing_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.spacing = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.border = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_border_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.border = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
// see nodePropertyChoice.js( w ... h )
md.colW = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_colW_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.colW = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.rowH = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_rowH_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.rowH = ' + pptNode + ';');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.ul = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_ul_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.ul = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.ol = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_ol_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.ul = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};
md.li = function(model, ctx, callback) {
    var pptParent = ctx.values.pptStack[ctx.values.pptStack.length-1].node;
    var pptParentArrayName = ctx.values.pptStack[ctx.values.pptStack.length-1].arrayName;
    var pptNode = "ppt_li_" + (++ctx.values.pptCounter);
    ctx.values.pptStack.push({
        node: pptNode
    })
    ctx.w('const ' + pptNode + ' = {};');
    ctx.w(pptNode + '.text = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w(pptParent + '.children.push(' + pptNode + 'Obj);');
        ctx.w(pptParent + '["' + pptParentArrayName + '"].push(' + pptNode + ');');
        ctx.values.pptStack.pop();
        return callback(null);
    })
};

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: '/lib/artifacts/ppt/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
        });
}
