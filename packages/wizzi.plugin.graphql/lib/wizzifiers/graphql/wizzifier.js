/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.graphql\.wizzi-override\lib\wizzifiers\graphql\wizzifier.js.ittf
    utc time: Sat, 13 Apr 2024 11:30:36 GMT
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('../utils/lineParser');
var file = require('@wizzi/utils').file;
var cloner = require('../utils/cloner');
var ittfWriter = require("../utils/ittfWriter");
var helpers = require("@wizzi/utils").helpers;
var graphql_parser = require('graphql/language/parser');
var textIndentParser = helpers.textIndentParser;
var cleanAST = require('./cleanAST');
function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        syntax = graphql_parser.parse(tobeWizzified);
        ;
        cleanAST(syntax);
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
        if (options.syntaxOutFile) {
            parseInternal(input, options, (err, syntax) => {
            
                if (err) {
                    return callback(err);
                }
                file.write(options.syntaxOutFile, JSON.stringify(syntax, null, 2))
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
    
    // info 'ast.kind', ast.kind
    if (options.verbose) {
    }
    var kind = ast.kind === 'arguments' ? 'xarguments' : ast.kind;
    var formatter = format[kind];
    if (formatter) {
        options.stack.push(ast);
        var result = formatter(parent, ast, options);
        options.stack.pop();
        return result;
    }
    else {
        throw new Error('no formatter for kind: ' + ast.kind);
    }
};
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
        // loog JSON.stringify(syntax, null, 2)
        var root = {
            tag: 'graphql', 
            children: [
                
            ]
         };
        format(root, syntax, options);
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
// process AST node Name
format.Name = function(parent, node, options) {
    // loog 'node : Name ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
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
    // loog 't/name.node.value, value: ', node.value
    if (typeof node.value !== 'undefined') {
        ret.name = node.value.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    /**
         loog 'Name.tag', ret.tag
         loog 'Name.name', ret.name
         loog 'Name.textified', ret.textified
    */
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node NonNullType
format.NonNullType = function(parent, node, options) {
    // loog 'node : NonNullType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':!', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property type and set it in a var
    var p_type = null;
    if (node.type) {
        p_type = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_type, node.type, options)
        if (p_type.children.length == 1) {
            if (isTextualNode(p_type.children[0]) == false) {
                p_type.tag = p_type.children[0].tag;
                p_type.name = p_type.children[0].name;
                p_type.source = p_type.children[0].source;
                p_type.children = p_type.children[0].children;
            }
            else {
                p_type.tag = p_type.children[0].tag;
                p_type.name = getNodeText(p_type.children[0]);
                p_type.textified = p_type.name;
                p_type.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = p_type.name;
    // process AST-node-property type and append ittfNode to `ret`
    if (node.type) {
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.type, options)
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'NonNullType.ret', ret
    if (ret.children[0].tag == 'namedType') {
        ret.children.length = 0;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node NamedType
format.NamedType = function(parent, node, options) {
    // loog 'node : NamedType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'namedType', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'NamedType.p_name', ret, p_name
    if (isTextualNode(p_name)) {
        ret.name = getTypeName(getNodeText(p_name));
        ret.textified = ret.name;
    }
    else {
        ret.children.push(p_name);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node Document
format.Document = function(parent, node, options) {
    // loog 'node : Document ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection definitions and append ittfNode(s) to `ret`
    if (node.definitions) {
        if (typeof node.definitions.length === 'undefined') {
            throw new Error('Property node.definitions must be an array');
        }
        var i, i_items=node.definitions, i_len=node.definitions.length, item;
        for (i=0; i<i_len; i++) {
            item = node.definitions[i];
            item.__parent = {
                name: 'definitions', 
                len: node.definitions.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection definitions undefined: ' + JSON.stringify(node, null, 2));
    }
}
;
// process AST node SchemaDefinition
format.SchemaDefinition = function(parent, node, options) {
    // loog 'node : SchemaDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':schema', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection operationTypes and append ittfNode(s) to `ret`
    if (node.operationTypes) {
        if (typeof node.operationTypes.length === 'undefined') {
            throw new Error('Property node.operationTypes must be an array');
        }
        var i, i_items=node.operationTypes, i_len=node.operationTypes.length, item;
        for (i=0; i<i_len; i++) {
            item = node.operationTypes[i];
            item.__parent = {
                name: 'operationTypes', 
                len: node.operationTypes.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection operationTypes undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node SchemaExtension
format.SchemaExtension = function(parent, node, options) {
    // loog 'node : SchemaExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':extend-schema', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection operationTypes and append ittfNode(s) to `ret`
    if (node.operationTypes) {
        if (typeof node.operationTypes.length === 'undefined') {
            throw new Error('Property node.operationTypes must be an array');
        }
        var i, i_items=node.operationTypes, i_len=node.operationTypes.length, item;
        for (i=0; i<i_len; i++) {
            item = node.operationTypes[i];
            item.__parent = {
                name: 'operationTypes', 
                len: node.operationTypes.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection operationTypes undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node OperationTypeDefinition
format.OperationTypeDefinition = function(parent, node, options) {
    // loog 'node : OperationTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'operation-type', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // loog 't/tag.node.operation, value: ', node.operation, '
    if (typeof node.operation !== 'undefined') {
        ret.tag = node.operation.toString();
    }
    // loog 't/tag ittf.ret', ret
    // process AST-node-property type and set it in a var
    var p_type = null;
    if (node.type) {
        p_type = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_type, node.type, options)
        if (p_type.children.length == 1) {
            if (isTextualNode(p_type.children[0]) == false) {
                p_type.tag = p_type.children[0].tag;
                p_type.name = p_type.children[0].name;
                p_type.source = p_type.children[0].source;
                p_type.children = p_type.children[0].children;
            }
            else {
                p_type.tag = p_type.children[0].tag;
                p_type.name = getNodeText(p_type.children[0]);
                p_type.textified = p_type.name;
                p_type.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_type)) {
        ret.name = getNodeText(p_type);
    }
    else {
        new Error('InterfaceTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ObjectTypeDefinition
format.ObjectTypeDefinition = function(parent, node, options) {
    // loog 'node : ObjectTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':type', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('ObjectTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection interfaces and
    // embed its array of nodes in a temp var
    var p_interfaces = null;
    if (node.interfaces) {
        if (typeof node.interfaces.length === 'undefined') {
            throw new Error('Property node.interfaces must be an array');
        }
        p_interfaces = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.interfaces, i_len=node.interfaces.length, item;
        for (i=0; i<i_len; i++) {
            item = node.interfaces[i];
            item.__parent = {
                name: 'interfaces', 
                len: node.interfaces.length
             };
            format(p_interfaces, item, options)
        }
    }
    if (p_interfaces != null) {
        var i, i_items=p_interfaces.children, i_len=p_interfaces.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_interfaces.children[i];
            item.tag = '&';
            ret.children.push(item);
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection fields and append ittfNode(s) to `ret`
    if (node.fields) {
        if (typeof node.fields.length === 'undefined') {
            throw new Error('Property node.fields must be an array');
        }
        var i, i_items=node.fields, i_len=node.fields.length, item;
        for (i=0; i<i_len; i++) {
            item = node.fields[i];
            item.__parent = {
                name: 'fields', 
                len: node.fields.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection fields undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node FieldDefinition
format.FieldDefinition = function(parent, node, options) {
    // loog 'node : FieldDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':p', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('FieldDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property type and append ittfNode to `ret`
    if (node.type) {
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.type, options)
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret.children[0].tag == ':!') {
        if (ret.children[0].children.length == 1 && ret.children[0].children[0].tag == ':[') {
            ret.children[0].tag = ':![';
            ret.children[0].children = ret.children[0].children[0].children;
        }
        if (ret.children[0].children.length == 1 && ret.children[0].children[0].tag == 'namedType') {
            ret.children[0].children.length = 0;
        }
    }
    if (ret.children[0].tag == 'namedType') {
        ret.children[0].tag = ':';
    }
    if (node.arguments.length > 0) {
        ret.tag = ':m';
    }
    // loog 'FieldDefinition.type', ret.children[0]
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection arguments and
    // embed its array of nodes in a temp var
    var p_arguments = null;
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        p_arguments = {
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
    // loog 'FieldDefinition.arguments', p_arguments
    var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_arguments.children[i];
        if (item.tag == '@') {
            item.tag = 'param';
            if (item.children[0].tag[0] != ':') {
                item.children[0].name = item.children[0].tag;
                item.children[0].tag = ':';
            }
        }
        ret.children.push(item)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ObjectTypeExtension
format.ObjectTypeExtension = function(parent, node, options) {
    // loog 'node : ObjectTypeExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':extend-type', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('ObjectTypeExtension. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection interfaces and
    // embed its array of nodes in a temp var
    var p_interfaces = null;
    if (node.interfaces) {
        if (typeof node.interfaces.length === 'undefined') {
            throw new Error('Property node.interfaces must be an array');
        }
        p_interfaces = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.interfaces, i_len=node.interfaces.length, item;
        for (i=0; i<i_len; i++) {
            item = node.interfaces[i];
            item.__parent = {
                name: 'interfaces', 
                len: node.interfaces.length
             };
            format(p_interfaces, item, options)
        }
    }
    if (p_interfaces != null) {
        var i, i_items=p_interfaces.children, i_len=p_interfaces.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_interfaces.children[i];
            item.tag = '&';
            ret.children.push(item);
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection fields and append ittfNode(s) to `ret`
    if (node.fields) {
        if (typeof node.fields.length === 'undefined') {
            throw new Error('Property node.fields must be an array');
        }
        var i, i_items=node.fields, i_len=node.fields.length, item;
        for (i=0; i<i_len; i++) {
            item = node.fields[i];
            item.__parent = {
                name: 'fields', 
                len: node.fields.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection fields undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node InterfaceTypeDefinition
format.InterfaceTypeDefinition = function(parent, node, options) {
    // loog 'node : InterfaceTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':interface', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('InterfaceTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection interfaces and
    // embed its array of nodes in a temp var
    var p_interfaces = null;
    if (node.interfaces) {
        if (typeof node.interfaces.length === 'undefined') {
            throw new Error('Property node.interfaces must be an array');
        }
        p_interfaces = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.interfaces, i_len=node.interfaces.length, item;
        for (i=0; i<i_len; i++) {
            item = node.interfaces[i];
            item.__parent = {
                name: 'interfaces', 
                len: node.interfaces.length
             };
            format(p_interfaces, item, options)
        }
    }
    if (p_interfaces != null) {
        var i, i_items=p_interfaces.children, i_len=p_interfaces.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_interfaces.children[i];
            item.tag = '&';
            ret.children.push(item);
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection fields and append ittfNode(s) to `ret`
    if (node.fields) {
        if (typeof node.fields.length === 'undefined') {
            throw new Error('Property node.fields must be an array');
        }
        var i, i_items=node.fields, i_len=node.fields.length, item;
        for (i=0; i<i_len; i++) {
            item = node.fields[i];
            item.__parent = {
                name: 'fields', 
                len: node.fields.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection fields undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node InterfaceTypeExtension
format.InterfaceTypeExtension = function(parent, node, options) {
    // loog 'node : InterfaceTypeExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':extend-interface', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('InterfaceTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection fields and append ittfNode(s) to `ret`
    if (node.fields) {
        if (typeof node.fields.length === 'undefined') {
            throw new Error('Property node.fields must be an array');
        }
        var i, i_items=node.fields, i_len=node.fields.length, item;
        for (i=0; i<i_len; i++) {
            item = node.fields[i];
            item.__parent = {
                name: 'fields', 
                len: node.fields.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection fields undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node UnionTypeDefinition
format.UnionTypeDefinition = function(parent, node, options) {
    // loog 'node : UnionTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':union', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('UnionTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection types undefined: ' + JSON.stringify(node, null, 2));
    }
    var i, i_items=ret.children, i_len=ret.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.children[i];
        if (item.tag === 'namedType') {
            item.tag = '|';
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node UnionTypeExtension
format.UnionTypeExtension = function(parent, node, options) {
    // loog 'node : UnionTypeExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':extend-union', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('UnionTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection types undefined: ' + JSON.stringify(node, null, 2));
    }
    var i, i_items=ret.children, i_len=ret.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.children[i];
        if (item.tag === 'namedType') {
            item.tag = '|';
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ListType
format.ListType = function(parent, node, options) {
    // loog 'node : ListType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':[', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property type and append ittfNode to `ret`
    if (node.type) {
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.type, options)
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'ListType', ret
    if (ret.children[0].tag == 'namedType') {
        ret.children[0].tag = ':';
    }
    if (ret.children[0].tag == ':!') {
        if (ret.children[0].children.length == 1 && ret.children[0].children[0].tag == ':[') {
            ret.children[0].tag = ':![';
            ret.children[0].children = ret.children[0].children[0].children;
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ScalarTypeDefinition
format.ScalarTypeDefinition = function(parent, node, options) {
    // loog 'node : ScalarTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':scalar', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('ScalarTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property description and append ittfNode to `ret`
    if (node.description) {
        if (!node.description.kind) {
            throw 'Node description has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.description, options)
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ScalarTypeExtension
format.ScalarTypeExtension = function(parent, node, options) {
    // loog 'node : ScalarTypeExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':extend-scalar', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('ScalarTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property description and append ittfNode to `ret`
    if (node.description) {
        if (!node.description.kind) {
            throw 'Node description has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.description, options)
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node EnumTypeDefinition
format.EnumTypeDefinition = function(parent, node, options) {
    // loog 'node : EnumTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':enum', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('EnumTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection values and append ittfNode(s) to `ret`
    if (node.values) {
        if (typeof node.values.length === 'undefined') {
            throw new Error('Property node.values must be an array');
        }
        var i, i_items=node.values, i_len=node.values.length, item;
        for (i=0; i<i_len; i++) {
            item = node.values[i];
            item.__parent = {
                name: 'values', 
                len: node.values.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection values undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node EnumTypeExtension
format.EnumTypeExtension = function(parent, node, options) {
    // loog 'node : EnumTypeExtension ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':extend-enum', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('EnumTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection values and append ittfNode(s) to `ret`
    if (node.values) {
        if (typeof node.values.length === 'undefined') {
            throw new Error('Property node.values must be an array');
        }
        var i, i_items=node.values, i_len=node.values.length, item;
        for (i=0; i<i_len; i++) {
            item = node.values[i];
            item.__parent = {
                name: 'values', 
                len: node.values.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection values undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node EnumValueDefinition
format.EnumValueDefinition = function(parent, node, options) {
    // loog 'node : EnumValueDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('EnumValueDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
format.OperationDefinition = function(parent, node, options) {
    // loog "parent.keys", Object.keys(parent)
    // loog "node.keys", Object.keys(node)
    // loog "options.keys", Object.keys(options)
    var ret;
    if (node.operation == 'query' && arrayIsEmpty(node.variableDefinitions) && arrayIsEmpty(node.directives)) {
        ret = parent;
    }
    // process AST-node-property-collection variableDefinitions and append ittfNode(s) to `ret`
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
    else {
        var ret = {
            tag: ':' + node.operation, 
            name: '', 
            isText: false, 
            textified: null, 
            source: options.input.substring(node.start, node.end), 
            children: [
                
            ]
         };
        if (node.variableDefinitions) {
            if (typeof node.variableDefinitions.length === 'undefined') {
                throw new Error('Property node.variableDefinitions must be an array');
            }
            var i, i_items=node.variableDefinitions, i_len=node.variableDefinitions.length, item;
            for (i=0; i<i_len; i++) {
                item = node.variableDefinitions[i];
                item.__parent = {
                    name: 'variableDefinitions', 
                    len: node.variableDefinitions.length
                 };
                format(ret, item, options)
            }
        }
        else {
            throw new Error('AST-node-property-collection variableDefinitions undefined: ' + JSON.stringify(node, null, 2));
        }
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
    }
    // loog 'OperationDefinition.ret', ret
    format(ret, node.selectionSet, options)
    // loog 'OperationDefinition.after.ret', ret
    parent.children.push(ret);
}
;
// process AST node SelectionSet
format.SelectionSet = function(parent, node, options) {
    // loog 'node : SelectionSet ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '{', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection selections and append ittfNode(s) to `ret`
    if (node.selections) {
        if (typeof node.selections.length === 'undefined') {
            throw new Error('Property node.selections must be an array');
        }
        var i, i_items=node.selections, i_len=node.selections.length, item;
        for (i=0; i<i_len; i++) {
            item = node.selections[i];
            item.__parent = {
                name: 'selections', 
                len: node.selections.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection selections undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node InputValueDefinition
format.InputValueDefinition = function(parent, node, options) {
    // loog 'node : InputValueDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('InputValueDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property type and append ittfNode to `ret`
    if (node.type) {
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.type, options)
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret.children[0].tag == ':!') {
        if (ret.children[0].children.length == 1 && ret.children[0].children[0].tag == ':[') {
            ret.children[0].tag = ':![';
            ret.children[0].children = ret.children[0].children[0].children;
        }
        if (ret.children[0].children.length == 1 && ret.children[0].children[0].tag == 'namedType') {
            ret.children[0].children.length = 0;
        }
    }
    if (ret.children[0].tag == 'namedType') {
        ret.children[0].tag = ':';
    }
    /**
         process AST-node-property type and set it in a var
        var p_type = null;
        if (node.type) {
            p_type = {
                textified: null, 
                isText: false, 
                children: [
                    
                ]
             };
            if (!node.type.kind) {
                throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
            }
            format(p_type, node.type, options)
            if (p_type.children.length == 1) {
                if (isTextualNode(p_type.children[0]) == false) {
                    p_type.tag = p_type.children[0].tag;
                    p_type.name = p_type.children[0].name;
                    p_type.source = p_type.children[0].source;
                    p_type.children = p_type.children[0].children;
                }
                else {
                    p_type.tag = p_type.children[0].tag;
                    p_type.name = getNodeText(p_type.children[0]);
                    p_type.textified = p_type.name;
                    p_type.children = [];
                }
            }
        }
        else {
            throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
        }
         loog 'InputValueDefinition.p_type', ret.name, p_type
        if (p_type.tag === 'namedType') {
            p_type.tag = p_type.name;
            if (p_type.tag == 'string') {
                p_type.name = '"' + p_name.name + '"';
            }
            else {
                p_type.name = p_name.name;
            }
        }
        ret.children.push(p_type)*/
    // process AST-node-property defaultValue and append ittfNode to `ret`
    if (node.defaultValue) {
        if (!node.defaultValue.kind) {
            throw 'Node defaultValue has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.defaultValue, options)
    }
    if (ret.children.length == 2) {
        ret.children[1].tag = '=';
        if (p_type.tag == 'string') {
            ret.children[1].name = '"' +  ret.children[1].name + '"';
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node InputObjectTypeDefinition
format.InputObjectTypeDefinition = function(parent, node, options) {
    // loog 'node : InputObjectTypeDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'input', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('InputObjectTypeDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection fields and
    // embed its array of nodes in a new tag
    if (node.fields) {
        if (typeof node.fields.length === 'undefined') {
            throw new Error('Property node.fields must be an array');
        }
        if (node.fields.length > 0) {
            var tempfields = {
                tag: '{', 
                children: [
                    
                ]
             };
            var i, i_items=node.fields, i_len=node.fields.length, item;
            for (i=0; i<i_len; i++) {
                item = node.fields[i];
                item.__parent = {
                    name: 'fields', 
                    len: node.fields.length
                 };
                format(tempfields, item, options)
            }
            ret.children.push(tempfields)
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node Field
format.Field = function(parent, node, options) {
    // loog 'node : Field ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '.', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (node.arguments.length > 0) {
        ret.tag = '_';
    }
    // loog 't/name.node.name.value, value: ', node.name.value
    if (typeof node.name.value !== 'undefined') {
        ret.name = node.name.value.toString();
        ret.textified = ret.name;
    }
    // loog 't/name ittf.ret', ret
    // process AST-node-property alias and set it in a var
    var p_alias = null;
    if (node.alias) {
        p_alias = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.alias.kind) {
            throw 'Node alias has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_alias, node.alias, options)
        if (p_alias.children.length == 1) {
            if (isTextualNode(p_alias.children[0]) == false) {
                p_alias.tag = p_alias.children[0].tag;
                p_alias.name = p_alias.children[0].name;
                p_alias.source = p_alias.children[0].source;
                p_alias.children = p_alias.children[0].children;
            }
            else {
                p_alias.tag = p_alias.children[0].tag;
                p_alias.name = getNodeText(p_alias.children[0]);
                p_alias.textified = p_alias.name;
                p_alias.children = [];
            }
        }
    }
    if (p_alias != null) {
        p_alias.tag = 'as';
        ret.children.push(p_alias);
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property-collection arguments and append ittfNode(s) to `ret`
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            item.__parent = {
                name: 'arguments', 
                len: node.arguments.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection arguments undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property selectionSet and append ittfNode to `ret`
    if (node.selectionSet) {
        if (!node.selectionSet.kind) {
            throw 'Node selectionSet has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.selectionSet, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node Argument
format.Argument = function(parent, node, options) {
    // loog 'node : Argument ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('Argument. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property value and append ittfNode to `ret`
    if (node.value) {
        if (!node.value.kind) {
            throw 'Node value has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.value, options)
    }
    else {
        throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'Argument', ret.name, ret.children.length
    
    // loog 'Argument', ret.name, ret.children[0].tag, ret.children[0].name, ret.children[0].children.length
    if (ret.children.length == 1) {
        if (ret.children[0].children.length < 1) {
            
            // set ret.children[0].name = '"' +  ret.children[0].name + '"'
            if (ret.children[0].tag == 'string') {
                ret.name = ret.name + ' ' + '"' +  ret.children[0].name + '"';
            }
            else {
                ret.name = ret.name + ' ' + ret.children[0].name;
            }
            ret.children.length = 0;
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node IntValue
format.IntValue = function(parent, node, options) {
    // loog 'node : IntValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'int', 
        name: '', 
        isText: false, 
        textified: null, 
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node FloatValue
format.FloatValue = function(parent, node, options) {
    // loog 'node : FloatValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'float', 
        name: '', 
        isText: false, 
        textified: null, 
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node BooleanValue
format.BooleanValue = function(parent, node, options) {
    // loog 'node : BooleanValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'boolean', 
        name: '', 
        isText: false, 
        textified: null, 
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node NullValue
format.NullValue = function(parent, node, options) {
    // loog 'node : NullValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'null', 
        name: '', 
        isText: false, 
        textified: null, 
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node StringValue
format.StringValue = function(parent, node, options) {
    // loog 'node : StringValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'string', 
        name: '', 
        isText: false, 
        textified: null, 
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
    var lines = textIndentParser.parse(ret.name);
    // loog 'lines', lines
    if (lines.length < 1) {
        var nodes = [],
            root = null,
            current = null,
            line,
            i,
            l = lines.length;
        for (var i = 0; i < l; i++) {
            line = lines[i];
            line.tag = '+';
            line.name = line.value;
            
            // loog line.value, 'added to', ret.tag, ret.name
            if (line.indent <= 0) {
                line.parent = ret;
                ret.children.push(line);
            }
            
            // loog line.value, 'added to', current.parent.tag, current.parent.name
            else if (line.indent == current.indent) {
                line.parent = current.parent;
                current.parent.children.push(line);
            }
            
            // loog line.value, 'added to', current.tag, current.name
            else if (line.indent > current.indent) {
                line.parent = current;
                current.children.push(line);
            }
            else if (line.indent < current.indent) {
                var parent = current.parent;
                while (parent != null && line.indent < parent.indent) {
                    parent = parent.parent;
                }
                line.parent = parent.parent;
                
                // loog line.value, 'added to', parent.parent.tag, parent.parent.name
                if (parent.parent) {
                    parent.parent.children.push(line);
                }
                // loog line.value, 'added to', ret.tag, ret.name
                else {
                    ret.children.push(line);
                }
            }
            current = line;
            current.children = [];
        }
        ret.tag = 'string';
        ret.name = null;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ListValue
format.ListValue = function(parent, node, options) {
    // loog 'node : ListValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '[', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection values and append ittfNode(s) to `ret`
    if (node.values) {
        if (typeof node.values.length === 'undefined') {
            throw new Error('Property node.values must be an array');
        }
        var i, i_items=node.values, i_len=node.values.length, item;
        for (i=0; i<i_len; i++) {
            item = node.values[i];
            item.__parent = {
                name: 'values', 
                len: node.values.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection values undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ObjectValue
format.ObjectValue = function(parent, node, options) {
    // loog 'node : ObjectValue ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '{', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection fields and append ittfNode(s) to `ret`
    if (node.fields) {
        if (typeof node.fields.length === 'undefined') {
            throw new Error('Property node.fields must be an array');
        }
        var i, i_items=node.fields, i_len=node.fields.length, item;
        for (i=0; i<i_len; i++) {
            item = node.fields[i];
            item.__parent = {
                name: 'fields', 
                len: node.fields.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection fields undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node ObjectField
format.ObjectField = function(parent, node, options) {
    // loog 'node : ObjectField ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('ObjectField. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property value and append ittfNode to `ret`
    if (node.value) {
        if (!node.value.kind) {
            throw 'Node value has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.value, options)
    }
    else {
        throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret.children.length == 1) {
        if (ret.children[0].tag = 'var') {
            ret.name = ret.name + ' ' + ret.children[0].name;
            ret.children.length = 0;
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node FragmentDefinition
format.FragmentDefinition = function(parent, node, options) {
    // loog 'node : FragmentDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'fragment', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('FragmentDefinition. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    var p_typeCondition = {
        textified: null, 
        isText: false, 
        children: [
            
        ]
     };
    
    /**
        * TODO VIA
        * 
            * new Error('AST-property typeCondition/on not managed by f_p_tag')
    */
    if (node.typeCondition) {
        if (!node.typeCondition.kind) {
            throw 'Node typeCondition has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_typeCondition, node.typeCondition, options)
        p_typeCondition.tag = 'on';
        ret.children.push(p_typeCondition)
        if (p_typeCondition.children.length == 1) {
            if (!(p_typeCondition.children[0].isText || p_typeCondition.children[0].textified)) {
                p_typeCondition.name = p_typeCondition.children[0].name;
                p_typeCondition.source = p_typeCondition.children[0].source;
                p_typeCondition.children = p_typeCondition.children[0].children;
            }
            else {
                if (p_typeCondition.children[0].textified) {
                    p_typeCondition.textified = p_typeCondition.children[0].textified;
                }
                if (p_typeCondition.children[0].isText) {
                    p_typeCondition.isText = true;
                    p_typeCondition.name = p_typeCondition.children[0].name;
                    p_typeCondition.source = p_typeCondition.children[0].source;
                    p_typeCondition.children = [];
                }
            }
        }
    }
    // loog 'FragmentDefinition.p_typeCondition', p_typeCondition
    if (p_typeCondition.children.length == 1 && p_typeCondition.children[0].tag == "namedType") {
        p_typeCondition.name = p_typeCondition.children[0].name;
        p_typeCondition.children.length = 0;
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property selectionSet and append ittfNode to `ret`
    if (node.selectionSet) {
        if (!node.selectionSet.kind) {
            throw 'Node selectionSet has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.selectionSet, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node FragmentSpread
format.FragmentSpread = function(parent, node, options) {
    // loog 'node : FragmentSpread ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '...', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('FragmentSpread. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node InlineFragment
format.InlineFragment = function(parent, node, options) {
    // loog 'node : InlineFragment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '...on', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property typeCondition and set it in a var
    var p_typeCondition = null;
    if (node.typeCondition) {
        p_typeCondition = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.typeCondition.kind) {
            throw 'Node typeCondition has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_typeCondition, node.typeCondition, options)
        if (p_typeCondition.children.length == 1) {
            if (isTextualNode(p_typeCondition.children[0]) == false) {
                p_typeCondition.tag = p_typeCondition.children[0].tag;
                p_typeCondition.name = p_typeCondition.children[0].name;
                p_typeCondition.source = p_typeCondition.children[0].source;
                p_typeCondition.children = p_typeCondition.children[0].children;
            }
            else {
                p_typeCondition.tag = p_typeCondition.children[0].tag;
                p_typeCondition.name = getNodeText(p_typeCondition.children[0]);
                p_typeCondition.textified = p_typeCondition.name;
                p_typeCondition.children = [];
            }
        }
    }
    if (p_typeCondition != null) {
        if (isTextualNode(p_typeCondition)) {
            ret.name = getNodeText(p_typeCondition);
            ret.textified = ret.name;
        }
        else {
            ret.children.push(p_typeCondition);
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // process AST-node-property selectionSet and append ittfNode to `ret`
    if (node.selectionSet) {
        if (!node.selectionSet.kind) {
            throw 'Node selectionSet has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.selectionSet, options)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node VariableDefinition
format.VariableDefinition = function(parent, node, options) {
    // loog 'node : VariableDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'var-def', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property variable and set it in a var
    var p_variable = null;
    if (node.variable) {
        p_variable = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.variable.kind) {
            throw 'Node variable has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_variable, node.variable, options)
        if (p_variable.children.length == 1) {
            if (isTextualNode(p_variable.children[0]) == false) {
                p_variable.tag = p_variable.children[0].tag;
                p_variable.name = p_variable.children[0].name;
                p_variable.source = p_variable.children[0].source;
                p_variable.children = p_variable.children[0].children;
            }
            else {
                p_variable.tag = p_variable.children[0].tag;
                p_variable.name = getNodeText(p_variable.children[0]);
                p_variable.textified = p_variable.name;
                p_variable.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property variable undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'Variable', p_variable
    // process AST-node-property type and set it in a var
    var p_type = null;
    if (node.type) {
        p_type = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.type.kind) {
            throw 'Node type has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_type, node.type, options)
        if (p_type.children.length == 1) {
            if (isTextualNode(p_type.children[0]) == false) {
                p_type.tag = p_type.children[0].tag;
                p_type.name = p_type.children[0].name;
                p_type.source = p_type.children[0].source;
                p_type.children = p_type.children[0].children;
            }
            else {
                p_type.tag = p_type.children[0].tag;
                p_type.name = getNodeText(p_type.children[0]);
                p_type.textified = p_type.name;
                p_type.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property type undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'Type', p_type
    ret.tag = p_type.name;
    ret.name = p_variable.name;
    // process AST-node-property defaultValue and append ittfNode to `ret`
    if (node.defaultValue) {
        if (!node.defaultValue.kind) {
            throw 'Node defaultValue has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.defaultValue, options)
    }
    if (ret.children.length == 1) {
        ret.children[0].tag = '=';
        if (p_type.name == 'string') {
            ret.children[0].name = '"' +  ret.children[0].name + '"';
        }
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
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
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node Variable
format.Variable = function(parent, node, options) {
    // loog 'node : Variable ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: 'var', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = '$' + getNodeText(p_name);
        ret.textified = ret.name;
    }
    else {
        ret.children.push(p_name);
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node DirectiveDefinition
format.DirectiveDefinition = function(parent, node, options) {
    // loog 'node : DirectiveDefinition ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: ':%', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        new Error('name. Expected textual name: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection arguments and append ittfNode(s) to `ret`
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            item.__parent = {
                name: 'arguments', 
                len: node.arguments.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection arguments undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection locations and
    // embed its array of nodes in a temp var
    var p_locations = null;
    if (node.locations) {
        if (typeof node.locations.length === 'undefined') {
            throw new Error('Property node.locations must be an array');
        }
        p_locations = {
            tag: 'notUsed', 
            children: [
                
            ]
         };
        var i, i_items=node.locations, i_len=node.locations.length, item;
        for (i=0; i<i_len; i++) {
            item = node.locations[i];
            item.__parent = {
                name: 'locations', 
                len: node.locations.length
             };
            format(p_locations, item, options)
        }
    }
    var i, i_items=p_locations.children, i_len=p_locations.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_locations.children[i];
        // loog 'DirectiveDefinition.item', item
        item.tag = 'on';
        ret.children.push(item)
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
// process AST node Directive
format.Directive = function(parent, node, options) {
    // loog 'node : Directive ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['kind', 'start', 'end', 'loc'].indexOf(item) < 0) {
            
            // loog 'property', item, node[item], verify.isArray(node[item]) ? 'array' : ''
            if (verify.isNotEmpty(node[item])) {
            }
            // loog 'property', item, verify.isArray(node[item]) ? 'array' : ''
            else {
            }
        }
    }
    var ret = {
        tag: '%', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (node.name) {
        p_name = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.name.kind) {
            throw 'Node name has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_name, node.name, options)
        if (p_name.children.length == 1) {
            if (isTextualNode(p_name.children[0]) == false) {
                p_name.tag = p_name.children[0].tag;
                p_name.name = p_name.children[0].name;
                p_name.source = p_name.children[0].source;
                p_name.children = p_name.children[0].children;
            }
            else {
                p_name.tag = p_name.children[0].tag;
                p_name.name = getNodeText(p_name.children[0]);
                p_name.textified = p_name.name;
                p_name.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog 'Directive', p_name
    // process AST-node-property-collection arguments and append ittfNode(s) to `ret`
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            item.__parent = {
                name: 'arguments', 
                len: node.arguments.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection arguments undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = p_name.name;
    // loog '### add ', ret.tag , 'to', parent.tag
    parent.children.push(ret);
}
;
