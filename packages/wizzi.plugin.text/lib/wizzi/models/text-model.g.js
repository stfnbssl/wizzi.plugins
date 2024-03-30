/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.text\.wizzi-override\lib\wizzi\models\text-model.g.js.ittf
    utc time: Thu, 21 Mar 2024 16:05:54 GMT
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
    if (root.n !== "text") {
        return callback(error('The root node of a text ittf document must be : "text". Found: ' + root.n + ' ' + root.v + ', mTree: ' + util.inspect(mTree, { depth: null } )));
    }
    // loog 'wizzi-core.wizzi.models.text-model root', root
    // loog 'wizzi-core.wizzi.models.text-model root.children[0].children', root.children[0].children
    var sb = [];
    //
    // TODO in text-factory do not insert another root text node
    // we now have
    // text
    // text
    // lorem ipsum
    // lorem ipsum
    // Do eliminate the first 'text' node !
    //
    var hr = toText('', sb, root.children);
    if (hr && hr.__is_error) {
        console.log("[31m%s[0m", '__is_error ', hr);
        return callback(hr);
    }
    return callback(null, {
            wzElement: 'text', 
            content: sb.join('\n')
         });
}
;
function toText(indent, sb, nodes) {
    var i, i_items=nodes, i_len=nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = nodes[i];
        // loog 'wizzi-core/wizzi/models/text-model/toText', node.n, node.v
        var n = node.n;
        var v = node.v;
        var nextIndent = '    ';
        
        // skip
        if (n === 'text') {
            nextIndent = '';
        }
        else if (n === 'br' && (!v || v.length == 0)) {
            sb.push('');
        }
        else if (n === '\\br') {
            sb.push(indent + 'br ' + v);
        }
        else if (n === 'span') {
            sb[sb.length - 1] += v;
        }
        else if (n === '\\span') {
            sb.push(indent + 'span ' + v);
        }
        else if (n === 'bspan') {
            sb[sb.length - 1] += ' ' + v;
        }
        else if (n === '\\bspan') {
            sb.push(indent + 'bspan ' + v);
        }
        else if (n == '---' && v.length == 0) {
            sb.push('');
        }
        else if (n == '\\---' && v.length == 0) {
            sb.push('---');
        }
        else {
            sb.push(indent + n + ' ' + v);
        }
        if (node.children) {
            toText(indent + nextIndent, sb, node.children)
        }
    }
}
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/wizzi/models/text-model.g', 
            message: message
         };
}
