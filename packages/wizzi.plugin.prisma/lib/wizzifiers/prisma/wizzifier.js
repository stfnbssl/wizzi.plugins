/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\wizzifiers\prisma\wizzifier.js.ittf
    utc time: Wed, 27 Nov 2024 09:20:15 GMT
*/
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;
var lineParser = require('../utils/lineParser');
var file = require('@wizzi/utils').file;
var cloner = require('../utils/cloner');
var ittfWriter = require("../utils/ittfWriter");
var ittfMacro = require('@wizzi/utils').helpers.ittfMacro;
var prisma_parser = require('@loancrate/prisma-schema-parser');
// { formatAst, parsePrismaSchema } from '@loancrate/prisma-schema-parser')
var cleanAST = require('./cleanAST');

function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        syntax = prisma_parser.parsePrismaSchema(tobeWizzified)
        ;
        cleanAST(syntax);
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

var scalarTypes = [
    "String", 
    "Boolean", 
    "Int", 
    "BigInt", 
    "Float", 
    "Decimal", 
    "DateTime", 
    "Json", 
    "Bytes", 
    "Unsupported"
];

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
    // loog 'ast.kind', ast.kind
    var kind = ast.kind === 'arguments' ? 'xarguments' : ast.kind;
    kind = ast.kind === 'name' ? 'xname' : ast.kind;
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
        var root = {
            tag: 'prisma', 
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
// process AST node xname
format.xname = function(parent, node, options) {
    // loog 'node : xname ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
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
    // set ret.name = node.value
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node commentBlock
format.commentBlock = function(parent, node, options) {
    // loog 'node : commentBlock ----------------------------------------- parent  ittf tag : ', parent.tag
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
    // process AST-node-property-collection comments and append ittfNode(s) to `ret`
    if (node.comments) {
        if (typeof node.comments.length === 'undefined') {
            throw new Error('Property node.comments must be an array');
        }
        var i, i_items=node.comments, i_len=node.comments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.comments[i];
            item.__parent = {
                name: 'comments', 
                len: node.comments.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection comments undefined: ' + JSON.stringify(node, null, 2));
    }
}
;
// process AST node comment
format.comment = function(parent, node, options) {
    // loog 'node : comment ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: '#', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node docComment
format.docComment = function(parent, node, options) {
    // loog 'node : docComment ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: '###', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    ret.name = node.text;
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node schema
format.schema = function(parent, node, options) {
    // loog 'node : schema ----------------------------------------- parent  ittf tag : ', parent.tag
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
    // process AST-node-property-collection declarations and append ittfNode(s) to `ret`
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
}
;
// process AST node datasource
format.datasource = function(parent, node, options) {
    // loog 'node : datasource ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'datasource', 
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
    ret.name = p_name.name;
    // process AST-node-property-collection members and append ittfNode(s) to `ret`
    if (node.members) {
        if (typeof node.members.length === 'undefined') {
            throw new Error('Property node.members must be an array');
        }
        var i, i_items=node.members, i_len=node.members.length, item;
        for (i=0; i<i_len; i++) {
            item = node.members[i];
            item.__parent = {
                name: 'members', 
                len: node.members.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection members undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node config
format.config = function(parent, node, options) {
    // loog 'node : config ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'config', 
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
    ret.name = p_name.name;
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
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node literal
format.literal = function(parent, node, options) {
    // loog 'node : literal ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    var value = verify.isString(node.value) ? '"' + node.value + '"' : node.value;
    if (['@','name'].indexOf(parent.tag) > -1) {
        parent.name += ' ' + value;
        skip = true;
    }
    else if (['_','['].indexOf(parent.tag) > -1) {
        ret.tag = '@';
        ret.name = value;
    }
    else if (parent.tag == 'config') {
        ret.tag = '=';
        ret.name = value;
    }
    else {
        ret.name = value;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node path
format.path = function(parent, node, options) {
    // loog 'node : path ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'path', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    if (parent.tag == '_') {
        console.log(1 , node.value, __filename);
        parent.name = node.value.join('.');
        skip = true;
    }
    else if (['onDelete','onUpdate'].indexOf(parent.tag) > -1) {
        console.log(2 , node.value, __filename);
        parent.name = node.value.join(',');
        skip = true;
    }
    else if (parent.tag == '[') {
        console.log(3 , node.value, __filename);
        ret.tag = '@';
        ret.name = node.value.join(',');
    }
    else {
        console.log(4 , node.value, __filename);
        if (node.value[0] == 'db') {
            ret.tag = '@';
            ret.name = node.value.join('.');
        }
        else {
            ret.tag = '=[';
            ret.name = node.value.join(',');
        }
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node functionCall
format.functionCall = function(parent, node, options) {
    // loog 'node : functionCall ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: '_', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property path and append ittfNode to `ret`
    if (node.path) {
        if (!node.path.kind) {
            throw 'Node path has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.path, options)
    }
    else {
        throw new Error('AST-node-property path undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection args and append ittfNode(s) to `ret`
    if (node.args) {
        if (typeof node.args.length === 'undefined') {
            throw new Error('Property node.args must be an array');
        }
        var i, i_items=node.args, i_len=node.args.length, item;
        for (i=0; i<i_len; i++) {
            item = node.args[i];
            item.__parent = {
                name: 'args', 
                len: node.args.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection args undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node generator
format.generator = function(parent, node, options) {
    // loog 'node : generator ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'generator', 
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
    ret.name = p_name.name;
    // process AST-node-property-collection members and append ittfNode(s) to `ret`
    if (node.members) {
        if (typeof node.members.length === 'undefined') {
            throw new Error('Property node.members must be an array');
        }
        var i, i_items=node.members, i_len=node.members.length, item;
        for (i=0; i<i_len; i++) {
            item = node.members[i];
            item.__parent = {
                name: 'members', 
                len: node.members.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection members undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node model
format.model = function(parent, node, options) {
    // loog 'node : model ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'model', 
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
    ret.name = p_name.name;
    // process AST-node-property-collection members and append ittfNode(s) to `ret`
    if (node.members) {
        if (typeof node.members.length === 'undefined') {
            throw new Error('Property node.members must be an array');
        }
        var i, i_items=node.members, i_len=node.members.length, item;
        for (i=0; i<i_len; i++) {
            item = node.members[i];
            item.__parent = {
                name: 'members', 
                len: node.members.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection members undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node field
format.field = function(parent, node, options) {
    // loog 'node : field ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'field', 
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
    ret.name = p_name.name;
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
    // process AST-node-property-collection attributes and append ittfNode(s) to `ret`
    if (node.attributes) {
        if (typeof node.attributes.length === 'undefined') {
            throw new Error('Property node.attributes must be an array');
        }
        var i, i_items=node.attributes, i_len=node.attributes.length, item;
        for (i=0; i<i_len; i++) {
            item = node.attributes[i];
            item.__parent = {
                name: 'attributes', 
                len: node.attributes.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection attributes undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node typeId
format.typeId = function(parent, node, options) {
    // loog 'node : typeId ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'type', 
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
    if (scalarTypes.indexOf(p_name.name) > -1) {
        ret.tag = ':' + p_name.name[0].toLowerCase() + p_name.name.substring(1);
    }
    else {
        ret.tag = ':ref';
        ret.name = p_name.name;
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node fieldAttribute
format.fieldAttribute = function(parent, node, options) {
    // loog 'node : fieldAttribute ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property path and set it in a var
    var p_path = null;
    if (node.path) {
        p_path = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.path.kind) {
            throw 'Node path has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_path, node.path, options)
        if (p_path.children.length == 1) {
            if (isTextualNode(p_path.children[0]) == false) {
                p_path.tag = p_path.children[0].tag;
                p_path.name = p_path.children[0].name;
                p_path.source = p_path.children[0].source;
                p_path.children = p_path.children[0].children;
            }
            else {
                p_path.tag = p_path.children[0].tag;
                p_path.name = getNodeText(p_path.children[0]);
                p_path.textified = p_path.name;
                p_path.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property path undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = p_path.name;
    // process AST-node-property-collection args and append ittfNode(s) to `ret`
    if (node.args) {
        if (typeof node.args.length === 'undefined') {
            throw new Error('Property node.args must be an array');
        }
        var i, i_items=node.args, i_len=node.args.length, item;
        for (i=0; i<i_len; i++) {
            item = node.args[i];
            item.__parent = {
                name: 'args', 
                len: node.args.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection args undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node blockAttribute
format.blockAttribute = function(parent, node, options) {
    // loog 'node : blockAttribute ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: '@@', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property path and set it in a var
    var p_path = null;
    if (node.path) {
        p_path = {
            textified: null, 
            isText: false, 
            children: [
                
            ]
         };
        if (!node.path.kind) {
            throw 'Node path has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(p_path, node.path, options)
        if (p_path.children.length == 1) {
            if (isTextualNode(p_path.children[0]) == false) {
                p_path.tag = p_path.children[0].tag;
                p_path.name = p_path.children[0].name;
                p_path.source = p_path.children[0].source;
                p_path.children = p_path.children[0].children;
            }
            else {
                p_path.tag = p_path.children[0].tag;
                p_path.name = getNodeText(p_path.children[0]);
                p_path.textified = p_path.name;
                p_path.children = [];
            }
        }
    }
    else {
        throw new Error('AST-node-property path undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = p_path.name;
    // process AST-node-property-collection args and append ittfNode(s) to `ret`
    if (node.args) {
        if (typeof node.args.length === 'undefined') {
            throw new Error('Property node.args must be an array');
        }
        var i, i_items=node.args, i_len=node.args.length, item;
        for (i=0; i<i_len; i++) {
            item = node.args[i];
            item.__parent = {
                name: 'args', 
                len: node.args.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection args undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node optional
format.optional = function(parent, node, options) {
    // loog 'node : optional ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: ':optional', 
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
    parent.children.push(p_type)
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node list
format.list = function(parent, node, options) {
    // loog 'node : list ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
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
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node array
format.array = function(parent, node, options) {
    // loog 'node : array ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: '[', 
        name: '', 
        isText: false, 
        textified: null, 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
     };
    // process AST-node-property-collection items and append ittfNode(s) to `ret`
    if (node.items) {
        if (typeof node.items.length === 'undefined') {
            throw new Error('Property node.items must be an array');
        }
        var i, i_items=node.items, i_len=node.items.length, item;
        for (i=0; i<i_len; i++) {
            item = node.items[i];
            item.__parent = {
                name: 'items', 
                len: node.items.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection items undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node namedArgument
format.namedArgument = function(parent, node, options) {
    // loog 'node : namedArgument ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'namedArgument', 
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
    ret.tag = p_name.name;
    // process AST-node-property expression and append ittfNode to `ret`
    if (node.expression) {
        if (!node.expression.kind) {
            throw 'Node expression has no kind: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.expression, options)
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;
// process AST node type
format.type = function(parent, node, options) {
    // loog 'node : type ----------------------------------------- parent  ittf tag : ', parent.tag
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
    var skip = false;
    var ret = {
        tag: 'type', 
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
    ret.name = p_name.name;
    // process AST-node-property-collection members and append ittfNode(s) to `ret`
    if (node.members) {
        if (typeof node.members.length === 'undefined') {
            throw new Error('Property node.members must be an array');
        }
        var i, i_items=node.members, i_len=node.members.length, item;
        for (i=0; i<i_len; i++) {
            item = node.members[i];
            item.__parent = {
                name: 'members', 
                len: node.members.length
             };
            format(ret, item, options)
        }
    }
    else {
        throw new Error('AST-node-property-collection members undefined: ' + JSON.stringify(node, null, 2));
    }
    // loog '### add ', ret.tag , 'to', parent.tag
    if (skip == false) {
        parent.children.push(ret);
    }
}
;