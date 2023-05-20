/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.pdf\.wizzi\lib\artifacts\pdf\document\gen\main.js.ittf
    utc time: Fri, 01 Jul 2022 16:42:17 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var errors = require('../../../../../errors');

var myname = '.artifacts.pdf.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'pdf') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "pdf". Received: ' + model.wzElement, model))
    }
    try {
        md.pdf(model, ctx, function(err, notUsed) {
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
        })
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
}
;

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

md.pdf = function(model, ctx, callback) {
    // log "ctx.keys", Object.keys(ctx)
    // log "ctx.values property", ctx.values
    // log 'tag pdf, nodes', model.nodes.length
    ctx.values.pdfStack = [];
    ctx.values.pdfCounter = 0;
    ctx.values.pdfMainObject = 'pdf_MainObject';
    ctx.values.mainObjectCreated = false;
    ctx.values.bulletLevel = 0;
    var pdfNode = "pdf_doc_" + (++ctx.values.pdfCounter);
    ctx.values.pdfMainDocumentDefinition = pdfNode;
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: null
     })
    ctx.values.pdfMainInternalObject = pdfNode;
    ctx.w('const fs = require("fs");');
    ctx.w('const pdfmake = require("pdfmake");');
    ctx.w('');
    ctx.w('const ' + pdfNode + ' = { content: [], styles: {} };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('');
        ctx.w('// Make Pdf');
        ctx.w('');
        ctx.w('// Build document definition');
        ctx.w('var now = new Date();');
        ctx.w('var documentDefinition = ' + ctx.values.pdfMainDocumentDefinition + ';');
        ctx.w('pdf_MainObject.sections.forEach(section => {');
        ctx.w('    section.content.forEach(contentItem => {');
        ctx.w('        documentDefinition.content.push(contentItem);');
        ctx.w('    });');
        ctx.w('    Object.assign({}, documentDefinition.styles, section.styles);');
        ctx.w('});');
        ctx.w('');
        ctx.w('// Dump for test');
        ctx.w('    fs.writeFileSync(__dirname + "/' + model.wzName + '.json", JSON.stringify(documentDefinition, null, "\t"));');
        ctx.w('');
        ctx.w('// Set fonts');
        ctx.w('var fonts = {');
        ctx.w('	Roboto: {');
        ctx.w('		normal: __dirname + "/fonts/Roboto-Regular.ttf",');
        ctx.w('		bold: __dirname + "/fonts/Roboto-Medium.ttf",');
        ctx.w('		italics: __dirname + "/fonts/Roboto-Italic.ttf",');
        ctx.w('		bolditalics: __dirname + "/fonts/Roboto-MediumItalic.ttf"');
        ctx.w('	}');
        ctx.w('};');
        ctx.w('');
        ctx.w('// Create document');
        ctx.w('var printer = new pdfmake(fonts);');
        ctx.w('var pdfDoc = printer.createPdfKitDocument(documentDefinition);');
        ctx.w('pdfDoc.pipe(fs.createWriteStream(__dirname + "/' + (model.wzName || 'created') + '.pdf"));');
        ctx.w('pdfDoc.end();');
        ctx.w('console.log("DONE written", new Date() - now)');
        return callback(null);
    }
    )
}
;

md.section = function(model, ctx, callback) {
    // log 'tag section, value', model.wzName
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1];
    var pdfNode = "pdf_sect_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "content"
     })
    ctx.w('const ' + pdfNode + ' = { content: [], styles: {} };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        
        // _ ctx.w('const ' + ctx.values.pdfMainObject + ' = new pdf.Document(' + ctx.values.pdfMainInternalObject + ');')
        if (ctx.values.mainObjectCreated == false) {
            ctx.w('const ' + ctx.values.pdfMainObject + ' = { sections : [] };');
            ctx.values.mainObjectCreated = true;
        }
        ctx.w(pdfNode + ".content.push({ text: ' ', pageBreak: 'after'});");
        ctx.w(ctx.values.pdfMainObject + '.sections.push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;

md.p = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_p_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "text"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = [];');
    if (!verify.isEmpty(model.wzName)) {
        ctx.w(pdfNode + '.text.push("' + respace(model.wzName) + '");');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.columns = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_columns_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "columns"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.columns = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.stack = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_stack_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "stack"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.stack = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.image = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_image_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.image = "' + model.wzName + '";');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.imageDef = function(model, ctx, callback) {
    if (ctx.values.mainObjectCreated == false) {
        ctx.w('const ' + ctx.values.pdfMainObject + ' = new pdf.Document(' + ctx.values.pdfMainInternalObject + ');');
        ctx.values.mainObjectCreated = true;
    }
    ctx.w('const ' + model.wzName + ' = pdf.Media.addImage(');
    // _ ctx.w('  ' + ctx.values.pdfMainObject + ', 300, 300,')
    ctx.w('  ' + ctx.values.pdfMainObject + ',');
    ctx.w('  fs.readFileSync("' + verify.replaceAll(model.src, '\\', '\\\\') + '")');
    ctx.w(');');
    return callback(null);
}
;
md.imageRef = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1];
    ctx.w(pdfParent + '.children.push(' + model.wzName + ');');
    return callback(null);
}
;

md.h1 = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_par_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.heading = pdf.HeadingLevel.HEADING_1;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pdfNode + 'Obj = new pdf.Paragraph(' + pdfNode + ');');
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.h2 = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_par_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.heading = pdf.HeadingLevel.HEADING_2;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pdfNode + 'Obj = new pdf.Paragraph(' + pdfNode + ');');
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.h3 = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_par_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.heading = pdf.HeadingLevel.HEADING_3;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pdfNode + 'Obj = new pdf.Paragraph(' + pdfNode + ');');
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.h4 = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_par_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.heading = pdf.HeadingLevel.HEADING_4;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pdfNode + 'Obj = new pdf.Paragraph(' + pdfNode + ');');
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.h5 = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_par_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.heading = pdf.HeadingLevel.HEADING_5;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pdfNode + 'Obj = new pdf.Paragraph(' + pdfNode + ');');
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.h6 = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_par_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.heading = pdf.HeadingLevel.HEADING_6;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w('const ' + pdfNode + 'Obj = new pdf.Paragraph(' + pdfNode + ');');
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.text = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_txt_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.bold = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_txt_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.bold = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.italics = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_txt_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.italics = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.underline = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_txt_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = "' + respace(model.wzName) + '";');
    ctx.w(pdfNode + '.underline = true;');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.pageOrientation = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.pageOrientation = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.pageSize = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.pageSize = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.pageMargins = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.pageMargins = [' + respace(model.wzName) + '];');
    return callback(null);
}
;
md.boldProp = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.bold = ' + true + ';');
    return callback(null);
}
;
md.italicsProp = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.italics = ' + true + ';');
    return callback(null);
}
;
md.underlineProp = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.underline = ' + true + ';');
    return callback(null);
}
;
md.emphasisMark = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.emphasisMark = ' + true + ';');
    return callback(null);
}
;
md.strike = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.strike = ' + true + ';');
    return callback(null);
}
;
md.doubleStrike = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.doubleStrike = ' + true + ';');
    return callback(null);
}
;
md.superScript = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.superScript = ' + true + ';');
    return callback(null);
}
;
md.subScript = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.subScript = ' + true + ';');
    return callback(null);
}
;
md.smallCaps = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.smallCaps = ' + true + ';');
    return callback(null);
}
;
md.allCaps = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.allCaps = ' + true + ';');
    return callback(null);
}
;
md.font = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.font = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.fontSize = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.fontSize = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.xbreak = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.break = ' + true + ';');
    return callback(null);
}
;
md.size = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.size = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.color = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.color = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.background = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.background = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.fill = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.background = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.xname = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.name = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.highlight = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.highlight = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.style = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.style = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.next = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.next = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.basedOn = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.basedOn = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.before = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.before = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.after = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.after = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.line = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.line = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.link = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.link = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.linkText = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.text = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.value = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.value = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.space = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.space = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.height = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.height = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.margin = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.margin = [' + respace(model.wzName) + '];');
    return callback(null);
}
;
md.width = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.width = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.widths = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.table.widths = [' + respace(model.wzName) + '];');
    return callback(null);
}
;
md.headerRows = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.table.headerRows = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.layout = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.layout = "' + respace(model.wzName) + '";');
    return callback(null);
}
;
md.noWrap = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.noWrap = ' + true + ';');
    return callback(null);
}
;
md.columnGap = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.columnGap = ' + respace(model.wzName) + ';');
    return callback(null);
}
;
md.xtype = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    if (model.wzParent.wzElement == 'shading') {
        ctx.w(pdfParent + '.type = pdf.ShadingType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'width') {
        ctx.w(pdfParent + '.type = pdf.WidthType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'tabStop') {
        ctx.w(pdfParent + '.type = pdf.TabStopType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'underline') {
        ctx.w(pdfParent + '.type = pdf.UnderlineType.' + model.wzName + ';');
    }
    else if (model.wzParent.wzElement == 'hyperlinkDef') {
        if (model.wzName && model.wzName.length > 0) {
            ctx.w(pdfParent + '.type = pdf.HyperlinkType.' + model.wzName + ';');
        }
        else {
            ctx.w(pdfParent + '.type = pdf.HyperlinkType.EXTERNAL;');
        }
    }
    else {
        ctx.w(pdfParent + '.type = "' + model.wzName + '";');
    }
    return callback(null);
}
;
md.position = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    if (model.wzParent.wzElement == 'tabStop') {
        if (verify.isNumber(model.wzName)) {
            ctx.w(pdfParent + '.position = ' + model.wzName + ';');
        }
        else {
            ctx.w(pdfParent + '.position = pdf.TabStopPosition.' + model.wzName + ';');
        }
    }
    else {
        ctx.w(pdfParent + '.position = ' + model.wzName + ';');
    }
    return callback(null);
}
;
md.alignment = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.alignment = "' + model.wzName + '";');
    return callback(null);
}
;
md.hyperlinkRef = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    ctx.w(pdfParent + '.children.push(new pdf.HyperlinkRef("' + model.wzName + '"));');
    return callback(null);
}
;

md.font = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_fnt_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.font = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;

md.shading = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_shd_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.shading = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.table = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_table_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "body"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.table = { body: [] };');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.tr = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_tr_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "tds"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.tds = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.table.body.push(' + pdfNode + '.tds);');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.underline = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_underline_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfNode + '.underline = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.styles = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_styles_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.styles = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.xdefault = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_xdefault_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.default = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.run = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_run_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.run = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.tabStop = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_tabStop_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.tabStops.push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.styleDef = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_styleDef_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    if (model.wzParent.wzElement == 'paragraphStyles') {
        ctx.w(pdfNode + '.id = "' + model.wzName + '";');
    }
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (model.wzParent.wzElement == 'xdefault') {
            ctx.w(pdfParent + '.' + model.wzName + ' = ' + pdfNode + ';');
        }
        else {
            ctx.w(pdfParent + '.styles["' + model.wzName + '"] = ' + pdfNode + ';');
        }
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.defaultStyleDef = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_defaultStyleDef_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.defaultStyle = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.spacing = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_spacing_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.spacing = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.hyperlinks = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_hyperlinks_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.hyperlinks = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.hyperlinkDef = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_hyperlinkDef_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.' + model.wzName + ' = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.border = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_border_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.border = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.top = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_top_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.top = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.left = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_left_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.left = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.right = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_right_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.right = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.bottom = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_bottom_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = {};');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.bottom = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.paragraphStyles = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_paragraphStyles_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: ""
     })
    ctx.w('const ' + pdfNode + ' = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.paragraphStyles = ' + pdfNode + ';');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.ul = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_ul_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "ul"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.ul = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.ol = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_ol_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "ol"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.ul = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;
md.li = function(model, ctx, callback) {
    var pdfParent = ctx.values.pdfStack[ctx.values.pdfStack.length-1].node;
    var pdfParentArrayName = ctx.values.pdfStack[ctx.values.pdfStack.length-1].arrayName;
    var pdfNode = "pdf_li_" + (++ctx.values.pdfCounter);
    ctx.values.pdfStack.push({
        node: pdfNode, 
        arrayName: "text"
     })
    ctx.w('const ' + pdfNode + ' = {};');
    ctx.w(pdfNode + '.text = [];');
    md.genItems(model.nodes, ctx, noindent, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(pdfParent + '.children.push(' + pdfNode + 'Obj);');
        ctx.w(pdfParent + '["' + pdfParentArrayName + '"].push(' + pdfNode + ');');
        ctx.values.pdfStack.pop();
        return callback(null);
    }
    )
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: '/lib/artifacts/pdf/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
