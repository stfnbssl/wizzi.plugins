/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docs\.wizzi-override\lib\artifacts\docs\document\gen\main.js.ittf
    utc time: Wed, 13 Mar 2024 07:01:23 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('wizzi-utils').helpers.lineParser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.docs.artifacts.docs.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'docs') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "docs". Received: ' + model.wzElement, model));
    }
    try {
        md.docs(model, ctx, (err, notUsed) => {
        
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
md.docs = function(model, ctx, callback) {
    ctx.values.docsStack = [];
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(JSON.stringify(jsonObject, null, 4))
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.heading1 = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'h1', 
        title: model.wzName, 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.heading2 = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'h2', 
        title: model.wzName, 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.heading3 = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'h3', 
        title: model.wzName, 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.text = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'text', 
        content: model.wzName, 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.codeLines = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'codeLines', 
        language: model.wzName, 
        schema: model.schema, 
        title: model.title, 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.listItem = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'li', 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.img = function(model, ctx, callback) {
    md.image(model, ctx, callback)
}
;
md.image = function(model, ctx, callback) {
    // Image Attr [Inline] Target
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonTarget: {
            
         }, 
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: "image", 
        attr: docsNode.jsonAttr, 
        target: docsNode.jsonTarget, 
        lines: docsNode.jsonInlines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        docsNode.jsonTarget.src = model.src || ""();
        docsNode.jsonTarget.title = model.title || ""();
        parentDocsNode.jsonLines.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.table = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonCaption: {
            
         }, 
        jsonColSpec: {
            
         }, 
        jsonTableHead: {
            
         }, 
        jsonTableBody: {
            
         }, 
        jsonTableFoot: {
            
         }
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'table', 
        attr: docsNode.jsonAttr, 
        caption: docsNode.jsonCaption, 
        colSpec: docsNode.jsonColSpec, 
        tHead: docsNode.jsonTableHead, 
        tBody: docsNode.jsonTableBody, 
        tFoot: docsNode.jsonTableFoot
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.lines.push();
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.tableHead = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonTableRows: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'thead', 
        attr: docsNode.jsonAttr, 
        rows: docsNode.jsonTableRows
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonTableHead = jsonObject();
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.tableBody = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonRowHeadColumns: 0, 
        jsonTableRows: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'tbody', 
        attr: docsNode.jsonAttr, 
        rowHeadColumns: docsNode.jsonRowHeadColumns, 
        rows: docsNode.jsonTableRows
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonTableBody = jsonObject();
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.tableFoot = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonTableRows: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'tfoot', 
        attr: docsNode.jsonAttr, 
        rows: docsNode.jsonTableRows
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonTableFoot = jsonObject();
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.tableRow = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonTableCells: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'td', 
        attr: docsNode.jsonAttr, 
        cells: docsNode.jsonTableCells
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonTableRows.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
}
;
md.tableCell = function(model, ctx, callback) {
    var parentDocsNode = ctx.values.docsStack[ctx.values.docsStack.length-1];
    var docsNode = {
        jsonAttr: defaultAttr(), 
        jsonAlignment: "default", 
        jsonRowSpan: 1, 
        jsonColSpan: 1, 
        jsonLines: [
            
        ]
     };
    ctx.values.docsStack.push(docsNode);
    var jsonObject = {
        type: 'td', 
        attr: docsNode.jsonAttr, 
        align: docsNode.jsonAlignment, 
        rowSpan: docsNode.jsonRowSpan, 
        colSpan: docsNode.jsonColSpan, 
        lines: docsNode.jsonLines
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentDocsNode.jsonTableCells.push(jsonObject)
        ctx.values.docsStack.pop();
        return callback(null);
    }
    )
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
            method: 'wizzi.plugin.docs/lib/artifacts/docs/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
