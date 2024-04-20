/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ittf\.wizzi-override\lib\wizzi\models\ittf-model.g.js.ittf
    utc time: Sat, 20 Apr 2024 04:22:12 GMT
*/
'use strict';
/**
     Pseudo schema ittf
*/
var util = require('util');
var lineParser = require('./lineParser');

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    if (!mTree.nodes || mTree.nodes.length != 1) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes.length));
    }
    var root = mTree.nodes[0];
    var ittf = toIttfNode(root);
    if (ittf && ittf.__is_error) {
        console.log("[31m%s[0m", '__is_error ', ittf);
        return callback(ittf);
    }
    ittf.wzElement = 'ittf';
    ittf.mTree = mTree;
    return callback(null, ittf);
}
;
function toIttfNode(node) {
    var ret = {
        name: node.n, 
        value: node.v, 
        children: []
     };
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            ret.children.push(toIttfNode(child))
        }
    }
    return ret;
}
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/wizzi/models/ittf-model.g', 
            message: message
         };
}
