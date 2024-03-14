/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.pandoc\.wizzi-override\lib\artifacts\pandoc\document\gen\main.js.ittf
    utc time: Wed, 13 Mar 2024 07:02:01 GMT
*/
'use strict';
// https://hackage.haskell.org/package/pandoc-types-1.23/docs/Text-Pandoc-Definition.html


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('wizzi-utils').helpers.lineParser;
var errors = require('../../../../../errors');
var lineParser2 = require('../../../utils/lineParser');

var myname = 'wizzi.plugin.pandoc.artifacts.pandoc.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'pandoc') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "pandoc". Received: ' + model.wzElement, model));
    }
    try {
        md.pandoc(model, ctx, (err, notUsed) => {
        
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
function defaultAttr() {
    return [
            "", 
            [], 
            []
        ];
}
md.pandoc = function(model, ctx, callback) {
    // Pandoc: Meta [Block]
    // https://hackage.haskell.org/package/pandoc-types-1.23/docs/Text-Pandoc-Definition.html#t:Pandoc
    ctx.values.pandocStack = [];
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonMeta: {
            
         }, 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        "pandoc-api-version": [
            1, 
            23
        ], 
        meta: pandocNode.jsonMeta, 
        blocks: pandocNode.jsonBlocks
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.w(JSON.stringify(jsonObject, null, 4))
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.attrIdentifier = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    parentPandocNode.jsonAttr[0] = model.wzName;
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.attrClass = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    parentPandocNode.jsonAttr[1].push(model.wzName)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.attrKeyValue = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    var p = lineParser2.parseNameValueRaw(model.wzName, model);
    parentPandocNode.jsonAttr[2].push([
        '"' + p.name() + '"', 
        p.value()
    ])
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
// Meta: Map Text MetaValue
// MetaMap (Map Text MetaValue)
// MetaList [MetaValue]
// MetaBool Bool
// MetaString Text
// MetaInlines [Inline]
// MetaBlocks [Block]
md.meta = function(model, ctx, callback) {
    // Meta: Map Text MetaValue
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonMetaMap: {
            
         }, 
        jsonMetas: [
            
        ], 
        jsonString: null, 
        jsonBool: null, 
        jsonInlines: [
            
        ], 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        var jsonObject = {};
        if (pandocNode.jsonInlines.length > 0) {
            jsonObject.t = 'MetaInlines';
            jsonObject.c = pandocNode.jsonInlines;
        }
        if (pandocNode.jsonBlocks.length > 0) {
            jsonObject.t = 'MetaBlocks';
            jsonObject.c = pandocNode.jsonBlocks;
        }
        parentPandocNode.jsonMeta[model.wzName] = jsonObject;
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
// https://hackage.haskell.org/package/pandoc-types-1.23/docs/Text-Pandoc-Definition.html#t:Block
//
// Plain [Inline]	                                                Plain text, not a paragraph
// Para [Inline]	                                                    Paragraph
// LineBlock [[Inline]]	                                            Multiple non-breaking lines
// CodeBlock Attr Text	                                            Code block (literal) with attributes
// RawBlock Format Text                                              Raw block
// BlockQuote [Block]	                                            Block quote (list of blocks)
// OrderedList ListAttributes [[Block]]	                            Ordered list (attributes and a list of items, each a list of blocks)
// BulletList [[Block]]	                                            Bullet list (list of items, each a list of blocks)
// DefinitionList [([Inline], [[Block]])]                            Definition list. Each list item is a pair consisting of a term (a list of inlines) and one or more definitions (each a list of blocks)
// Header Int Attr [Inline]	                                        Header - level (integer) and text (inlines)
// HorizontalRule	                                                Horizontal rule
// Table Attr Caption [ColSpec] TableHead [TableBody] TableFoot	    Table, with attributes, caption, optional short caption, column alignments and widths (required), table head, table bodies, and table foot
// Figure Attr Caption [Block]	                                    Figure, with attributes, caption, and content (list of blocks)
// Div Attr [Block]	                                                Generic block container with attributes
// Attr = (Text, [Text], [(Text, Text)])                             identifier, classes, key-value pairs
md.plain = function(model, ctx, callback) {
    // Plain [Inline]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Plain", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonBlocks.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.paragraph = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "paragraph", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Para", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonBlocks.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.lineBlock = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "LineBlock", 
        c: [
            pandocNode.jsonInlines
        ]
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonBlocks.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.codeBlock = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonText: null
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "CodeBlock", 
        c: [
            [
                pandocNode.jsonAttr
            ], 
            [
                pandocNode.jsonText
            ]
        ]
     };
    parentPandocNode.jsonBlocks.push(jsonObject)
}
;
// OrderedList ListAttributes [[Block]]	                            Ordered list (attributes and a list of items, each a list of blocks)
md.definitionList = function(model, ctx, callback) {
    // DefinitionList [([Inline], [[Block]])]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonInlines: [
            
        ], 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "DefinitionList", 
        c: [
            [
                pandocNode.jsonInlines, 
                [
                    pandocNode.jsonBlocks
                ]
            ]
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonBlocks.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.bulletList = function(model, ctx, callback) {
    // BulletList [[Block]]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "BulletList", 
        c: [
            pandocNode.jsonBlocks
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonBlocks.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.orderedList = function(model, ctx, callback) {
    // OrderedList ListAttributes [[Block]]
    // ListAttributes = (Int, ListNumberStyle, ListNumberDelim)
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonListAttributes: [
            
        ], 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "OrderedList", 
        c: [
            pandocNode.jsonListAttributes, 
            [
                pandocNode.jsonBlocks
            ]
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonBlocks.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.listItem = function(model, ctx, callback) {
    md.plain(model, ctx, callback)
}
;
md.h1 = function(model, ctx, callback) {
    processHeading(1, model, ctx, callback)
}
;
md.h2 = function(model, ctx, callback) {
    processHeading(2, model, ctx, callback)
}
;
md.h3 = function(model, ctx, callback) {
    processHeading(3, model, ctx, callback)
}
;
md.h4 = function(model, ctx, callback) {
    processHeading(4, model, ctx, callback)
}
;
md.h5 = function(model, ctx, callback) {
    processHeading(5, model, ctx, callback)
}
;
md.h6 = function(model, ctx, callback) {
    processHeading(6, model, ctx, callback)
}
;
md.hr = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    const jsonObject = {
        t: "HorizontalRule"
     };
    pandocNode.jsonInlines.push(jsonObject)
}
;
md.table = function(model, ctx, callback) {
    // Table: Attr Caption [ColSpec] TableHead [TableBody] TableFoot
    // ColSpec:  Attr [Cell]
    // TableHead: Attr [Row]
    // TableBody: Attr RowHeadColumns(Int) [Row] [Row]
    // TableFoot: Attr [Row]
    // Caption: Caption (Maybe ShortCaption) [Block]
    // ShortCaption: [inline]
    // TableHead: Attr [Row]
    // Row: Attr [Cell]
    // Cell: Attr Alignment RowSpan(Int) ColSpan(Int) [Block]
    // Alignment: AlignLeft | AlignRight	| AlignCenter | AlignDefault
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonCaption: [
            null, 
            []
        ], 
        jsonColSpec: [
            
        ], 
        jsonTableHead: [
            defaultAttr(), 
            []
        ], 
        jsonTableBodies: [
            
        ], 
        jsonTableFoot: [
            defaultAttr(), 
            []
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Table", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonCaption, 
            pandocNode.jsonColSpec, 
            pandocNode.jsonTableHead, 
            pandocNode.jsonTableBodies, 
            pandocNode.jsonTableFoot
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        console.log('pandocNode.jsonTableBodies[0][3]', pandocNode.jsonTableBodies[0][3], __filename);
        console.log('pandocNode.jsonTableBodies[0][3][0]', pandocNode.jsonTableBodies[0][3][0], __filename);
        if (pandocNode.jsonTableBodies.length > 0 && pandocNode.jsonTableBodies[0][3].length > 0) {
            var i, i_items=pandocNode.jsonTableBodies[0][3][0][1], i_len=pandocNode.jsonTableBodies[0][3][0][1].length, td;
            for (i=0; i<i_len; i++) {
                td = pandocNode.jsonTableBodies[0][3][0][1][i];
                pandocNode.jsonColSpec.push([
                    {
                        t: "AlignDefault"
                     }, 
                    {
                        t: "ColWidthDefault"
                     }
                ])
            }
        }
        parentPandocNode.jsonBlocks.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.tableHead = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonTableRows: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "TableHead", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonTableRows
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonTableHead = jsonObject(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.tableBody = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonRowHeadColumns: 0, 
        jsonTableRows: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = [
        pandocNode.jsonAttr, 
        pandocNode.jsonRowHeadColumns, 
        [], 
        pandocNode.jsonTableRows
    ];
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        console.log('tableBody.jsonObject', jsonObject, __filename);
        parentPandocNode.jsonTableBodies.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.tableFoot = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonTableRows: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "TableFoot", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonTableRows
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonTableFoot = jsonObject();
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.tableRow = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonTableCells: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = [
        pandocNode.jsonAttr, 
        pandocNode.jsonTableCells
    ];
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonTableRows.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.tableCell = function(model, ctx, callback) {
    // Cell: Attr Alignment RowSpan(Int) ColSpan(Int) [Block]
    // Alignment: AlignLeft | AlignRight	| AlignCenter | AlignDefault
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonAlignment: "AlignDefault", 
        jsonRowSpan: 1, 
        jsonColSpan: 1, 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = [
        pandocNode.jsonAttr, 
        {
            t: pandocNode.jsonAlignment
         }, 
        pandocNode.jsonRowSpan, 
        pandocNode.jsonColSpan, 
        pandocNode.jsonBlocks
    ];
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonTableCells.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.figure = function(model, ctx, callback) {
    // Figure Attr Caption [Block]
    // TODO jsonCaption
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonCaption: {
            
         }, 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Figure", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.caption, 
            pandocNode.jsonBlocks
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonBlocks.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.div = function(model, ctx, callback) {
    // Div Attr [Block]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Div", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonBlocks
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonBlocks.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.textrun = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    const jsonObject = {
        t: "Str", 
        c: model.wzName
     };
    parentPandocNode.jsonInlines.push(jsonObject)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.space = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    const jsonObject = {
        t: "Space"
     };
    parentPandocNode.jsonInlines.push(jsonObject)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.softBreak = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    const jsonObject = {
        t: "SoftBreak"
     };
    parentPandocNode.jsonInlines.push(jsonObject)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.lineBreak = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    const jsonObject = {
        t: "LineBreak"
     };
    parentPandocNode.jsonInlines.push(jsonObject)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.emphasis = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "emphasis", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Emph", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.underline = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "underline", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Underline", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.bold = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "bold", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Strong", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.strong = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "strong", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Strong", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.strikeout = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "strikeout", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Strikeout", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.subScript = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "subScript", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Subscript", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.superScript = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "superScript", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Superscript", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.smallCaps = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        test: "smallCaps", 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "SmallCaps", 
        c: pandocNode.jsonInlines
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.quoted = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var quotedType = model.wzName.toLowerCase() == 'double' ? 'DoubleQuote' : 'SingleQuote';
    var jsonObject = {
        t: "Quoted", 
        c: [
            [
                quotedType
            ], 
            pandocNode.jsonInlines
        ]
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.cite = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonCitations: [
            
        ], 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Cite", 
        c: [
            pandocNode.jsonCitations, 
            pandocNode.jsonInlines
        ]
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
}
;
md.code = function(model, ctx, callback) {
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr()
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Code", 
        c: [
            pandocNode.jsonAttr, 
            model.wzName
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonInlines.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.math = function(model, ctx, callback) {
    // Math: MathType Text
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    var mathType = model.type && model.type.toLowerCase() == 'inline' ? 'InlineMath' : 'DisplayMath';
    var jsonObject = {
        t: "Math", 
        c: [
            [
                mathType
            ], 
            model.wzName
        ]
     };
    parentPandocNode.jsonInlines.push(jsonObject)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.raw = function(model, ctx, callback) {
    // RawInline: Format Text
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {};
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "RawInline", 
        c: [
            [
                model.format
            ], 
            model.wzName
        ]
     };
    parentPandocNode.jsonInlines.push(jsonObject)
    ctx.values.pandocStack.pop();
    return callback(null);
}
;
md.hyperlink = function(model, ctx, callback) {
    // Link Attr [Inline] Target
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Link", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonInlines, 
            [
                model.href, 
                ""
            ]
        ]
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonInlines.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
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
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonInlines: [
            
        ], 
        jsonTarget: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Image", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonInlines, 
            pandocNode.jsonTarget
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        pandocNode.jsonTarget.push(model.src || "")
        pandocNode.jsonTarget.push(model.title || "")
        parentPandocNode.jsonInlines.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.note = function(model, ctx, callback) {
    // Note [Block]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Note", 
        c: [
            pandocNode.jsonBlocks
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonInlines.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.span = function(model, ctx, callback) {
    // Span: Attr [Inline]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: defaultAttr(), 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Span", 
        c: [
            pandocNode.jsonAttr, 
            pandocNode.jsonInlines
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.jsonInlines.push(jsonObject)
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
md.caption = function(model, ctx, callback) {
    // Caption: (Maybe ShortCaption) [Block]
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonBlocks: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    // TODO (Maybe ShortCaption)
    var jsonObject = {
        t: "Caption", 
        c: [
            pandocNode.jsonBlocks
        ]
     };
    md.genItems(model.nodes, ctx, {
        indent: false
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        parentPandocNode.caption = jsonObject();
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    )
}
;
function checkCommandFinish(commandStart, text, pos) {
    if (commandStart.commandId == '[*' && text[pos] == '*' && text[pos+1] == ']') {
        return true;
    }
    else if (commandStart.commandId == '[**' && text[pos] == '*' && text[pos+1] == '*' && text[pos+2] == ']') {
        return true;
    }
    else if (commandStart.commandId == '[_' && text[pos] == '_' && text[pos+1] == ']') {
        return true;
    }
    else if (commandStart.commandId == '[__' && text[pos] == '_' && text[pos+1] == '_' && text[pos+2] == ']') {
        return true;
    }
    else {
        return false;
    }
}
function checkCommandStart(text, pos) {
    if (text[pos] == '[') {
        if (text[pos+1] == '*') {
            if (text[pos+2] == '*') {
                return {
                        command: "Strong", 
                        commandId: "[**", 
                        skip: 2
                     };
            }
            else {
                return {
                        command: "Emph", 
                        commandId: "[*", 
                        skip: 1
                     };
            }
        }
        else if (text[pos+1] == '_') {
            if (text[pos+2] == '_') {
                return {
                        command: "Strong", 
                        commandId: "[__", 
                        skip: 2
                     };
            }
            else {
                return {
                        command: "Emph", 
                        commandId: "[_", 
                        skip: 1
                     };
            }
        }
    }
    else {
        return null;
    }
}
function processText(model, ctx, callback) {
    if (verify.isNotEmpty(model.wzName)) {
        var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
        var pandocNode = {
            test: "processText"
         };
        ctx.values.pandocStack.push(pandocNode);
        var text = model.wzName;
        var commandStart = null;
        var ch, len = text.length;
        var str = [];
        for (var i=0; i<len; i++) {
            ch = text[i];
            if (ch == ' ') {
                if (str.length > 0) {
                    parentPandocNode.jsonInlines.push({
                        t: "Str", 
                        c: str.join('')
                     })
                    str.length = 0;
                }
                parentPandocNode.jsonInlines.push({
                    t: "Space"
                 })
            }
            else if (ch == '\r') {
                if (str.length > 0) {
                    parentPandocNode.jsonInlines.push({
                        t: "Str", 
                        c: str.join('')
                     })
                    str.length = 0;
                }
                parentPandocNode.jsonInlines.push({
                    t: "SoftBreak"
                 })
            }
            else if (ch == '\n') {
                if (str.length > 0) {
                    parentPandocNode.jsonInlines.push({
                        t: "Str", 
                        c: str.join('')
                     })
                    str.length = 0;
                }
                parentPandocNode.jsonInlines.push({
                    t: "LineBreak"
                 })
            }
            else if (checkCommandStart(text, i)) {
                if (str.length > 0) {
                    parentPandocNode.jsonInlines.push({
                        t: "Str", 
                        c: str.join('')
                     })
                    str.length = 0;
                }
                commandStart = checkCommandStart(text, i);
                var newParentPandocNode = {
                    jsonInlines: [
                        
                    ]
                 };
                var jsonObject = {
                    t: commandStart.command, 
                    c: newParentPandocNode.jsonInlines
                 };
                parentPandocNode.jsonInlines.push(jsonObject)
                ctx.values.pandocStack.push(parentPandocNode);
                parentPandocNode = newParentPandocNode;
                i = i + commandStart.skip;
            }
            else if (commandStart && checkCommandFinish(commandStart, text, i)) {
                if (str.length > 0) {
                    parentPandocNode.jsonInlines.push({
                        t: "Str", 
                        c: str.join('')
                     })
                    str.length = 0;
                }
                parentPandocNode = ctx.values.pandocStack.pop();
                i = i + commandStart.skip;
                commandStart = null;
            }
            else {
                str.push(ch);
            }
        }
        if (str.length > 0) {
            parentPandocNode.jsonInlines.push({
                t: "Str", 
                c: str.join('')
             })
            str.length = 0;
        }
        ctx.values.pandocStack.pop();
        return callback(null);
    }
    else {
        return callback(null);
    }
}
function processHeading(heading, model, ctx, callback) {
    var jsonAttr = defaultAttr();
    jsonAttr[0] = verify.replaceAll(model.wzName, ' ', '-').toLowerCase();
    var parentPandocNode = ctx.values.pandocStack[ctx.values.pandocStack.length-1];
    var pandocNode = {
        jsonAttr: jsonAttr, 
        jsonInlines: [
            
        ]
     };
    ctx.values.pandocStack.push(pandocNode);
    var jsonObject = {
        t: "Header", 
        c: [
            heading, 
            pandocNode.jsonAttr, 
            pandocNode.jsonInlines
        ]
     };
    processText(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        md.genItems(model.nodes, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            parentPandocNode.jsonBlocks.push(jsonObject)
            ctx.values.pandocStack.pop();
            return callback(null);
        }
        )
    }
    )
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
            method: 'wizzi.plugin.pandoc/lib/artifacts/pandoc/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
