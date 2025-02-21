/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wfschema\.wizzi-override\lib\wizzi\models\wfschema-mtree-preprocessor.g.js.ittf
    utc time: Wed, 20 Mar 2024 07:13:55 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
var stringify = require('json-stringify-safe');
module.exports = function(mTree, context) {
    var state = {
        mTree: mTree, 
        parent: null
     };
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, item;
    for (i=0; i<i_len; i++) {
        item = mTree.nodes[0].children[i];
        traverse(item, state);
    }
    return mTree;
}
;
function traverse(node, state) {
    if (preprocessNode(node, state)) {
        return ;
    }
    var saveParent = state.parent;
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        traverse(item, state);
    }
    state.parent = saveParent;
}
function preprocessNode(node, state) {
    if (node.n === 'declare') {
        console.log('mtree-preprocessor.declare', node.n, node.v, __filename);
        const jsInclude = {
            n: '::js', 
            v: '', 
            children: [
                {
                    n: 'module', 
                    v: 'wfschema.method.' + node.v, 
                    children: [
                        {
                            n: 'kind', 
                            v: 'es6', 
                            children: [
                                
                            ]
                         }
                    ]
                 }
            ]
         };
        const replChildren = jsInclude.children[0].children;
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            replChildren.push(item);
        }
        node.children = [jsInclude];
        console.log("mtree-preprocessor.declare.result.node\n", __filename);
        dumpForTest(node, 0);
    }
    if (node.n === 'm') {
        console.log('mtree-preprocessor.m.', node.n, node.v, node.parent && node.parent.n, node.parent && node.parent.v, __filename);
        const replChildren = [];
        const jsInclude = {
            n: '::js', 
            v: '', 
            children: [
                {
                    n: 'module', 
                    v: 'wfschema.method.' + node.v, 
                    children: [
                        {
                            n: 'kind', 
                            v: 'es6', 
                            children: [
                                
                            ]
                         }
                    ]
                 }
            ]
         };
        const jsStatements = jsInclude.children[0].children;
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.n === 'param' || item.n === 'static') {
                replChildren.push(item);
            }
            else {
                jsStatements.push(item);
            }
        }
        replChildren.push(jsInclude);
        node.children = replChildren;
        console.log("mtree-preprocessor.m.result.node\n", __filename);
        dumpForTest(node, 0);
    }
    else {
        return false;
    }
}
function dumpForTest(node, indent) {
    var spaces = new Array(indent).join(' ');
    console.log("[32m%s[0m", spaces, node.n, node.v);
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        dumpForTest(item, indent+4);
    }
}
function childNameIsOneOf(node, names) {
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        var j, j_items=names, j_len=names.length, name;
        for (j=0; j<j_len; j++) {
            name = names[j];
            if (child.n === name) {
                return true;
            }
        }
    }
    return false;
}
function descendentNameIsOneOf(node, names) {
    var found;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        var j, j_items=names, j_len=names.length, name;
        for (j=0; j<j_len; j++) {
            name = names[j];
            if (child.n == name) {
                return true;
            }
        }
        found = descendentNameIsOneOf(child, names)
        ;
        if (found) {
            return true;
        }
    }
    return false;
}
function extractRemove(node, n) {
    var ret;
    var children = node.children;
    node.children = [];
    var i, i_items=children, i_len=children.length, item;
    for (i=0; i<i_len; i++) {
        item = children[i];
        if (item.n === n) {
        }
        else {
            node.children.push(item)
        }
    }
}
function wrapChilds(node, newN) {
    copyNodeAttrsDeep(node, newN)
    var children = node.children;
    newN.parent = node.parent;
    node.children = [ newN ];
    var i, i_items=children, i_len=children.length, item;
    for (i=0; i<i_len; i++) {
        item = children[i];
        newN.children.push(item)
    }
}
function copyNodeAttrsDeep(nfrom, nto) {
    copyNodeAttrs(nfrom, nto)
    var i, i_items=nto.children, i_len=nto.children.length, item;
    for (i=0; i<i_len; i++) {
        item = nto.children[i];
        copyNodeAttrsDeep(nfrom, item)
    }
}
function copyNodeAttrs(nfrom, nto) {
    nto.r = nfrom.r;
    nto.c = nfrom.c;
    nto.s = nfrom.s;
    nto.u = nfrom.u;
    if (typeof nto.children === 'undefined') {
        nto.children = [];
    }
}
