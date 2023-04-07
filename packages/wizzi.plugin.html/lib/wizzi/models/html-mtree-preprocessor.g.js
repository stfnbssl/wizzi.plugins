/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\wizzi\models\html-mtree-preprocessor.g.js.ittf
    utc time: Fri, 07 Apr 2023 18:44:40 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
var HtmlJsPreprocessor = require('./html-js-mtree-preprocessor.g');
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
    if (node.n === '--css' || inferCssInclude(node)) {
        node.n = '::style';
        if (childNameIsOneOf(node, ['css']) == false) {
            var scoped = extractRemove(node, 'scoped');
            wrapChilds(node, {
                n: 'css', 
                v: ''
             })
            if (scoped) {
                node.children.push(scoped)
            }
            return true;
        }
    }
    else if (node.n === '--js' || inferJsInclude(node)) {
        node.n = '::script';
        if (childNameIsOneOf(node, ['module']) == false) {
            var type = extractRemove(node, 'type');
            wrapChilds(node, {
                n: 'module', 
                v: '', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react'
                     }
                ]
             })
            if (type) {
                node.children.push(type)
            }
        }
        HtmlJsPreprocessor(node);
        return true;
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
    else if (inferReadyInclude(node)) {
        node.n = '::ready';
        if (node.children[0] && node.children[0].n !== 'module') {
            wrapChilds(node, {
                n: 'module', 
                v: '', 
                children: [
                    
                ]
             })
        }
        return true;
    }
    else if (inferJsonObjectInclude(node)) {
        node.n = '::data-object';
        return true;
    }
    else if (inferJsonArrayInclude(node)) {
        node.n = '::data-array';
        return true;
    }
    
    // loog '%$%$%$%$%$'
    else if (['ittf-panel', 'js-panel', 'bash-panel'].indexOf(node.n) >-1) {
        node.wzMTreeData = {
            mTree: state.mTree
         };
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            if (item.n === 'ittf') {
                node.wzMTreeData[item.n] = processIttf(item);
            }
            else {
                node.wzMTreeData[item.n] = item.v;
            }
        }
        node.children = [];
    }
    else {
        return false;
    }
}
function inferCssInclude(node) {
    if (node.n === '@style' || node.n === 'style') {
        if (descendentNameIsOneOf(node, ['css', '<', '.', '#'])) {
            return true;
        }
    }
    return false;
}
function inferJsInclude(node) {
    if (node.n === 'script') {
        if (descendentNameIsOneOf(node, ['src']) == false) {
            return true;
        }
    }
    return false;
}
function inferSvgInclude(node) {
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
function inferReadyInclude(node) {
    if (node.n === 'ready') {
        return true;
    }
    return false;
}
function inferJsonObjectInclude(node) {
    if (node.n === 'json' && childNameIsOneOf(node, ['{'])) {
        return true;
    }
    return false;
}
function inferJsonArrayInclude(node) {
    if (node.n === 'json' && childNameIsOneOf(node, ['['])) {
        return true;
    }
    return false;
}
function processIttf(node) {
    if (node.n === '$raw') {
        node.n = node.v;
        node.v = '';
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        processIttf(child)
    }
    return node;
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
