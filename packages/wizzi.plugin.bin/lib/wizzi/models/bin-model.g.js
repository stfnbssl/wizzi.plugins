/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.bin\.wizzi-override\lib\wizzi\models\bin-model.g.js.ittf
    utc time: Thu, 09 May 2024 13:28:11 GMT
*/
'use strict';
/**
     Pseudo schema text
*/
var util = require('util');

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes.length));
    }
    var root = mTree.nodes[0];
    if (root.n !== "bin") {
        return callback(error('The root node of a bin ittf document must be : "bin". Found: ' + root.n + ' ' + root.v + ', mTree: ' + util.inspect(mTree, { depth: null } )));
    }
    console.log(root.children.length, root.children[0].n, __filename);
    if (root.children.length != 1 || root.children[0].n != 'file') {
        return callback(error('The root node of a bin ittf document must have a "file" node children, mTree: ' + util.inspect(mTree, { depth: null } )));
    }
    var fileNode = root.children[0];
    console.log(fileNode.children.length, fileNode.children[0].n, __filename);
    if (fileNode.children.length !== 1 || fileNode.children[0].n != 'data') {
        return callback(error('Missing "data" node children, mTree: ' + util.inspect(mTree, { depth: null } )));
    }
    var dataNode = fileNode.children[0];
    return callback(null, {
            data: dataNode.v
         });
}
;
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi.plugin.bin/lib/wizzi/models/bin-model.g', 
            message: message
         };
}
