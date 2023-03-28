/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.vue\.wizzi-override\lib\wizzi\models\vue-mtree-preprocessor.g.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
module.exports = function(mTree, context) {
    // loog 'preprocess.mTree', mTree
    var i, i_items=mTree.nodes[0].children, i_len=mTree.nodes[0].children.length, item;
    for (i=0; i<i_len; i++) {
        item = mTree.nodes[0].children[i];
        level1(item);
    }
    return mTree;
}
;
function level1(model) {
    if (model.n === 'template') {
        traverse(model, {
            isTemplate: true
         })
        model.n = '::template';
        wrapChilds(model, {
            n: 'html', 
            v: ''
         })
    }
    else if (model.n === 'script') {
        var lang = extractRemove(model, 'lang');
        if (!lang) {
            lang = extractRemove(model, 'language')
            ;
        }
        model.n = lang === 'ts' ? '::script-ts' : '::script';
        var newN = {
            n: 'module', 
            v: '', 
            children: [
                
            ]
         };
        if (lang !== 'ts') {
            newN.children.push({
                n: 'kind', 
                v: 'react'
             })
        }
        wrapChilds(model, newN)
    }
    else if (model.n === 'style') {
        model.n = '::style';
        var scoped = extractRemove(model, 'scoped');
        wrapChilds(model, {
            n: 'css', 
            v: ''
         })
        if (scoped) {
            model.children.push(scoped)
        }
    }
}
function preprocessNode(node, state) {
    
    // loog 'preprocessNode', node.n, node.v
    if (state.isTemplate) {
        if (['<', '@', '.', '#', '+'].indexOf(node.n) < 0) {
            if (isVueStdAttribute(node) == false) {
                
                // loog 'preprocessNode 2', node.n, node.v
                if (node.n.substr(0, 2) === 'v-' || ['router-link', 'router-view'].indexOf(node.n) > -1) {
                    node.v = node.n + ' ' + node.v;
                    node.n = '<';
                }
                
                // loog 'preprocessNode 2', node.n, node.v
                else if (isHtmlTag(node) == false) {
                    node.v = node.n + ' ' + node.v;
                    node.n = '@';
                }
            }
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
function extractRemove(model, n) {
    var ret = null;
    var children = model.children;
    model.children = [];
    var i, i_items=children, i_len=children.length, item;
    for (i=0; i<i_len; i++) {
        item = children[i];
        if (item.n === n) {
            ret = item.v;
        }
        else {
            model.children.push(item)
        }
    }
    return ret;
}
function wrapChilds(model, newN) {
    // loog 'wrapChild', model.children
    copyNodeAttrsDeep(model, newN)
    var children = model.children;
    newN.parent = model.parent;
    model.children = [ newN ];
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
var _html_tags = [
    'a', 
    'abbr', 
    'acronym', 
    'address', 
    'applet', 
    'area', 
    'article', 
    'aside', 
    'audio', 
    'b', 
    'base', 
    'basefont', 
    'bdi', 
    'bdo', 
    'big', 
    'blockquote', 
    'body', 
    'br', 
    'button', 
    'canvas', 
    'caption', 
    'center', 
    'cite', 
    'code', 
    'col', 
    'colgroup', 
    'data', 
    'datalist', 
    'dd', 
    'del', 
    'details', 
    'dfn', 
    'dialog', 
    'dir', 
    'div', 
    'dl', 
    'dt', 
    'em', 
    'embed', 
    'fieldset', 
    'figcaption', 
    'figure', 
    'font', 
    'footer', 
    'form', 
    'frame', 
    'frameset', 
    'h1', 
    'h2', 
    'h3', 
    'h4', 
    'h5', 
    'h6', 
    'head', 
    'header', 
    'hr', 
    'html', 
    'i', 
    'iframe', 
    'img', 
    'input', 
    'ins', 
    'kbd', 
    'label', 
    'legend', 
    'li', 
    'link', 
    'main', 
    'map', 
    'mark', 
    'meta', 
    'meter', 
    'nav', 
    'noframes', 
    'noscript', 
    'object', 
    'ol', 
    'optgroup', 
    'option', 
    'output', 
    'p', 
    'param', 
    'picture', 
    'pre', 
    'progress', 
    'q', 
    'rp', 
    'rt', 
    'ruby', 
    's', 
    'samp', 
    'script', 
    'section', 
    'select', 
    'small', 
    'source', 
    'span', 
    'strike', 
    'strong', 
    'style', 
    'sub', 
    'summary', 
    'sup', 
    'svg', 
    'table', 
    'tbody', 
    'td', 
    'template', 
    'textarea', 
    'tfoot', 
    'th', 
    'thead', 
    'time', 
    'title', 
    'tr', 
    'track', 
    'tt', 
    'u', 
    'ul', 
    'var', 
    'video', 
    'wbr'
];
function isHtmlTag(node) {
    return _html_tags.indexOf(node.n) > -1;
}
var _vue_std_attributes = [
    'v-model', 
    'v-bind', 
    'v-on', 
    'v-text', 
    'v-for', 
    'v-if', 
    'v-else', 
    'v-else-if', 
    'v-show', 
    'v-resize', 
    'v-ripple', 
    'v-scroll', 
    'v-touch'
];
function isVueStdAttribute(node) {
    return _vue_std_attributes.indexOf(node.n) > -1;
}
