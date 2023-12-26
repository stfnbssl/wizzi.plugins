/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\wizzifiers\html\cloner.js.ittf
    utc time: Thu, 27 Jul 2023 12:54:24 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
function log(label, obj) {
    console.log(label, util.inspect(obj, {
        depth: 1
     }))
}
function transform(node, options) {
    // loog 'cloner.transform', node.tag, node.name
    var ret = {
        tag: node.tag, 
        name: node.name || "", 
        attribs: node.attribs || {}, 
        lines: node.lines || [], 
        children: []
     };
    if (ret.tag === 'title') {
        ret.tag = '@title';
    }
    else if (ret.tag === 'style' && !!options.isForVue == false) {
        ret.tag = '@style';
    }
    else if (ret.tag === 'ng-view') {
        ret.tag = '@ng-view';
    }
    else if (ret.tag === 'div' && ret.name.length === 0 && ret.attribs.class) {
        ret.tag = '.';
        ret.name = ret.attribs.class;
        delete (ret.attribs.class);
    }
    else if (ret.tag === 'script' && ret.attribs.src) {
        ret.tag = 'js';
        ret.name = ret.attribs.src;
        ret.attribs = {};
    }
    else if (ret.tag === 'link' && ret.attribs.href === 'stylesheet') {
        ret.tag = 'css';
        ret.name = ret.attribs.href;
        ret.attribs = {};
    }
    node.children.forEach(function(item) {
        var child = transform(item, options);
        if (child) {
            ret.children.push(child);
        }
    })
    return ret;
}
module.exports = function(ast, options) {
    return transform(ast, options);
}
;
