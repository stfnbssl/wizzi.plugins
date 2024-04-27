/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.css\.wizzi-override\lib\wizzi\models\css-mtree-preprocessor.g.js.ittf
    utc time: Thu, 25 Apr 2024 11:40:57 GMT
*/
'use strict';
var verify = require('@wizzi/utils').verify;
module.exports = function(mTree, context) {
    // loog 'wizzi-web.css.preprocess.mTree', mTree
    var state = {
        mTree: mTree, 
        parent: null, 
        actions: [
            
        ]
     };
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, item;
    for (i=0; i<i_len; i++) {
        item = mTree.nodes[0].children[i];
        traverse(item, state);
    }
    var i, i_items=state.actions, i_len=state.actions.length, item;
    for (i=0; i<i_len; i++) {
        item = state.actions[i];
        if (item.code === 'add-attr') {
            var children = item.to.children;
            item.to.children = [
                {
                    n: item.n, 
                    v: item.v, 
                    r: item.to.r, 
                    c: item.to.c, 
                    s: item.to.s, 
                    u: item.to.u, 
                    children: [
                        
                    ]
                 }
            ];
            var j, j_items=children, j_len=children.length, c;
            for (j=0; j<j_len; j++) {
                c = children[j];
                item.to.children.push(c)
            }
        }
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
        state.parent = node;
        traverse(item, state);
    }
    state.parent = saveParent;
}
function preprocessNode(node, state) {
    // loog 'css-mtree-processor preprocessNode', node.n, node.v
    if (node.n === 'styled') {
        if (node.children.length == 1 && node.children[0].n == "css") {
            return false;
        }
        var arrow;
        var savedchildren = [];
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            if (child.n == '=>') {
                arrow = child;
            }
            else {
                savedchildren.push(child)
            }
        }
        var cssnode = {
            n: "css", 
            v: "", 
            r: node.r, 
            c: node.c, 
            s: node.s, 
            u: node.u, 
            children: [
                {
                    n: "<", 
                    v: "--styled--", 
                    r: node.r, 
                    c: node.c, 
                    s: node.s, 
                    u: node.u, 
                    children: savedchildren
                 }
            ]
         };
        node.children = arrow ? [arrow, cssnode] : [cssnode];
        var i, i_items=savedchildren, i_len=savedchildren.length, child;
        for (i=0; i<i_len; i++) {
            child = savedchildren[i];
            traverse(child, state)
        }
        return true;
    }
    return false;
}
function addAttr(state, node, attr) {
    state.actions.push({
        code: 'add-attr', 
        to: node, 
        n: attr, 
        v: ''
     })
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
