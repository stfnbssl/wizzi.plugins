/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi-override\lib\wizzifiers\yaml\wizzifier.js.ittf
    utc time: Tue, 02 Apr 2024 09:37:40 GMT
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
var yaml_parser = require('js-yaml');
var cleanAST = require('./cleanAST');

function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        syntax = yaml_parser.load(tobeWizzified)
        ;
        cleanAST(syntax);
        // loog 'syntax', syntax
    } 
    catch (ex) {
        return callback(ex);
    } 
    return callback(null, syntax);
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
        if (options.syntaxOutFile || options.onSyntax) {
            parseInternal(input, options, (err, syntax) => {
            
                if (err) {
                    return callback(err);
                }
                if (options.syntaxOutFile) {
                    file.write(options.syntaxOutFile, stringify(syntax, null, 2))
                }
                if (options.onSyntax) {
                    options.onSyntax(syntax)
                }
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
            // set result = cloner(result, options)
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

var analizeAstArray = function(ast, handler) {
    var i, i_items=ast, i_len=ast.length, item;
    for (i=0; i<i_len; i++) {
        item = ast[i];
        if (verify.isObject(item)) {
            handler.onObject(true);
            analizeAstObject(item, handler);
            handler.onObject(false);
        }
        else if (verify.isArray(item)) {
            handler.onArray(true);
            analizeAstArray(item, handler);
            handler.onArray(false);
        }
        else {
            handler.onArrayValue(item);
        }
    }
};
var analizeAstObject = function(ast, handler) {
    for (var k in ast) {
        var item = ast[k];
        // loog 'analizeAstObject', k, item, 'isObject', verify.isObject(item), 'isArray', verify.isArray(item)
        if (verify.isObject(item)) {
            handler.onObject(true, k);
            analizeAstObject(item, handler);
            handler.onObject(false);
        }
        else if (verify.isArray(item)) {
            handler.onArray(true, k);
            analizeAstArray(item, handler);
            handler.onArray(false);
        }
        else {
            handler.onProp(k, item);
        }
    }
};

var analizeRootAst = function(ast, handler) {
    if (verify.isObject(ast)) {
        analizeAstObject(ast, handler)
    }
    else if (verify.isArray(ast)) {
        analizeAstArray(ast, handler)
    }
    else {
        throw new Error('Should never happen: JSON root is neither object or array');
    }
};

var format = function(parentIttfNode, ast, options) {
    var wizziTree = parentIttfNode;
    analizeRootAst(ast, {
        onObject: function(open, name) {
            // loog  'onObject', open
            if (open) {
                var n = {
                    tag: '{', 
                    name: name, 
                    children: []
                 };
                n.parentIttfNode = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else {
                wizziTree = wizziTree.parentIttfNode;
            }
        }, 
        onArray: function(open, name) {
            // loog  'onArray', open
            if (open) {
                var n = {
                    tag: '[', 
                    name: name, 
                    children: []
                 };
                n.parentIttfNode = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            // FIXME
            else {
                wizziTree = wizziTree.parentIttfNode;
            }
        }, 
        onProp: function(name, value) {
            // loog  "onProp", name, value
            var n = {
                tag: wizzifyIttfNodeName(name), 
                name: value, 
                children: []
             };
            n.parentIttfNode = wizziTree;
            wizziTree.children.push(n);
        }, 
        onArrayValue: function(value) {
            // loog  "onArrayValue", value
            var n = {
                tag: wizzifyIttfNodeName(value), 
                name: '', 
                children: []
             };
            wizziTree.children.push(n);
        }
     })
};

function wizzify(tobeWizzified, options, callback) {
    // loog 'yaml.wizzify.options', options
    options = options || {};
    options.input = tobeWizzified;
    options.stack = [];
    options.formatTextNodes = [];
    options.verbose = true;
    parseInternal(tobeWizzified, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        var root = {
            tag: verify.isArray(syntax) ? '[' : '{', 
            children: []
         };
        format(root, syntax, options);
        // loog 'wizzifier.ittf.formatted.syntax', stringify(root, null, 2)
        return callback(null, root);
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

function wizzifyIttfNodeName(name) {
    var ret = [];
    var seen = false;
    for (var i=0; i<name.length; i++) {
        if (name[i] == '(' && seen == false) {
            ret.push("$" + "{'('}")
            seen = true;
        }
        else {
            ret.push(name[i])
        }
    }
    return ret.join('');
}

// process AST node Name
format.Name = function(parent, node, options) {
    console.log('node : Name ----------------------------------------- parent ittf tag : ', parent.tag);
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
        tag: 'name', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // name( value )
    /**
         loog 'Name.tag', ret.tag
         loog 'Name.name', ret.name
         loog 'Name.textified', ret.textified
    */
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
