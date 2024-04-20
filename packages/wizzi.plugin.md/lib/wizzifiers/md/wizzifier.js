/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\wizzifiers\md\wizzifier.js.ittf
    utc time: Sat, 20 Apr 2024 04:47:45 GMT
*/
'use strict';
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;
var lineParser = require('../utils/lineParser');
var file = require('@wizzi/utils').file;
var cloner = require('../utils/cloner');
var ittfWriter = require("../utils/ittfWriter");
var helpers = require("@wizzi/utils").helpers;
var textIndentParser = helpers.textIndentParser;
var preserveSpaces = helpers.lineParser.preserveSpaces;
var matter = require('gray-matter');
var md_parser = require('marked');
var md_Lexer = require('marked').Lexer;
var cleanAST = require('./cleanAST');

function parseInternal(tobeWizzified, options, callback) {
    try {
        var parsed_matter = matter(tobeWizzified);
        var syntax = md_Lexer.lex(parsed_matter.content);
        syntax.__frontMatter = parsed_matter.isEmpty ? null : parsed_matter.data;
        return callback(null, syntax);
    } 
    catch (ex) {
        return callback(ex);
    } 
}
var verbose = false;
function log(label, obj, force) {
    if (verbose || force) {
        console.log(label, util.inspect(obj, {
            depth: null
         }))
    }
}
var md = module.exports = {};
md.getCodeAST = function(tobeWizzified, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    options.input = tobeWizzified;
    options.stack = [];
    parseInternal(tobeWizzified, options, callback)
}
;
md.getWizziTree = function(input, options, callback) {
    options = (options || {});
    if (typeof (options.verbose) !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    // loog 'startTime', startTime
    wizzify(input, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        if (options.syntaxOutFile) {
            parseInternal(input, options, (err, syntax) => {
            
                if (err) {
                    return callback(err);
                }
                file.write(options.syntaxOutFile, stringify(syntax, null, 2))
            }
            )
        }
        // loog 'Parsed in ' + Date.now() - startTime + ' ms'
        callback(null, syntax);
    }
    )
}
;
md.getWizziIttf = function(input, options, callback) {
    md.getWizziTree(input, options, (err, result) => {
    
        if (err) {
            return callback(err);
        }
        md.getWizzifierIncludes(options, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            result = cloner(result, options);
            callback(null, ittfWriter.stringify(result, options))
        }
        )
    }
    )
}
;
// ovveridable
md.getWizzifierIncludes = function(options, callback) {
    return callback(null);
}
;

function wizzify(tobeWizzified, options, callback) {
    options = options || {};
    options.input = tobeWizzified;
    options.stack = [];
    options.formatTextNodes = [];
    options.wizziIncludes = [];
    options.verbose = true;
    parseInternal(tobeWizzified, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        var root = {
            tag: 'md', 
            children: [
                
            ]
         };
        processFrontMatter(syntax, options, root, (err, root) => {
        
            var i, i_items=preprocessSyntax(syntax), i_len=preprocessSyntax(syntax).length, item;
            for (i=0; i<i_len; i++) {
                item = preprocessSyntax(syntax)[i];
                format(root, item, options);
            }
            async.map(options.wizziIncludes, function(item, callback) {
                if (item.kind === 'css') {
                    options.wf.getWizziTreeFromText(item.literal, "css", (err, ittf) => {
                    
                        if (err) {
                            console.log("[31m%s[0m", err);
                        }
                        console.log('getWizzifierIncludes.css.item.ittf', ittf, __filename);
                        item.node.children.push(ittf)
                        return callback(null);
                    }
                    )
                }
                else {
                    options.wf.getWizziTreeFromText(item.literal, "html", (err, ittf) => {
                    
                        if (err) {
                            console.log("[31m%s[0m", err);
                        }
                        console.log('getWizzifierIncludes.html.item.ittf', ittf, __filename);
                        item.node.children.push(ittf)
                        return callback(null);
                    }
                    )
                }
            }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                return callback(null, root);
            }
            )
        }
        )
    }
    )
}

function processFrontMatter(syntax, options, root, callback) {
    console.log('processFrontMatter', syntax.__frontMatter, __filename);
    if (syntax.__frontMatter && Object.keys(syntax.__frontMatter).length > 0) {
        options.wf.getWizziTreeFromText(JSON.stringify(syntax.__frontMatter), "json", (err, ittf) => {
        
            var fmIttf = {
                tag: '---', 
                children: [
                    
                ]
             };
            appendIttf(fmIttf, ittf)
            root.children.push(fmIttf)
            return callback(null, root);
        }
        )
    }
    else {
        return callback(null, root);
    }
}

function preprocessSyntax(syntax) {
    var ret = [];
    var html = null;
    var i, i_items=syntax, i_len=syntax.length, item;
    for (i=0; i<i_len; i++) {
        item = syntax[i];
        if (item.type == 'html') {
            if (html == null) {
                html = item;
            }
            else {
                html.raw += item.raw;
                html.text += item.text;
            }
        }
        else {
            if (html) {
                ret.push(html)
                html = null;
            }
            ret.push(item)
        }
    }
    if (html) {
        ret.push(html)
    }
    return ret;
}
function appendIttf(node, ittf) {
    var toAppend = {
        tag: ittf.tag, 
        name: ittf.name, 
        children: [
            
        ]
     };
    var i, i_items=ittf.children, i_len=ittf.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittf.children[i];
        appendIttf(toAppend, item)
    }
    node.children.push(toAppend)
}

var format = function(parent, ast, options) {
    if (!ast) {
        throw new Error('missing ast. parent is: ' + util.inspect(parent, { depth: 2 }));
    }
    if (parent === null) {
        if (options.starter) {
            options.starter = false;
        }
        
        // ok
        else if (options.returnText) {
        }
        else {
            showstack(options);
            throw new Error('parent is null.' + util.inspect(ast, 4));
        }
    }
    var type = ast.type === 'arguments' ? 'xarguments' : ast.type;
    var formatter = format[type];
    if (formatter) {
        
        // loog "options.stack", options
        if (!options.stack) {
        }
        options.stack.push(ast);
        var result = formatter(parent, ast, options);
        options.stack.pop();
        return result;
    }
    else {
        throw new Error('no formatter for type: ' + ast.type);
    }
};

// process AST node blockquote
format.blockquote = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'quote', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node code
format.code = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'code', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (verify.isNotEmpty(node.codeBlockStyle)) {
        format.style(ret, {
            text: node.codeBlockStyle
         }, options)
    }
    if (verify.isNotEmpty(node.lang)) {
        format.lang(ret, {
            text: node.lang
         }, options)
    }
    textIndentParser.nodify(node.text, ret, {
        name: 'tag', 
        value: 'name'
     })
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node codespan
format.codespan = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'codespan', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // "text": ""
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node del
format.del = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'del', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node em
format.em = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'em', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node escape
format.escape = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'escape', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node heading
format.heading = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'heading', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // "depth": 1
    // "tokens": [
    ret.tag = 'h' + node.depth;
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog 'heading', node.raw.endsWith("\n\n")
    if (node.raw.endsWith("\n\n")) {
        ret.postAdd = {
            tag: 'br', 
            name: '', 
            isText: false, 
            children: [
                
            ]
         };
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node hr
format.hr = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'hr', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node html
format.html = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'html', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // set ret.name = node.text
    options.wizziIncludes.push({
        kind: 'html', 
        node: ret, 
        literal: node.raw || node.text
     })
    if (node.raw.endsWith("\n\n")) {
        ret.postAdd = {
            tag: 'br', 
            name: '', 
            isText: false, 
            children: [
                
            ]
         };
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node image
format.image = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'img', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    format.src(ret, {
        text: node.href
     }, options)
    if (verify.isNotEmpty(node.title)) {
        format.title(ret, {
            text: node.title
         }, options)
    }
    if (verify.isNotEmpty(node.text)) {
        format.alt(ret, {
            text: preserveSpaces(node.raw || node.text)
         }, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node link
format.link = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'a', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // "href": ""
    // "title": null
    // "tokens": [
    format.href(ret, {
        text: node.href
     }, options)
    if (verify.isNotEmpty(node.title)) {
        format.title(ret, {
            text: node.title
         }, options)
    }
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node list
format.list = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'ul', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // "ordered": false
    // "start": ""
    // "loose": false
    // "items": [
    if (node.ordered) {
        ret.tag = 'ol';
    }
    if (node.loose) {
        format.loose(ret, {}, options)
    }
    if (verify.isNotEmpty(node.start)) {
        format.start(ret, {
            text: node.start
         }, options)
    }
    var i, i_items=node.items, i_len=node.items.length, item;
    for (i=0; i<i_len; i++) {
        item = node.items[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node list_item
format.list_item = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'li', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // "task": false
    // "loose": false
    // "tokens": [
    if (verify.isNotEmpty(node.task)) {
        format.task(ret, {
            text: node.task
         }, options)
    }
    if (node.ordered) {
        format.ordered(ret, {}, options)
    }
    if (node.checked) {
        format.checked(ret, {}, options)
    }
    if (node.task) {
        format.task(ret, {}, options)
    }
    if (node.loose) {
        format.loose(ret, {}, options)
    }
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node paragraph
format.paragraph = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'p', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // tokens [
    // text ""
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node space
format.space = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'br', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node strong
format.strong = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'b', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection tokens and append ittfNode(s) to `ret`
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        if (ret.children.length == 1 && ret.children[0].tag == '+' && ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children.length = 0;
        }
        else {
            var items = [];
            var pluses = 0;
            var savename = ret.name;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (item.tag == '+') {
                    ret.name = item.name;
                    pluses++;
                }
                else {
                    items.push(item)
                }
            }
            if (pluses == 1) {
                ret.children = items;
            }
            else {
                ret.name = savename;
            }
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node table
format.table = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'table', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    format(ret, {
        type: "thead", 
        header: node.header
     }, options)
    format(ret, {
        type: "tbody", 
        rows: node.rows
     }, options)
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node thead
format.thead = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'thead', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    var i, i_items=node.header, i_len=node.header.length, item;
    for (i=0; i<i_len; i++) {
        item = node.header[i];
        format(ret, {
            type: "th", 
            item: item
         }, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node tbody
format.tbody = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'tbody', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    var i, i_items=node.rows, i_len=node.rows.length, item;
    for (i=0; i<i_len; i++) {
        item = node.rows[i];
        format(ret, {
            type: "tr", 
            items: item
         }, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node tr
format.tr = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'tr', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    var i, i_items=node.items, i_len=node.items.length, item;
    for (i=0; i<i_len; i++) {
        item = node.items[i];
        format(ret, {
            type: "td", 
            item: item
         }, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node td
format.td = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'td', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'td.node.item', node.item
    node.item.type = node.item.type || 'text';
    format(ret, node.item, options);
    if (ret.children.length == 1 && ret.children[0].children.length == 0) {
        ret.name = ret.children[0].name;
        ret.children.length = 0;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node th
format.th = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'th', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'th.node.item', node.item
    node.item.type = node.item.type || 'text';
    format(ret, node.item, options);
    if (ret.children.length == 1 && ret.children[0].children.length == 0) {
        ret.name = ret.children[0].name;
        ret.children.length = 0;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node text
format.text = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: '+', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (node.tokens) {
        var i, i_items=node.tokens, i_len=node.tokens.length, item;
        for (i=0; i<i_len; i++) {
            item = node.tokens[i];
            format(ret, item, options);
        }
        ret = ret.children;
    }
    else {
        var retcontainer = {
            children: [
                
            ]
         };
        console.log('node.raw || node.text', '|' + (node.raw || node.text) + '|', __filename);
        var ss = preserveSpaces(node.raw || node.text).split('\n');
        ret.name = ss[0];
        console.log(ret.name, '|' + ss[0] + '|', ss.length, __filename);
        retcontainer.children.push(ret);
        if (ss.length > 1) {
            for (var i=1; i<ss.length; i++) {
                format.text(retcontainer, {
                    text: preserveSpaces(ss[i])
                 }, options)
            }
        }
        ret = retcontainer.children;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    var i, i_items=ret, i_len=ret.length, item;
    for (i=0; i<i_len; i++) {
        item = ret[i];
        parent.children.push(item);
    }
}
;
// process AST node href
format.href = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'href', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node src
format.src = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'src', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node alt
format.alt = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'alt', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node lang
format.lang = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'lang', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node loose
format.loose = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'loose', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node ordered
format.ordered = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'ordered', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node checked
format.checked = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'checked', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node task
format.task = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'task', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node start
format.start = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'start', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node style
format.style = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'style', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.tag = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node task
format.task = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'task', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;
// process AST node title
format.title = function(parent, node, options) {
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
            }
            else {
            }
        }
    }
    var ret = {
        tag: 'title', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
    if (ret.postAdd) {
        parent.children.push(ret.postAdd);
        delete ret.postAdd
    }
}
;

function processLeadingComments(node, ittfNode) {
    if (verify.isArray(node.leadingComments) && node.leadingComments.length > 0) {
        var i, i_items=node.leadingComments, i_len=node.leadingComments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.leadingComments[i];
            if (item.kind === 'CommentLine') {
                ittfNode.children.push({
                    tag: '#', 
                    name: item.value, 
                    children: [
                        
                    ]
                 })
            }
        }
    }
}
function processParams(ittfNode) {
    var pos = getChildPosByTag(ittfNode, 'params');
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (pos == i) {
            var j, j_items=item.children, j_len=item.children.length, p;
            for (j=0; j<j_len; j++) {
                p = item.children[j];
                // loog 'processParams. p.tag', p.tag
                
                /**
                    * 
                        * new Error('processParams.error. Param must be a textual or an ObjectPattern. Node:' + JSON.stringify(ittfNode))
                */
                if (p.tag !== '{') {
                    if (isTextualNode(p)) {
                        p.tag = 'param';
                    }
                }
                temp.push(p);
            }
        }
        else {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function getNodeText(ittfNode) {
    return ittfNode.textified || ittfNode.name;
}
function isTextualNode(ittfNode) {
    if (verify.isArray(ittfNode)) {
        var i, i_items=ittfNode, i_len=ittfNode.length, item;
        for (i=0; i<i_len; i++) {
            item = ittfNode[i];
            if (!isTextualNode(item)) {
                return false;
            }
        }
        return true;
    }
    // loog 'isTextualNode', ittfNode.tag, ittfNode.name, !!(ittfNode.isText || ittfNode.textified)
    else {
        return ittfNode && (ittfNode.isText || ittfNode.textified);
    }
}
function isTextualChildByTag(ittfNode, tag) {
    var item = getChildByTag(ittfNode, tag);
    return item && (item.isText || item.textified);
}
function replaceChildTag(ittfNode, oldTag, newTag) {
    var item = getChildByTag(ittfNode, oldTag);
    item.tag = newTag;
}
function removeChildByTag(ittfNode, tag) {
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag !== tag) {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function removeChildByPos(ittfNode, pos) {
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (i != pos) {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function getChildByTag(ittfNode, tag) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            return item;
        }
    }
    return null;
}
function getChildPosByTag(ittfNode, tag) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            return i;
        }
    }
    return -1;
}
function replaceChildrenOfChildWhenText(ittfNode, childPos, textTag) {
    if (childPos < 0) {
        return ;
    }
    ittfNode.children = replaceItemInColl(ittfNode.children, childPos, textifyChildren(ittfNode.children[childPos], textTag))
    ;
}
function replaceItemInColl(coll, pos, replacers) {
    var ret = [];
    var i, i_items=coll, i_len=coll.length, item;
    for (i=0; i<i_len; i++) {
        item = coll[i];
        if (pos == i) {
            var j, j_items=replacers, j_len=replacers.length, repl;
            for (j=0; j<j_len; j++) {
                repl = replacers[j];
                ret.push(repl);
            }
        }
        else {
            ret.push(item);
        }
    }
    return ret;
}
function textifyChildren(ittfNode, tag) {
    var ret = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        
        // loog '@@@@@@@ item.tag.isText', item.tag, item.isText
        if (item.isText || item.textified) {
            ret.push({
                tag: tag, 
                name: item.isText ? item.name : item.textified, 
                textified: item.isText ? item.name : item.textified, 
                children: [
                    
                ]
             })
        }
        else {
            ret.push(item);
        }
    }
    // loog '@@@@@@@@@@@@@@@ textifyChildren', ret
    return ret;
}
function setTextList(ittfNode, sep) {
    var sb = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        // loog 'setTextList', item.tag, item.name, item.isText, item.textified
        if (item.isText) {
            sb.push(item.name);
        }
        else if (item.textified) {
            sb.push(item.textified);
        }
        else {
            return false;
        }
    }
    ittfNode.textified = sb.join(sep);
    ittfNode.children = [];
    return true;
}
function getTextList(ittfNode, sep) {
    var sb = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.isText) {
            sb.push(item.name);
        }
        else if (item.textified) {
            sb.push(item.textified);
        }
        // loog 'getTextList failed ***************', item
        else {
            return null;
        }
    }
    return sb.join(sep);
}
function setNameFromChildByTag(ittfNode, tag, forceText) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            
            // loog '...................setNameFromChildByTag', item
            if (forceText) {
            }
            if (item.isText) {
                ittfNode.name = item.name;
                ittfNode.children.splice(i, 1);
                return ;
            }
            if (forceText && item.textified) {
                ittfNode.name = item.textified;
                ittfNode.children.splice(i, 1);
                return ;
            }
        }
    }
}
function objectDeclareKey(key) {
    return key.indexOf(' ') > 0 ? '["' + key + '"]' : key;
}
function replaceWithSingleChild(ittfNode, childTag, limit) {
    if (isChildrenCount(ittfNode, 1)) {
        var childTag = ittfNode.children[0].tag;
        var testTag = limit ? childTag.substr(0, limit) : childTag;
        if (testTag === childTag) {
            ittfNode.tag = ittfNode.children[0].tag;
            ittfNode.name = ittfNode.children[0].name;
            ittfNode.textified = ittfNode.children[0].textified;
            ittfNode.children = ittfNode.children[0].children;
            return true;
        }
    }
    return false;
}
function isChildrenCount(ittfNode, count) {
    return ittfNode.children && ittfNode.children.length == count;
}
function isChildrenCountGreaterEqualThen(ittfNode, count) {
    return ittfNode.children && ittfNode.children.length >= count;
}
function arrayIsEmpty(arr) {
    return !(arr && arr.length > 0);
}

function isKnownType(type) {
    return ['Int', 'Float', 'Boolean', 'String'].indexOf(type) > -1;
}

function getTypeName(type) {
    return isKnownType(type) ? type.toLowerCase() : type;
}
