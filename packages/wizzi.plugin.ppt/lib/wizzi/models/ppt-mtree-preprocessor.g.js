/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ppt\.wizzi-override\lib\wizzi\models\ppt-mtree-preprocessor.g.js.ittf
    utc time: Fri, 06 Jun 2025 19:59:24 GMT
*/
var verify = require('@wizzi/utils').verify;
var mdfs = {};
mdfs['p'] = function(node, state) {
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        if (['p','+'].indexOf(item.n) > -1) {
            node.n = 'p-stack';
        }
    }
    return true;
}
;
mdfs['link'] = function(node, state) {
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        if (['slide'].indexOf(item.n) > -1) {
            item.n = 'slide-href';
        }
    }
    return true;
}
;
mdfs['bullet'] = function(node, state) {
    if (node.children.length > 0) {
        node.n = 'bullet-obj';
    }
    return true;
}
;
function preprocessNode(node, state) {
    // loog 'preprocessNode', node.n
    // write here your prepocessing code
    var f = mdfs[node.n];
    if (f) {
        return f(node, state);
    }
    else if (inferSvgInclude(node)) {
        node.n = '::media';
        if (node.children[0] && node.children[0].n !== 'svg') {
            wrapChilds(node, {
                n: 'svg', 
                v: '', 
                children: [
                    
                ]
             })
        }
        return true;
    }
    else {
        return false;
    }
}
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
function inferSvgInclude(node) {
    // loog 'inferSvgInclude', node.n
    if (node.n === '::media' && descendentNameIsOneOf(node, ['svg'])) {
        return true;
    }
    if (node.n === 'svg') {
        if (descendentNameIsOneOf(node, ['src']) == false) {
            return true;
        }
    }
    return false;
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