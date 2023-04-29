/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\wizzifiers\html\wizzifier.js.ittf
    utc time: Sat, 29 Apr 2023 05:23:13 GMT
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

var html_parser = require('./parser');
var cloner = require('./cloner');
var csswizzifier = null;
var jswizzifier = null;

function parseInternal(tobeWizzified, options, callback) {
    var html = tobeWizzified;
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = (options || {});
    options.wizziIncludes = options.wizziIncludes || [];
    var wizziTree = {
        children: []
     };
    var parser = new html_parser.Parser({
        onopentag: function(tagname, attribs) {
            var ittfTag = tagname;
            if (options.isForVue) {
                if (tagname.substr(0, 2) !== 'v-') {
                    if (['router-link', 'router-view'].indexOf(tagname) < 0) {
                        if (tagname[0] === tagname[0].toUpperCase() || tagname.indexOf('-') > -1) {
                            ittfTag = '< ' + tagname;
                        }
                    }
                }
            }
            else {
                if (tagname[0] === tagname[0].toUpperCase() || tagname.indexOf('-') > -1) {
                    ittfTag = '< ' + tagname;
                }
            }
            // log "OpenTag " + tagname, ittfTag, attribs
            var n = {
                tag: ittfTag, 
                name: '', 
                attribs: attribs, 
                children: []
             };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        ontext: function(text) {
            // log "================= Text", text, wizziTree.tag
            var lines = file.splitLines(text);
            
            // loog '++++++++++ wizziTree.swig'
            if (wizziTree.swig) {
                lines.forEach(function(l) {
                    var n = {
                        tag: '+', 
                        name: l, 
                        attribs: {}, 
                        children: []
                     };
                    wizziTree.children.push(n);
                })
            }
            
            // loog 'literal', literal, wizziTree.attribs['lang']
            else if ('script' === wizziTree.tag) {
                var literal = lines.join('\n');
                options.wizziIncludes.push({
                    kind: wizziTree.attribs['lang'] || wizziTree.attribs['language'] || 'js', 
                    node: wizziTree, 
                    literal: literal
                 })
            }
            
            // loog 'literal', literal
            else if ('style' === wizziTree.tag) {
                var literal = lines.join('\n');
                options.wizziIncludes.push({
                    kind: 'css', 
                    node: wizziTree, 
                    literal: literal
                 })
            }
            else if (lines.length == 1) {
                if (wizziTree.children.length > 0) {
                    if (lines[0].trim().length > 0) {
                        var n = {
                            tag: '+', 
                            name: lines[0], 
                            attribs: {}, 
                            children: []
                         };
                        wizziTree.children.push(n);
                    }
                }
                else {
                    wizziTree.name += lines[0];
                }
            }
            else {
                lines.forEach(function(l) {
                    if (l.trim().length > 0) {
                        var n = {
                            tag: '++', 
                            name: l, 
                            attribs: {}, 
                            children: []
                         };
                        wizziTree.children.push(n);
                    }
                })
            }
        }, 
        onclosetag: function(tagname) {
            // loog 'onclosetag', tagname
            if (wizziTree.parent != null) {
                wizziTree = wizziTree.parent;
            }
            else {
                console.log("WARNING overclose ", tagname);
            }
        }, 
        onswig: function(text) {
            var p = lineparser.parseNameValueRaw(text, {}),
                tag = p.name().trim().toLowerCase()
                ,
                text = p.value();
            // log "OpenSwig " + tag, text
            if (['for', 'if', 'block', 'autoescape', 'filter', 'macro', 'spaceless', 'raw'].indexOf(tag) >= 0) {
                var n = {
                    tag: tag, 
                    name: text, 
                    attribs: {}, 
                    children: [], 
                    lines: [], 
                    swig: true
                 };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else if (['endfor', 'endif', 'endblock', 'endautoescape', 'endfilter', 'endmacro', 'endspaceless', 'endraw'].indexOf(tag) >= 0) {
                if (wizziTree.parent != null) {
                    wizziTree = wizziTree.parent;
                }
                else {
                    console.log("WARNING overclose ", tagname);
                }
            }
            else if (['extends', 'include', 'import', 'parent', 'set'].indexOf(tag) >= 0) {
                var n = {
                    tag: tag, 
                    name: text, 
                    attribs: {}, 
                    children: [], 
                    lines: [], 
                    swig: true
                 };
                wizziTree.children.push(n);
            }
            else if (['else', 'elif', 'elseif'].indexOf(tag) >= 0) {
                if (wizziTree.parent != null) {
                    wizziTree = wizziTree.parent;
                }
                else {
                    console.log("WARNING overclose ", tagname);
                }
                var n = {
                    tag: tag, 
                    name: text, 
                    attribs: {}, 
                    children: [], 
                    lines: [], 
                    swig: true
                 };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else {
                throw new Error('Html.Wizzifier. Wizzi parse onswig unknown tag: ' + tag);
            }
        }
     });
    var addedWrapper = false;
    try {
        if (html && html.length > 0) {
            console.log("parsing html of length: ", html.length, __filename);
            
            // loog 'html document has root tag html'
            if (html.substr(0,'<html>'.length) == '<html>' || html.substr(0,'<!doctype>'.length) == '<!doctype>') {
            }
            // log html.substr(0,'<html>'.length), html.substr(0,'<!doctype>'.length)
            else {
                var i1 = html.indexOf('<');
                var i2 = html.indexOf('>');
                
                // loog 'wizzi-tools.htmlparser.addedWrapper.temp', temp
                
                // loog 'wizzi-tools.htmlparser.addedWrapper.html', html
                if (i1 > -1 && i2 > -1) {
                    var temp = html.substr(i1+1, i2-i1-1);
                    if (temp.toLowerCase().indexOf('!doctype') > -1) {
                        html = '<html>' + html.substr(i2+1) + '</html>';
                    }
                    else {
                        html = '<html>' + html + '</html>';
                    }
                    addedWrapper = true;
                }
            }
            console.log("calling parser.write", __filename);
            parser.write(html);
            console.log("parser.write done!", __filename);
            parser.end();
            console.log("parser.end done!", __filename);
        }
        else {
            console.log("no html to parse", __filename);
        }
    } 
    catch (ex) {
        return callback(ex);
    } 
    while (wizziTree.parent != null) {
        wizziTree = wizziTree.parent;
    }
    if (addedWrapper) {
        wizziTree.children = wizziTree.children[0].children;
    }
    // loog 'wizziTree', wizziTree
    // loog 'wizzi-tools.htmlparser.wizzify.options.embedTag,wizziTree.children.length', options.embedTag, wizziTree.children.length
    var synthax;
    
    // loog 'wizzi-tools.htmlparser.wizzify.options.embedTag, wizziTree.children[0]', options.embedTag, wizziTree.children[0]
    if (wizziTree.children.length > 1 && typeof (options.embedTag) === 'string') {
        if (options.embedTag === wizziTree.children[0].tag) {
            synthax = wizziTree.children[0];
        }
        else {
            synthax = {
                tag: options.embedTag, 
                name: '', 
                attribs: {}, 
                children: []
             };
            wizziTree.children.forEach(function(item) {
                synthax.children.push(item);
            })
        }
    }
    else {
        if (wizziTree.children.length == 1) {
            synthax = wizziTree.children[0];
        }
        else {
            synthax = {
                tag: 'html', 
                name: '__dummy_root__', 
                attribs: {}, 
                children: []
             };
            wizziTree.children.forEach(function(item) {
                synthax.children.push(item);
            })
        }
    }
    if (!synthax) {
        return callback(new Error('Html.Wizzifier.Wizzi parse failed. wizziTree: ' + util.inspect(wizziTree, {depth: 2})));
    }
    return callback(null, synthax);
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
        return callback(null, syntax);
    }
    )
}

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

md.getWizzifierIncludes = function(options, callback) {
    options.wizziIncludes = options.wizziIncludes || [];
    // loog 'options.wizziIncludes', options.wizziIncludes
    async.map(options.wizziIncludes, function(item, callback) {
        if (item.kind === 'css') {
            if (!csswizzifier) {
                csswizzifier = require('../../cssparser/css/wizzifier');
            }
            csswizzifier.getWizziTree(item.literal, {}, (err, ittf) => {
            
                // loog 'getWizzifierIncludes.item.ittf', ittf
                if (err) {
                    item.node.children.push({
                        tag: 'error', 
                        name: err.message, 
                        children: [
                            
                        ]
                     })
                }
                else {
                    if (options.isForVue) {
                        var i, i_items=ittf.children, i_len=ittf.children.length, ittfchild;
                        for (i=0; i<i_len; i++) {
                            ittfchild = ittf.children[i];
                            item.node.children.push(ittfchild)
                        }
                    }
                    else {
                        item.node.children.push(ittf)
                    }
                }
                return callback(null);
            }
            )
        }
        
        // loog 'jswizzifier', jswizzifier
        else if (item.kind === 'ts') {
            
            // loog 'jswizzifier import 1'
            
            // loog 'jswizzifier import 2'
            if (!jswizzifier) {
                jswizzifier = require('../../jsparser/babel/wizzifier');
            }
            jswizzifier.getWizziTree(item.literal, {
                babel: {
                    sourceType: 'module', 
                    ts_or_flow: 'typescript'
                 }
             }, (err, ittf) => {
            
                // loog 'getWizzifierIncludes.item.ittf', ittf
                if (err) {
                    item.node.children.push({
                        tag: 'error', 
                        name: err.message, 
                        children: [
                            
                        ]
                     })
                }
                else {
                    if (options.isForVue) {
                        var i, i_items=ittf.children, i_len=ittf.children.length, ittfchild;
                        for (i=0; i<i_len; i++) {
                            ittfchild = ittf.children[i];
                            // skip kind
                            if (i > 0) {
                                item.node.children.push(ittfchild)
                            }
                        }
                    }
                    else {
                        item.node.children.push(ittf)
                    }
                }
                return callback(null);
            }
            )
        }
        // loog 'jswizzifier', jswizzifier
        else {
            
            // loog 'jswizzifier import 1'
            
            // loog 'jswizzifier import 2'
            if (!jswizzifier) {
                jswizzifier = require('../../jsparser/babel/wizzifier');
            }
            jswizzifier.getWizziTree(item.literal, {}, (err, ittf) => {
            
                // loog 'getWizzifierIncludes.item.ittf', ittf
                if (err) {
                    item.node.children.push({
                        tag: 'error', 
                        name: err.message, 
                        children: [
                            
                        ]
                     })
                }
                else {
                    if (options.isForVue) {
                        var i, i_items=ittf.children, i_len=ittf.children.length, ittfchild;
                        for (i=0; i<i_len; i++) {
                            ittfchild = ittf.children[i];
                            // skip kind
                            if (i > 0) {
                                item.node.children.push(ittfchild)
                            }
                        }
                    }
                    else {
                        item.node.children.push(ittf)
                    }
                }
                return callback(null);
            }
            )
        }
    }, callback)
}
;
