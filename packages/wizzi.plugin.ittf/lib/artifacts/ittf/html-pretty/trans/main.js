/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ittf\.wizzi-override\lib\artifacts\ittf\html-pretty\trans\main.js.ittf
    utc time: Mon, 06 May 2024 14:25:24 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = verify.lineParser;
var errors = require('../../../../../errors');
var HtmlBuilder = require('./htmlbuilder').HtmlBuilder;

var STYLE_DOCS_ITTF_TREE_PANEL = 'docs-ittf-tree-panel';
var STYLE_DOCS_ITTF_TREE_LINE = 'docs-ittf-tree-line';
var STYLE_DOCS_ITTF_NODE_LINENUMS = 'docs-ittf-node-linenums';
var STYLE_DOCS_ITTF_NODE_INDENT = 'docs-ittf-node-indent-';
var STYLE_DOCS_ITTF_NODE_NAME = 'docs-ittf-node-name';
var STYLE_DOCS_ITTF_NODE_VALUE = 'docs-ittf-node-value';

// pretty print
var STYLE_DOCS_ITTF_TREE_PANEL = 'linenums';
var STYLE_DOCS_ITTF_TREE_LINE = 'docs-ittf-tree-line';
var STYLE_DOCS_ITTF_NODE_LINENUMS = 'docs-ittf-node-linenums';
var STYLE_DOCS_ITTF_NODE_INDENT = 'docs-ittf-node-indent-';
var STYLE_DOCS_ITTF_NODE_COMMAND = 'kwd';
var STYLE_DOCS_ITTF_NODE_NAME = 'tag';
var STYLE_DOCS_ITTF_NODE_VALUE = 'pln';
var STYLE_DOCS_ITTF_NODE_EXPR = 'expr';
var STYLE_DOCS_ITTF_NODE_MIX = 'mix';

function toHtmlPretty(node, ctx) {
    ctx.__ittfNode.line++;
    var name = node.n || node.name,
        value = node.v || node.value,
        children = node.children,
        is_command = name && name.substr(0,1) === '$',
        is_code = name === '$' || name === '$global',
        name_style = STYLE_DOCS_ITTF_NODE_NAME,
        value_style = STYLE_DOCS_ITTF_NODE_VALUE;
    if (['$if', '$elif', '$'].indexOf(name) >= 0) {
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (ctx.__insideCode) {
        name_style = STYLE_DOCS_ITTF_NODE_EXPR;
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (name && name.substr(-1,1) === '(') {
        name_style = STYLE_DOCS_ITTF_NODE_MIX;
    }
    ctx.hb.openTag('li');
    ctx.hb.writeAttribute('class', 'L' + ('' + ctx.__ittfNode.line).substr(-1,1));
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', 'pnl');
    ctx.hb.writeText(spaces(ctx.__ittfNode.indent * 4));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    if (is_command) {
        ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_COMMAND);
    }
    else {
        ctx.hb.writeAttribute('class', name_style);
    }
    ctx.hb.writeText(name);
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', value_style);
    ctx.hb.writeText(' ' + verify.htmlEscape(value));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.closeTag('li');
    if (is_code) {
        ctx.__insideCode = true;
    }
    ctx.__ittfNode.indent++;
    var i, i_items=children, i_len=children.length, child;
    for (i=0; i<i_len; i++) {
        child = children[i];
        toHtmlPretty(child, ctx)
    }
    ctx.__ittfNode.indent--;
    if (is_code) {
        ctx.__insideCode = false;
    }
}
function formatLineNum(line) {
    if (line < 10) {
        return '00' + line;
    }
    if (line < 100) {
        return '0' + line;
    }
    return line;
}
function spaces(num) {
    if (num < 1) {
        return '';
    }
    return Array(num + 1).join(" ");
}

var md = module.exports = {};
var myname = 'wizzi.plugin.ittf.ittf.html-pretty.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    try {
        ctx.__ittfNode = {
            line: 0, 
            indent: 0
         };
        ctx.hb = new HtmlBuilder();
        toHtmlPretty(model, ctx)
        callback(null, ctx.hb.toLines())
    } 
    catch (ex) {
        return callback(ex);
    } 
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
            method: 'wizzi.plugin.ittf/lib/artifacts/ittf/html-pretty/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
