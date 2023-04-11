/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\wizzifiers\js\wizzifier.js.ittf
    utc time: Tue, 11 Apr 2023 19:45:01 GMT
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
var js_parser = require('@babel/parser');
var cleanAST = require('./cleanAST');
var CommentManager = require('../utils/commentManager');

var commonPlugins = [
    'jsx', 
    "objectRestSpread", 
    "classProperties", 
    "doExpressions", 
    ['decorators', { decoratorsBeforeExport: true }], 
    "classProperties", 
    "classPrivateProperties", 
    "classPrivateMethods", 
    "exportDefaultFrom", 
    "exportNamespaceFrom", 
    "asyncGenerators", 
    "functionBind", 
    "functionSent", 
    "dynamicImport", 
    "numericSeparator", 
    "optionalChaining", 
    "importMeta", 
    "bigInt", 
    "optionalCatchBinding", 
    "throwExpressions", 
    "nullishCoalescingOperator"
];

var csswizzifier = null;
var htmlwizzifier = null;
var wzDocs = {
    AstgNodes: [
        
    ]
 };
// taken from packages\wizzi-js\.wizzi\ittf\lib\wizzi\models\t\html_tags.js.ittf
// Those of facebook react
// The 'p' tag works both as a html tag and a class property
// TODO the 'param' tag/element (children of object element) has been suspended for
// collision with input check param.
// Reintroduce as @param.
// TODO the 'filter' tag/element has been suspended for collision with array filter
// Reintroduce as @filter.
// TODO the 'var' tag/element has been suspended for collision with variable
// Reintroduce as @var
// TODO the 'set' tag/element has been suspended for collision with set statement
// Reintroduce as @set
// TODO the 'switch' tag/element has been suspended for collision with switch statement
// Reintroduce as @switch
// TODO the 'base' tag/element has been suspended for collision with base statement
// Reintroduce as @base
// TODO the 'form' attribute has been suspended for collision with tag/element
// Reintroduce as @form
// TODO the 'label' attribute has been suspended for collision with tag/element
// Reintroduce as @label
// TODO the 'span' attribute has been suspended for collision with tag/element
// Reintroduce as @span
// TODO the 'summary' attribute has been suspended for collision with tag/element
// Reintroduce as @summary
var _tags = "a abbr address area article aside audio b @base bdi bdo big blockquote body br" + " button canvas caption cite code col colgroup data datalist dd del details dfn" + " dialog div dl dt em embed fieldset figcaption figure @filter footer form h1 h2 h3 h4 h5" + " h6 head header hr html i iframe img input ins kbd keygen label legend li link" + " main map mark menu menuitem meta meter nav noscript object ol optgroup option" + " output picture pre progress q rp rt ruby s samp script section select" + " small source span strong @style sub summary sup table tbody td textarea tfoot th" + " thead time @title tr track u ul video wbr" + " altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform" + " circle clipPath color-profile cursor defs desc discard ellipse" + " font font-face font-face-format font-face-name font-face-src font-face-uri" + " foreignObject g glyph glyphRef hatch hatchpath hkern image line linearGradient" + " marker mask metadata missing-glyph mpath p @param path pattern polygon polyline radialGradient" + " rect @set solidcolor stop svg @switch symbol text textPath tref tspan" + " unknown use @var view vkern";
var html_supported_tags = _tags.split(' ');
var _attrs = "accept acceptCharset accessKey action allowFullScreen allowTransparency alt" + " async autoComplete autoFocus autoPlay capture cellPadding cellSpacing charSet" + " challenge checked classID className cols colSpan content contentEditable contextMenu" + " controls coords crossOrigin data dateTime defer dir disabled download draggable" + " encType @form formAction formEncType formMethod formNoValidate formTarget frameBorder" + " headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode" + " keyParams keyType @label lang list loop low manifest marginHeight marginWidth max" + " maxLength media mediaGroup method min minLength multiple muted name noValidate open" + " optimum pattern placeholder poster preload radioGroup readOnly rel required role" + " rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes" + " @span spellCheck src srcDoc srcSet start step style @summary tabIndex target title" + " type useMap value width wmode wrap" + " static";
var html_supported_attrs = _attrs.split(' ');

function parseInternal(tobeWizzified, options, callback) {
    options = options || {};
    var plugins;
    try {
        if (options.ts_or_flow === 'typescript') {
            plugins = [
                'typescript'
            ].concat(commonPlugins);
        }
        else {
            plugins = [
                'flow'
            ].concat(commonPlugins);
        }
        // loog 'jswizzifier.container.options', options
        var syntax = js_parser.parse(tobeWizzified, {
            sourceType: 'module', 
            plugins: plugins
         });
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
md.getCodeAST = function(input, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    parseInternal(input, options, callback)
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
    
    // loog 'ast.type', ast.type
    if (options.verbose) {
    }
    if (ast.type == 'OptionalMemberExpression') {
        ast.type = 'MemberExpression';
        ast.optional = true;
    }
    if (ast.type == 'OptionalCallExpression') {
        ast.type = 'CallExpression';
        ast.optional = true;
    }
    var formatter = format[ast.type];
    if (formatter) {
        options.stack.push(ast);
        var result = formatter(parent, ast, options);
        options.stack.pop();
        return result;
    }
    else {
        throw new Error('no formatter for type: ' + ast.type);
    }
};
var formatText = function(parent, ast, options, node) {
    var saveReturnText = options.returnText;
    options.returnText = true;
    if (node) {
        options.formatTextNodes.push(node);
    }
    var value = format(parent, ast, options);
    if (node) {
        options.formatTextNodes.pop();
    }
    options.returnText = saveReturnText;
    return value;
};
function wizzify(tobeWizzified, options, callback) {
    // loog 'options', options
    options = options || {};
    options.input = tobeWizzified;
    options.stack = [];
    options.formatTextNodes = [];
    options.wizziIncludes = [];
    options.stateAST = [];
    var startTime = Date.now();
    var babelOptions = options.babel || {};
    parseInternal(tobeWizzified, babelOptions, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        if (options.syntaxOutFile) {
            file.write(options.syntaxOutFile, JSON.stringify(cleanAST(syntax), null, 2))
        }
        options.starter = true;
        options.commentManager = new CommentManager();
        var root = {
            tag: 'module', 
            children: [
                
            ]
         };
        if (babelOptions.ts_or_flow !== 'typescript') {
            root.children.push({
                tag: 'kind', 
                name: 'react', 
                children: [
                    
                ]
             })
        }
        try {
            format(root, syntax, options);
        } 
        catch (ex) {
            return callback(ex);
        } 
        // log "wizziTree", JSON.stringify(root, null, 2)
        // loog 'options.wizziIncludes', options.wizziIncludes
        async.map(options.wizziIncludes, function(item, callback) {
            if (item.kind === 'css') {
                if (!csswizzifier) {
                    csswizzifier = require('../../cssparser/css/wizzifier');
                }
                csswizzifier.getWizziTree(item.literal, {}, (err, ittf) => {
                
                    // loog 'getWizzifierIncludes.item.ittf', ittf
                    item.node.children.push(ittf)
                    return callback(null);
                }
                )
            }
            else {
                if (!htmlwizzifier) {
                    htmlwizzifier = require('../../htmlparser/wizzi/wizzifier');
                }
                htmlwizzifier.getWizziTree(item.literal, {}, (err, ittf) => {
                
                    // loog 'getWizzifierIncludes.item.ittf', ittf
                    item.node.children.push(ittf)
                    return callback(null);
                }
                )
            }
        }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            try {
                file.write(path.join(__dirname, "..", "..", "..", "..", "..", "..", "autodocs", "js-ts.wizzify.json"), JSON.stringify(wzDocs, null, '\t'))
            } 
            catch (ex) {
            } 
            return callback(null, root);
        }
        )
    }
    )
}

function splitComments(ret) {
    var a = [];
    var b = [];
    var i, i_items=ret.children, i_len=ret.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.children[i];
        if (item.tag == '#') {
            b.push(item);
        }
        else {
            a.push(item);
        }
    }
    return [a,b];
}
function extractCommentsIf(ret, len) {
    var a = [];
    var b = [];
    var i, i_items=ret.children, i_len=ret.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.children[i];
        if (item.tag == '#') {
            b.push(item);
        }
        else {
            a.push(item);
        }
    }
    if (a.length == len) {
        ret.children = a;
        return b;
    }
    else {
        return [];
    }
}
function assertNoComments(node) {
    if (node.leadingComments || node.trailingComments) {
        console.log("[31m%s[0m", 'Node should have no comments', node);
        throw new Error('Node should have no comments');
    }
}
function processLeadingComments(node, ittfNode, options) {
    processComments(node.leadingComments, node, ittfNode, options, true)
}
function processTrailingComments(node, ittfNode, options) {
    processComments(node.trailingComments, node, ittfNode, options, false)
}
function processComments(comments, node, ittfNode, options, leading) {
    if (verify.isArray(comments) && comments.length > 0) {
        var hb;
        var i, i_items=comments, i_len=comments.length, item;
        for (i=0; i<i_len; i++) {
            item = comments[i];
            // loog 'processComments', node.type, item
            if (item.type === 'CommentLine') {
                
                // loog 'processComments. calling, codeReplacer.restoreInside', item.value
                if (false) {
                    if (options.commentManager.checkWritten(item) == true) {
                        options.commentManager.removeWritten(item);
                    }
                    var value = codeReplacer.restoreInside('""' + item.value, options.replaceds);
                    hb = {
                        tag: '#', 
                        name: value, 
                        children: [
                            
                        ]
                     };
                    ittfNode.children.push(hb)
                }
                else {
                    hb = {
                        tag: '#', 
                        name: item.value, 
                        children: [
                            
                        ]
                     };
                    ittfNode.children.push(hb)
                }
                options.commentManager.addWritten(item, ittfNode.children, hb);
            }
            else if (item.type === 'CommentBlock') {
                
                // loog 'codeReplacer.isKey', true
                if (false) {
                    if (options.commentManager.checkWritten(item) == true) {
                        options.commentManager.removeWritten(item);
                    }
                    hb = {
                        tag: '{{', 
                        name: codeReplacer.restore('""'+item.value, options.replaceds), 
                        children: [
                            
                        ]
                     };
                    ittfNode.children.push(hb)
                }
                // loog 'codeReplacer.isKey', false
                else {
                    var ss = item.value.split(/\r\n|\r|\n/);
                    hb = {
                        tag: '#', 
                        children: [
                            
                        ]
                     };
                    var j, j_items=ss, j_len=ss.length, s;
                    for (j=0; j<j_len; j++) {
                        s = ss[j];
                        hb.children.push({
                            tag: '#', 
                            name: s, 
                            children: [
                                
                            ]
                         })
                    }
                    ittfNode.children.push(hb);
                }
                options.commentManager.addWritten(item, ittfNode.children, hb);
            }
        }
    }
}
function processParams2(ret, p_params) {
    if (p_params != null) {
        var i, i_items=p_params.children, i_len=p_params.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_params.children[i];
            // loog 'TSFunctionType', 'p_params.item', item
            if (item.tag == '@id') {
                item.tag = 'param';
                ret.children.push(item);
            }
            else if (item.tag == '=') {
                if (item.children.length == 2) {
                    var assignItem = item.children[1];
                    item.tag = 'param';
                    item.name = item.children[0].name || item.children[0].textified;
                    item.children = item.children[0].children;
                    if (assignItem.children.length == 0) {
                        assignItem.tag = '=';
                        item.children.push(assignItem)
                    }
                    else {
                        item.children.push({
                            tag: '=', 
                            children: [assignItem]
                         })
                    }
                    ret.children.push(item);
                }
                else {
                    throw new Error('processParams2 - state not managed');
                }
            }
            else if (item.tag == '...') {
                item.tag = 'param';
                item.name = '...' + item.name;
                ret.children.push(item);
            }
            else if (item.tag == '{') {
                ret.children.push(item);
            }
            else {
                throw new Error('processParams2 - state not managed');
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
                var plen = childrenLengthNoProps(p);
                // loog 'processParams. p.tag', p.tag, 'plen', plen, JSON.stringify(p, null, 2)
                
                /**
                    * 
                        * new Error('processParams.error. Param must be a textual or an ObjectPattern. Node:' + JSON.stringify(ittfNode))
                */
                if (p.tag !== '{' && p.tag !== '[') {
                    if (isTextualNode(p)) {
                        p.tag = 'param';
                        p.name = getNodeText(p);
                    }
                    else if (verify.isNotEmpty(p.name)) {
                        p.tag = 'param';
                    }
                    else {
                        p.tag = 'param';
                    }
                }
                
                // union and intersect
                if (plen == 1 && ( p.children[0].tag === ':|' || p.children[0].tag === ':&' )) {
                    var temp_children = p.children[0];
                    p.children = [];
                    var k, k_items=temp_children.children, k_len=temp_children.children.length, ui;
                    for (k=0; k<k_len; k++) {
                        ui = temp_children.children[k];
                        ui.tag = temp_children.tag === ':|' ? '|' : '&';
                        p.children.push(ui)
                    }
                }
                
                // loog 'processParams', 'plen', plen, 'p.children[0].tag', p.children[0].tag, 'p.children[1].tag', p.children[1].tag
                if (plen == 2) {
                    
                    // log 111
                    
                    // has simple default value (is AssignmentPattern)
                    if (['@id', '@expr', 'literal'].indexOf(p.children[1].tag) > -1) {
                        p.name = p.children[0].name;
                        if (p.children[0].children.length > 0) {
                            p.children[0].tag = p.children[0].children[0].tag;
                            p.children[0].name = '';
                            p.children[0].children = [];
                        }
                        p.children[1].tag = '=';
                    }
                    // log 112
                    else {
                        
                        // has complex default value (is AssignmentPattern)
                        if (p.AST === 'AssignmentPattern') {
                            if (['@id', '@expr', 'literal'].indexOf(p.children[0].tag) > -1) {
                                p.name = p.children[0].name;
                                p.children = [p.children[0].children[0], p.children[1]];
                            }
                            p.children[1] = {
                                tag: '=', 
                                name: '', 
                                children: [
                                    p.children[1]
                                ]
                             };
                        }
                    }
                }
                temp.push(p);
            }
        }
        else {
            temp.push(item);
        }
    }
    // loog 'wizzifiers.js.processParams.result', JSON.stringify(temp, null, 2)
    ittfNode.children = temp;
}
function getNodeText(ittfNode) {
    return ittfNode.textified || ittfNode.name;
}
function isTextualNode(ittfNode) {
    return ittfNode && (ittfNode.isText || ittfNode.textified) && ittfNode.children.length == 0;
}
function isTextualCommentedNode(ittfNode) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag != '#') {
            return false;
        }
    }
    return ittfNode && (ittfNode.isText || ittfNode.textified);
}
function setOrInlineIfTextualNode(ret, ittfNode, ittfTag) {
    if (isTextualNode(ittfNode)) {
        ret.children.push({
            tag: ittfTag, 
            name: getNodeText(ittfNode), 
            children: [
                
            ]
         })
    }
    else if (isTextualCommentedNode(ittfNode)) {
        ret.children.push({
            tag: ittfTag, 
            name: getNodeText(ittfNode), 
            children: ittfNode.children
         })
    }
    else {
        ret.children.push({
            tag: ittfTag, 
            children: [
                ittfNode
            ]
         })
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
        // loog 'setTextList', item.tag, item.isText, item.name, item.textified
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
        // loog 'getTextList', item
        if (item.isText && item.children.length == 0) {
            sb.push(item.name);
        }
        else if (item.textified && item.children.length == 0) {
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
function childrenLengthNoProps(ittfNode) {
    var ret = 0;
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if ([':public', ':protected', ':private', ':readonly', ':optional', ':abstract', 'static'].indexOf(item.tag) < 0) {
            ret++;
        }
    }
    return ret;
}
function getLiteral(ittfNode) {
    var sb = [], temp;
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        // loog 'getLiteral.item', item
        if (item.tag === '+') {
            temp = verify.replaceAll(verify.replaceAll(item.name, '\\n', '\n'), '\\b', ' ');
            sb.push(temp);
        }
        if (item.tag === '@') {
            sb.push('${' + item.name + '}');
        }
    }
    return sb.join('');
}
function isFlowPrimitiveTag(s) {
    return [':string', ':number', ':boolean', ':{', ':[', ':func', ':?string', ':?number', ':?boolean', ':?{', ':?[', ':?func', ':void', ':null'].indexOf(s) > -1;
}
function isTypeReference(s) {
    return [':ref', ':string', ':number', ':boolean', ':{', ':[', ':func', ':void', ':null', ':never'].indexOf(s) > -1;
}
function parenthesize(text, parenthesized) {
    return (parenthesized ? '(' : '') + text + (parenthesized ? ')' : '');
}

function isKnownType(type) {
    return ['Int', 'Float', 'Boolean', 'String'].indexOf(type) > -1;
}

function getTypeName(type) {
    return isKnownType(type) ? type.toLowerCase() : type;
}

// process AST node File
var File_astNode = {
    name: "File", 
    ittfTag: "File", 
    skip: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(File_astNode)
format.File = function(parent, node, options) {
    var f_astNode = File_astNode;
    var __isText = false;
    var ret = parent;
    // process AST-node-property program and append ittfNode to `ret`
    f_astNode.props.push({
        name: "program", 
        descr: "process AST-node-property program and append ittfNode to `ret`"
     })
    if (node.program) {
        if (!node.program.type) {
            throw 'Node program has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.program, options)
    }
    else {
        throw new Error('AST-node-property program undefined: ' + JSON.stringify(node, null, 2));
    }
    // TODO VIA f_a( comments
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
}
;
// process AST node Program
var Program_astNode = {
    name: "Program", 
    ittfTag: "Program", 
    skip: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Program_astNode)
format.Program = function(parent, node, options) {
    var f_astNode = Program_astNode;
    var __isText = false;
    var ret = parent;
    // s( sourceType, "script" | "module"
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "directives", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection directives and append ittfNode(s) to `ret`"
     })
    if (node.directives) {
        if (typeof node.directives.length === 'undefined') {
            throw new Error('Property node.directives must be an array');
        }
        var i, i_items=node.directives, i_len=node.directives.length, item;
        for (i=0; i<i_len; i++) {
            item = node.directives[i];
            item.__parent = {
                name: 'directives', 
                len: node.directives.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection directives undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "body", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection body and append ittfNode(s) to `ret`"
     })
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
}
;
// process AST node Identifier
var Identifier_astNode = {
    name: "Identifier", 
    ittfTag: "@id", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Identifier_astNode)
format.Identifier = function(parent, node, options) {
    var f_astNode = Identifier_astNode;
    var __isText = true;
    var ret = {
        tag: '@id', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'Identifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.name, value: ', node.name
    if (typeof node.name !== 'undefined') {
        ret.name = node.name.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // An identifier. Note that an identifier may be an expression or a destructuring pattern.
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeAnnotation", 
        descr: "process AST-node-property typeAnnotation and append ittfNode to `ret`"
     })
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options)
    }
    if (node.optional) {
        ret.children.push({
            tag: ':optional', 
            name: '', 
            children: [
                
            ]
         })
    }
    
    // set ret.CICCIO = "MAGIC"
    if (ret.children.length > 0) {
        __isText = false;
        ret.isText = false;
        ret.textified = null;
    }
    // loog 'Identifier', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node PrivateName
var PrivateName_astNode = {
    name: "PrivateName", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(PrivateName_astNode)
format.PrivateName = function(parent, node, options) {
    var f_astNode = PrivateName_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'PrivateName', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property Identifier and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "Identifier", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property Identifier and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempIdentifier .children.length > 0
            * 'node.Identifier must result zero node, returned: ' + tempIdentifier.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.Identifier) {
        if (!node.Identifier.type) {
            throw 'Node Identifier has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempIdentifier = {
            children: [
                
            ]
         };
        format(tempIdentifier, node.Identifier, options)
        var appto = false ? parent : ret;
        if (tempIdentifier.children.length > 0) {
            appto.name = tempIdentifier.children[0].name;
        }
        else {
            appto.name = tempIdentifier.name;
        }
    }
    // A Private Name Identifier.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node RegExpLiteral
var RegExpLiteral_astNode = {
    name: "RegExpLiteral", 
    ittfTag: "literal", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(RegExpLiteral_astNode)
format.RegExpLiteral = function(parent, node, options) {
    var f_astNode = RegExpLiteral_astNode;
    var __isText = true;
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'RegExpLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = '/' + node.pattern + '/';
    
    // loog '*************** RegExpLiteral.ret.name', ret.name
    if (node.flags && node.flags.length > 0) {
        ret.name += node.flags;
    }
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node NullLiteral
var NullLiteral_astNode = {
    name: "NullLiteral", 
    ittfTag: "literal", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(NullLiteral_astNode)
format.NullLiteral = function(parent, node, options) {
    var f_astNode = NullLiteral_astNode;
    var __isText = true;
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'NullLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = 'null';
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node StringLiteral
var StringLiteral_astNode = {
    name: "StringLiteral", 
    ittfTag: "literal", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(StringLiteral_astNode)
format.StringLiteral = function(parent, node, options) {
    var f_astNode = StringLiteral_astNode;
    var __isText = true;
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'StringLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.extra.raw;
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node BooleanLiteral
var BooleanLiteral_astNode = {
    name: "BooleanLiteral", 
    ittfTag: "literal", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(BooleanLiteral_astNode)
format.BooleanLiteral = function(parent, node, options) {
    var f_astNode = BooleanLiteral_astNode;
    var __isText = true;
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'BooleanLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.value, value: ', node.value
    if (typeof node.value !== 'undefined') {
        ret.name = node.value.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node NumericLiteral
var NumericLiteral_astNode = {
    name: "NumericLiteral", 
    ittfTag: "literal", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(NumericLiteral_astNode)
format.NumericLiteral = function(parent, node, options) {
    var f_astNode = NumericLiteral_astNode;
    var __isText = true;
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'NumericLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.value, value: ', node.value
    if (typeof node.value !== 'undefined') {
        ret.name = node.value.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Function
var Function_astNode = {
    name: "Function", 
    ittfTag: "function", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Function_astNode)
format.Function = function(parent, node, options) {
    var f_astNode = Function_astNode;
    var __isText = false;
    var ret = {
        tag: 'function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Function', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A function [declaration](#functiondeclaration) or [expression](#functionexpression).
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "id", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property id and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempid .children.length > 0
            * 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
         };
        format(tempid, node.id, options)
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeParameters", 
        descr: "process AST-node-property typeParameters and append ittfNode to `ret`"
     })
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options)
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "params", 
        tag: "params", 
        descr: "# process AST-node-property-collection params and embed its array of nodes in a new tag"
     })
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
             };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                 };
                format(tempparams, item, options)
            }
            ret.children.push(tempparams)
        }
    }
    processParams(ret);
    // [ Pattern ]
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    // b( generator
    // b( async
    /**
        VIA
        replaceChildrenOfChildWhenText(ret, getChildPosByTag(ret, 'params'), 'param')*/
    if (node.generator) {
        ret.tag = 'function*';
    }
    if (node.async) {
        ret.tag = 'async-function';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExpressionStatement
var ExpressionStatement_astNode = {
    name: "ExpressionStatement", 
    ittfTag: "stm", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExpressionStatement_astNode)
format.ExpressionStatement = function(parent, node, options) {
    var f_astNode = ExpressionStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'stm', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExpressionStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // An expression statement, i.e., a statement consisting of a single expression.
    // process AST-node-property expression and append ittfNode to `ret`
    f_astNode.props.push({
        name: "expression", 
        descr: "process AST-node-property expression and append ittfNode to `ret`"
     })
    if (node.expression) {
        if (!node.expression.type) {
            throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.expression, options)
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    if (replaceWithSingleChild(ret, 'set')) {
    }
    else if (replaceWithSingleChild(ret, '_')) {
    }
    else {
        console.log("[31m%s[0m", 'ExpressionStatement.failed.ret', ret);
        throw new Error();
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node BlockStatement
var BlockStatement_astNode = {
    name: "BlockStatement", 
    ittfTag: "block", 
    skip: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(BlockStatement_astNode)
format.BlockStatement = function(parent, node, options) {
    var f_astNode = BlockStatement_astNode;
    var __isText = false;
    var ret = parent;
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "body", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection body and append ittfNode(s) to `ret`"
     })
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "directives", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection directives and append ittfNode(s) to `ret`"
     })
    if (node.directives) {
        if (typeof node.directives.length === 'undefined') {
            throw new Error('Property node.directives must be an array');
        }
        var i, i_items=node.directives, i_len=node.directives.length, item;
        for (i=0; i<i_len; i++) {
            item = node.directives[i];
            item.__parent = {
                name: 'directives', 
                len: node.directives.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection directives undefined: ' + JSON.stringify(node, null, 2));
    }
    // A block statement, i.e., a sequence of statements surrounded by braces.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
}
;
// process AST node EmptyStatement
var EmptyStatement_astNode = {
    name: "EmptyStatement", 
    ittfTag: "", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(EmptyStatement_astNode)
format.EmptyStatement = function(parent, node, options) {
    var f_astNode = EmptyStatement_astNode;
    var __isText = false;
    var ret = {
        tag: '', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'EmptyStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // An empty statement, i.e., a solitary semicolon.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node DebuggerStatement
var DebuggerStatement_astNode = {
    name: "DebuggerStatement", 
    ittfTag: "debugger", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(DebuggerStatement_astNode)
format.DebuggerStatement = function(parent, node, options) {
    var f_astNode = DebuggerStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'debugger', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DebuggerStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A `debugger` statement.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node WithStatement
var WithStatement_astNode = {
    name: "WithStatement", 
    ittfTag: "with", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(WithStatement_astNode)
format.WithStatement = function(parent, node, options) {
    var f_astNode = WithStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'with', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'WithStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property object and append ittfNode to `ret`
    f_astNode.props.push({
        name: "object", 
        descr: "process AST-node-property object and append ittfNode to `ret`"
     })
    if (node.object) {
        if (!node.object.type) {
            throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.object, options)
    }
    else {
        throw new Error('AST-node-property object undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    // A `with` statement.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ReturnStatement
var ReturnStatement_astNode = {
    name: "ReturnStatement", 
    ittfTag: "return", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ReturnStatement_astNode)
format.ReturnStatement = function(parent, node, options) {
    var f_astNode = ReturnStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'return', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ReturnStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and append ittfNode to `ret`
    f_astNode.props.push({
        name: "argument", 
        descr: "process AST-node-property argument and append ittfNode to `ret`"
     })
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options)
    }
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // loog 'ReturnStatement', ret
    // loog 'ReturnStatement.parent', parent.children[parent.children.length-1]
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node LabeledStatement
var LabeledStatement_astNode = {
    name: "LabeledStatement", 
    ittfTag: "label", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(LabeledStatement_astNode)
format.LabeledStatement = function(parent, node, options) {
    var f_astNode = LabeledStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'label', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'LabeledStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property label and set it in a var
    var p_label = null;
    if (typeof(node.label) !== 'undefined' && node.label != null) {
        p_label = {
            textified: null, 
            isText: false, 
            ASTProp: 'label', 
            children: [
                
            ]
         };
        if (node.label == null) {
            p_label.text = "null";
        }
        // loog 'f_p_temp label before format'
        // loog 'f_p_temp label after format', p_label.children.length, p_label
        else {
            if (!node.label.type) {
                throw 'Node label has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_label, node.label, options)
            var label_comments = extractCommentsIf(p_label, 1);
            if (p_label.children.length == 1) {
                p_label.tag = p_label.children[0].tag;
                if (!(p_label.children[0].isText || p_label.children[0].textified)) {
                    p_label.name = p_label.children[0].name;
                    p_label.source = p_label.children[0].source;
                    p_label.children = p_label.children[0].children;
                }
                else {
                    if (p_label.children[0].textified) {
                        p_label.textified = p_label.children[0].textified;
                    }
                    if (p_label.children[0].isText) {
                        p_label.isText = true;
                    }
                    p_label.name = p_label.children[0].name;
                    p_label.source = p_label.children[0].source;
                    p_label.children = [];
                }
            }
            if (label_comments.length > 0) {
                p_label.children = p_label.children.concat(label_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property label undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = getNodeText(p_label);
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node BreakStatement
var BreakStatement_astNode = {
    name: "BreakStatement", 
    ittfTag: "break", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(BreakStatement_astNode)
format.BreakStatement = function(parent, node, options) {
    var f_astNode = BreakStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'break', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BreakStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property label and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "label", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property label and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * templabel .children.length > 0
            * 'node.label must result zero node, returned: ' + templabel.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.label) {
        if (!node.label.type) {
            throw 'Node label has no type: ' + JSON.stringify(node, null, 2);
        }
        var templabel = {
            children: [
                
            ]
         };
        format(templabel, node.label, options)
        var appto = false ? parent : ret;
        if (templabel.children.length > 0) {
            appto.name = templabel.children[0].name;
        }
        else {
            appto.name = templabel.name;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ContinueStatement
var ContinueStatement_astNode = {
    name: "ContinueStatement", 
    ittfTag: "continue", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ContinueStatement_astNode)
format.ContinueStatement = function(parent, node, options) {
    var f_astNode = ContinueStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'continue', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ContinueStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property label and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "label", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property label and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * templabel .children.length > 0
            * 'node.label must result zero node, returned: ' + templabel.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.label) {
        if (!node.label.type) {
            throw 'Node label has no type: ' + JSON.stringify(node, null, 2);
        }
        var templabel = {
            children: [
                
            ]
         };
        format(templabel, node.label, options)
        var appto = false ? parent : ret;
        if (templabel.children.length > 0) {
            appto.name = templabel.children[0].name;
        }
        else {
            appto.name = templabel.name;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node IfStatement
var IfStatement_astNode = {
    name: "IfStatement", 
    ittfTag: "if", 
    retIsArray: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(IfStatement_astNode)
format.IfStatement = function(parent, node, options) {
    var f_astNode = IfStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'if', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'IfStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    f_astNode.props.push({
        name: "test", 
        tag: "test", 
        descr: "fragment f_p_tag"
     })
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property test/test not managed by f_p_tag')
    */
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options)
        p_test.tag = 'test';
        ret.children.push(p_test)
        
        // loog '*** f_p_tag test children[0].textified', p_test.children[0].textified
        
        // loog '*** f_p_tag test children[0].isText', p_test.children[0].isText
        
        // loog '*** f_p_tag test children[0].name', p_test.children[0].name
        if (p_test.children.length == 1) {
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
    }
    setNameFromChildByTag(ret, 'test', true);
    
    // process AST-node-property consequent and set it in a var
    
    // loog 'IfStatement', p_consequent
    if (node.consequent) {
        var p_consequent = null;
        if (typeof(node.consequent) !== 'undefined' && node.consequent != null) {
            p_consequent = {
                textified: null, 
                isText: false, 
                ASTProp: 'consequent', 
                children: [
                    
                ]
             };
            if (node.consequent == null) {
                p_consequent.text = "null";
            }
            // loog 'f_p_temp consequent before format'
            // loog 'f_p_temp consequent after format', p_consequent.children.length, p_consequent
            else {
                if (!node.consequent.type) {
                    throw 'Node consequent has no type: ' + JSON.stringify(node, null, 2);
                }
                format(p_consequent, node.consequent, options)
                var consequent_comments = extractCommentsIf(p_consequent, 1);
                if (p_consequent.children.length == 1) {
                    p_consequent.tag = p_consequent.children[0].tag;
                    if (!(p_consequent.children[0].isText || p_consequent.children[0].textified)) {
                        p_consequent.name = p_consequent.children[0].name;
                        p_consequent.source = p_consequent.children[0].source;
                        p_consequent.children = p_consequent.children[0].children;
                    }
                    else {
                        if (p_consequent.children[0].textified) {
                            p_consequent.textified = p_consequent.children[0].textified;
                        }
                        if (p_consequent.children[0].isText) {
                            p_consequent.isText = true;
                        }
                        p_consequent.name = p_consequent.children[0].name;
                        p_consequent.source = p_consequent.children[0].source;
                        p_consequent.children = [];
                    }
                }
                if (consequent_comments.length > 0) {
                    p_consequent.children = p_consequent.children.concat(consequent_comments);
                }
            }
        }
        else {
            throw new Error('AST-node-property consequent undefined: ' + JSON.stringify(node, null, 2));
        }
        if (p_consequent.tag && p_consequent.tag.length > 0) {
            ret.children.push(p_consequent);
        }
        else {
            var i, i_items=p_consequent.children, i_len=p_consequent.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_consequent.children[i];
                ret.children.push(item);
            }
        }
    }
    
    // process AST-node-property alternate and set it in a var
    
    // loog 'IfStatement', p_consequent
    if (node.alternate) {
        var p_alternate = null;
        if (typeof(node.alternate) !== 'undefined' && node.alternate != null) {
            p_alternate = {
                textified: null, 
                isText: false, 
                ASTProp: 'alternate', 
                children: [
                    
                ]
             };
            if (node.alternate == null) {
                p_alternate.text = "null";
            }
            // loog 'f_p_temp alternate before format'
            // loog 'f_p_temp alternate after format', p_alternate.children.length, p_alternate
            else {
                if (!node.alternate.type) {
                    throw 'Node alternate has no type: ' + JSON.stringify(node, null, 2);
                }
                format(p_alternate, node.alternate, options)
                var alternate_comments = extractCommentsIf(p_alternate, 1);
                if (p_alternate.children.length == 1) {
                    p_alternate.tag = p_alternate.children[0].tag;
                    if (!(p_alternate.children[0].isText || p_alternate.children[0].textified)) {
                        p_alternate.name = p_alternate.children[0].name;
                        p_alternate.source = p_alternate.children[0].source;
                        p_alternate.children = p_alternate.children[0].children;
                    }
                    else {
                        if (p_alternate.children[0].textified) {
                            p_alternate.textified = p_alternate.children[0].textified;
                        }
                        if (p_alternate.children[0].isText) {
                            p_alternate.isText = true;
                        }
                        p_alternate.name = p_alternate.children[0].name;
                        p_alternate.source = p_alternate.children[0].source;
                        p_alternate.children = [];
                    }
                }
                if (alternate_comments.length > 0) {
                    p_alternate.children = p_alternate.children.concat(alternate_comments);
                }
            }
        }
        else {
            throw new Error('AST-node-property alternate undefined: ' + JSON.stringify(node, null, 2));
        }
        var p_else = {
            tag: 'else', 
            children: [
                
            ]
         };
        if (p_alternate.tag && p_alternate.tag.length > 0) {
            p_else.children.push(p_alternate);
        }
        else {
            var i, i_items=p_alternate.children, i_len=p_alternate.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_alternate.children[i];
                p_else.children.push(item);
            }
        }
        ret = [ret, p_else];
    }
    else {
        ret = [ret];
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            var i, i_items=ret, i_len=ret.length, item;
            for (i=0; i<i_len; i++) {
                item = ret[i];
                parent.children.push(item);
            }
        }
    }
}
;
// process AST node SwitchStatement
var SwitchStatement_astNode = {
    name: "SwitchStatement", 
    ittfTag: "switch", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(SwitchStatement_astNode)
format.SwitchStatement = function(parent, node, options) {
    var f_astNode = SwitchStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'switch', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SwitchStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A `switch` statement.
    // process AST-node-property discriminant and set it in a var
    var p_discriminant = null;
    if (typeof(node.discriminant) !== 'undefined' && node.discriminant != null) {
        p_discriminant = {
            textified: null, 
            isText: false, 
            ASTProp: 'discriminant', 
            children: [
                
            ]
         };
        if (node.discriminant == null) {
            p_discriminant.text = "null";
        }
        // loog 'f_p_temp discriminant before format'
        // loog 'f_p_temp discriminant after format', p_discriminant.children.length, p_discriminant
        else {
            if (!node.discriminant.type) {
                throw 'Node discriminant has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_discriminant, node.discriminant, options)
            var discriminant_comments = extractCommentsIf(p_discriminant, 1);
            if (p_discriminant.children.length == 1) {
                p_discriminant.tag = p_discriminant.children[0].tag;
                if (!(p_discriminant.children[0].isText || p_discriminant.children[0].textified)) {
                    p_discriminant.name = p_discriminant.children[0].name;
                    p_discriminant.source = p_discriminant.children[0].source;
                    p_discriminant.children = p_discriminant.children[0].children;
                }
                else {
                    if (p_discriminant.children[0].textified) {
                        p_discriminant.textified = p_discriminant.children[0].textified;
                    }
                    if (p_discriminant.children[0].isText) {
                        p_discriminant.isText = true;
                    }
                    p_discriminant.name = p_discriminant.children[0].name;
                    p_discriminant.source = p_discriminant.children[0].source;
                    p_discriminant.children = [];
                }
            }
            if (discriminant_comments.length > 0) {
                p_discriminant.children = p_discriminant.children.concat(discriminant_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property discriminant undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_discriminant)) {
        ret.name = p_discriminant.textified || p_discriminant.name;
        ret.textified = ret.name;
    }
    else {
        ret.children.push(p_discriminant)
    }
    // process AST-node-property-collection cases and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "cases", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection cases and append ittfNode(s) to `ret`"
     })
    if (node.cases) {
        if (typeof node.cases.length === 'undefined') {
            throw new Error('Property node.cases must be an array');
        }
        var i, i_items=node.cases, i_len=node.cases.length, item;
        for (i=0; i<i_len; i++) {
            item = node.cases[i];
            item.__parent = {
                name: 'cases', 
                len: node.cases.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection cases undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node SwitchCase
var SwitchCase_astNode = {
    name: "SwitchCase", 
    ittfTag: "case", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(SwitchCase_astNode)
format.SwitchCase = function(parent, node, options) {
    var f_astNode = SwitchCase_astNode;
    var __isText = false;
    var ret = {
        tag: 'case', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SwitchCase', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property test and set it in a var
    var p_test = null;
    if (typeof(node.test) !== 'undefined' && node.test != null) {
        p_test = {
            textified: null, 
            isText: false, 
            ASTProp: 'test', 
            children: [
                
            ]
         };
        if (node.test == null) {
            p_test.text = "null";
        }
        // loog 'f_p_temp test before format'
        // loog 'f_p_temp test after format', p_test.children.length, p_test
        else {
            if (!node.test.type) {
                throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_test, node.test, options)
            var test_comments = extractCommentsIf(p_test, 1);
            if (p_test.children.length == 1) {
                p_test.tag = p_test.children[0].tag;
                if (!(p_test.children[0].isText || p_test.children[0].textified)) {
                    p_test.name = p_test.children[0].name;
                    p_test.source = p_test.children[0].source;
                    p_test.children = p_test.children[0].children;
                }
                else {
                    if (p_test.children[0].textified) {
                        p_test.textified = p_test.children[0].textified;
                    }
                    if (p_test.children[0].isText) {
                        p_test.isText = true;
                    }
                    p_test.name = p_test.children[0].name;
                    p_test.source = p_test.children[0].source;
                    p_test.children = [];
                }
            }
            if (test_comments.length > 0) {
                p_test.children = p_test.children.concat(test_comments);
            }
        }
    }
    // process AST-node-property-collection consequent and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "consequent", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection consequent and append ittfNode(s) to `ret`"
     })
    if (node.consequent) {
        if (typeof node.consequent.length === 'undefined') {
            throw new Error('Property node.consequent must be an array');
        }
        var i, i_items=node.consequent, i_len=node.consequent.length, item;
        for (i=0; i<i_len; i++) {
            item = node.consequent[i];
            item.__parent = {
                name: 'consequent', 
                len: node.consequent.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection consequent undefined: ' + JSON.stringify(node, null, 2));
    }
    // A `case` (if `test` is an `Expression`) or `default` (if `test === null`) clause in the body of a `switch` statement.
    //
    if (node.test == null) {
        ret.tag = 'default';
    }
    else {
        if (p_test.textified || p_test.isText) {
            ret.name = p_test.textified || p_test.name;
            ret.textified = ret.name;
        }
        else {
            throw new Error('SwitchCase.test must be textual:' + JSON.stringify(node, null, 2));
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ThrowStatement
var ThrowStatement_astNode = {
    name: "ThrowStatement", 
    ittfTag: "throw", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ThrowStatement_astNode)
format.ThrowStatement = function(parent, node, options) {
    var f_astNode = ThrowStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'throw', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ThrowStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined' && node.argument != null) {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
         };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        // loog 'f_p_temp argument before format'
        // loog 'f_p_temp argument after format', p_argument.children.length, p_argument
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_argument, node.argument, options)
            var argument_comments = extractCommentsIf(p_argument, 1);
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                    }
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = [];
                }
            }
            if (argument_comments.length > 0) {
                p_argument.children = p_argument.children.concat(argument_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // A `throw` statement.
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
    }
    else {
        ret.children.push(p_argument)
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node TryStatement
var TryStatement_astNode = {
    name: "TryStatement", 
    ittfTag: "try", 
    retIsArray: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(TryStatement_astNode)
format.TryStatement = function(parent, node, options) {
    var f_astNode = TryStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'try', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TryStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'wizzifiers.js.TryStatement', JSON.stringify(node, null, 2)
    // process AST-node-property block and append ittfNode to `ret`
    f_astNode.props.push({
        name: "block", 
        descr: "process AST-node-property block and append ittfNode to `ret`"
     })
    if (node.block) {
        if (!node.block.type) {
            throw 'Node block has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.block, options)
    }
    else {
        throw new Error('AST-node-property block undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property handler and set it in a var
    var p_handler = null;
    if (typeof(node.handler) !== 'undefined' && node.handler != null) {
        p_handler = {
            textified: null, 
            isText: false, 
            ASTProp: 'handler', 
            children: [
                
            ]
         };
        if (node.handler == null) {
            p_handler.text = "null";
        }
        // loog 'f_p_temp handler before format'
        // loog 'f_p_temp handler after format', p_handler.children.length, p_handler
        else {
            if (!node.handler.type) {
                throw 'Node handler has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_handler, node.handler, options)
            var handler_comments = extractCommentsIf(p_handler, 1);
            if (p_handler.children.length == 1) {
                p_handler.tag = p_handler.children[0].tag;
                if (!(p_handler.children[0].isText || p_handler.children[0].textified)) {
                    p_handler.name = p_handler.children[0].name;
                    p_handler.source = p_handler.children[0].source;
                    p_handler.children = p_handler.children[0].children;
                }
                else {
                    if (p_handler.children[0].textified) {
                        p_handler.textified = p_handler.children[0].textified;
                    }
                    if (p_handler.children[0].isText) {
                        p_handler.isText = true;
                    }
                    p_handler.name = p_handler.children[0].name;
                    p_handler.source = p_handler.children[0].source;
                    p_handler.children = [];
                }
            }
            if (handler_comments.length > 0) {
                p_handler.children = p_handler.children.concat(handler_comments);
            }
        }
    }
    // process AST-node-property finalizer and set it in a var
    var p_finalizer = null;
    if (typeof(node.finalizer) !== 'undefined' && node.finalizer != null) {
        p_finalizer = {
            textified: null, 
            isText: false, 
            ASTProp: 'finalizer', 
            children: [
                
            ]
         };
        if (node.finalizer == null) {
            p_finalizer.text = "null";
        }
        // loog 'f_p_temp finalizer before format'
        // loog 'f_p_temp finalizer after format', p_finalizer.children.length, p_finalizer
        else {
            if (!node.finalizer.type) {
                throw 'Node finalizer has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_finalizer, node.finalizer, options)
            var finalizer_comments = extractCommentsIf(p_finalizer, 1);
            if (p_finalizer.children.length == 1) {
                p_finalizer.tag = p_finalizer.children[0].tag;
                if (!(p_finalizer.children[0].isText || p_finalizer.children[0].textified)) {
                    p_finalizer.name = p_finalizer.children[0].name;
                    p_finalizer.source = p_finalizer.children[0].source;
                    p_finalizer.children = p_finalizer.children[0].children;
                }
                else {
                    if (p_finalizer.children[0].textified) {
                        p_finalizer.textified = p_finalizer.children[0].textified;
                    }
                    if (p_finalizer.children[0].isText) {
                        p_finalizer.isText = true;
                    }
                    p_finalizer.name = p_finalizer.children[0].name;
                    p_finalizer.source = p_finalizer.children[0].source;
                    p_finalizer.children = [];
                }
            }
            if (finalizer_comments.length > 0) {
                p_finalizer.children = p_finalizer.children.concat(finalizer_comments);
            }
        }
    }
    var tempRet = [ ret ];
    // loog 'TryStatement.p_handler', p_handler
    // loog 'TryStatement.p_finalizer', p_finalizer
    if (p_handler) {
        tempRet.push(p_handler);
    }
    
    // loog 'TryStatement', 'p_finalizer', p_finalizer
    if (p_finalizer) {
        tempRet.push({
            tag: 'finally', 
            name: '', 
            children: [
                p_finalizer
            ]
         })
    }
    ret = tempRet;
    // A `try` statement. If `handler` is `null` then `finalizer` must be a `BlockStatement`.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            var i, i_items=ret, i_len=ret.length, item;
            for (i=0; i<i_len; i++) {
                item = ret[i];
                parent.children.push(item);
            }
        }
    }
}
;
// process AST node CatchClause
var CatchClause_astNode = {
    name: "CatchClause", 
    ittfTag: "catch", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(CatchClause_astNode)
format.CatchClause = function(parent, node, options) {
    var f_astNode = CatchClause_astNode;
    var __isText = false;
    var ret = {
        tag: 'catch', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CatchClause', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A `catch` clause following a `try` block.
    // Process AST-node-property param and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "param", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property param and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempparam .children.length > 0
            * 'node.param must result zero node, returned: ' + tempparam.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.param) {
        if (!node.param.type) {
            throw 'Node param has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempparam = {
            children: [
                
            ]
         };
        format(tempparam, node.param, options)
        var appto = false ? parent : ret;
        if (tempparam.children.length > 0) {
            appto.name = tempparam.children[0].name;
        }
        else {
            appto.name = tempparam.name;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'CatchClause.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node WhileStatement
var WhileStatement_astNode = {
    name: "WhileStatement", 
    ittfTag: "while", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(WhileStatement_astNode)
format.WhileStatement = function(parent, node, options) {
    var f_astNode = WhileStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'while', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'WhileStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    f_astNode.props.push({
        name: "test", 
        tag: "test", 
        descr: "fragment f_p_tag"
     })
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property test/test not managed by f_p_tag')
    */
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options)
        p_test.tag = 'test';
        ret.children.push(p_test)
        
        // loog '*** f_p_tag test children[0].textified', p_test.children[0].textified
        
        // loog '*** f_p_tag test children[0].isText', p_test.children[0].isText
        
        // loog '*** f_p_tag test children[0].name', p_test.children[0].name
        if (p_test.children.length == 1) {
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
    }
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node DoWhileStatement
var DoWhileStatement_astNode = {
    name: "DoWhileStatement", 
    ittfTag: "do", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(DoWhileStatement_astNode)
format.DoWhileStatement = function(parent, node, options) {
    var f_astNode = DoWhileStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'do', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DoWhileStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    f_astNode.props.push({
        name: "test", 
        tag: "test", 
        descr: "fragment f_p_tag"
     })
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property test/test not managed by f_p_tag')
    */
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options)
        p_test.tag = 'test';
        ret.children.push(p_test)
        
        // loog '*** f_p_tag test children[0].textified', p_test.children[0].textified
        
        // loog '*** f_p_tag test children[0].isText', p_test.children[0].isText
        
        // loog '*** f_p_tag test children[0].name', p_test.children[0].name
        if (p_test.children.length == 1) {
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
    }
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ForStatement
var ForStatement_astNode = {
    name: "ForStatement", 
    ittfTag: "for", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ForStatement_astNode)
format.ForStatement = function(parent, node, options) {
    var f_astNode = ForStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'for', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ForStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    f_astNode.props.push({
        name: "init", 
        tag: "init", 
        descr: "fragment f_p_tag"
     })
    var p_init = {
        textified: null, 
        isText: false, 
        ASTProp: 'init', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property init/init not managed by f_p_tag')
    */
    if (node.init) {
        if (!node.init.type) {
            throw 'Node init has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_init, node.init, options)
        p_init.tag = 'init';
        ret.children.push(p_init)
        
        // loog '*** f_p_tag init children[0].textified', p_init.children[0].textified
        
        // loog '*** f_p_tag init children[0].isText', p_init.children[0].isText
        
        // loog '*** f_p_tag init children[0].name', p_init.children[0].name
        if (p_init.children.length == 1) {
            if (p_init.children[0].textified) {
                p_init.textified = p_init.children[0].textified;
            }
            if (p_init.children[0].isText) {
                p_init.isText = true;
                p_init.name = p_init.children[0].name;
                p_init.children = [];
            }
        }
    }
    f_astNode.props.push({
        name: "test", 
        tag: "test", 
        descr: "fragment f_p_tag"
     })
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property test/test not managed by f_p_tag')
    */
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options)
        p_test.tag = 'test';
        ret.children.push(p_test)
        
        // loog '*** f_p_tag test children[0].textified', p_test.children[0].textified
        
        // loog '*** f_p_tag test children[0].isText', p_test.children[0].isText
        
        // loog '*** f_p_tag test children[0].name', p_test.children[0].name
        if (p_test.children.length == 1) {
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
    }
    f_astNode.props.push({
        name: "update", 
        tag: "update", 
        descr: "fragment f_p_tag"
     })
    var p_update = {
        textified: null, 
        isText: false, 
        ASTProp: 'update', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property update/update not managed by f_p_tag')
    */
    if (node.update) {
        if (!node.update.type) {
            throw 'Node update has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_update, node.update, options)
        p_update.tag = 'update';
        ret.children.push(p_update)
        
        // loog '*** f_p_tag update children[0].textified', p_update.children[0].textified
        
        // loog '*** f_p_tag update children[0].isText', p_update.children[0].isText
        
        // loog '*** f_p_tag update children[0].name', p_update.children[0].name
        if (p_update.children.length == 1) {
            if (p_update.children[0].textified) {
                p_update.textified = p_update.children[0].textified;
            }
            if (p_update.children[0].isText) {
                p_update.isText = true;
                p_update.name = p_update.children[0].name;
                p_update.children = [];
            }
        }
    }
    // loog 'p_init.textified', p_init.textified
    var c1 = p_init.isText ? p_init.name : (p_init.textified ? p_init.textified : '');
    var c2 = p_test.isText ? p_test.name : (p_test.textified ? p_test.textified : '');
    var c3 = p_update.isText ? p_update.name : (p_update.textified ? p_update.textified : '');
    ret.name = c1 + '; ' + c2 + '; ' + c3;
    removeChildByTag(ret, 'init');
    removeChildByTag(ret, 'test');
    removeChildByTag(ret, 'update');
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ForInStatement
var ForInStatement_astNode = {
    name: "ForInStatement", 
    ittfTag: "for", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ForInStatement_astNode)
format.ForInStatement = function(parent, node, options) {
    var f_astNode = ForInStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'for', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ForInStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined' && node.left != null) {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
         };
        if (node.left == null) {
            p_left.text = "null";
        }
        // loog 'f_p_temp left before format'
        // loog 'f_p_temp left after format', p_left.children.length, p_left
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_left, node.left, options)
            var left_comments = extractCommentsIf(p_left, 1);
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                    }
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = [];
                }
            }
            if (left_comments.length > 0) {
                p_left.children = p_left.children.concat(left_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined' && node.right != null) {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
         };
        if (node.right == null) {
            p_right.text = "null";
        }
        // loog 'f_p_temp right before format'
        // loog 'f_p_temp right after format', p_right.children.length, p_right
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_right, node.right, options)
            var right_comments = extractCommentsIf(p_right, 1);
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                    }
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = [];
                }
            }
            if (right_comments.length > 0) {
                p_right.children = p_right.children.concat(right_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left);
        if (isTextualNode(p_right)) {
            ret.name += ' in ' + getNodeText(p_right);
        }
        else {
            ret.children.push({
                tag: 'in', 
                children: [
                    p_right
                ]
             })
        }
    }
    else {
        ret.children.push({
            tag: 'left', 
            children: [
                p_left
            ]
         })
        if (isTextualNode(p_right)) {
            ret.children.push({
                tag: 'in', 
                name: getNodeText(p_right), 
                children: [
                    
                ]
             })
        }
        else {
            ret.children.push({
                tag: 'in', 
                children: [
                    p_right
                ]
             })
        }
    }
    // loog 'node.await', node.await
    if (!!node.await == true) {
        ret.children.push({
            tag: 'await', 
            children: [
                
            ]
         })
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ForOfStatement
var ForOfStatement_astNode = {
    name: "ForOfStatement", 
    ittfTag: "for", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ForOfStatement_astNode)
format.ForOfStatement = function(parent, node, options) {
    var f_astNode = ForOfStatement_astNode;
    var __isText = false;
    var ret = {
        tag: 'for', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ForOfStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined' && node.left != null) {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
         };
        if (node.left == null) {
            p_left.text = "null";
        }
        // loog 'f_p_temp left before format'
        // loog 'f_p_temp left after format', p_left.children.length, p_left
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_left, node.left, options)
            var left_comments = extractCommentsIf(p_left, 1);
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                    }
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = [];
                }
            }
            if (left_comments.length > 0) {
                p_left.children = p_left.children.concat(left_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined' && node.right != null) {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
         };
        if (node.right == null) {
            p_right.text = "null";
        }
        // loog 'f_p_temp right before format'
        // loog 'f_p_temp right after format', p_right.children.length, p_right
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_right, node.right, options)
            var right_comments = extractCommentsIf(p_right, 1);
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                    }
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = [];
                }
            }
            if (right_comments.length > 0) {
                p_right.children = p_right.children.concat(right_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'ForOfStatement', isTextualNode(p_left), isTextualNode(p_right)
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left);
        if (isTextualNode(p_right)) {
            ret.name += ' of ' + getNodeText(p_right);
            ret.textified = ret.name;
            ret.isText = true;
        }
        else {
            ret.children.push({
                tag: 'of', 
                children: [
                    p_right
                ]
             })
        }
    }
    else {
        ret.children.push({
            tag: 'left', 
            children: [
                p_left
            ]
         })
        if (isTextualNode(p_right)) {
            ret.children.push({
                tag: 'of', 
                name: getNodeText(p_right), 
                children: [
                    
                ]
             })
        }
        else {
            ret.children.push({
                tag: 'of', 
                children: [
                    p_right
                ]
             })
        }
    }
    // loog 'node.await', node.await
    if (!!node.await == true) {
        ret.children.push({
            tag: 'await', 
            children: [
                
            ]
         })
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node FunctionDeclaration
var FunctionDeclaration_astNode = {
    name: "FunctionDeclaration", 
    ittfTag: "function", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(FunctionDeclaration_astNode)
format.FunctionDeclaration = function(parent, node, options) {
    var f_astNode = FunctionDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'FunctionDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A function [declaration](#functiondeclaration) or [expression](#functionexpression).
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "id", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property id and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempid .children.length > 0
            * 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
         };
        format(tempid, node.id, options)
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeParameters", 
        descr: "process AST-node-property typeParameters and append ittfNode to `ret`"
     })
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options)
    }
    // f_a_in_tag( params, params
    // _ processParams(ret)
    // process AST-node-property-collection params and
    // embed its array of nodes in a temp var
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        var p_params = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.params, i_len=node.params.length, item;
        for (i=0; i<i_len; i++) {
            item = node.params[i];
            item.__parent = {
                name: 'params', 
                len: node.params.length
             };
            format(p_params, item, options)
        }
    }
    processParams2(ret, p_params);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined' && node.returnType != null) {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
         };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        // loog 'f_p_temp returnType before format'
        // loog 'f_p_temp returnType after format', p_returnType.children.length, p_returnType
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_returnType, node.returnType, options)
            var returnType_comments = extractCommentsIf(p_returnType, 1);
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                    }
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = [];
                }
            }
            if (returnType_comments.length > 0) {
                p_returnType.children = p_returnType.children.concat(returnType_comments);
            }
        }
    }
    
    // loog 'p_returnType', JSON.stringify(p_returnType)
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
         };
        ret.children.push(p_returnType);
    }
    // process AST-node-property predicate and append ittfNode to `ret`
    f_astNode.props.push({
        name: "predicate", 
        descr: "process AST-node-property predicate and append ittfNode to `ret`"
     })
    if (node.predicate) {
        if (!node.predicate.type) {
            throw 'Node predicate has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.predicate, options)
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.generator) {
        ret.tag = 'function*';
    }
    if (node.async) {
        ret.tag = 'async-function';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node VariableDeclaration
var VariableDeclaration_astNode = {
    name: "VariableDeclaration", 
    ittfTag: "node.kind", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(VariableDeclaration_astNode)
format.VariableDeclaration = function(parent, node, options) {
    var f_astNode = VariableDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'VariableDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // enum "var" | "let" | "const"
    // process AST-node-property-collection declarations and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "declarations", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection declarations and append ittfNode(s) to `ret`"
     })
    if (node.declarations) {
        if (typeof node.declarations.length === 'undefined') {
            throw new Error('Property node.declarations must be an array');
        }
        var i, i_items=node.declarations, i_len=node.declarations.length, item;
        for (i=0; i<i_len; i++) {
            item = node.declarations[i];
            item.__parent = {
                name: 'declarations', 
                len: node.declarations.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection declarations undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '=== VariableDeclaration ittf result 1', JSON.stringify(ret, null, 2)
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // loog '=== VariableDeclaration ittf result 2', ret, 'got_text_1', got_text_1
    if (got_text_1) {
        ret.textified = node.kind + ' ' + ret.textified;
    }
    
    // loog 'VariableDeclaration.ret.children[0].children.length', ret.children[0].children.length
    else if (ret.children.length == 1) {
        
        // no init value
        if (ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children = [];
        }
        
        // loog 'ret.name', ret.name
        
        // loog 'ret.children[0]', ret.children[0]
        
        // set ret.textified = node.kind + ' ' + ret.name
        else if (ret.children[0].children.length == 1) {
            ret.name = ret.children[0].name;
            ret.children[0] = ret.children[0].children[0];
        }
        
        // loog 'ret.name', ret.name
        
        // loog 'ret.children[0].name', ret.children[0].name
        
        // loog 'child1.tag.name', child1.tag, child1.name
        
        // loog 'child2.tag.name', child2.tag, child2.name
        else if (ret.children[0].children.length == 2) {
            var child1 = ret.children[0].children[0];
            var child2 = ret.children[0].children[1];
            if (child2.tag === '=' || isTypeReference(child1.tag)) {
                ret.name = ret.children[0].name;
                ret.children = [];
                ret.children.push(child1)
                ret.children.push(child2)
            }
            else {
                if (child1.name && child1.name.length > 0 && child1.children.length > 0) {
                    ret.name = child1.name;
                    ret.children = [];
                    var i, i_items=child1.children, i_len=child1.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = child1.children[i];
                        ret.children.push(item)
                    }
                    ret.children.push(child2)
                }
                else {
                    ret.name = ret.children[0].name;
                    ret.children = [];
                    ret.children.push(child1)
                    ret.children.push(child2)
                }
            }
        }
        else {
            console.log("[31m%s[0m", 'Error VariableDeclaration. Case not managed.',);
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                console.log("[31m%s[0m", 'VariableDeclaration.child', item);
            }
            throw new Error("VariableDeclaration. Case not managed.");
        }
    }
    else if (ret.children.length > 1) {
        var sb = [];
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            if (item.textified) {
                sb.push(item.textified);
            }
            else {
                sb = null;
                break;
            }
        }
        if (sb) {
            ret.textified = node.kind + ' ' + sb.join(', ');
        }
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
         };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node VariableDeclarator
var VariableDeclarator_astNode = {
    name: "VariableDeclarator", 
    ittfTag: "decl", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(VariableDeclarator_astNode)
format.VariableDeclarator = function(parent, node, options) {
    var f_astNode = VariableDeclarator_astNode;
    var __isText = false;
    var ret = {
        tag: 'decl', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'VariableDeclarator', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property id and set it in a var
    var p_id = null;
    if (typeof(node.id) !== 'undefined' && node.id != null) {
        p_id = {
            textified: null, 
            isText: false, 
            ASTProp: 'id', 
            children: [
                
            ]
         };
        if (node.id == null) {
            p_id.text = "null";
        }
        // loog 'f_p_temp id before format'
        // loog 'f_p_temp id after format', p_id.children.length, p_id
        else {
            if (!node.id.type) {
                throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_id, node.id, options)
            var id_comments = extractCommentsIf(p_id, 1);
            if (p_id.children.length == 1) {
                p_id.tag = p_id.children[0].tag;
                if (!(p_id.children[0].isText || p_id.children[0].textified)) {
                    p_id.name = p_id.children[0].name;
                    p_id.source = p_id.children[0].source;
                    p_id.children = p_id.children[0].children;
                }
                else {
                    if (p_id.children[0].textified) {
                        p_id.textified = p_id.children[0].textified;
                    }
                    if (p_id.children[0].isText) {
                        p_id.isText = true;
                    }
                    p_id.name = p_id.children[0].name;
                    p_id.source = p_id.children[0].source;
                    p_id.children = [];
                }
            }
            if (id_comments.length > 0) {
                p_id.children = p_id.children.concat(id_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property id undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'VariableDeclarator,p_id, isTextualNode(p_id)', p_id, isTextualNode(p_id)
    if (isTextualNode(p_id)) {
        ret.name = getNodeText(p_id);
    }
    else {
        if (p_id.tag === '@id') {
            ret.name = p_id.name;
            ret.children = p_id.children;
        }
        else {
            ret.children.push(p_id)
        }
    }
    // loog 'VariableDeclarator 1', ret
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeAnnotation", 
        descr: "process AST-node-property typeAnnotation and append ittfNode to `ret`"
     })
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options)
    }
    // process AST-node-property init and set it in a var
    var p_init = null;
    if (typeof(node.init) !== 'undefined' && node.init != null) {
        p_init = {
            textified: null, 
            isText: false, 
            ASTProp: 'init', 
            children: [
                
            ]
         };
        if (node.init == null) {
            p_init.text = "null";
        }
        // loog 'f_p_temp init before format'
        // loog 'f_p_temp init after format', p_init.children.length, p_init
        else {
            if (!node.init.type) {
                throw 'Node init has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_init, node.init, options)
            var init_comments = extractCommentsIf(p_init, 1);
            if (p_init.children.length == 1) {
                p_init.tag = p_init.children[0].tag;
                if (!(p_init.children[0].isText || p_init.children[0].textified)) {
                    p_init.name = p_init.children[0].name;
                    p_init.source = p_init.children[0].source;
                    p_init.children = p_init.children[0].children;
                }
                else {
                    if (p_init.children[0].textified) {
                        p_init.textified = p_init.children[0].textified;
                    }
                    if (p_init.children[0].isText) {
                        p_init.isText = true;
                    }
                    p_init.name = p_init.children[0].name;
                    p_init.source = p_init.children[0].source;
                    p_init.children = [];
                }
            }
            if (init_comments.length > 0) {
                p_init.children = p_init.children.concat(init_comments);
            }
        }
    }
    // loog 'VariableDeclarator.p_init', p_init
    
    // loog 'VariableDeclarator.p_init', isTextualNode(p_id), 'p_id', p_id, 'p_init', p_init
    if (p_init) {
        if (isTextualNode(p_id)) {
            if (isTextualNode(p_init)) {
                ret.name += ' = ' + getNodeText(p_init);
                ret.textified = ret.name;
                ret.isText = true;
            }
            else {
                ret.children.push(p_init)
            }
        }
        else {
            if (isTextualNode(p_init)) {
                ret.children.push({
                    tag: '=', 
                    name: getNodeText(p_init), 
                    children: [
                        
                    ]
                 })
            }
            else {
                ret.children.push({
                    tag: '=', 
                    children: [
                        p_init
                    ]
                 })
            }
        }
    }
    else {
    }
    // loog 'VariableDeclarator 2 ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Decorator
var Decorator_astNode = {
    name: "Decorator", 
    ittfTag: "@d", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Decorator_astNode)
format.Decorator = function(parent, node, options) {
    var f_astNode = Decorator_astNode;
    var __isText = false;
    var ret = {
        tag: '@d', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Decorator', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined' && node.expression != null) {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
         };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        // loog 'f_p_temp expression before format'
        // loog 'f_p_temp expression after format', p_expression.children.length, p_expression
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_expression, node.expression, options)
            var expression_comments = extractCommentsIf(p_expression, 1);
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                    }
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = [];
                }
            }
            if (expression_comments.length > 0) {
                p_expression.children = p_expression.children.concat(expression_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_expression)) {
        ret.name = getNodeText(p_expression);
    }
    else {
        ret.children.push(p_expression)
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Directive
var Directive_astNode = {
    name: "Directive", 
    ittfTag: "directive", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Directive_astNode)
format.Directive = function(parent, node, options) {
    var f_astNode = Directive_astNode;
    var __isText = false;
    var ret = {
        tag: 'directive', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Directive', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (node.value && node.value.value === 'use strict') {
        ret = null;
    }
    // process AST-node-property value and set it in a var
    else {
        var p_value = null;
        if (typeof(node.value) !== 'undefined' && node.value != null) {
            p_value = {
                textified: null, 
                isText: false, 
                ASTProp: 'value', 
                children: [
                    
                ]
             };
            if (node.value == null) {
                p_value.text = "null";
            }
            // loog 'f_p_temp value before format'
            // loog 'f_p_temp value after format', p_value.children.length, p_value
            else {
                if (!node.value.type) {
                    throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
                }
                format(p_value, node.value, options)
                var value_comments = extractCommentsIf(p_value, 1);
                if (p_value.children.length == 1) {
                    p_value.tag = p_value.children[0].tag;
                    if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                        p_value.children = p_value.children[0].children;
                    }
                    else {
                        if (p_value.children[0].textified) {
                            p_value.textified = p_value.children[0].textified;
                        }
                        if (p_value.children[0].isText) {
                            p_value.isText = true;
                        }
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                        p_value.children = [];
                    }
                }
                if (value_comments.length > 0) {
                    p_value.children = p_value.children.concat(value_comments);
                }
            }
        }
        else {
            throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
        }
        if (isTextualNode(p_value)) {
            ret.name = getNodeText(p_value);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node DirectiveLiteral
var DirectiveLiteral_astNode = {
    name: "DirectiveLiteral", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(DirectiveLiteral_astNode)
format.DirectiveLiteral = function(parent, node, options) {
    var f_astNode = DirectiveLiteral_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DirectiveLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Expression
var Expression_astNode = {
    name: "Expression", 
    ittfTag: "expr", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Expression_astNode)
format.Expression = function(parent, node, options) {
    var f_astNode = Expression_astNode;
    var __isText = false;
    var ret = {
        tag: 'expr', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Expression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Any expression node. Since the left-hand side of an assignment may be any expression in general, an expression can also be a pattern.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Super
var Super_astNode = {
    name: "Super", 
    ittfTag: "super", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Super_astNode)
format.Super = function(parent, node, options) {
    var f_astNode = Super_astNode;
    var __isText = true;
    var ret = {
        tag: 'super', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'Super', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A `super` pseudo-expression.
    ret.name = 'super';
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Import
var Import_astNode = {
    name: "Import", 
    ittfTag: "import", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Import_astNode)
format.Import = function(parent, node, options) {
    var f_astNode = Import_astNode;
    var __isText = false;
    var ret = {
        tag: 'import', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Import', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A `import` pseudo-expression.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ThisExpression
var ThisExpression_astNode = {
    name: "ThisExpression", 
    ittfTag: "this", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ThisExpression_astNode)
format.ThisExpression = function(parent, node, options) {
    var f_astNode = ThisExpression_astNode;
    var __isText = true;
    var ret = {
        tag: 'this', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'ThisExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A `this` expression.
    ret.name = 'this';
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ArrowFunctionExpression
var ArrowFunctionExpression_astNode = {
    name: "ArrowFunctionExpression", 
    ittfTag: "=>", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ArrowFunctionExpression_astNode)
format.ArrowFunctionExpression = function(parent, node, options) {
    var f_astNode = ArrowFunctionExpression_astNode;
    var __isText = false;
    var ret = {
        tag: '=>', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrowFunctionExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (verify.isArray(node.body) == false) {
        node.body = [node.body];
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "params", 
        tag: "params", 
        descr: "# process AST-node-property-collection params and embed its array of nodes in a new tag"
     })
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
             };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                 };
                format(tempparams, item, options)
            }
            ret.children.push(tempparams)
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined' && node.returnType != null) {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
         };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        // loog 'f_p_temp returnType before format'
        // loog 'f_p_temp returnType after format', p_returnType.children.length, p_returnType
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_returnType, node.returnType, options)
            var returnType_comments = extractCommentsIf(p_returnType, 1);
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                    }
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = [];
                }
            }
            if (returnType_comments.length > 0) {
                p_returnType.children = p_returnType.children.concat(returnType_comments);
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
         };
        ret.children.push(p_returnType);
    }
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "body", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection body and append ittfNode(s) to `ret`"
     })
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'node.expression', node.expression
    if (!!node.expression == true) {
        ret.children.push({
            tag: 'expression', 
            children: [
                
            ]
         })
    }
    // loog '*** ArrowFunctionExpression.ret.params', getChildByTag(ret, 'params')
    // loog '*** ArrowFunctionExpression.ret', ret
    // A fat arrow function expression, e.g., `let foo = (bar) => { /* body */ }`.
    if (node.async) {
        ret.tag = 'async=>';
    }
    if (node.generator) {
        ret.tag += '*';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node YieldExpression
var YieldExpression_astNode = {
    name: "YieldExpression", 
    ittfTag: "yield", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(YieldExpression_astNode)
format.YieldExpression = function(parent, node, options) {
    var f_astNode = YieldExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'yield', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'YieldExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined' && node.argument != null) {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
         };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        // loog 'f_p_temp argument before format'
        // loog 'f_p_temp argument after format', p_argument.children.length, p_argument
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_argument, node.argument, options)
            var argument_comments = extractCommentsIf(p_argument, 1);
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                    }
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = [];
                }
            }
            if (argument_comments.length > 0) {
                p_argument.children = p_argument.children.concat(argument_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'ObjectProperty.p_value', p_value
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
    }
    else {
        ret.children.push(p_argument)
    }
    // loog 'node.delegate', node.delegate
    if (!!node.delegate == true) {
        ret.children.push({
            tag: 'delegate', 
            children: [
                
            ]
         })
    }
    // A `yield` expression.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node AwaitExpression
var AwaitExpression_astNode = {
    name: "AwaitExpression", 
    ittfTag: "await", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(AwaitExpression_astNode)
format.AwaitExpression = function(parent, node, options) {
    var f_astNode = AwaitExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'await', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AwaitExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and append ittfNode to `ret`
    f_astNode.props.push({
        name: "argument", 
        descr: "process AST-node-property argument and append ittfNode to `ret`"
     })
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options)
    }
    // A `await` expression.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ArrayExpression
var ArrayExpression_astNode = {
    name: "ArrayExpression", 
    ittfTag: "[", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ArrayExpression_astNode)
format.ArrayExpression = function(parent, node, options) {
    var f_astNode = ArrayExpression_astNode;
    var __isText = false;
    var ret = {
        tag: '[', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrayExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection elements and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "elements", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection elements and append ittfNode(s) to `ret`"
     })
    if (node.elements) {
        if (typeof node.elements.length === 'undefined') {
            throw new Error('Property node.elements must be an array');
        }
        var i, i_items=node.elements, i_len=node.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = node.elements[i];
            item.__parent = {
                name: 'elements', 
                len: node.elements.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection elements undefined: ' + JSON.stringify(node, null, 2));
    }
    // An array expression.
    if (options.mustBeText) {
        
        // loog '### ArrayExpression', 'name:', ret.name, 'textified', ret.textified, ret.isText
        if (setTextList(ret, ', ')) {
            ret.textified = '[' + ret.textified + ']';
        }
        else {
            throw new Error("ArrayExpression. Cannot textify node as requested: " + JSON.stringify(node, null, 2));
        }
    }
    else if (options.couldBeText) {
        var tlist = getTextList(ret, ', ');
        
        // TODO??? set ret.children = []
        if (tlist && tlist.length < 15) {
            ret.textified = '[' + ret.textified + ']';
        }
        else {
            ret.textified = null;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (isTextualNode(item)) {
                    item.tag = '@';
                    item.name = getNodeText(item);
                }
                else if (['@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
            }
        }
    }
    else {
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            if (isTextualNode(item)) {
                item.tag = '@';
                item.name = getNodeText(item);
            }
            else if (['@id', 'literal'].indexOf(item.tag) > -1) {
                item.tag = '@';
            }
        }
    }
    if (ret.children.length == 0) {
        ret.textified = '[]';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ObjectExpression
var ObjectExpression_astNode = {
    name: "ObjectExpression", 
    ittfTag: "{", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ObjectExpression_astNode)
format.ObjectExpression = function(parent, node, options) {
    var f_astNode = ObjectExpression_astNode;
    var __isText = false;
    var ret = {
        tag: '{', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (options.stateAST[options.stateAST.length-1] === 'JSXExpressionContainer') {
        parent.children.pop();
        ret = parent;
        var __skip = true;
    }
    // process AST-node-property-collection properties and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "properties", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection properties and append ittfNode(s) to `ret`"
     })
    if (node.properties) {
        if (typeof node.properties.length === 'undefined') {
            throw new Error('Property node.properties must be an array');
        }
        var i, i_items=node.properties, i_len=node.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = node.properties[i];
            item.__parent = {
                name: 'properties', 
                len: node.properties.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection properties undefined: ' + JSON.stringify(node, null, 2));
    }
    if (options.mustBeText) {
        if (setTextList(ret, ', ')) {
            ret.textified = '{' + ret.textified + '}';
            if (node.extra && node.extra.parenthesized == true) {
                ret.textified = '(' + ret.textified + ')';
            }
        }
        else {
            throw new Error("ObjectExpression. Cannot textify node as requested: " + JSON.stringify(node, null, 2));
        }
    }
    else {
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            
            // loog 'ObjectExpression, item.tag, item.children.length', item.tag, item.textified, item.children.length
            if (item.tag === '...') {
                if (item.children.length == 0) {
                    item.name = item.textified;
                    item.tag = '@';
                }
                else if (item.children.length == 1) {
                    if (item.children[0].name) {
                        item.children[0].name = '...' + item.children[0].name;
                    }
                    if (item.textified) {
                        item.children[0].textified = '...' + item.children[0].textified;
                    }
                    
                    // loog 'ObjectExpression length 1', item.tag, item.name, item.textified
                    if (item.children[0].name || item.textified) {
                        item.tag = item.children[0].tag;
                        item.textified = item.children[0].textified;
                        item.name = item.children[0].name;
                        item.children = item.children[0].children;
                    }
                    // go on
                    else {
                    }
                }
            }
            
            // loog 'ObjectExpression', item.tag, item.name, getLiteral(item.children[0])
            if (item.tag === '@' && item.name === 'template' && item.children.length == 1 && item.children[0].tag === '`lit') {
                options.wizziIncludes.push({
                    kind: 'html', 
                    node: item, 
                    literal: getLiteral(item.children[0])
                 })
                item.children = [];
            }
        }
        if (!ret.textified && ret.children.length == 0) {
            
            // set ret.name = ret.textified = '({})' // 10/1/19
            if (node.extra && node.extra.parenthesized == true) {
                ret.textified = '({})';
            }
            // set ret.name = ret.textified = '{}' // 10/1/19
            // set ret.textified = '{}' // 25/3/21
            else {
            }
        }
        else {
            if (node.extra && node.extra.parenthesized == true) {
                var temp = {
                    tag: '(', 
                    children: [
                        ret
                    ]
                 };
                ret = temp;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ObjectProperty
var ObjectProperty_astNode = {
    name: "ObjectProperty", 
    ittfTag: "@", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ObjectProperty_astNode)
format.ObjectProperty = function(parent, node, options) {
    var f_astNode = ObjectProperty_astNode;
    var __isText = false;
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'ObjectProperty enter options.mustBeText', options.mustBeText
    const save = options.mustBeText;
    options.mustBeText = true;
    // process AST-node-property key and set it in a var
    var p_key = null;
    if (typeof(node.key) !== 'undefined' && node.key != null) {
        p_key = {
            textified: null, 
            isText: false, 
            ASTProp: 'key', 
            children: [
                
            ]
         };
        if (node.key == null) {
            p_key.text = "null";
        }
        // loog 'f_p_temp key before format'
        // loog 'f_p_temp key after format', p_key.children.length, p_key
        else {
            if (!node.key.type) {
                throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_key, node.key, options)
            var key_comments = extractCommentsIf(p_key, 1);
            if (p_key.children.length == 1) {
                p_key.tag = p_key.children[0].tag;
                if (!(p_key.children[0].isText || p_key.children[0].textified)) {
                    p_key.name = p_key.children[0].name;
                    p_key.source = p_key.children[0].source;
                    p_key.children = p_key.children[0].children;
                }
                else {
                    if (p_key.children[0].textified) {
                        p_key.textified = p_key.children[0].textified;
                    }
                    if (p_key.children[0].isText) {
                        p_key.isText = true;
                    }
                    p_key.name = p_key.children[0].name;
                    p_key.source = p_key.children[0].source;
                    p_key.children = [];
                }
            }
            if (key_comments.length > 0) {
                p_key.children = p_key.children.concat(key_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'ObjectProperty.p_key', p_key
    options.mustBeText = save;
    if (isTextualNode(p_key)) {
        ret.name = getNodeText(p_key);
        if (node.computed) {
            ret.name = '[' + ret.name + ']';
        }
    }
    else {
        var p_computed = {
            tag: '@[', 
            children: [
                p_key
            ]
         };
        ret.children.push(p_computed)
        ret = p_computed;
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    // loog 'ObjectProperty.ret.name', ret.name, 'node.value.type', node.value.type
    
    // process AST-node-property value.left and set it in a var
    
    // process AST-node-property value.right and set it in a var
    
    // loog 'p_value_left', p_value_left
    
    // loog 'p_value_right', p_value_right
    if (node.value.type === 'AssignmentPattern') {
        var p_value_left = null;
        if (typeof(node.value.left) !== 'undefined' && node.value.left != null) {
            p_value_left = {
                textified: null, 
                isText: false, 
                ASTProp: 'value_left', 
                children: [
                    
                ]
             };
            if (node.value.left == null) {
                p_value_left.text = "null";
            }
            // loog 'f_p_temp value_left before format'
            // loog 'f_p_temp value_left after format', p_value_left.children.length, p_value_left
            else {
                if (!node.value.left.type) {
                    throw 'Node value_left has no type: ' + JSON.stringify(node, null, 2);
                }
                format(p_value_left, node.value.left, options)
                var value_left_comments = extractCommentsIf(p_value_left, 1);
                if (p_value_left.children.length == 1) {
                    p_value_left.tag = p_value_left.children[0].tag;
                    if (!(p_value_left.children[0].isText || p_value_left.children[0].textified)) {
                        p_value_left.name = p_value_left.children[0].name;
                        p_value_left.source = p_value_left.children[0].source;
                        p_value_left.children = p_value_left.children[0].children;
                    }
                    else {
                        if (p_value_left.children[0].textified) {
                            p_value_left.textified = p_value_left.children[0].textified;
                        }
                        if (p_value_left.children[0].isText) {
                            p_value_left.isText = true;
                        }
                        p_value_left.name = p_value_left.children[0].name;
                        p_value_left.source = p_value_left.children[0].source;
                        p_value_left.children = [];
                    }
                }
                if (value_left_comments.length > 0) {
                    p_value_left.children = p_value_left.children.concat(value_left_comments);
                }
            }
        }
        else {
            throw new Error('AST-node-property value_left undefined: ' + JSON.stringify(node, null, 2));
        }
        var p_value_right = null;
        if (typeof(node.value.right) !== 'undefined' && node.value.right != null) {
            p_value_right = {
                textified: null, 
                isText: false, 
                ASTProp: 'value_right', 
                children: [
                    
                ]
             };
            if (node.value.right == null) {
                p_value_right.text = "null";
            }
            // loog 'f_p_temp value_right before format'
            // loog 'f_p_temp value_right after format', p_value_right.children.length, p_value_right
            else {
                if (!node.value.right.type) {
                    throw 'Node value_right has no type: ' + JSON.stringify(node, null, 2);
                }
                format(p_value_right, node.value.right, options)
                var value_right_comments = extractCommentsIf(p_value_right, 1);
                if (p_value_right.children.length == 1) {
                    p_value_right.tag = p_value_right.children[0].tag;
                    if (!(p_value_right.children[0].isText || p_value_right.children[0].textified)) {
                        p_value_right.name = p_value_right.children[0].name;
                        p_value_right.source = p_value_right.children[0].source;
                        p_value_right.children = p_value_right.children[0].children;
                    }
                    else {
                        if (p_value_right.children[0].textified) {
                            p_value_right.textified = p_value_right.children[0].textified;
                        }
                        if (p_value_right.children[0].isText) {
                            p_value_right.isText = true;
                        }
                        p_value_right.name = p_value_right.children[0].name;
                        p_value_right.source = p_value_right.children[0].source;
                        p_value_right.children = [];
                    }
                }
                if (value_right_comments.length > 0) {
                    p_value_right.children = p_value_right.children.concat(value_right_comments);
                }
            }
        }
        else {
            throw new Error('AST-node-property value_right undefined: ' + JSON.stringify(node, null, 2));
        }
        if (node.value.left.type === 'ObjectPattern') {
            ret.children.push(p_value_left)
            if (isTextualNode(p_value_right)) {
                ret.children.push({
                    tag: '=', 
                    name: getNodeText(p_value_right), 
                    children: [
                        
                    ]
                 })
            }
            
            // FIXME why this?
            else if (p_value_right.tag === 'none' && verify.isNotEmpty(p_value_right.name)) {
                ret.children.push({
                    tag: '=', 
                    name: p_value_right.name, 
                    children: [
                        
                    ]
                 })
            }
            else {
                ret.children.push({
                    tag: '=', 
                    children: [
                        p_value_right
                    ]
                 })
            }
        }
        else {
            if (isTextualNode(p_value_right)) {
                if (options.mustBeText) {
                    ret.textified = ret.name += ' = ' + getNodeText(p_value_right);
                }
                else {
                    ret.children.push({
                        tag: '=', 
                        name: getNodeText(p_value_right), 
                        children: [
                            
                        ]
                     })
                }
            }
            
            // FIXME why this?
            else if (p_value_right.tag === 'none' && verify.isNotEmpty(p_value_right.name)) {
                ret.children.push({
                    tag: '=', 
                    name: p_value_right.name, 
                    children: [
                        
                    ]
                 })
            }
            else {
                ret.children.push({
                    tag: '=', 
                    children: [
                        p_value_right
                    ]
                 })
            }
        }
    }
    // process AST-node-property value and set it in a var
    // loog 'ObjectProperty.p_value', p_value, isTextualNode(p_value), isTextualNode(p_key)
    else {
        var p_value = null;
        if (typeof(node.value) !== 'undefined' && node.value != null) {
            p_value = {
                textified: null, 
                isText: false, 
                ASTProp: 'value', 
                children: [
                    
                ]
             };
            if (node.value == null) {
                p_value.text = "null";
            }
            // loog 'f_p_temp value before format'
            // loog 'f_p_temp value after format', p_value.children.length, p_value
            else {
                if (!node.value.type) {
                    throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
                }
                format(p_value, node.value, options)
                var value_comments = extractCommentsIf(p_value, 1);
                if (p_value.children.length == 1) {
                    p_value.tag = p_value.children[0].tag;
                    if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                        p_value.children = p_value.children[0].children;
                    }
                    else {
                        if (p_value.children[0].textified) {
                            p_value.textified = p_value.children[0].textified;
                        }
                        if (p_value.children[0].isText) {
                            p_value.isText = true;
                        }
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                        p_value.children = [];
                    }
                }
                if (value_comments.length > 0) {
                    p_value.children = p_value.children.concat(value_comments);
                }
            }
        }
        else {
            throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
        }
        if (isTextualNode(p_value)) {
            if (isTextualNode(p_key)) {
                if (options.mustBeText) {
                    if (ret.name !== getNodeText(p_value)) {
                        ret.textified = ret.name += ': ' + getNodeText(p_value);
                    }
                    else {
                        ret.textified = ret.name;
                    }
                }
                else {
                    if (ret.name !== getNodeText(p_value)) {
                        ret.name += ' ' + getNodeText(p_value);
                    }
                }
            }
            else {
                ret.children.push({
                    tag: '+', 
                    name: getNodeText(p_value), 
                    children: [
                        
                    ]
                 })
            }
        }
        else if (p_value.tag === 'none' && verify.isNotEmpty(p_value.name)) {
            if (isTextualNode(p_key)) {
                if (ret.name !== p_value.name) {
                    ret.name += ' ' + p_value.name;
                }
            }
            else {
                ret.children.push({
                    tag: '+', 
                    name: p_value.name, 
                    children: [
                        
                    ]
                 })
            }
        }
        else {
            ret.children.push(p_value)
        }
    }
    // TODO b( shorthand
    // TODO b( async
    // TODO b( generator
    if (ret.children.length == 1 && ret.children[0].tag === '{') {
        ret.tag = '{' + ret.tag.substr(1);
        ret.children = ret.children[0].children;
    }
    else if (ret.children.length == 1 && ret.children[0].tag === '[') {
        ret.tag = '[' + ret.tag.substr(1);
        ret.children = ret.children[0].children;
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ObjectMethod
var ObjectMethod_astNode = {
    name: "ObjectMethod", 
    ittfTag: "node.kind", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ObjectMethod_astNode)
format.ObjectMethod = function(parent, node, options) {
    var f_astNode = ObjectMethod_astNode;
    var __isText = false;
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'ObjectMethod enter options.mustBeText', options.mustBeText
    // s( kind
    // enum "get" | "set" | "method"
    const save = options.mustBeText;
    options.mustBeText = true;
    // process AST-node-property key and set it in a var
    var p_key = null;
    if (typeof(node.key) !== 'undefined' && node.key != null) {
        p_key = {
            textified: null, 
            isText: false, 
            ASTProp: 'key', 
            children: [
                
            ]
         };
        if (node.key == null) {
            p_key.text = "null";
        }
        // loog 'f_p_temp key before format'
        // loog 'f_p_temp key after format', p_key.children.length, p_key
        else {
            if (!node.key.type) {
                throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_key, node.key, options)
            var key_comments = extractCommentsIf(p_key, 1);
            if (p_key.children.length == 1) {
                p_key.tag = p_key.children[0].tag;
                if (!(p_key.children[0].isText || p_key.children[0].textified)) {
                    p_key.name = p_key.children[0].name;
                    p_key.source = p_key.children[0].source;
                    p_key.children = p_key.children[0].children;
                }
                else {
                    if (p_key.children[0].textified) {
                        p_key.textified = p_key.children[0].textified;
                    }
                    if (p_key.children[0].isText) {
                        p_key.isText = true;
                    }
                    p_key.name = p_key.children[0].name;
                    p_key.source = p_key.children[0].source;
                    p_key.children = [];
                }
            }
            if (key_comments.length > 0) {
                p_key.children = p_key.children.concat(key_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = getNodeText(p_key);
    options.mustBeText = save;
    // loog 'node.async', node.async
    if (!!node.async == true) {
        ret.children.push({
            tag: 'async', 
            children: [
                
            ]
         })
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "params", 
        tag: "params", 
        descr: "# process AST-node-property-collection params and embed its array of nodes in a new tag"
     })
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
             };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                 };
                format(tempparams, item, options)
            }
            ret.children.push(tempparams)
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined' && node.returnType != null) {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
         };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        // loog 'f_p_temp returnType before format'
        // loog 'f_p_temp returnType after format', p_returnType.children.length, p_returnType
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_returnType, node.returnType, options)
            var returnType_comments = extractCommentsIf(p_returnType, 1);
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                    }
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = [];
                }
            }
            if (returnType_comments.length > 0) {
                p_returnType.children = p_returnType.children.concat(returnType_comments);
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
         };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = ret.tag == 'constructor' ? 'ctor' : (ret.tag == 'method' ? 'm' : ret.tag);
    setNameFromChildByTag(ret, 'key', true);
    if (ret.tag === 'ctor') {
        ret.name = '';
    }
    else if (node.computed) {
        ret.name = '[' + ret.name + ']';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node FunctionExpression
var FunctionExpression_astNode = {
    name: "FunctionExpression", 
    ittfTag: "function", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(FunctionExpression_astNode)
format.FunctionExpression = function(parent, node, options) {
    var f_astNode = FunctionExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'FunctionExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "id", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property id and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempid .children.length > 0
            * 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
         };
        format(tempid, node.id, options)
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeParameters", 
        descr: "process AST-node-property typeParameters and append ittfNode to `ret`"
     })
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options)
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "params", 
        tag: "params", 
        descr: "# process AST-node-property-collection params and embed its array of nodes in a new tag"
     })
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
             };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                 };
                format(tempparams, item, options)
            }
            ret.children.push(tempparams)
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined' && node.returnType != null) {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
         };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        // loog 'f_p_temp returnType before format'
        // loog 'f_p_temp returnType after format', p_returnType.children.length, p_returnType
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_returnType, node.returnType, options)
            var returnType_comments = extractCommentsIf(p_returnType, 1);
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                    }
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = [];
                }
            }
            if (returnType_comments.length > 0) {
                p_returnType.children = p_returnType.children.concat(returnType_comments);
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
         };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.async) {
        ret.tag = 'async-function';
    }
    if (node.generator) {
        ret.tag += '*';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node UnaryExpression
var UnaryExpression_astNode = {
    name: "UnaryExpression", 
    ittfTag: "'op' + node.operator", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(UnaryExpression_astNode)
format.UnaryExpression = function(parent, node, options) {
    var f_astNode = UnaryExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'UnaryExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A unary operator expression.
    // s( operator, UnaryOperator enum "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw"
    // b( prefix
    if (ret.tag == 'opdelete') {
        ret.tag = 'delete';
    }
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined' && node.argument != null) {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
         };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        // loog 'f_p_temp argument before format'
        // loog 'f_p_temp argument after format', p_argument.children.length, p_argument
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_argument, node.argument, options)
            var argument_comments = extractCommentsIf(p_argument, 1);
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                    }
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = [];
                }
            }
            if (argument_comments.length > 0) {
                p_argument.children = p_argument.children.concat(argument_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
        const space = ['-','+','!','{'].indexOf(node.operator) > -1 ? '' : ' ';
        ret.textified = node.operator + space + ret.name;
    }
    else {
        ret.children.push(p_argument)
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        
        // is the return value of an ArrowExpression
        
        // TODO ...
        if (node.extra && node.extra.parenthesized == true) {
            if (isTextualNode(p_argument)) {
                ret.tag = '(';
                ret.name = node.operator + getNodeText(p_argument);
                ret.textified = '(' + node.operator + getNodeText(p_argument) + ')';
            }
            else {
                var temp = {
                    tag: '(', 
                    children: [
                        ret
                    ]
                 };
                ret = temp;
            }
        }
        // TODO ...
        else {
            if (isTextualNode(p_argument)) {
                ret.tag = '+';
                ret.name = node.operator + getNodeText(p_argument);
            }
            else {
                var temp = {
                    tag: '+', 
                    children: [
                        ret
                    ]
                 };
                ret = temp;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node UpdateExpression
var UpdateExpression_astNode = {
    name: "UpdateExpression", 
    ittfTag: "'op' + node.operator", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(UpdateExpression_astNode)
format.UpdateExpression = function(parent, node, options) {
    var f_astNode = UpdateExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'UpdateExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // An update (increment or decrement) operator expression.
    // s( operator, UpdateOperator enum "++" | "--"
    // process AST-node-property argument and append ittfNode to `ret`
    f_astNode.props.push({
        name: "argument", 
        descr: "process AST-node-property argument and append ittfNode to `ret`"
     })
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options)
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // b( prefix
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    if (got_text_1) {
        ret.tag = 'set';
        if (node.prefix) {
            ret.name = node.operator + ret.name;
        }
        else {
            ret.name = ret.name + node.operator;
        }
        ret.textified = ret.name;
    }
    if (node.prefix) {
        ret.tag = node.operator + 'op';
    }
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (got_text_1) {
            if (node.extra && node.extra.parenthesized == true) {
                ret.tag = '(';
            }
            else {
                ret.tag = '+';
            }
        }
        // TODO
        // is the return value of an ArrowExpression
        else {
            if (got_text_1) {
                ret.tag = '(';
            }
            else {
                ret.tag = '(' + ret.tag;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node BinaryExpression
var BinaryExpression_astNode = {
    name: "BinaryExpression", 
    ittfTag: "'op' + node.operator", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(BinaryExpression_astNode)
format.BinaryExpression = function(parent, node, options) {
    var f_astNode = BinaryExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BinaryExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A binary operator token.
    // s( operator, BinaryOperator
    // enum "==" | "!=" | "===" | "!==" "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof" | "|>"
    if (node.operator.length > 1) {
        ret.tag = node.operator;
    }
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined' && node.left != null) {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
         };
        if (node.left == null) {
            p_left.text = "null";
        }
        // loog 'f_p_temp left before format'
        // loog 'f_p_temp left after format', p_left.children.length, p_left
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_left, node.left, options)
            var left_comments = extractCommentsIf(p_left, 1);
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                    }
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = [];
                }
            }
            if (left_comments.length > 0) {
                p_left.children = p_left.children.concat(left_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'BinaryExpression.p_left', p_left
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined' && node.right != null) {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
         };
        if (node.right == null) {
            p_right.text = "null";
        }
        // loog 'f_p_temp right before format'
        // loog 'f_p_temp right after format', p_right.children.length, p_right
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_right, node.right, options)
            var right_comments = extractCommentsIf(p_right, 1);
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                    }
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = [];
                }
            }
            if (right_comments.length > 0) {
                p_right.children = p_right.children.concat(right_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'BinaryExpression.p_right', p_right
    if (isTextualNode(p_left) && isTextualNode(p_right)) {
        ret.tag = 'set';
        ret.name = getNodeText(p_left) + ' ' + node.operator + ' ' + getNodeText(p_right);
        ret.textified = ret.name;
        if (node.extra && node.extra.parenthesized == true) {
            ret.textified = '(' + ret.textified + ')';
        }
    }
    else {
        if (isTextualNode(p_left) || (p_left.children.length == 0 && [ '@id', 'literal'].indexOf(p_left.tag) > -1)) {
            p_left.tag = '+';
            if (isTextualNode(p_left)) {
                p_left.name = getNodeText(p_left);
                p_left.children = [];
            }
        }
        ret.children.push(p_left)
        if (isTextualNode(p_right) || (p_right.children.length == 0 && [ '@id', 'literal'].indexOf(p_right.tag) > -1)) {
            p_right.tag = '+';
            if (isTextualNode(p_right)) {
                p_right.name = getNodeText(p_right);
                p_right.children = [];
            }
        }
        ret.children.push(p_right)
        
        // is the return value of an ArrowExpression
        if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
            if (node.extra && node.extra.parenthesized == true) {
                ret.tag = '(' + ret.tag;
            }
            // 18/3/21 set ret.tag = '+'
            else {
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node AssignmentExpression
var AssignmentExpression_astNode = {
    name: "AssignmentExpression", 
    ittfTag: "set", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(AssignmentExpression_astNode)
format.AssignmentExpression = function(parent, node, options) {
    var f_astNode = AssignmentExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'set', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AssignmentExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'AssignmentExpression enter options.mustBeText', options.mustBeText
    // An assignment operator expression.
    // s( operator, AssignmentOperator
    // enum AssignmentOperator { "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&="
    const save = options.mustBeText;
    options.mustBeText = true;
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined' && node.left != null) {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
         };
        if (node.left == null) {
            p_left.text = "null";
        }
        // loog 'f_p_temp left before format'
        // loog 'f_p_temp left after format', p_left.children.length, p_left
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_left, node.left, options)
            var left_comments = extractCommentsIf(p_left, 1);
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                    }
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = [];
                }
            }
            if (left_comments.length > 0) {
                p_left.children = p_left.children.concat(left_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    options.mustBeText = save;
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined' && node.right != null) {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
         };
        if (node.right == null) {
            p_right.text = "null";
        }
        // loog 'f_p_temp right before format'
        // loog 'f_p_temp right after format', p_right.children.length, p_right
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_right, node.right, options)
            var right_comments = extractCommentsIf(p_right, 1);
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                    }
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = [];
                }
            }
            if (right_comments.length > 0) {
                p_right.children = p_right.children.concat(right_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left) + ' ' + node.operator + ' ';
    }
    else {
        ret.name = node.operator;
        ret.children.push(p_left)
    }
    // loog 'AssignmentExpression.isTextualNode(p_right)', isTextualNode(p_right)
    // loog 'AssignmentExpression.p_right', p_right
    if (isTextualNode(p_left) && isTextualNode(p_right)) {
        ret.name += getNodeText(p_right);
    }
    else {
        if (verify.isEmpty(p_right.tag)) {
            var i, i_items=p_right.children, i_len=p_right.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_right.children[i];
                ret.children.push(item)
            }
        }
        else {
            ret.children.push(p_right)
        }
    }
    // loog 'AssignmentExpression.ret final', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node LogicalExpression
var LogicalExpression_astNode = {
    name: "LogicalExpression", 
    ittfTag: "'op' + node.operator", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(LogicalExpression_astNode)
format.LogicalExpression = function(parent, node, options) {
    var f_astNode = LogicalExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'LogicalExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A logical operator expression.
    // s( operator, LogicalOperator enum "||" | "&&" | "??"
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined' && node.left != null) {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
         };
        if (node.left == null) {
            p_left.text = "null";
        }
        // loog 'f_p_temp left before format'
        // loog 'f_p_temp left after format', p_left.children.length, p_left
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_left, node.left, options)
            var left_comments = extractCommentsIf(p_left, 1);
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                    }
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = [];
                }
            }
            if (left_comments.length > 0) {
                p_left.children = p_left.children.concat(left_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined' && node.right != null) {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
         };
        if (node.right == null) {
            p_right.text = "null";
        }
        // loog 'f_p_temp right before format'
        // loog 'f_p_temp right after format', p_right.children.length, p_right
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_right, node.right, options)
            var right_comments = extractCommentsIf(p_right, 1);
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                    }
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = [];
                }
            }
            if (right_comments.length > 0) {
                p_right.children = p_right.children.concat(right_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    var parenthesized = node.extra && node.extra.parenthesized;
    // loog 'LogicalExpression', isTextualNode(p_left), isTextualNode(p_right)
    // loog 'LogicalExpression,p_left', p_left
    // loog 'LogicalExpression,p_right', p_right
    if (isTextualNode(p_left) && isTextualNode(p_right)) {
        ret.tag = '@expr';
        ret.name = parenthesize(getNodeText(p_left) + ' ' + node.operator + ' ' + getNodeText(p_right), parenthesized);
        ret.textified = ret.name;
    }
    // loog 'LogicalExpression,isTextualNode(p_left),p_left', isTextualNode(p_left), p_left
    // loog 'LogicalExpression,isTextualNode(p_right),p_right', isTextualNode(p_right), p_right
    else {
        ret.tag = node.operator;
        if (isTextualNode(p_left) || ['@id', 'literal','set'].indexOf(p_left.tag) > -1) {
            p_left.tag = '+';
            if (isTextualNode(p_left)) {
                p_left.name = getNodeText(p_left);
                p_left.children = [];
            }
        }
        ret.children.push(p_left)
        if (isTextualNode(p_right) || ['@id', 'literal','set'].indexOf(p_right.tag) > -1) {
            p_right.tag = '+';
            if (isTextualNode(p_right)) {
                p_right.name = getNodeText(p_right);
                p_right.children = [];
            }
        }
        ret.children.push(p_right)
        if (parenthesized) {
            ret = {
                tag: '(', 
                children: [ret]
             };
        }
    }
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            if (ret.tag === 'set') {
                ret.tag = '(';
            }
            else {
                ret.tag = '(' + ret.tag;
            }
        }
        else {
            if (ret.tag === 'set') {
                ret.tag = '+';
            }
            // TODO Do nothing is OK?
            else {
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node SpreadElement
var SpreadElement_astNode = {
    name: "SpreadElement", 
    ittfTag: "...", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(SpreadElement_astNode)
format.SpreadElement = function(parent, node, options) {
    var f_astNode = SpreadElement_astNode;
    var __isText = false;
    var ret = {
        tag: '...', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SpreadElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined' && node.argument != null) {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
         };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        // loog 'f_p_temp argument before format'
        // loog 'f_p_temp argument after format', p_argument.children.length, p_argument
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_argument, node.argument, options)
            var argument_comments = extractCommentsIf(p_argument, 1);
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                    }
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = [];
                }
            }
            if (argument_comments.length > 0) {
                p_argument.children = p_argument.children.concat(argument_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'SpreadElement.p_argument', p_argument
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
        ret.textified = '...' + ret.name;
    }
    // set ret.textified = p_argument.source
    // throw new Error('SpreadElement must be textual:' + JSON.stringify(p_argument, null, 2))
    else {
        ret.children.push(p_argument)
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node MemberExpression
var MemberExpression_astNode = {
    name: "MemberExpression", 
    ittfTag: "@expr", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(MemberExpression_astNode)
format.MemberExpression = function(parent, node, options) {
    var f_astNode = MemberExpression_astNode;
    var __isText = false;
    var ret = {
        tag: '@expr', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'MemberExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property object and set it in a var
    var p_object = null;
    if (typeof(node.object) !== 'undefined' && node.object != null) {
        p_object = {
            textified: null, 
            isText: false, 
            ASTProp: 'object', 
            children: [
                
            ]
         };
        if (node.object == null) {
            p_object.text = "null";
        }
        // loog 'f_p_temp object before format'
        // loog 'f_p_temp object after format', p_object.children.length, p_object
        else {
            if (!node.object.type) {
                throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_object, node.object, options)
            var object_comments = extractCommentsIf(p_object, 1);
            if (p_object.children.length == 1) {
                p_object.tag = p_object.children[0].tag;
                if (!(p_object.children[0].isText || p_object.children[0].textified)) {
                    p_object.name = p_object.children[0].name;
                    p_object.source = p_object.children[0].source;
                    p_object.children = p_object.children[0].children;
                }
                else {
                    if (p_object.children[0].textified) {
                        p_object.textified = p_object.children[0].textified;
                    }
                    if (p_object.children[0].isText) {
                        p_object.isText = true;
                    }
                    p_object.name = p_object.children[0].name;
                    p_object.source = p_object.children[0].source;
                    p_object.children = [];
                }
            }
            if (object_comments.length > 0) {
                p_object.children = p_object.children.concat(object_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property object undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property property and set it in a var
    var p_property = null;
    if (typeof(node.property) !== 'undefined' && node.property != null) {
        p_property = {
            textified: null, 
            isText: false, 
            ASTProp: 'property', 
            children: [
                
            ]
         };
        if (node.property == null) {
            p_property.text = "null";
        }
        // loog 'f_p_temp property before format'
        // loog 'f_p_temp property after format', p_property.children.length, p_property
        else {
            if (!node.property.type) {
                throw 'Node property has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_property, node.property, options)
            var property_comments = extractCommentsIf(p_property, 1);
            if (p_property.children.length == 1) {
                p_property.tag = p_property.children[0].tag;
                if (!(p_property.children[0].isText || p_property.children[0].textified)) {
                    p_property.name = p_property.children[0].name;
                    p_property.source = p_property.children[0].source;
                    p_property.children = p_property.children[0].children;
                }
                else {
                    if (p_property.children[0].textified) {
                        p_property.textified = p_property.children[0].textified;
                    }
                    if (p_property.children[0].isText) {
                        p_property.isText = true;
                    }
                    p_property.name = p_property.children[0].name;
                    p_property.source = p_property.children[0].source;
                    p_property.children = [];
                }
            }
            if (property_comments.length > 0) {
                p_property.children = p_property.children.concat(property_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property property undefined: ' + JSON.stringify(node, null, 2));
    }
    // b( computed
    // b( optional, optional
    // If `computed` is `true`, the node corresponds to a computed (`a[b]`) member expression and `property` is an `Expression`.
    // If `computed` is `false`, the node corresponds to a static (`a.b`) member expression and `property` is an `Identifier`.
    // The `optional` flags indicates that the member expression can be called even if the object is null or undefined.
    // If this is the object value (null/undefined) should be returned.
    // if p_object.name == 'Promise'
    var qmark = node.optional ? '?' : '';
    if (isTextualNode(p_object)) {
        var obj = getNodeText(p_object);
        
        // loog 'MemberExpression.textified', ret.textified
        if (isTextualNode(p_property)) {
            var prop = getNodeText(p_property);
            ret.name = node.computed ? obj + qmark + '[' + prop + ']' : obj + qmark + '.' + prop;
            ret.textified = ret.name;
            ret.children = [];
        }
        else {
            ret.name = obj + qmark;
            var link = {
                tag: node.computed ? '.[' : '.', 
                children: [
                    
                ]
             };
            link.children.push(p_property)
            ret.children.push(link)
        }
    }
    // loog 'MemberExpression.tag.name', ret.tag, ret.name
    else {
        console.log(1011, __filename);
        if (node.computed) {
            p_property.tag = '.[';
        }
        else {
            p_property.tag = '.';
        }
        
        // log 2
        
        // 26/3/21 this is the most improbable, waiting for big damage
        if (p_object.tag === '(') {
            p_object.name = p_object.name + qmark;
            ret.children.push(p_object)
            ret.children.push(p_property)
        }
        // log 3, p_object.tag, p_object.name
        else {
            ret.tag = p_object.tag;
            ret.name = p_object.name + qmark;
            ret.source = p_object.source;
            ret.children = p_object.children;
            ret.children.push(p_property)
        }
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            // loog 'MemberExpression.child', i, ret.children[i].tag, ret.children[i].name
        }
    }
    
    // is the return value of an ArrowExpression
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            ret = {
                tag: '(', 
                children: [ret]
             };
        }
        else {
            ret = {
                tag: '+', 
                children: [ret]
             };
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node BindExpression
var BindExpression_astNode = {
    name: "BindExpression", 
    ittfTag: "bind-expr", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(BindExpression_astNode)
format.BindExpression = function(parent, node, options) {
    var f_astNode = BindExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'bind-expr', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BindExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property object and append ittfNode to `ret`
    f_astNode.props.push({
        name: "object", 
        descr: "process AST-node-property object and append ittfNode to `ret`"
     })
    if (node.object) {
        if (!node.object.type) {
            throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.object, options)
    }
    // process AST-node-property callee and append ittfNode to `ret`
    f_astNode.props.push({
        name: "callee", 
        descr: "process AST-node-property callee and append ittfNode to `ret`"
     })
    if (node.callee) {
        if (!node.callee.type) {
            throw 'Node callee has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.callee, options)
    }
    else {
        throw new Error('AST-node-property callee undefined: ' + JSON.stringify(node, null, 2));
    }
    // if `object` is `null`, then `callee` should be a `MemberExpression`.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ConditionalExpression
var ConditionalExpression_astNode = {
    name: "ConditionalExpression", 
    ittfTag: "iif", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ConditionalExpression_astNode)
format.ConditionalExpression = function(parent, node, options) {
    var f_astNode = ConditionalExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'iif', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ConditionalExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A conditional expression, i.e., a ternary `?`/`:` expression.
    f_astNode.props.push({
        name: "test", 
        tag: "test", 
        descr: "fragment f_p_tag"
     })
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property test/test not managed by f_p_tag')
    */
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options)
        p_test.tag = 'test';
        ret.children.push(p_test)
        
        // loog '*** f_p_tag test children[0].textified', p_test.children[0].textified
        
        // loog '*** f_p_tag test children[0].isText', p_test.children[0].isText
        
        // loog '*** f_p_tag test children[0].name', p_test.children[0].name
        if (p_test.children.length == 1) {
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
    }
    // process AST-node-property consequent and set it in a var
    var p_consequent = null;
    if (typeof(node.consequent) !== 'undefined' && node.consequent != null) {
        p_consequent = {
            textified: null, 
            isText: false, 
            ASTProp: 'consequent', 
            children: [
                
            ]
         };
        if (node.consequent == null) {
            p_consequent.text = "null";
        }
        // loog 'f_p_temp consequent before format'
        // loog 'f_p_temp consequent after format', p_consequent.children.length, p_consequent
        else {
            if (!node.consequent.type) {
                throw 'Node consequent has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_consequent, node.consequent, options)
            var consequent_comments = extractCommentsIf(p_consequent, 1);
            if (p_consequent.children.length == 1) {
                p_consequent.tag = p_consequent.children[0].tag;
                if (!(p_consequent.children[0].isText || p_consequent.children[0].textified)) {
                    p_consequent.name = p_consequent.children[0].name;
                    p_consequent.source = p_consequent.children[0].source;
                    p_consequent.children = p_consequent.children[0].children;
                }
                else {
                    if (p_consequent.children[0].textified) {
                        p_consequent.textified = p_consequent.children[0].textified;
                    }
                    if (p_consequent.children[0].isText) {
                        p_consequent.isText = true;
                    }
                    p_consequent.name = p_consequent.children[0].name;
                    p_consequent.source = p_consequent.children[0].source;
                    p_consequent.children = [];
                }
            }
            if (consequent_comments.length > 0) {
                p_consequent.children = p_consequent.children.concat(consequent_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property consequent undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property alternate and set it in a var
    var p_alternate = null;
    if (typeof(node.alternate) !== 'undefined' && node.alternate != null) {
        p_alternate = {
            textified: null, 
            isText: false, 
            ASTProp: 'alternate', 
            children: [
                
            ]
         };
        if (node.alternate == null) {
            p_alternate.text = "null";
        }
        // loog 'f_p_temp alternate before format'
        // loog 'f_p_temp alternate after format', p_alternate.children.length, p_alternate
        else {
            if (!node.alternate.type) {
                throw 'Node alternate has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_alternate, node.alternate, options)
            var alternate_comments = extractCommentsIf(p_alternate, 1);
            if (p_alternate.children.length == 1) {
                p_alternate.tag = p_alternate.children[0].tag;
                if (!(p_alternate.children[0].isText || p_alternate.children[0].textified)) {
                    p_alternate.name = p_alternate.children[0].name;
                    p_alternate.source = p_alternate.children[0].source;
                    p_alternate.children = p_alternate.children[0].children;
                }
                else {
                    if (p_alternate.children[0].textified) {
                        p_alternate.textified = p_alternate.children[0].textified;
                    }
                    if (p_alternate.children[0].isText) {
                        p_alternate.isText = true;
                    }
                    p_alternate.name = p_alternate.children[0].name;
                    p_alternate.source = p_alternate.children[0].source;
                    p_alternate.children = [];
                }
            }
            if (alternate_comments.length > 0) {
                p_alternate.children = p_alternate.children.concat(alternate_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property alternate undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'ConditionalExpression 1', ret.tag
    setNameFromChildByTag(ret, 'test', true);
    // loog 'ConditionalExpression 2', ret.tag
    setOrInlineIfTextualNode(ret, p_consequent, 'then')
    setOrInlineIfTextualNode(ret, p_alternate, 'else')
    // loog 'ConditionalExpression 3', ret.tag
    if (node.extra && node.extra.parenthesized == true) {
        ret = {
            tag: '(', 
            name: '', 
            children: [
                ret
            ]
         };
    }
    // loog 'ConditionalExpression 4', ret.tag
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node CallExpression
var CallExpression_astNode = {
    name: "CallExpression", 
    ittfTag: "_", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(CallExpression_astNode)
format.CallExpression = function(parent, node, options) {
    var f_astNode = CallExpression_astNode;
    var __isText = false;
    var ret = {
        tag: '_', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CallExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A function or method call expression.
    // process AST-node-property typeParameters and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeParameters", 
        descr: "process AST-node-property typeParameters and append ittfNode to `ret`"
     })
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options)
    }
    // process AST-node-property callee and set it in a var
    var p_callee = null;
    if (typeof(node.callee) !== 'undefined' && node.callee != null) {
        p_callee = {
            textified: null, 
            isText: false, 
            ASTProp: 'callee', 
            children: [
                
            ]
         };
        if (node.callee == null) {
            p_callee.text = "null";
        }
        // loog 'f_p_temp callee before format'
        // loog 'f_p_temp callee after format', p_callee.children.length, p_callee
        else {
            if (!node.callee.type) {
                throw 'Node callee has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_callee, node.callee, options)
            var callee_comments = extractCommentsIf(p_callee, 1);
            if (p_callee.children.length == 1) {
                p_callee.tag = p_callee.children[0].tag;
                if (!(p_callee.children[0].isText || p_callee.children[0].textified)) {
                    p_callee.name = p_callee.children[0].name;
                    p_callee.source = p_callee.children[0].source;
                    p_callee.children = p_callee.children[0].children;
                }
                else {
                    if (p_callee.children[0].textified) {
                        p_callee.textified = p_callee.children[0].textified;
                    }
                    if (p_callee.children[0].isText) {
                        p_callee.isText = true;
                    }
                    p_callee.name = p_callee.children[0].name;
                    p_callee.source = p_callee.children[0].source;
                    p_callee.children = [];
                }
            }
            if (callee_comments.length > 0) {
                p_callee.children = p_callee.children.concat(callee_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property callee undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection arguments and
    // embed its array of nodes in a temp var
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        var p_arguments = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            item.__parent = {
                name: 'arguments', 
                len: node.arguments.length
             };
            format(p_arguments, item, options)
        }
    }
    var lastCallee = ret;
    // loog 'CallExpression.p_callee', p_callee
    var qmark = node.optional ? '?.' : '';
    
    // loog 'CallExpression', 'isTextualNode(p_callee)', isTextualNode(p_callee), 'getNodeText(p_callee)', getNodeText(p_callee), 'node.typeParameters', node.typeParameters, 'p_arguments', p_arguments
    
    // first of all try to set ret.textified
    
    // loog 'CallExpression', 'ret.name,textified', ret.name, ret.textified
    if (isTextualNode(p_callee)) {
        ret.name = getNodeText(p_callee) + qmark;
        if (node.typeParameters) {
            var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_arguments.children[i];
                if (['@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
                lastCallee.children.push(item)
            }
        }
        // loog 'CallExpression p_arguments', p_arguments
        else {
            if (p_arguments && p_arguments.children.length > 0) {
                var tlist = getTextList(p_arguments, ', ');
                if (tlist) {
                    ret.name += '(' + tlist + ')';
                    ret.textified = ret.name;
                    ret.isText = true;
                }
                else {
                    var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = p_arguments.children[i];
                        if (['@id', 'literal'].indexOf(item.tag) > -1) {
                            item.tag = '@';
                        }
                        lastCallee.children.push(item)
                    }
                }
            }
            else {
                ret.name += '()';
                ret.textified = ret.name;
                ret.isText = true;
            }
            if (ret.textified && node.extra && node.extra.parenthesized == true) {
                ret.textified = '(' + ret.textified + ')';
            }
        }
    }
    // TODO implement node.optional
    // loog 'CallExpression', 'p_callee.tag', p_callee.tag, 'p_callee.name', p_callee.name, 'ret.tag', ret.tag
    else {
        var i, i_items=p_callee.children, i_len=p_callee.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_callee.children[i];
            // loog 'CallExpression', 'p_callee.children', i, p_callee.children[i].tag, p_callee.children[i].name
        }
        if (p_arguments) {
            var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_arguments.children[i];
                // loog 'CallExpression', 'p_arguments.children', i, p_arguments.children[i].tag, p_arguments.children[i].name
            }
        }
        if (['[', '{', 'new'].indexOf(p_callee.tag) > -1) {
            ret.tag = p_callee.tag;
        }
        
        // loog 'node.callee.type', node.callee.type, ret.tag
        if (['`lit','iif'].indexOf(p_callee.tag) < 0) {
            ret.name = p_callee.name;
            ret.children = p_callee.children;
            
            // loog 'p_callee.children.length > 0'
            if (p_callee.children.length > 0) {
                lastCallee = p_callee.children[p_callee.children.length-1];
                if (p_arguments && p_arguments.children.length > 0) {
                    if (lastCallee.tag === '.') {
                        lastCallee.tag = '._';
                        var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                        for (i=0; i<i_len; i++) {
                            item = p_arguments.children[i];
                            if (['@id', 'literal'].indexOf(item.tag) > -1) {
                                item.tag = '@';
                            }
                            lastCallee.children.push(item)
                        }
                    }
                    else {
                        var call = {
                            tag: '(', 
                            children: [
                                
                            ]
                         };
                        var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                        for (i=0; i<i_len; i++) {
                            item = p_arguments.children[i];
                            if (['@id', 'literal'].indexOf(item.tag) > -1) {
                                item.tag = '@';
                            }
                            call.children.push(item)
                        }
                        ret.children.push(call);
                    }
                }
                else {
                    if (lastCallee.tag === '.') {
                        lastCallee.tag = '._';
                    }
                }
            }
            // loog 'p_callee.children.length == 0'
            // loog 'CallExpression', p_callee, ret
            else {
                ret.tag = "_";
                ret.name = p_callee.tag;
                if (p_arguments && p_arguments.children.length > 0) {
                    var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = p_arguments.children[i];
                        if (['@id', 'literal'].indexOf(item.tag) > -1) {
                            item.tag = '@';
                        }
                        ret.children.push(item)
                    }
                }
            }
        }
        // loog '1203'
        else {
            var temp = [p_callee];
            lastCallee = p_callee.children[p_callee.children.length-1];
            if (lastCallee.tag === '.') {
                lastCallee.tag = '._';
                p_callee.children.length --;
                temp.push(lastCallee)
            }
            ret.children = temp;
            var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_arguments.children[i];
                if (['@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
                lastCallee.children.push(item)
            }
        }
        
        // loog 'node.callee.type 2', node.callee.type, ret.tag
        if (node.callee.type === 'FunctionExpression' && ret.tag === '_') {
            ret.tag = 'iife' // 9/1/19;
        }
    }
    if (node.extra && node.extra.parenthesized == true && !ret.textified) {
        var temp = {
            tag: '(', 
            children: [
                ret
            ]
         };
        ret = temp;
    }
    // loog 'CallExpression.exit.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node NewExpression
var NewExpression_astNode = {
    name: "NewExpression", 
    ittfTag: "new", 
    couldBeText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(NewExpression_astNode)
format.NewExpression = function(parent, node, options) {
    var f_astNode = NewExpression_astNode;
    var __isText = false;
    options.couldBeText = true;
    var ret = {
        tag: 'new', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'NewExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection arguments and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "arguments", 
        tag: "arguments", 
        descr: "# process AST-node-property-collection arguments and embed its array of nodes in a new tag"
     })
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        if (node.arguments.length > 0) {
            var temparguments = {
                tag: 'arguments', 
                ASTProp: 'arguments', 
                children: [
                    
                ]
             };
            var i, i_items=node.arguments, i_len=node.arguments.length, item;
            for (i=0; i<i_len; i++) {
                item = node.arguments[i];
                item.__parent = {
                    name: 'arguments', 
                    len: node.arguments.length
                 };
                format(temparguments, item, options)
            }
            ret.children.push(temparguments)
        }
    }
    // process AST-node-property typeParameters and set it in a var
    var p_typeParameters = null;
    if (typeof(node.typeParameters) !== 'undefined' && node.typeParameters != null) {
        p_typeParameters = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeParameters', 
            children: [
                
            ]
         };
        if (node.typeParameters == null) {
            p_typeParameters.text = "null";
        }
        // loog 'f_p_temp typeParameters before format'
        // loog 'f_p_temp typeParameters after format', p_typeParameters.children.length, p_typeParameters
        else {
            if (!node.typeParameters.type) {
                throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_typeParameters, node.typeParameters, options)
            var typeParameters_comments = extractCommentsIf(p_typeParameters, 1);
            if (typeParameters_comments.length > 0) {
                p_typeParameters.children = p_typeParameters.children.concat(typeParameters_comments);
            }
        }
    }
    // process AST-node-property callee and set it in a var
    var p_callee = null;
    if (typeof(node.callee) !== 'undefined' && node.callee != null) {
        p_callee = {
            textified: null, 
            isText: false, 
            ASTProp: 'callee', 
            children: [
                
            ]
         };
        if (node.callee == null) {
            p_callee.text = "null";
        }
        // loog 'f_p_temp callee before format'
        // loog 'f_p_temp callee after format', p_callee.children.length, p_callee
        else {
            if (!node.callee.type) {
                throw 'Node callee has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_callee, node.callee, options)
            var callee_comments = extractCommentsIf(p_callee, 1);
            if (p_callee.children.length == 1) {
                p_callee.tag = p_callee.children[0].tag;
                if (!(p_callee.children[0].isText || p_callee.children[0].textified)) {
                    p_callee.name = p_callee.children[0].name;
                    p_callee.source = p_callee.children[0].source;
                    p_callee.children = p_callee.children[0].children;
                }
                else {
                    if (p_callee.children[0].textified) {
                        p_callee.textified = p_callee.children[0].textified;
                    }
                    if (p_callee.children[0].isText) {
                        p_callee.isText = true;
                    }
                    p_callee.name = p_callee.children[0].name;
                    p_callee.source = p_callee.children[0].source;
                    p_callee.children = [];
                }
            }
            if (callee_comments.length > 0) {
                p_callee.children = p_callee.children.concat(callee_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property callee undefined: ' + JSON.stringify(node, null, 2));
    }
    if (p_callee.isText || p_callee.textified) {
        ret.name = p_callee.textified || p_callee.name;
    }
    else {
        throw new Error('NewExpression.callee must be textual:' + p_callee.children[0].tag);
    }
    var argumentsNode = getChildByTag(ret, 'arguments');
    ret.children = [];
    // loog 'NewExpression.ret', ret
    // loog 'NewExpression.p_typeParameters', p_typeParameters
    // loog 'NewExpression.argumentsNode', argumentsNode
    var tlist;
    
    // log 101
    
    // loog 'NewExpression.tlist', tlist
    if (node.arguments && node.arguments.length > 0) {
        if (!p_typeParameters) {
            tlist = getTextList(argumentsNode, ', ');
        }
        if (tlist) {
            ret.name += '(' + tlist + ')';
            ret.textified = 'new ' + ret.name;
            ret.isText = true;
        }
        else {
            if (p_typeParameters) {
                var i, i_items=p_typeParameters.children, i_len=p_typeParameters.children.length, item;
                for (i=0; i<i_len; i++) {
                    item = p_typeParameters.children[i];
                    ret.children.push(item)
                }
            }
            var i, i_items=argumentsNode.children, i_len=argumentsNode.children.length, item;
            for (i=0; i<i_len; i++) {
                item = argumentsNode.children[i];
                if (['@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
                ret.children.push(item)
            }
        }
    }
    // log 102
    else {
        if (p_typeParameters) {
            var i, i_items=p_typeParameters.children, i_len=p_typeParameters.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_typeParameters.children[i];
                ret.children.push(item)
            }
        }
        else {
            ret.textified = 'new ' + ret.name + '()';
        }
    }
    // loog 'NewExpression.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
    options.couldBeText = false;
}
;
// process AST node SequenceExpression
var SequenceExpression_astNode = {
    name: "SequenceExpression", 
    ittfTag: "sequence", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(SequenceExpression_astNode)
format.SequenceExpression = function(parent, node, options) {
    var f_astNode = SequenceExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'sequence', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SequenceExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection expressions and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "expressions", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection expressions and append ittfNode(s) to `ret`"
     })
    if (node.expressions) {
        if (typeof node.expressions.length === 'undefined') {
            throw new Error('Property node.expressions must be an array');
        }
        var i, i_items=node.expressions, i_len=node.expressions.length, item;
        for (i=0; i<i_len; i++) {
            item = node.expressions[i];
            item.__parent = {
                name: 'expressions', 
                len: node.expressions.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection expressions undefined: ' + JSON.stringify(node, null, 2));
    }
    // A sequence expression, i.e., a comma-separated sequence of expressions.
    var i, i_items=ret.children, i_len=ret.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.children[i];
        if (['@id', 'literal'].indexOf(item.tag) > -1) {
            item.tag = 'set';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node DoExpression
var DoExpression_astNode = {
    name: "DoExpression", 
    ittfTag: "do", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(DoExpression_astNode)
format.DoExpression = function(parent, node, options) {
    var f_astNode = DoExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'do', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DoExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node TemplateLiteral
var TemplateLiteral_astNode = {
    name: "TemplateLiteral", 
    ittfTag: "`lit", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(TemplateLiteral_astNode)
format.TemplateLiteral = function(parent, node, options) {
    var f_astNode = TemplateLiteral_astNode;
    var __isText = false;
    var ret = {
        tag: '`lit', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TemplateLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection quasis and
    // embed its array of nodes in a temp var
    if (node.quasis) {
        if (typeof node.quasis.length === 'undefined') {
            throw new Error('Property node.quasis must be an array');
        }
        var p_quasis = {
            tag: 'true', 
            children: [
                
            ]
         };
        var i, i_items=node.quasis, i_len=node.quasis.length, item;
        for (i=0; i<i_len; i++) {
            item = node.quasis[i];
            item.__parent = {
                name: 'quasis', 
                len: node.quasis.length
             };
            format(p_quasis, item, options)
        }
    }
    // process AST-node-property-collection expressions and
    // embed its array of nodes in a temp var
    if (node.expressions) {
        if (typeof node.expressions.length === 'undefined') {
            throw new Error('Property node.expressions must be an array');
        }
        var p_expressions = {
            tag: 'true', 
            children: [
                
            ]
         };
        var i, i_items=node.expressions, i_len=node.expressions.length, item;
        for (i=0; i<i_len; i++) {
            item = node.expressions[i];
            item.__parent = {
                name: 'expressions', 
                len: node.expressions.length
             };
            format(p_expressions, item, options)
        }
    }
    // loog 'TemplateLiteral', model
    var i = 0, j;
    for (i = 0; i < p_expressions.children.length; i++) {
        var q = p_quasis.children[i];
        for (j = 0; j < q.children.length; j++) {
            item = q.children[j];
            ret.children.push(item);
        }
        var e = p_expressions.children[i];
        // loog 'TemplateLiteral.e', e
        if (['@expr', '@id', 'literal', 'set'].indexOf(e.tag) > -1) {
            e.tag = '@';
        }
        ret.children.push(e);
    }
    if (p_quasis.children[i] && p_quasis.children[i].children.length > 0) {
        for (j = 0; j < p_quasis.children[i].children.length; j++) {
            item = p_quasis.children[i].children[j];
            ret.children.push(item);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node TaggedTemplateExpression
var TaggedTemplateExpression_astNode = {
    name: "TaggedTemplateExpression", 
    ittfTag: "_`", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(TaggedTemplateExpression_astNode)
format.TaggedTemplateExpression = function(parent, node, options) {
    var f_astNode = TaggedTemplateExpression_astNode;
    var __isText = false;
    var ret = {
        tag: '_`', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TaggedTemplateExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property tag and set it in a var
    var p_tag = null;
    if (typeof(node.tag) !== 'undefined' && node.tag != null) {
        p_tag = {
            textified: null, 
            isText: false, 
            ASTProp: 'tag', 
            children: [
                
            ]
         };
        if (node.tag == null) {
            p_tag.text = "null";
        }
        // loog 'f_p_temp tag before format'
        // loog 'f_p_temp tag after format', p_tag.children.length, p_tag
        else {
            if (!node.tag.type) {
                throw 'Node tag has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_tag, node.tag, options)
            var tag_comments = extractCommentsIf(p_tag, 1);
            if (p_tag.children.length == 1) {
                p_tag.tag = p_tag.children[0].tag;
                if (!(p_tag.children[0].isText || p_tag.children[0].textified)) {
                    p_tag.name = p_tag.children[0].name;
                    p_tag.source = p_tag.children[0].source;
                    p_tag.children = p_tag.children[0].children;
                }
                else {
                    if (p_tag.children[0].textified) {
                        p_tag.textified = p_tag.children[0].textified;
                    }
                    if (p_tag.children[0].isText) {
                        p_tag.isText = true;
                    }
                    p_tag.name = p_tag.children[0].name;
                    p_tag.source = p_tag.children[0].source;
                    p_tag.children = [];
                }
            }
            if (tag_comments.length > 0) {
                p_tag.children = p_tag.children.concat(tag_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property tag undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_tag)) {
        ret.name = getNodeText(p_tag);
    }
    else {
        throw new Error('TaggedTemplateExpression.tag must be textual:' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property quasi and set it in a var
    var p_quasi = null;
    if (typeof(node.quasi) !== 'undefined' && node.quasi != null) {
        p_quasi = {
            textified: null, 
            isText: false, 
            ASTProp: 'quasi', 
            children: [
                
            ]
         };
        if (node.quasi == null) {
            p_quasi.text = "null";
        }
        // loog 'f_p_temp quasi before format'
        // loog 'f_p_temp quasi after format', p_quasi.children.length, p_quasi
        else {
            if (!node.quasi.type) {
                throw 'Node quasi has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_quasi, node.quasi, options)
            var quasi_comments = extractCommentsIf(p_quasi, 1);
            if (p_quasi.children.length == 1) {
                p_quasi.tag = p_quasi.children[0].tag;
                if (!(p_quasi.children[0].isText || p_quasi.children[0].textified)) {
                    p_quasi.name = p_quasi.children[0].name;
                    p_quasi.source = p_quasi.children[0].source;
                    p_quasi.children = p_quasi.children[0].children;
                }
                else {
                    if (p_quasi.children[0].textified) {
                        p_quasi.textified = p_quasi.children[0].textified;
                    }
                    if (p_quasi.children[0].isText) {
                        p_quasi.isText = true;
                    }
                    p_quasi.name = p_quasi.children[0].name;
                    p_quasi.source = p_quasi.children[0].source;
                    p_quasi.children = [];
                }
            }
            if (quasi_comments.length > 0) {
                p_quasi.children = p_quasi.children.concat(quasi_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property quasi undefined: ' + JSON.stringify(node, null, 2));
    }
    var i, i_items=p_quasi.children, i_len=p_quasi.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_quasi.children[i];
        ret.children.push(item);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node TemplateElement
var TemplateElement_astNode = {
    name: "TemplateElement", 
    ittfTag: "+", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(TemplateElement_astNode)
format.TemplateElement = function(parent, node, options) {
    var f_astNode = TemplateElement_astNode;
    var __isText = false;
    var ret = {
        tag: '+', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TemplateElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // b( tail
    var lines = node.value.raw.split('\n');
    var i, i_items=lines, i_len=lines.length, line;
    for (i=0; i<i_len; i++) {
        line = lines[i];
        if (line[0] === ' ') {
            line = '&nbsp;' + line.substr(1);
        }
        if (line[line.length-1] === ' ') {
            line = line.substr(0, line.length -1) + '&nbsp;';
        }
        ret.children.push({
            tag: '+', 
            name: line + (( i < lines.length - 1) ? '&lf;' : '' ), 
            children: [
                
            ]
         })
    }
    // f_p( value
    // f_p_p( value, cooked, optional
    // f_p_p( value, raw
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ObjectPattern
var ObjectPattern_astNode = {
    name: "ObjectPattern", 
    ittfTag: "{", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ObjectPattern_astNode)
format.ObjectPattern = function(parent, node, options) {
    var f_astNode = ObjectPattern_astNode;
    var __isText = false;
    var ret = {
        tag: '{', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectPattern', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'ObjectPattern enter options.mustBeText', options.mustBeText
    // process AST-node-property-collection properties and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "properties", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection properties and append ittfNode(s) to `ret`"
     })
    if (node.properties) {
        if (typeof node.properties.length === 'undefined') {
            throw new Error('Property node.properties must be an array');
        }
        var i, i_items=node.properties, i_len=node.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = node.properties[i];
            item.__parent = {
                name: 'properties', 
                len: node.properties.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection properties undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'wizzifiers.js.ObjectPattern.ret', JSON.stringify(ret, null, 2)
    if (options.mustBeText) {
        if (setTextList(ret, ', ') && !!node.typeAnnotation == false) {
            ret.textified = '{' + ret.textified + '}';
            if (node.extra && node.extra.parenthesized == true) {
                ret.textified = '(' + ret.textified + ')';
            }
        }
        else {
            throw new Error("ObjectPattern. Cannot textify node as requested: " + JSON.stringify(node, null, 2));
        }
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    else {
        f_astNode.props.push({
            name: "typeAnnotation", 
            descr: "process AST-node-property typeAnnotation and append ittfNode to `ret`"
         })
        if (node.typeAnnotation) {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            format(ret, node.typeAnnotation, options)
        }
        if (ret.children.length == 0) {
            if (node.extra && node.extra.parenthesized == true) {
                ret.name = ret.textified = '({})';
            }
            else {
                ret.name = ret.textified = '{}';
            }
        }
        else {
            if (node.extra && node.extra.parenthesized == true) {
                var temp = {
                    tag: '(', 
                    children: [
                        ret
                    ]
                 };
                ret = temp;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ArrayPattern
var ArrayPattern_astNode = {
    name: "ArrayPattern", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ArrayPattern_astNode)
format.ArrayPattern = function(parent, node, options) {
    var f_astNode = ArrayPattern_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrayPattern', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection elements and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "elements", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection elements and append ittfNode(s) to `ret`"
     })
    if (node.elements) {
        if (typeof node.elements.length === 'undefined') {
            throw new Error('Property node.elements must be an array');
        }
        var i, i_items=node.elements, i_len=node.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = node.elements[i];
            item.__parent = {
                name: 'elements', 
                len: node.elements.length
             };
            format(ret, item, options)
        }
    }
    
    // loog '*** ArrayPattern len, textified: ', ret.children.length, ret.textified
    if (setTextList(ret, ', ')) {
        ret.textified = '[' + ret.textified + ']';
    }
    else {
        throw new Error('ArrayPattern must be textual: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node RestElement
var RestElement_astNode = {
    name: "RestElement", 
    ittfTag: "...", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(RestElement_astNode)
format.RestElement = function(parent, node, options) {
    var f_astNode = RestElement_astNode;
    var __isText = false;
    var ret = {
        tag: '...', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'RestElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and append ittfNode to `ret`
    f_astNode.props.push({
        name: "argument", 
        descr: "process AST-node-property argument and append ittfNode to `ret`"
     })
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options)
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeAnnotation", 
        descr: "process AST-node-property typeAnnotation and append ittfNode to `ret`"
     })
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options)
    }
    ret.textified = '...' + ret.name;
    // loog 'RestElement', ret.tag, ret.name, ret.textified
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node AssignmentPattern
var AssignmentPattern_astNode = {
    name: "AssignmentPattern", 
    ittfTag: "node.operator||'='", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(AssignmentPattern_astNode)
format.AssignmentPattern = function(parent, node, options) {
    var f_astNode = AssignmentPattern_astNode;
    var __isText = false;
    var ret = {
        tag: node.operator||'=', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AssignmentPattern', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined' && node.left != null) {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
         };
        if (node.left == null) {
            p_left.text = "null";
        }
        // loog 'f_p_temp left before format'
        // loog 'f_p_temp left after format', p_left.children.length, p_left
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_left, node.left, options)
            var left_comments = extractCommentsIf(p_left, 1);
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                    }
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = [];
                }
            }
            if (left_comments.length > 0) {
                p_left.children = p_left.children.concat(left_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined' && node.right != null) {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
         };
        if (node.right == null) {
            p_right.text = "null";
        }
        // loog 'f_p_temp right before format'
        // loog 'f_p_temp right after format', p_right.children.length, p_right
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_right, node.right, options)
            var right_comments = extractCommentsIf(p_right, 1);
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                    }
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = [];
                }
            }
            if (right_comments.length > 0) {
                p_right.children = p_right.children.concat(right_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'AssignmentPattern.p_left', JSON.stringify(p_left, null, 2)
    // loog 'AssignmentPattern.p_right', JSON.stringify(p_right, null, 2)
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left);
        if (isTextualNode(p_right)) {
            ret.name += ' ' + (node.operator || '=') + ' ' + getNodeText(p_right);
        }
        else {
            ret.children.push({
                tag: node.operator || '=', 
                children: [p_right]
             })
        }
    }
    else {
        ret.children.push(p_left)
        ret.children.push(p_right)
    }
    // loog 'AssignmentPattern', JSON.stringify(ret, null, 2)
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node Class
var Class_astNode = {
    name: "Class", 
    ittfTag: "class", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(Class_astNode)
format.Class = function(parent, node, options) {
    var f_astNode = Class_astNode;
    var __isText = false;
    var ret = {
        tag: 'class', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Class', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "id", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property id and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempid .children.length > 0
            * 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
         };
        format(tempid, node.id, options)
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property superClass and set it in a var
    var p_superClass = null;
    if (typeof(node.superClass) !== 'undefined' && node.superClass != null) {
        p_superClass = {
            textified: null, 
            isText: false, 
            ASTProp: 'superClass', 
            children: [
                
            ]
         };
        if (node.superClass == null) {
            p_superClass.text = "null";
        }
        // loog 'f_p_temp superClass before format'
        // loog 'f_p_temp superClass after format', p_superClass.children.length, p_superClass
        else {
            if (!node.superClass.type) {
                throw 'Node superClass has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_superClass, node.superClass, options)
            var superClass_comments = extractCommentsIf(p_superClass, 1);
            if (p_superClass.children.length == 1) {
                p_superClass.tag = p_superClass.children[0].tag;
                if (!(p_superClass.children[0].isText || p_superClass.children[0].textified)) {
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = p_superClass.children[0].children;
                }
                else {
                    if (p_superClass.children[0].textified) {
                        p_superClass.textified = p_superClass.children[0].textified;
                    }
                    if (p_superClass.children[0].isText) {
                        p_superClass.isText = true;
                    }
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = [];
                }
            }
            if (superClass_comments.length > 0) {
                p_superClass.children = p_superClass.children.concat(superClass_comments);
            }
        }
    }
    if (p_superClass) {
        if (isTextualNode(p_superClass)) {
            ret.children.push({
                tag: 'super', 
                name: getNodeText(p_superClass)
             })
        }
        else {
            throw new Error('Class. superClass must be textual: ' + JSON.stringify(node, null, 2));
        }
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ClassBody
var ClassBody_astNode = {
    name: "ClassBody", 
    ittfTag: "ClassBody", 
    skip: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassBody_astNode)
format.ClassBody = function(parent, node, options) {
    var f_astNode = ClassBody_astNode;
    var __isText = false;
    var ret = parent;
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "body", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection body and append ittfNode(s) to `ret`"
     })
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
}
;
// process AST node ClassMethod
var ClassMethod_astNode = {
    name: "ClassMethod", 
    ittfTag: "node.kind", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassMethod_astNode)
format.ClassMethod = function(parent, node, options) {
    var f_astNode = ClassMethod_astNode;
    var __isText = false;
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    f_astNode.props.push({
        name: "key", 
        tag: "key", 
        descr: "fragment f_p_tag"
     })
    var p_key = {
        textified: null, 
        isText: false, 
        ASTProp: 'key', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property key/key not managed by f_p_tag')
    */
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_key, node.key, options)
        p_key.tag = 'key';
        ret.children.push(p_key)
        
        // loog '*** f_p_tag key children[0].textified', p_key.children[0].textified
        
        // loog '*** f_p_tag key children[0].isText', p_key.children[0].isText
        
        // loog '*** f_p_tag key children[0].name', p_key.children[0].name
        if (p_key.children.length == 1) {
            if (p_key.children[0].textified) {
                p_key.textified = p_key.children[0].textified;
            }
            if (p_key.children[0].isText) {
                p_key.isText = true;
                p_key.name = p_key.children[0].name;
                p_key.children = [];
            }
        }
    }
    // s( kind
    // enum "constructor" | "method" | "get" | "set"
    // b( computed
    // loog 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
         })
    }
    // loog 'node.async', node.async
    if (!!node.async == true) {
        ret.children.push({
            tag: 'async', 
            children: [
                
            ]
         })
    }
    // loog 'node.generator', node.generator
    if (!!node.generator == true) {
        ret.children.push({
            tag: 'generator', 
            children: [
                
            ]
         })
    }
    if (node.accessibility) {
        ret.children.push({
            tag: ':' + node.accessibility, 
            name: '', 
            children: [
                
            ]
         })
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "params", 
        tag: "params", 
        descr: "# process AST-node-property-collection params and embed its array of nodes in a new tag"
     })
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
             };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                 };
                format(tempparams, item, options)
            }
            ret.children.push(tempparams)
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined' && node.returnType != null) {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
         };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        // loog 'f_p_temp returnType before format'
        // loog 'f_p_temp returnType after format', p_returnType.children.length, p_returnType
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_returnType, node.returnType, options)
            var returnType_comments = extractCommentsIf(p_returnType, 1);
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                    }
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = [];
                }
            }
            if (returnType_comments.length > 0) {
                p_returnType.children = p_returnType.children.concat(returnType_comments);
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
         };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = ret.tag == 'constructor' ? 'ctor' : (ret.tag == 'method' ? 'm' : ret.tag);
    setNameFromChildByTag(ret, 'key', true);
    if (ret.tag === 'ctor') {
        ret.name = '';
    }
    else if (node.computed) {
        ret.name = '[' + ret.name + ']';
    }
    /**
        VIA
        replaceChildrenOfChildWhenText(ret, getChildPosByTag(ret, 'params'), 'param')*/
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ClassPrivateMethod
var ClassPrivateMethod_astNode = {
    name: "ClassPrivateMethod", 
    ittfTag: "node.kind", 
    tagIsVar: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassPrivateMethod_astNode)
format.ClassPrivateMethod = function(parent, node, options) {
    var f_astNode = ClassPrivateMethod_astNode;
    var __isText = false;
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassPrivateMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property key and append ittfNode to `ret`
    f_astNode.props.push({
        name: "key", 
        descr: "process AST-node-property key and append ittfNode to `ret`"
     })
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.key, options)
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    // s( kind, "method" | "get" | "set"
    // loog 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
         })
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    f_astNode.props.push({
        name: "params", 
        tag: "params", 
        descr: "# process AST-node-property-collection params and embed its array of nodes in a new tag"
     })
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
             };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                 };
                format(tempparams, item, options)
            }
            ret.children.push(tempparams)
        }
    }
    ret.tag = ret.tag == 'method' ? 'm' : ret.tag;
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined' && node.returnType != null) {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
         };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        // loog 'f_p_temp returnType before format'
        // loog 'f_p_temp returnType after format', p_returnType.children.length, p_returnType
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_returnType, node.returnType, options)
            var returnType_comments = extractCommentsIf(p_returnType, 1);
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                    }
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = [];
                }
            }
            if (returnType_comments.length > 0) {
                p_returnType.children = p_returnType.children.concat(returnType_comments);
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
         };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ClassProperty
var ClassProperty_astNode = {
    name: "ClassProperty", 
    ittfTag: "p", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassProperty_astNode)
format.ClassProperty = function(parent, node, options) {
    var f_astNode = ClassProperty_astNode;
    var __isText = false;
    var ret = {
        tag: 'p', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property key and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "key", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property key and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempkey .children.length > 0
            * 'node.key must result zero node, returned: ' + tempkey.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempkey = {
            children: [
                
            ]
         };
        format(tempkey, node.key, options)
        var appto = false ? parent : ret;
        if (tempkey.children.length > 0) {
            appto.name = tempkey.children[0].name;
        }
        else {
            appto.name = tempkey.name;
        }
    }
    // process AST-node-property value and set it in a var
    var p_value = null;
    if (typeof(node.value) !== 'undefined' && node.value != null) {
        p_value = {
            textified: null, 
            isText: false, 
            ASTProp: 'value', 
            children: [
                
            ]
         };
        if (node.value == null) {
            p_value.text = "null";
        }
        // loog 'f_p_temp value before format'
        // loog 'f_p_temp value after format', p_value.children.length, p_value
        else {
            if (!node.value.type) {
                throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_value, node.value, options)
            var value_comments = extractCommentsIf(p_value, 1);
            if (p_value.children.length == 1) {
                p_value.tag = p_value.children[0].tag;
                if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = p_value.children[0].children;
                }
                else {
                    if (p_value.children[0].textified) {
                        p_value.textified = p_value.children[0].textified;
                    }
                    if (p_value.children[0].isText) {
                        p_value.isText = true;
                    }
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = [];
                }
            }
            if (value_comments.length > 0) {
                p_value.children = p_value.children.concat(value_comments);
            }
        }
    }
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined' && node.typeAnnotation != null) {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
         };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        // loog 'f_p_temp typeAnnotation before format'
        // loog 'f_p_temp typeAnnotation after format', p_typeAnnotation.children.length, p_typeAnnotation
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_typeAnnotation, node.typeAnnotation, options)
            var typeAnnotation_comments = extractCommentsIf(p_typeAnnotation, 1);
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                    }
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = [];
                }
            }
            if (typeAnnotation_comments.length > 0) {
                p_typeAnnotation.children = p_typeAnnotation.children.concat(typeAnnotation_comments);
            }
        }
    }
    if (node.optional) {
        ret.name = ret.name + '?';
    }
    // loog 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
         })
    }
    if (node.readonly) {
        ret.children.push({
            tag: ':readonly', 
            name: '', 
            children: [
                
            ]
         })
    }
    if (node.accessibility) {
        ret.children.push({
            tag: ':' + node.accessibility, 
            name: '', 
            children: [
                
            ]
         })
    }
    if (p_typeAnnotation) {
        ret.children.push(p_typeAnnotation)
    }
    if (node.computed) {
        ret.name = '[' + ret.name + ']';
    }
    else if (p_value && p_value.tag) {
        if (['@id', '@expr', 'literal'].indexOf(p_value.tag) > -1) {
            p_value.tag = '=';
        }
        ret.children.push(p_value)
    }
    // do nothing
    else {
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ClassPrivateProperty
var ClassPrivateProperty_astNode = {
    name: "ClassPrivateProperty", 
    ittfTag: "p", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassPrivateProperty_astNode)
format.ClassPrivateProperty = function(parent, node, options) {
    var f_astNode = ClassPrivateProperty_astNode;
    var __isText = false;
    var ret = {
        tag: 'p', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassPrivateProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property key and append ittfNode to `ret`
    f_astNode.props.push({
        name: "key", 
        descr: "process AST-node-property key and append ittfNode to `ret`"
     })
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.key, options)
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property value and append ittfNode to `ret`
    f_astNode.props.push({
        name: "value", 
        descr: "process AST-node-property value and append ittfNode to `ret`"
     })
    if (node.value) {
        if (!node.value.type) {
            throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.value, options)
    }
    // loog 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
         })
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ClassDeclaration
var ClassDeclaration_astNode = {
    name: "ClassDeclaration", 
    ittfTag: "class", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassDeclaration_astNode)
format.ClassDeclaration = function(parent, node, options) {
    var f_astNode = ClassDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'class', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "id", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property id and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempid .children.length > 0
            * 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
         };
        format(tempid, node.id, options)
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // loog 'node.abstract', node.abstract
    if (!!node.abstract == true) {
        ret.children.push({
            tag: ':abstract', 
            children: [
                
            ]
         })
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    f_astNode.props.push({
        name: "typeParameters", 
        descr: "process AST-node-property typeParameters and append ittfNode to `ret`"
     })
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options)
    }
    // process AST-node-property superClass and set it in a var
    var p_superClass = null;
    if (typeof(node.superClass) !== 'undefined' && node.superClass != null) {
        p_superClass = {
            textified: null, 
            isText: false, 
            ASTProp: 'superClass', 
            children: [
                
            ]
         };
        if (node.superClass == null) {
            p_superClass.text = "null";
        }
        // loog 'f_p_temp superClass before format'
        // loog 'f_p_temp superClass after format', p_superClass.children.length, p_superClass
        else {
            if (!node.superClass.type) {
                throw 'Node superClass has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_superClass, node.superClass, options)
            var superClass_comments = extractCommentsIf(p_superClass, 1);
            if (p_superClass.children.length == 1) {
                p_superClass.tag = p_superClass.children[0].tag;
                if (!(p_superClass.children[0].isText || p_superClass.children[0].textified)) {
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = p_superClass.children[0].children;
                }
                else {
                    if (p_superClass.children[0].textified) {
                        p_superClass.textified = p_superClass.children[0].textified;
                    }
                    if (p_superClass.children[0].isText) {
                        p_superClass.isText = true;
                    }
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = [];
                }
            }
            if (superClass_comments.length > 0) {
                p_superClass.children = p_superClass.children.concat(superClass_comments);
            }
        }
    }
    // process AST-node-property superTypeParameters and set it in a var
    var p_superTypeParameters = null;
    if (typeof(node.superTypeParameters) !== 'undefined' && node.superTypeParameters != null) {
        p_superTypeParameters = {
            textified: null, 
            isText: false, 
            ASTProp: 'superTypeParameters', 
            children: [
                
            ]
         };
        if (node.superTypeParameters == null) {
            p_superTypeParameters.text = "null";
        }
        // loog 'f_p_temp superTypeParameters before format'
        // loog 'f_p_temp superTypeParameters after format', p_superTypeParameters.children.length, p_superTypeParameters
        else {
            if (!node.superTypeParameters.type) {
                throw 'Node superTypeParameters has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_superTypeParameters, node.superTypeParameters, options)
            var superTypeParameters_comments = extractCommentsIf(p_superTypeParameters, 1);
            if (p_superTypeParameters.children.length == 1) {
                p_superTypeParameters.tag = p_superTypeParameters.children[0].tag;
                if (!(p_superTypeParameters.children[0].isText || p_superTypeParameters.children[0].textified)) {
                    p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                    p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    p_superTypeParameters.children = p_superTypeParameters.children[0].children;
                }
                else {
                    if (p_superTypeParameters.children[0].textified) {
                        p_superTypeParameters.textified = p_superTypeParameters.children[0].textified;
                    }
                    if (p_superTypeParameters.children[0].isText) {
                        p_superTypeParameters.isText = true;
                    }
                    p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                    p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    p_superTypeParameters.children = [];
                }
            }
            if (superTypeParameters_comments.length > 0) {
                p_superTypeParameters.children = p_superTypeParameters.children.concat(superTypeParameters_comments);
            }
        }
    }
    var p_super;
    if (p_superClass) {
        if (isTextualNode(p_superClass)) {
            p_super = {
                tag: 'super', 
                name: getNodeText(p_superClass), 
                children: [
                    
                ]
             };
            ret.children.push(p_super)
        }
        
        // OK
        else if (p_superClass.text === 'null') {
        }
        else {
            throw new Error('Class. superClass must be textual: ' + JSON.stringify(node, null, 2));
        }
    }
    if (p_superTypeParameters) {
        if (p_super) {
            var i, i_items=p_superTypeParameters.children, i_len=p_superTypeParameters.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_superTypeParameters.children[i];
                if (item.tag !== ':param') {
                    p_super.children.push({
                        tag: ':param', 
                        name: '', 
                        children: [
                            item
                        ]
                     })
                }
                else {
                    p_super.children.push(item)
                }
            }
        }
        else {
            p_superTypeParameters.tag = ':super-type-params';
            ret.children.push(p_superTypeParameters)
        }
    }
    // process AST-node-property-collection implements and
    // embed its array of nodes in a temp var
    if (node.implements) {
        if (typeof node.implements.length === 'undefined') {
            throw new Error('Property node.implements must be an array');
        }
        var p_implements = {
            tag: 'false', 
            children: [
                
            ]
         };
        var i, i_items=node.implements, i_len=node.implements.length, item;
        for (i=0; i<i_len; i++) {
            item = node.implements[i];
            item.__parent = {
                name: 'implements', 
                len: node.implements.length
             };
            format(p_implements, item, options)
        }
    }
    if (p_implements) {
        var i, i_items=p_implements.children, i_len=p_implements.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_implements.children[i];
            item.tag = ':implements';
            ret.children.push(item)
        }
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "decorators", 
        throwIfUndefined: false, 
        descr: "process AST-node-property-collection decorators and append ittfNode(s) to `ret`"
     })
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
             };
            format(ret, item, options)
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
         };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ClassExpression
var ClassExpression_astNode = {
    name: "ClassExpression", 
    ittfTag: "class", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ClassExpression_astNode)
format.ClassExpression = function(parent, node, options) {
    var f_astNode = ClassExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'class', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "id", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property id and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempid .children.length > 0
            * 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
         };
        format(tempid, node.id, options)
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property superClass and set it in a var
    var p_superClass = null;
    if (typeof(node.superClass) !== 'undefined' && node.superClass != null) {
        p_superClass = {
            textified: null, 
            isText: false, 
            ASTProp: 'superClass', 
            children: [
                
            ]
         };
        if (node.superClass == null) {
            p_superClass.text = "null";
        }
        // loog 'f_p_temp superClass before format'
        // loog 'f_p_temp superClass after format', p_superClass.children.length, p_superClass
        else {
            if (!node.superClass.type) {
                throw 'Node superClass has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_superClass, node.superClass, options)
            var superClass_comments = extractCommentsIf(p_superClass, 1);
            if (p_superClass.children.length == 1) {
                p_superClass.tag = p_superClass.children[0].tag;
                if (!(p_superClass.children[0].isText || p_superClass.children[0].textified)) {
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = p_superClass.children[0].children;
                }
                else {
                    if (p_superClass.children[0].textified) {
                        p_superClass.textified = p_superClass.children[0].textified;
                    }
                    if (p_superClass.children[0].isText) {
                        p_superClass.isText = true;
                    }
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = [];
                }
            }
            if (superClass_comments.length > 0) {
                p_superClass.children = p_superClass.children.concat(superClass_comments);
            }
        }
    }
    // process AST-node-property superTypeParameters and set it in a var
    var p_superTypeParameters = null;
    if (typeof(node.superTypeParameters) !== 'undefined' && node.superTypeParameters != null) {
        p_superTypeParameters = {
            textified: null, 
            isText: false, 
            ASTProp: 'superTypeParameters', 
            children: [
                
            ]
         };
        if (node.superTypeParameters == null) {
            p_superTypeParameters.text = "null";
        }
        // loog 'f_p_temp superTypeParameters before format'
        // loog 'f_p_temp superTypeParameters after format', p_superTypeParameters.children.length, p_superTypeParameters
        else {
            if (!node.superTypeParameters.type) {
                throw 'Node superTypeParameters has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_superTypeParameters, node.superTypeParameters, options)
            var superTypeParameters_comments = extractCommentsIf(p_superTypeParameters, 1);
            if (p_superTypeParameters.children.length == 1) {
                p_superTypeParameters.tag = p_superTypeParameters.children[0].tag;
                if (!(p_superTypeParameters.children[0].isText || p_superTypeParameters.children[0].textified)) {
                    p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                    p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    p_superTypeParameters.children = p_superTypeParameters.children[0].children;
                }
                else {
                    if (p_superTypeParameters.children[0].textified) {
                        p_superTypeParameters.textified = p_superTypeParameters.children[0].textified;
                    }
                    if (p_superTypeParameters.children[0].isText) {
                        p_superTypeParameters.isText = true;
                    }
                    p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                    p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    p_superTypeParameters.children = [];
                }
            }
            if (superTypeParameters_comments.length > 0) {
                p_superTypeParameters.children = p_superTypeParameters.children.concat(superTypeParameters_comments);
            }
        }
    }
    if (p_superClass) {
        
        // loog 'p_superTypeParameters', p_superTypeParameters
        if (isTextualNode(p_superClass)) {
            var superchildren = p_superTypeParameters ? p_superTypeParameters.children : [];
            ret.children.push({
                tag: 'super', 
                name: getNodeText(p_superClass), 
                children: superchildren
             })
        }
        else {
            throw new Error('Class. superClass must be textual: ' + JSON.stringify(node, null, 2));
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    f_astNode.props.push({
        name: "body", 
        descr: "process AST-node-property body and append ittfNode to `ret`"
     })
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options)
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node MetaProperty
var MetaProperty_astNode = {
    name: "MetaProperty", 
    ittfTag: "meta", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(MetaProperty_astNode)
format.MetaProperty = function(parent, node, options) {
    var f_astNode = MetaProperty_astNode;
    var __isText = false;
    var ret = {
        tag: 'meta', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'MetaProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property meta and append ittfNode to `ret`
    f_astNode.props.push({
        name: "meta", 
        descr: "process AST-node-property meta and append ittfNode to `ret`"
     })
    if (node.meta) {
        if (!node.meta.type) {
            throw 'Node meta has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.meta, options)
    }
    else {
        throw new Error('AST-node-property meta undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property property and append ittfNode to `ret`
    f_astNode.props.push({
        name: "property", 
        descr: "process AST-node-property property and append ittfNode to `ret`"
     })
    if (node.property) {
        if (!node.property.type) {
            throw 'Node property has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.property, options)
    }
    else {
        throw new Error('AST-node-property property undefined: ' + JSON.stringify(node, null, 2));
    }
    var got_text_2 = false;
    if (isChildrenCount(ret, 2)) {
        if ((ret.children[0].textified || ret.children[0].isText) && (ret.children[1].textified || ret.children[1].isText)) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            var c2 = ret.children[1].textified || ret.children[1].name;
            ret.name = c1 + '.' + c2;
            ret.textified = ret.name;
            ret.children = [];
            got_text_2 = true;
            got_text_2 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ModuleDeclaration
var ModuleDeclaration_astNode = {
    name: "ModuleDeclaration", 
    ittfTag: "module", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ModuleDeclaration_astNode)
format.ModuleDeclaration = function(parent, node, options) {
    var f_astNode = ModuleDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'module', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ModuleDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // A module `import` or `export` declaration.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ImportDeclaration
var ImportDeclaration_astNode = {
    name: "ImportDeclaration", 
    ittfTag: "import", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ImportDeclaration_astNode)
format.ImportDeclaration = function(parent, node, options) {
    var f_astNode = ImportDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'import', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection specifiers and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "specifiers", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection specifiers and append ittfNode(s) to `ret`"
     })
    if (node.specifiers) {
        if (typeof node.specifiers.length === 'undefined') {
            throw new Error('Property node.specifiers must be an array');
        }
        var i, i_items=node.specifiers, i_len=node.specifiers.length, item;
        for (i=0; i<i_len; i++) {
            item = node.specifiers[i];
            item.__parent = {
                name: 'specifiers', 
                len: node.specifiers.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection specifiers undefined: ' + JSON.stringify(node, null, 2));
    }
    f_astNode.props.push({
        name: "source", 
        tag: "from", 
        descr: "fragment f_p_tag"
     })
    var p_source = {
        textified: null, 
        isText: false, 
        ASTProp: 'source', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property source/from not managed by f_p_tag')
    */
    if (node.source) {
        if (!node.source.type) {
            throw 'Node source has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_source, node.source, options)
        p_source.tag = 'from';
        ret.children.push(p_source)
        
        // loog '*** f_p_tag source children[0].textified', p_source.children[0].textified
        
        // loog '*** f_p_tag source children[0].isText', p_source.children[0].isText
        
        // loog '*** f_p_tag source children[0].name', p_source.children[0].name
        if (p_source.children.length == 1) {
            if (p_source.children[0].textified) {
                p_source.textified = p_source.children[0].textified;
            }
            if (p_source.children[0].isText) {
                p_source.isText = true;
                p_source.name = p_source.children[0].name;
                p_source.children = [];
            }
        }
    }
    // An import declaration, e.g., `import foo from "mod"`.
    //
    var xdefault = getChildByTag(ret, 'default');
    if (xdefault) {
        ret.name = xdefault.name;
        removeChildByTag(ret, 'default');
    }
    if (ret.children.length == 1 && ret.children[0].tag === 'from') {
        if (ret.name && ret.name.length > 0) {
            ret.name += ' from';
        }
        ret.name += ' '	+ ret.children[0].name;
        removeChildByTag(ret, 'from');
    }
    if (node.importKind === 'type') {
        ret.tag = ':import-type';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ImportSpecifier
var ImportSpecifier_astNode = {
    name: "ImportSpecifier", 
    ittfTag: "@", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ImportSpecifier_astNode)
format.ImportSpecifier = function(parent, node, options) {
    var f_astNode = ImportSpecifier_astNode;
    var __isText = false;
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property local and append ittfNode to `ret`
    f_astNode.props.push({
        name: "local", 
        descr: "process AST-node-property local and append ittfNode to `ret`"
     })
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.local, options)
    }
    else {
        throw new Error('AST-node-property local undefined: ' + JSON.stringify(node, null, 2));
    }
    // Process AST-node-property imported and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "imported", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property imported and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * tempimported .children.length > 0
            * 'node.imported must result zero node, returned: ' + tempimported.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.imported) {
        if (!node.imported.type) {
            throw 'Node imported has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempimported = {
            children: [
                
            ]
         };
        format(tempimported, node.imported, options)
        var appto = false ? parent : ret;
        if (tempimported.children.length > 0) {
            appto.name = tempimported.children[0].name;
        }
        else {
            appto.name = tempimported.name;
        }
    }
    // f_p( local, true, Identifier
    // An imported variable binding, e.g., `{foo}` in `import {foo} from "mod"` or `{foo as bar}` in `import {foo as bar} from "mod"`.
    // The `imported` field refers to the name of the export imported from the module.
    // The `local` field refers to the binding imported into the local module scope.
    // If it is a basic named import, such as in `import {foo} from "mod"`, both `imported` and `local` are equivalent `Identifier` nodes in this case an `Identifier` node representing `foo`.
    // If it is an aliased import, such as in `import {foo as bar} from "mod"`, the `imported` field is an `Identifier` node representing `foo`,
    // and the `local` field is an `Identifier` node representing `bar`.
    if (ret.children[0].name !== ret.name) {
        ret.children[0].tag = 'as';
    }
    else {
        ret.children = [];
    }
    if (node.importKind === 'type') {
        ret.tag = ':type';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ImportDefaultSpecifier
var ImportDefaultSpecifier_astNode = {
    name: "ImportDefaultSpecifier", 
    ittfTag: "default", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ImportDefaultSpecifier_astNode)
format.ImportDefaultSpecifier = function(parent, node, options) {
    var f_astNode = ImportDefaultSpecifier_astNode;
    var __isText = false;
    var ret = {
        tag: 'default', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportDefaultSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // Process AST-node-property local and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "local", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property local and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * templocal .children.length > 0
            * 'node.local must result zero node, returned: ' + templocal.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        var templocal = {
            children: [
                
            ]
         };
        format(templocal, node.local, options)
        var appto = false ? parent : ret;
        if (templocal.children.length > 0) {
            appto.name = templocal.children[0].name;
        }
        else {
            appto.name = templocal.name;
        }
    }
    // A default import specifier, e.g., `foo` in `import foo from "mod.js"`.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ImportNamespaceSpecifier
var ImportNamespaceSpecifier_astNode = {
    name: "ImportNamespaceSpecifier", 
    ittfTag: "as", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ImportNamespaceSpecifier_astNode)
format.ImportNamespaceSpecifier = function(parent, node, options) {
    var f_astNode = ImportNamespaceSpecifier_astNode;
    var __isText = false;
    var ret = {
        tag: 'as', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportNamespaceSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property local and append ittfNode to `ret`
    f_astNode.props.push({
        name: "local", 
        descr: "process AST-node-property local and append ittfNode to `ret`"
     })
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.local, options)
    }
    else {
        throw new Error('AST-node-property local undefined: ' + JSON.stringify(node, null, 2));
    }
    // A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js"`.
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExportNamedDeclaration
var ExportNamedDeclaration_astNode = {
    name: "ExportNamedDeclaration", 
    ittfTag: "export", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExportNamedDeclaration_astNode)
format.ExportNamedDeclaration = function(parent, node, options) {
    var f_astNode = ExportNamedDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'export', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportNamedDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property declaration and append ittfNode to `ret`
    f_astNode.props.push({
        name: "declaration", 
        descr: "process AST-node-property declaration and append ittfNode to `ret`"
     })
    if (node.declaration) {
        if (!node.declaration.type) {
            throw 'Node declaration has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.declaration, options)
    }
    // process AST-node-property-collection specifiers and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "specifiers", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection specifiers and append ittfNode(s) to `ret`"
     })
    if (node.specifiers) {
        if (typeof node.specifiers.length === 'undefined') {
            throw new Error('Property node.specifiers must be an array');
        }
        var i, i_items=node.specifiers, i_len=node.specifiers.length, item;
        for (i=0; i<i_len; i++) {
            item = node.specifiers[i];
            item.__parent = {
                name: 'specifiers', 
                len: node.specifiers.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection specifiers undefined: ' + JSON.stringify(node, null, 2));
    }
    f_astNode.props.push({
        name: "source", 
        tag: "from", 
        descr: "fragment f_p_tag"
     })
    var p_source = {
        textified: null, 
        isText: false, 
        ASTProp: 'source', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property source/from not managed by f_p_tag')
    */
    if (node.source) {
        if (!node.source.type) {
            throw 'Node source has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_source, node.source, options)
        p_source.tag = 'from';
        ret.children.push(p_source)
        
        // loog '*** f_p_tag source children[0].textified', p_source.children[0].textified
        
        // loog '*** f_p_tag source children[0].isText', p_source.children[0].isText
        
        // loog '*** f_p_tag source children[0].name', p_source.children[0].name
        if (p_source.children.length == 1) {
            if (p_source.children[0].textified) {
                p_source.textified = p_source.children[0].textified;
            }
            if (p_source.children[0].isText) {
                p_source.isText = true;
                p_source.name = p_source.children[0].name;
                p_source.children = [];
            }
        }
    }
    var xdefault = getChildByTag(ret, 'default');
    if (xdefault) {
        ret.name = xdefault.name;
        removeChildByTag(ret, 'default');
    }
    // An export named declaration, e.g., `export {foo, bar}`, `export {foo} from "mod"`, `export var foo = 1` or `export * as foo from "bar"`.
    // _Note, Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state._
    
    // VIA 18/03/21 set ret.tag = ':export-type'
    if (node.exportKind === 'type') {
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExportSpecifier
var ExportSpecifier_astNode = {
    name: "ExportSpecifier", 
    ittfTag: "@", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExportSpecifier_astNode)
format.ExportSpecifier = function(parent, node, options) {
    var f_astNode = ExportSpecifier_astNode;
    var __isText = false;
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property exported and append ittfNode to `ret`
    f_astNode.props.push({
        name: "exported", 
        descr: "process AST-node-property exported and append ittfNode to `ret`"
     })
    if (node.exported) {
        if (!node.exported.type) {
            throw 'Node exported has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.exported, options)
    }
    else {
        throw new Error('AST-node-property exported undefined: ' + JSON.stringify(node, null, 2));
    }
    // Process AST-node-property local and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    f_astNode.props.push({
        name: "local", 
        onParent: false, 
        iftext: false, 
        descr: "Process AST-node-property local and set the resulting node.name on : ret || parent (cmd: onparent) used mainly for Identifier(s)"
     })
    
    /**
        * templocal .children.length > 0
            * 'node.local must result zero node, returned: ' + templocal.children.length + ' source: ' + options.input.substring(node.start, node.end)
    */
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        var templocal = {
            children: [
                
            ]
         };
        format(templocal, node.local, options)
        var appto = false ? parent : ret;
        if (templocal.children.length > 0) {
            appto.name = templocal.children[0].name;
        }
        else {
            appto.name = templocal.name;
        }
    }
    // An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`. The `exported` field refers to the name exported in the module.
    // The `local` field refers to the binding into the local module scope. If it is a basic named export, such as in `export {foo}`, both `exported` and `local` are equivalent `Identifier` nodes
    // in this case an `Identifier` node representing `foo`.
    // If it is an aliased export, such as in `export {bar as foo}`, the `exported` field is an `Identifier` node representing `foo`,
    // and the `local` field is an `Identifier` node representing `bar`.
    if (ret.children[0].name !== ret.name) {
        ret.children[0].tag = 'as';
    }
    else {
        ret.children = [];
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExportDefaultSpecifier
var ExportDefaultSpecifier_astNode = {
    name: "ExportDefaultSpecifier", 
    ittfTag: "default", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExportDefaultSpecifier_astNode)
format.ExportDefaultSpecifier = function(parent, node, options) {
    var f_astNode = ExportDefaultSpecifier_astNode;
    var __isText = false;
    var ret = {
        tag: 'default', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportDefaultSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property exported and set it in a var
    var p_exported = null;
    if (typeof(node.exported) !== 'undefined' && node.exported != null) {
        p_exported = {
            textified: null, 
            isText: false, 
            ASTProp: 'exported', 
            children: [
                
            ]
         };
        if (node.exported == null) {
            p_exported.text = "null";
        }
        // loog 'f_p_temp exported before format'
        // loog 'f_p_temp exported after format', p_exported.children.length, p_exported
        else {
            if (!node.exported.type) {
                throw 'Node exported has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_exported, node.exported, options)
            var exported_comments = extractCommentsIf(p_exported, 1);
            if (p_exported.children.length == 1) {
                p_exported.tag = p_exported.children[0].tag;
                if (!(p_exported.children[0].isText || p_exported.children[0].textified)) {
                    p_exported.name = p_exported.children[0].name;
                    p_exported.source = p_exported.children[0].source;
                    p_exported.children = p_exported.children[0].children;
                }
                else {
                    if (p_exported.children[0].textified) {
                        p_exported.textified = p_exported.children[0].textified;
                    }
                    if (p_exported.children[0].isText) {
                        p_exported.isText = true;
                    }
                    p_exported.name = p_exported.children[0].name;
                    p_exported.source = p_exported.children[0].source;
                    p_exported.children = [];
                }
            }
            if (exported_comments.length > 0) {
                p_exported.children = p_exported.children.concat(exported_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property exported undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_exported)) {
        ret.name = getNodeText(p_exported);
    }
    else {
        ret.children.push(p_exported)
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExportDefaultDeclaration
var ExportDefaultDeclaration_astNode = {
    name: "ExportDefaultDeclaration", 
    ittfTag: "export-default", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExportDefaultDeclaration_astNode)
format.ExportDefaultDeclaration = function(parent, node, options) {
    var f_astNode = ExportDefaultDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'export-default', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportDefaultDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // An export default declaration, e.g., `export default function () {}` or `export default 1`.
    // process AST-node-property declaration and set it in a var
    var p_declaration = null;
    if (typeof(node.declaration) !== 'undefined' && node.declaration != null) {
        p_declaration = {
            textified: null, 
            isText: false, 
            ASTProp: 'declaration', 
            children: [
                
            ]
         };
        if (node.declaration == null) {
            p_declaration.text = "null";
        }
        // loog 'f_p_temp declaration before format'
        // loog 'f_p_temp declaration after format', p_declaration.children.length, p_declaration
        else {
            if (!node.declaration.type) {
                throw 'Node declaration has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_declaration, node.declaration, options)
            var declaration_comments = extractCommentsIf(p_declaration, 1);
            if (p_declaration.children.length == 1) {
                p_declaration.tag = p_declaration.children[0].tag;
                if (!(p_declaration.children[0].isText || p_declaration.children[0].textified)) {
                    p_declaration.name = p_declaration.children[0].name;
                    p_declaration.source = p_declaration.children[0].source;
                    p_declaration.children = p_declaration.children[0].children;
                }
                else {
                    if (p_declaration.children[0].textified) {
                        p_declaration.textified = p_declaration.children[0].textified;
                    }
                    if (p_declaration.children[0].isText) {
                        p_declaration.isText = true;
                    }
                    p_declaration.name = p_declaration.children[0].name;
                    p_declaration.source = p_declaration.children[0].source;
                    p_declaration.children = [];
                }
            }
            if (declaration_comments.length > 0) {
                p_declaration.children = p_declaration.children.concat(declaration_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property declaration undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_declaration)) {
        ret.name = getNodeText(p_declaration);
    }
    else {
        ret.children.push(p_declaration)
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExportNamespaceSpecifier
var ExportNamespaceSpecifier_astNode = {
    name: "ExportNamespaceSpecifier", 
    ittfTag: "as", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExportNamespaceSpecifier_astNode)
format.ExportNamespaceSpecifier = function(parent, node, options) {
    var f_astNode = ExportNamespaceSpecifier_astNode;
    var __isText = false;
    var ret = {
        tag: 'as', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportNamespaceSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property exported and set it in a var
    var p_exported = null;
    if (typeof(node.exported) !== 'undefined' && node.exported != null) {
        p_exported = {
            textified: null, 
            isText: false, 
            ASTProp: 'exported', 
            children: [
                
            ]
         };
        if (node.exported == null) {
            p_exported.text = "null";
        }
        // loog 'f_p_temp exported before format'
        // loog 'f_p_temp exported after format', p_exported.children.length, p_exported
        else {
            if (!node.exported.type) {
                throw 'Node exported has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_exported, node.exported, options)
            var exported_comments = extractCommentsIf(p_exported, 1);
            if (p_exported.children.length == 1) {
                p_exported.tag = p_exported.children[0].tag;
                if (!(p_exported.children[0].isText || p_exported.children[0].textified)) {
                    p_exported.name = p_exported.children[0].name;
                    p_exported.source = p_exported.children[0].source;
                    p_exported.children = p_exported.children[0].children;
                }
                else {
                    if (p_exported.children[0].textified) {
                        p_exported.textified = p_exported.children[0].textified;
                    }
                    if (p_exported.children[0].isText) {
                        p_exported.isText = true;
                    }
                    p_exported.name = p_exported.children[0].name;
                    p_exported.source = p_exported.children[0].source;
                    p_exported.children = [];
                }
            }
            if (exported_comments.length > 0) {
                p_exported.children = p_exported.children.concat(exported_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property exported undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_exported)) {
        ret.name = getNodeText(p_exported);
    }
    else {
        ret.children.push(p_exported)
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node ExportAllDeclaration
var ExportAllDeclaration_astNode = {
    name: "ExportAllDeclaration", 
    ittfTag: "export", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(ExportAllDeclaration_astNode)
format.ExportAllDeclaration = function(parent, node, options) {
    var f_astNode = ExportAllDeclaration_astNode;
    var __isText = false;
    var ret = {
        tag: 'export', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportAllDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = '*';
    f_astNode.props.push({
        name: "source", 
        tag: "from", 
        descr: "fragment f_p_tag"
     })
    var p_source = {
        textified: null, 
        isText: false, 
        ASTProp: 'source', 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property source/from not managed by f_p_tag')
    */
    if (node.source) {
        if (!node.source.type) {
            throw 'Node source has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_source, node.source, options)
        p_source.tag = 'from';
        ret.children.push(p_source)
        
        // loog '*** f_p_tag source children[0].textified', p_source.children[0].textified
        
        // loog '*** f_p_tag source children[0].isText', p_source.children[0].isText
        
        // loog '*** f_p_tag source children[0].name', p_source.children[0].name
        if (p_source.children.length == 1) {
            if (p_source.children[0].textified) {
                p_source.textified = p_source.children[0].textified;
            }
            if (p_source.children[0].isText) {
                p_source.isText = true;
                p_source.name = p_source.children[0].name;
                p_source.children = [];
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node CommentBlock
var CommentBlock_astNode = {
    name: "CommentBlock", 
    ittfTag: "#", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(CommentBlock_astNode)
format.CommentBlock = function(parent, node, options) {
    var f_astNode = CommentBlock_astNode;
    var __isText = false;
    var ret = {
        tag: '#', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CommentBlock', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    var values = verify.replaceAll(node.value, '\r\n', '\n').split('\n');
    // loog 'options.replaceds', options.replaceds
    var i, i_items=values, i_len=values.length, value;
    for (i=0; i<i_len; i++) {
        value = values[i];
        // var v = codeReplacer.restore(value, options.replaceds)
        ret.children.push({
            tag: '#', 
            name: value, 
            children: [
                
            ]
         })
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node CommentLine
var CommentLine_astNode = {
    name: "CommentLine", 
    ittfTag: "#", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(CommentLine_astNode)
format.CommentLine = function(parent, node, options) {
    var f_astNode = CommentLine_astNode;
    var __isText = false;
    var ret = {
        tag: '#', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CommentLine', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 'options.replaceds', options.replaceds
    // var v = codeReplacer.restore(node.value, options.replaceds)
    ret.name = node.value;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXAttribute
var JSXAttribute_astNode = {
    name: "JSXAttribute", 
    ittfTag: "@", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXAttribute_astNode)
format.JSXAttribute = function(parent, node, options) {
    var f_astNode = JSXAttribute_astNode;
    var __isText = false;
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXAttribute', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    options.stateAST.push('JSXAttribute')
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (typeof(node.name) !== 'undefined' && node.name != null) {
        p_name = {
            textified: null, 
            isText: false, 
            ASTProp: 'name', 
            children: [
                
            ]
         };
        if (node.name == null) {
            p_name.text = "null";
        }
        // loog 'f_p_temp name before format'
        // loog 'f_p_temp name after format', p_name.children.length, p_name
        else {
            if (!node.name.type) {
                throw 'Node name has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_name, node.name, options)
            var name_comments = extractCommentsIf(p_name, 1);
            if (p_name.children.length == 1) {
                p_name.tag = p_name.children[0].tag;
                if (!(p_name.children[0].isText || p_name.children[0].textified)) {
                    p_name.name = p_name.children[0].name;
                    p_name.source = p_name.children[0].source;
                    p_name.children = p_name.children[0].children;
                }
                else {
                    if (p_name.children[0].textified) {
                        p_name.textified = p_name.children[0].textified;
                    }
                    if (p_name.children[0].isText) {
                        p_name.isText = true;
                    }
                    p_name.name = p_name.children[0].name;
                    p_name.source = p_name.children[0].source;
                    p_name.children = [];
                }
            }
            if (name_comments.length > 0) {
                p_name.children = p_name.children.concat(name_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property value and set it in a var
    var p_value = null;
    if (typeof(node.value) !== 'undefined' && node.value != null) {
        p_value = {
            textified: null, 
            isText: false, 
            ASTProp: 'value', 
            children: [
                
            ]
         };
        if (node.value == null) {
            p_value.text = "null";
        }
        // loog 'f_p_temp value before format'
        // loog 'f_p_temp value after format', p_value.children.length, p_value
        else {
            if (!node.value.type) {
                throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_value, node.value, options)
            var value_comments = extractCommentsIf(p_value, 1);
            if (p_value.children.length == 1) {
                p_value.tag = p_value.children[0].tag;
                if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = p_value.children[0].children;
                }
                else {
                    if (p_value.children[0].textified) {
                        p_value.textified = p_value.children[0].textified;
                    }
                    if (p_value.children[0].isText) {
                        p_value.isText = true;
                    }
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = [];
                }
            }
            if (value_comments.length > 0) {
                p_value.children = p_value.children.concat(value_comments);
            }
        }
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        throw new Error('JSXAttribute.name must be textual:' + JSON.stringify(node, null, 2));
    }
    // loog 'JSXAttribute.p_value', p_value, isTextualNode(p_value)
    if (p_value) {
        if (isTextualNode(p_value)) {
            ret.name += ' ' + getNodeText(p_value);
        }
        else if (p_value != null && p_value.text !== 'null') {
            ret.children.push(p_value)
        }
    }
    options.stateAST.pop();
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXClosingElement
var JSXClosingElement_astNode = {
    name: "JSXClosingElement", 
    ittfTag: "jsx-close", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXClosingElement_astNode)
format.JSXClosingElement = function(parent, node, options) {
    var f_astNode = JSXClosingElement_astNode;
    var __isText = false;
    var ret = {
        tag: 'jsx-close', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXClosingElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // name JSXIdentifier | JSXMemberExpression
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXElement
var JSXElement_astNode = {
    name: "JSXElement", 
    ittfTag: "jsx-element", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXElement_astNode)
format.JSXElement = function(parent, node, options) {
    var f_astNode = JSXElement_astNode;
    var __isText = false;
    var ret = {
        tag: 'jsx-element', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property openingElement and set it in a var
    var p_openingElement = null;
    if (typeof(node.openingElement) !== 'undefined' && node.openingElement != null) {
        p_openingElement = {
            textified: null, 
            isText: false, 
            ASTProp: 'openingElement', 
            children: [
                
            ]
         };
        if (node.openingElement == null) {
            p_openingElement.text = "null";
        }
        // loog 'f_p_temp openingElement before format'
        // loog 'f_p_temp openingElement after format', p_openingElement.children.length, p_openingElement
        else {
            if (!node.openingElement.type) {
                throw 'Node openingElement has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_openingElement, node.openingElement, options)
            var openingElement_comments = extractCommentsIf(p_openingElement, 1);
            if (p_openingElement.children.length == 1) {
                p_openingElement.tag = p_openingElement.children[0].tag;
                if (!(p_openingElement.children[0].isText || p_openingElement.children[0].textified)) {
                    p_openingElement.name = p_openingElement.children[0].name;
                    p_openingElement.source = p_openingElement.children[0].source;
                    p_openingElement.children = p_openingElement.children[0].children;
                }
                else {
                    if (p_openingElement.children[0].textified) {
                        p_openingElement.textified = p_openingElement.children[0].textified;
                    }
                    if (p_openingElement.children[0].isText) {
                        p_openingElement.isText = true;
                    }
                    p_openingElement.name = p_openingElement.children[0].name;
                    p_openingElement.source = p_openingElement.children[0].source;
                    p_openingElement.children = [];
                }
            }
            if (openingElement_comments.length > 0) {
                p_openingElement.children = p_openingElement.children.concat(openingElement_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property openingElement undefined: ' + JSON.stringify(node, null, 2));
    }
    // f_p( closingElement, true, JSXClosingElement
    // process AST-node-property-collection children and
    // embed its array of nodes in a temp var
    if (node.children) {
        if (typeof node.children.length === 'undefined') {
            throw new Error('Property node.children must be an array');
        }
        var p_children = {
            tag: 'true', 
            children: [
                
            ]
         };
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            item.__parent = {
                name: 'children', 
                len: node.children.length
             };
            format(p_children, item, options)
        }
    }
    // loog 'p_openingElement', p_openingElement
    // loog 'p_children', p_children
    if (p_openingElement.name && p_openingElement.name.length > 0) {
        var char = p_openingElement.name[0];
        if (char == char.toUpperCase() || html_supported_tags.indexOf(p_openingElement.name) < 0) {
            ret.tag = '< ' + p_openingElement.name;
        }
        else {
            ret.tag = p_openingElement.name;
        }
        ret.children = p_openingElement.children;
    }
    else {
        ret.tag = '<';
        ret.children = p_openingElement.children;
    }
    // loog 'JSXElement.ret', ret
    var isStyle = ret.tag === 'style';
    var i, i_items=p_children.children, i_len=p_children.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_children.children[i];
        // loog 'JSXElement.children.item', item
        if (!(item.tag === '+' && item.name.trim().length == 0)) {
            
            // loog 'isStyle', isStyle, item.children
            if (isStyle) {
                var j, j_items=item.children, j_len=item.children.length, c;
                for (j=0; j<j_len; j++) {
                    c = item.children[j];
                    
                    // loog 'JSXElement.children.item.lit', c, getLiteral(c)
                    if (c.tag === '`lit') {
                        ret.tag = "style-jsx";
                        options.wizziIncludes.push({
                            kind: 'css', 
                            node: ret, 
                            literal: getLiteral(c)
                         })
                    }
                }
                if (ret.tag !== "style-jsx") {
                    ret.children.push(item)
                }
            }
            else {
                ret.children.push(item)
            }
        }
    }
    if (ret.tag === "style-jsx") {
        var children = ret.children;
        ret.children = [];
        var i, i_items=children, i_len=children.length, item;
        for (i=0; i<i_len; i++) {
            item = children[i];
            if (item.tag === '{') {
            }
            else if (item.tag === '@' && item.name === 'jsx') {
            }
            else if (item.tag === '@' && item.name === 'global') {
                ret.children.push({
                    tag: 'global', 
                    children: [
                        
                    ]
                 })
            }
            else {
                ret.children.push(item)
            }
        }
    }
    else if (["style","title"].indexOf(ret.tag) > -1) {
        ret.name = ret.tag;
        ret.tag = '<';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXEmptyExpression
var JSXEmptyExpression_astNode = {
    name: "JSXEmptyExpression", 
    ittfTag: "JSXEmptyExpression", 
    skip: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXEmptyExpression_astNode)
format.JSXEmptyExpression = function(parent, node, options) {
    var f_astNode = JSXEmptyExpression_astNode;
    var __isText = false;
    var ret = parent;
    // process AST-node-property-collection innerComments and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "innerComments", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection innerComments and append ittfNode(s) to `ret`"
     })
    if (node.innerComments) {
        if (typeof node.innerComments.length === 'undefined') {
            throw new Error('Property node.innerComments must be an array');
        }
        var i, i_items=node.innerComments, i_len=node.innerComments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.innerComments[i];
            item.__parent = {
                name: 'innerComments', 
                len: node.innerComments.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection innerComments undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
}
;
// process AST node JSXExpressionContainer
var JSXExpressionContainer_astNode = {
    name: "JSXExpressionContainer", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXExpressionContainer_astNode)
format.JSXExpressionContainer = function(parent, node, options) {
    var f_astNode = JSXExpressionContainer_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXExpressionContainer', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    /**
        options.stateAST.push('JSXExpressionContainer')*/
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined' && node.expression != null) {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
         };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        // loog 'f_p_temp expression before format'
        // loog 'f_p_temp expression after format', p_expression.children.length, p_expression
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_expression, node.expression, options)
            var expression_comments = extractCommentsIf(p_expression, 1);
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                    }
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = [];
                }
            }
            if (expression_comments.length > 0) {
                p_expression.children = p_expression.children.concat(expression_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'JSXExpressionContainer.p_expression', p_expression, isTextualNode(p_expression)
    if (isTextualNode(p_expression)) {
        ret.tag = '+';
        ret.name = '{' + getNodeText(p_expression) + '}';
        ret.textified = ret.name;
    }
    // loog 'JSXExpressionContainer.options.stateAST', options.stateAST
    // loog 'JSXExpressionContainer.options.p_expression', p_expression
    // loog 'options.stateAST[options.stateAST.length-1]', options.stateAST[options.stateAST.length-1]
    else {
        p_expression.textified = null;
        if (options.stateAST[options.stateAST.length-1] === 'JSXAttribute') {
            var __skip = true;
            parent.children.push(p_expression)
        }
        else {
            ret.tag = '{';
            ret.children.push(p_expression)
        }
    }
    /**
        options.stateAST.pop()*/
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXSpreadChild
var JSXSpreadChild_astNode = {
    name: "JSXSpreadChild", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXSpreadChild_astNode)
format.JSXSpreadChild = function(parent, node, options) {
    var f_astNode = JSXSpreadChild_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXSpreadChild', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined' && node.expression != null) {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
         };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        // loog 'f_p_temp expression before format'
        // loog 'f_p_temp expression after format', p_expression.children.length, p_expression
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_expression, node.expression, options)
            var expression_comments = extractCommentsIf(p_expression, 1);
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                    }
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = [];
                }
            }
            if (expression_comments.length > 0) {
                p_expression.children = p_expression.children.concat(expression_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = p_expression.tag;
    ret.name = '...' + p_expression.name;
    ret.children = p_expression.children;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXIdentifier
var JSXIdentifier_astNode = {
    name: "JSXIdentifier", 
    ittfTag: "jsx-ident", 
    isText: true, 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXIdentifier_astNode)
format.JSXIdentifier = function(parent, node, options) {
    var f_astNode = JSXIdentifier_astNode;
    var __isText = true;
    var ret = {
        tag: 'jsx-ident', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'JSXIdentifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/name.node.name, value: ', node.name
    if (typeof node.name !== 'undefined') {
        ret.name = node.name.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXMemberExpression
var JSXMemberExpression_astNode = {
    name: "JSXMemberExpression", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXMemberExpression_astNode)
format.JSXMemberExpression = function(parent, node, options) {
    var f_astNode = JSXMemberExpression_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXMemberExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property object and append ittfNode to `ret`
    f_astNode.props.push({
        name: "object", 
        descr: "process AST-node-property object and append ittfNode to `ret`"
     })
    if (node.object) {
        if (!node.object.type) {
            throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.object, options)
    }
    else {
        throw new Error('AST-node-property object undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property property and append ittfNode to `ret`
    f_astNode.props.push({
        name: "property", 
        descr: "process AST-node-property property and append ittfNode to `ret`"
     })
    if (node.property) {
        if (!node.property.type) {
            throw 'Node property has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.property, options)
    }
    else {
        throw new Error('AST-node-property property undefined: ' + JSON.stringify(node, null, 2));
    }
    var got_text_2 = false;
    if (isChildrenCount(ret, 2)) {
        if ((ret.children[0].textified || ret.children[0].isText) && (ret.children[1].textified || ret.children[1].isText)) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            var c2 = ret.children[1].textified || ret.children[1].name;
            ret.name = c1 + '.' + c2;
            ret.textified = ret.name;
            ret.children = [];
            got_text_2 = true;
            got_text_2 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXNamespacedName
var JSXNamespacedName_astNode = {
    name: "JSXNamespacedName", 
    ittfTag: "none", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXNamespacedName_astNode)
format.JSXNamespacedName = function(parent, node, options) {
    var f_astNode = JSXNamespacedName_astNode;
    var __isText = false;
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXNamespacedName', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // namespace JSXIdentifier
    // name JSXIdentifier
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXOpeningElement
var JSXOpeningElement_astNode = {
    name: "JSXOpeningElement", 
    ittfTag: "jsx-open", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXOpeningElement_astNode)
format.JSXOpeningElement = function(parent, node, options) {
    var f_astNode = JSXOpeningElement_astNode;
    var __isText = false;
    var ret = {
        tag: 'jsx-open', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXOpeningElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (typeof(node.name) !== 'undefined' && node.name != null) {
        p_name = {
            textified: null, 
            isText: false, 
            ASTProp: 'name', 
            children: [
                
            ]
         };
        if (node.name == null) {
            p_name.text = "null";
        }
        // loog 'f_p_temp name before format'
        // loog 'f_p_temp name after format', p_name.children.length, p_name
        else {
            if (!node.name.type) {
                throw 'Node name has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_name, node.name, options)
            var name_comments = extractCommentsIf(p_name, 1);
            if (p_name.children.length == 1) {
                p_name.tag = p_name.children[0].tag;
                if (!(p_name.children[0].isText || p_name.children[0].textified)) {
                    p_name.name = p_name.children[0].name;
                    p_name.source = p_name.children[0].source;
                    p_name.children = p_name.children[0].children;
                }
                else {
                    if (p_name.children[0].textified) {
                        p_name.textified = p_name.children[0].textified;
                    }
                    if (p_name.children[0].isText) {
                        p_name.isText = true;
                    }
                    p_name.name = p_name.children[0].name;
                    p_name.source = p_name.children[0].source;
                    p_name.children = [];
                }
            }
            if (name_comments.length > 0) {
                p_name.children = p_name.children.concat(name_comments);
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    // selfClosing boolean
    // loog 'JSXOpeningElement p_name', p_name
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else if (isTextualCommentedNode(p_name)) {
        ret.name = getNodeText(p_name);
        ret.children = p_name.children;
    }
    else {
        var i, i_items=p_name.children, i_len=p_name.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_name.children[i];
            if (item.tag === 'jsx-ident') {
                ret.name = item.name;
            }
            else {
                ret.children.push(item)
            }
        }
    }
    // process AST-node-property typeParameters and set it in a var
    var p_typeParameters = null;
    if (typeof(node.typeParameters) !== 'undefined' && node.typeParameters != null) {
        p_typeParameters = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeParameters', 
            children: [
                
            ]
         };
        if (node.typeParameters == null) {
            p_typeParameters.text = "null";
        }
        // loog 'f_p_temp typeParameters before format'
        // loog 'f_p_temp typeParameters after format', p_typeParameters.children.length, p_typeParameters
        else {
            if (!node.typeParameters.type) {
                throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
            }
            format(p_typeParameters, node.typeParameters, options)
            var typeParameters_comments = extractCommentsIf(p_typeParameters, 1);
            if (p_typeParameters.children.length == 1) {
                p_typeParameters.tag = p_typeParameters.children[0].tag;
                if (!(p_typeParameters.children[0].isText || p_typeParameters.children[0].textified)) {
                    p_typeParameters.name = p_typeParameters.children[0].name;
                    p_typeParameters.source = p_typeParameters.children[0].source;
                    p_typeParameters.children = p_typeParameters.children[0].children;
                }
                else {
                    if (p_typeParameters.children[0].textified) {
                        p_typeParameters.textified = p_typeParameters.children[0].textified;
                    }
                    if (p_typeParameters.children[0].isText) {
                        p_typeParameters.isText = true;
                    }
                    p_typeParameters.name = p_typeParameters.children[0].name;
                    p_typeParameters.source = p_typeParameters.children[0].source;
                    p_typeParameters.children = [];
                }
            }
            if (typeParameters_comments.length > 0) {
                p_typeParameters.children = p_typeParameters.children.concat(typeParameters_comments);
            }
        }
    }
    if (p_typeParameters) {
        var i, i_items=p_typeParameters.children, i_len=p_typeParameters.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_typeParameters.children[i];
            ret.children.push(item)
        }
    }
    // TODO ??? ts here ???
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a temp var
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        var p_parameters = {
            tag: 'parameters', 
            children: [
                
            ]
         };
        var i, i_items=node.parameters, i_len=node.parameters.length, item;
        for (i=0; i<i_len; i++) {
            item = node.parameters[i];
            item.__parent = {
                name: 'parameters', 
                len: node.parameters.length
             };
            format(p_parameters, item, options)
        }
    }
    if (p_parameters) {
        var i, i_items=p_parameters.children, i_len=p_parameters.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_parameters.children[i];
            ret.children.push(item)
        }
    }
    // process AST-node-property-collection attributes and
    // embed its array of nodes in a temp var
    if (node.attributes) {
        if (typeof node.attributes.length === 'undefined') {
            throw new Error('Property node.attributes must be an array');
        }
        var p_attributes = {
            tag: 'attributes', 
            children: [
                
            ]
         };
        var i, i_items=node.attributes, i_len=node.attributes.length, item;
        for (i=0; i<i_len; i++) {
            item = node.attributes[i];
            item.__parent = {
                name: 'attributes', 
                len: node.attributes.length
             };
            format(p_attributes, item, options)
        }
    }
    if (p_attributes) {
        var i, i_items=p_attributes.children, i_len=p_attributes.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_attributes.children[i];
            ret.children.push(item)
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXSpreadAttribute
var JSXSpreadAttribute_astNode = {
    name: "JSXSpreadAttribute", 
    ittfTag: "@", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXSpreadAttribute_astNode)
format.JSXSpreadAttribute = function(parent, node, options) {
    var f_astNode = JSXSpreadAttribute_astNode;
    var __isText = false;
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXSpreadAttribute', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property argument and append ittfNode to `ret`
    f_astNode.props.push({
        name: "argument", 
        descr: "process AST-node-property argument and append ittfNode to `ret`"
     })
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options)
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = '{...' + c1 + "}";
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXText
var JSXText_astNode = {
    name: "JSXText", 
    ittfTag: "+", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXText_astNode)
format.JSXText = function(parent, node, options) {
    var f_astNode = JSXText_astNode;
    var __isText = false;
    var ret = {
        tag: '+', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXText', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // if node.value.trim().length == 0 || node.value === '\n' // 11/1/19
    var nametrimmed = node.value.trim();
    if (nametrimmed == 0) {
        ret = null;
    }
    else {
        ret.name = verify.replaceAll(nametrimmed, '\n', '&lf;');
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXFragment
var JSXFragment_astNode = {
    name: "JSXFragment", 
    ittfTag: "<", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXFragment_astNode)
format.JSXFragment = function(parent, node, options) {
    var f_astNode = JSXFragment_astNode;
    var __isText = false;
    var ret = {
        tag: '<', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXFragment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // openingFragment JSXOpeningFragment
    // closingFragment JSXClosingFragment
    // children JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment
    ret.name = 'React.Fragment';
    // process AST-node-property-collection children and append ittfNode(s) to `ret`
    f_astNode.props.push({
        name: "children", 
        throwIfUndefined: true, 
        descr: "process AST-node-property-collection children and append ittfNode(s) to `ret`"
     })
    if (node.children) {
        if (typeof node.children.length === 'undefined') {
            throw new Error('Property node.children must be an array');
        }
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            item.__parent = {
                name: 'children', 
                len: node.children.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection children undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXOpeningFragment
var JSXOpeningFragment_astNode = {
    name: "JSXOpeningFragment", 
    ittfTag: "fragment-open", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXOpeningFragment_astNode)
format.JSXOpeningFragment = function(parent, node, options) {
    var f_astNode = JSXOpeningFragment_astNode;
    var __isText = false;
    var ret = {
        tag: 'fragment-open', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXOpeningFragment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // aliases: ["JSX", "Immutable"],
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
// process AST node JSXClosingFragment
var JSXClosingFragment_astNode = {
    name: "JSXClosingFragment", 
    ittfTag: "fragment-close", 
    props: [
        
    ]
 };
wzDocs.AstgNodes.push(JSXClosingFragment_astNode)
format.JSXClosingFragment = function(parent, node, options) {
    var f_astNode = JSXClosingFragment_astNode;
    var __isText = false;
    var ret = {
        tag: 'fragment-close', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXClosingFragment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // aliases: ["JSX", "Immutable"]
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        
        // loog '### add ', ret.tag , 'to', parent.tag
        if (typeof __skip === 'undefined' || __skip == false) {
            processLeadingComments(node, ret, options);
            processTrailingComments(node, ret, options);
            parent.children.push(ret);
        }
    }
}
;
