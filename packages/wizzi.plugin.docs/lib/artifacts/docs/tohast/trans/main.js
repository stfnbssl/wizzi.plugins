/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docs\.wizzi-override\lib\artifacts\docs\tohast\trans\main.js.ittf
    utc time: Fri, 16 Jun 2023 09:56:06 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = verify.lineParser;
var errors = require('../../../../../errors');

var md = module.exports = {};
var myname = 'wizzi.plugin.docs.docs.extended.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'docs') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "docs". Received: ' + model.wzElement, model));
    }
    
    try {
        const state = {
            stack: [
                
            ], 
            paragraphLevels: [
                
            ]
         };
        const transformedModel = astElement('html');
        state.stack.push(transformedModel)
        state.paragraphLevels.push({
            number: 0, 
            transformedModel
         })
        doNodes(model, transformedModel, state)
        callback(null, transformedModel)
    } 
    catch (ex) {
        return callback(ex);
    } 
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.docs/lib/artifacts/docs/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function doNodes(model, resultObj, state) {
    var i, i_items=model.nodes, i_len=model.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = model.nodes[i];
        doNode(node, resultObj, state)
    }
}
function doNode(model, resultObj, state) {
    var f = functors[model.wzElement];
    if (f) {
        f(model, resultObj, state)
    }
}
var functors = {};
functors.heading1 = function(node, resultObj, state) {
    var astItem = astElement('h1', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.heading2 = function(node, resultObj, state) {
    var astItem = astElement('h2', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.heading3 = function(node, resultObj, state) {
    var astItem = astElement('h3', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.heading4 = function(node, resultObj, state) {
    var astItem = astElement('h4', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.heading5 = function(node, resultObj, state) {
    var astItem = astElement('h5', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.heading6 = function(node, resultObj, state) {
    var astItem = astElement('h6', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.text = function(node, resultObj, state) {
    var stackLevel = state.stack.length;
    var paraLevel = state.paragraphLevels[state.paragraphLevels.length-1].number;
    var parent = state.stack[state.stack.length-1];
    // log 'functors.text', 'state.stack.length', stackLevel, paraLevel
    console.log('functors.text', 'parent', parent && parent.tagName, __filename);
    var astItem;
    if ((stackLevel - paraLevel) == 1) {
        astItem = astElement('p', node.wzName)
        ;
    }
    else {
        astItem = astText((parent && parent.tagName == 'p' ? ' ' : '') + node.wzName)
        ;
    }
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.unorderedList = function(node, resultObj, state) {
    var astItem = astElement('ul', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.orderedList = function(node, resultObj, state) {
    var astItem = astElement('ol', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.listItem = function(node, resultObj, state) {
    var astItem = astElement('li', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.table = function(node, resultObj, state) {
    var astItem = astElement('table', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.tableHead = function(node, resultObj, state) {
    var astItem = astElement('thead', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.tableBody = function(node, resultObj, state) {
    var astItem = astElement('tbody', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.tableRow = function(node, resultObj, state) {
    var astItem = astElement('tr', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.tableCell = function(node, resultObj, state) {
    var astItem = astElement('td', node.wzName);
    state.stack.push(astItem)
    doNodes(node, astItem, state)
    resultObj.children.push(astItem)
    state.stack.pop();
}
;
functors.codeLines = function(node, resultObj, state) {
    var builder = [];
    var i, i_items=node.nodes, i_len=node.nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = node.nodes[i];
        buildCodeText(child, builder, 0)
    }
    var astItem = {
        type: 'codeLines', 
        language: node.wzName, 
        schema: node.schema, 
        title: node.title, 
        content: builder.join(''), 
        children: [
            
        ]
     };
    resultObj.children.push(astItem)
}
;
function astElement(tagName, text) {
    var astItem = {
        type: 'element', 
        tagName: tagName, 
        properties: {
            
         }, 
        children: [
            
        ]
     };
    if (verify.isNotEmpty(text)) {
        astItem.children.push({
            type: 'text', 
            value: text
         })
    }
    return astItem;
}
function astText(text) {
    var astItem = {
        type: 'text', 
        value: text, 
        children: [
            
        ]
     };
    return astItem;
}
function buildCodeText(node, builder, indent) {
    builder.push(new Array(indent*4).join(' '))
    builder.push(node.wzName)
    builder.push('\n')
    var i, i_items=node.nodes, i_len=node.nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = node.nodes[i];
        buildCodeText(child, builder, indent + 1)
    }
}
