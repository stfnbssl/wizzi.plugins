/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\wizzifiers\md\wizzifier.js.ittf
    utc time: Tue, 11 Apr 2023 14:24:31 GMT
*/
'use strict';
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('wizzi-utils').verify;
var lineparser = require('../utils/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../utils/cloner');
var ittfwriter = require("../utils/ittfwriter");
var md_parser = require('marked');
var md_Lexer = require('marked').Lexer;
var cleanAST = require('./cleanAST');

function parseInternal(tobeWizzified, options, callback) {
    try {
        var syntax = md_Lexer.lex(tobeWizzified);
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
            callback(null, ittfwriter.stringify(result, options))
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
    options.verbose = true;
    parseInternal(tobeWizzified, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        // log stringify(syntax, null, 2)
        var root = {
            tag: 'md', 
            children: [
                
            ]
         };
        var i, i_items=syntax, i_len=syntax.length, item;
        for (i=0; i<i_len; i++) {
            item = syntax[i];
            format(root, item, options);
        }
        return callback(null, root);
    }
    )
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
    if (options.verbose) {
        console.log('ast.type', ast.type);
    }
    var type = ast.type === 'arguments' ? 'xarguments' : ast.type;
    var formatter = format[type];
    if (formatter) {
        if (!options.stack) {
            console.log("options.stack", options, __filename);
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
    console.log('node : blockquote ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    // "tokens": [
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node code
format.code = function(parent, node, options) {
    console.log('node : code ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    format.text(ret, {
        text: node.text, 
        tokens: node.tokens
     }, options)
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node codespan
format.codespan = function(parent, node, options) {
    console.log('node : codespan ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    // "text": ""
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node del
format.del = function(parent, node, options) {
    console.log('node : del ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    // "tokens": [
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node em
format.em = function(parent, node, options) {
    console.log('node : em ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    // "tokens": [
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node escape
format.escape = function(parent, node, options) {
    console.log('node : escape ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node heading
format.heading = function(parent, node, options) {
    console.log('node : heading ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node hr
format.hr = function(parent, node, options) {
    console.log('node : hr ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node html
format.html = function(parent, node, options) {
    console.log('node : html ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node image
format.image = function(parent, node, options) {
    console.log('node : image ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    format.href(ret, {
        text: node.href
     }, options)
    format.title(ret, {
        text: node.title
     }, options)
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node link
format.link = function(parent, node, options) {
    console.log('node : link ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    format.title(ret, {
        text: node.title
     }, options)
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node list
format.list = function(parent, node, options) {
    console.log('node : list ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
        format.ordered(ret, {}, options)
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
}
;
// process AST node list_item
format.list_item = function(parent, node, options) {
    console.log('node : list_item ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node paragraph
format.paragraph = function(parent, node, options) {
    console.log('node : paragraph ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node space
format.space = function(parent, node, options) {
    console.log('node : space ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node strong
format.strong = function(parent, node, options) {
    console.log('node : strong ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    // tokens [
    var i, i_items=node.tokens, i_len=node.tokens.length, item;
    for (i=0; i<i_len; i++) {
        item = node.tokens[i];
        format(ret, item, options);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node table
format.table = function(parent, node, options) {
    console.log('node : table ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    var i, i_items=node.header, i_len=node.header.length, item;
    for (i=0; i<i_len; i++) {
        item = node.header[i];
        format(ret, {
            type: "th", 
            item: item
         }, options)
    }
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
}
;
// process AST node tr
format.tr = function(parent, node, options) {
    console.log('node : tr ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node td
format.td = function(parent, node, options) {
    console.log('node : td ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    console.log('td.node.item', node.item, __filename);
    node.item.type = node.item.type || 'text';
    format(ret, node.item, options);
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node th
format.th = function(parent, node, options) {
    console.log('node : th ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
    console.log('th.node.item', node.item, __filename);
    node.item.type = node.item.type || 'text';
    format(ret, node.item, options);
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node text
format.text = function(parent, node, options) {
    console.log('node : text ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
        var ss = node.text.split('\n');
        ret.name = ss[0];
        retcontainer.children.push(ret);
        if (ss.length > 1) {
            for (var i=1; i<ss.length; i++) {
                format.text(retcontainer, {
                    text: ss[i]
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
    console.log('node : href ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node lang
format.lang = function(parent, node, options) {
    console.log('node : lang ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node loose
format.loose = function(parent, node, options) {
    console.log('node : loose ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node ordered
format.ordered = function(parent, node, options) {
    console.log('node : ordered ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node start
format.start = function(parent, node, options) {
    console.log('node : start ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node style
format.style = function(parent, node, options) {
    console.log('node : style ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node task
format.task = function(parent, node, options) {
    console.log('node : task ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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
}
;
// process AST node title
format.title = function(parent, node, options) {
    console.log('node : title ----------------------------------------- parent ittf tag : ', parent.tag);
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                console.log('property', item, node[item], verify.isArray(node[item]) ? 'array' : '');
            }
            else {
                console.log('property', item, verify.isArray(node[item]) ? 'array' : '');
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