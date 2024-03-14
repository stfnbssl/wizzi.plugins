/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\jsonStatementTree.js.ittf
    utc time: Wed, 13 Mar 2024 07:14:49 GMT
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').helpers.verify;
var utilnode = require('wizzi-utils').node;
var __tagElementMapping = { '+': 'statement', '++': 'statementmultiline', '#': 'comment', '##': 'commentmultiline', 'var': 'xvar', 'wz-var': 'wzVar', 'wzvar': 'wzVar', 'const': 'xconst', 'wz-const': 'wzConst', 'wzconst': 'wzConst', 'let': 'xlet', '{': 'jsObject', '[': 'jsArray', '@': 'jsPropertyOrValue', 'jst': 'jsonStatementTree', 'import': 'ximport', 'export': 'xexport', 'delete': 'xdelete', 'if': 'xif', 'else': 'xelse', 'for': 'xfor', 'break': 'xbreak', 'continue': 'xcontinue', 'while': 'xwhile', 'do': 'xdo', 'switch': 'xswitch', 'case': 'xcase', 'default': 'xdefault', 'try': 'xtry', 'catch': 'xcatch', 'finally': 'xfinally', 'throw': 'xthrow', 'function': 'xfunction', '=>': 'arrowfunction', 'function*': 'generatorfunction', 'm': 'method', 'wz-iife': 'wzIife', 'wziife': 'wzIife', 'wz-function': 'wzFunction', 'wzfunction': 'wzFunction', 'yield': 'xyield', 'return': 'xreturn', 'class': 'xclass', 'wz-class': 'wzClass', 'wzclass': 'wzClass', 'new': 'xnew', '_': 'call', '._': 'memberCall', '@_': 'decoratorCall', '(': 'callOnValue', '.': 'memberAccess', '.[': 'memberAccessComputed', 'void': 'xvoid', '!': 'not', '||': 'or', '&&': 'and', 'op===': 'op_eq_strict', 'op!==': 'op_noteq_strict', 'op==': 'op_eq', 'op!=': 'op_noteq', 'op||': 'op_or', 'op&&': 'op_and', 'op-': 'op_minus', 'op': 'op_minus', 'op+': 'op_plus', 'op*': 'op_times', 'op/': 'op_div', 'op^': 'op_power', 'op%': 'op_mod', 'op|': 'op_xor', 'op&': 'op_xand', 'op>': 'op_gt', 'op>=': 'op_ge', 'op<': 'op_lt', 'op<=': 'op_le', 'wz-require': 'wzRequire', 'wzrequire': 'wzRequire', '§': 'component', 'react': 'reactComponent', 'event': 'htmlevent', '<': 'htmlelement', '@style': '_style', 'color-profile': 'color_profile', 'colorprofile': 'color_profile', 'font-face': 'font_face', 'fontface': 'font_face', 'font-face-format': 'font_face_format', 'fontfaceformat': 'font_face_format', 'font-face-name': 'font_face_name', 'fontfacename': 'font_face_name', 'font-face-src': 'font_face_src', 'fontfacesrc': 'font_face_src', 'font-face-uri': 'font_face_uri', 'fontfaceuri': 'font_face_uri', 'missing-glyph': 'missing_glyph', 'missingglyph': 'missing_glyph', '!!': 'assert', '!!=': 'assert_equal', 'log?': 'inspect', 'log-info': 'log_info', 'loginfo': 'log_info', 'it-async': 'itAsync', 'itasync': 'itAsync', 'before-async': 'beforeAsync', 'beforeasync': 'beforeAsync', 'before-each': 'beforeEach', 'beforeeach': 'beforeEach', 'after-async': 'afterAsync', 'afterasync': 'afterAsync', 'after-each': 'afterEach', 'aftereach': 'afterEach', 'sa-get': 'saGet', 'saget': 'saGet', 'sa-post': 'saPost', 'sapost': 'saPost', 'sa-put': 'saPut', 'saput': 'saPut', 'sa-end': 'saEnd', 'saend': 'saEnd' };
// See in wizzi/lib/models/bootstrap/t/wfschema/method.stringifyWizziStatement
// how the wzName of a jsonStatementTree (tag: jst) element is stringified
var md = module.exports = {};
md.getStatements = function(model) {
    var ret = [];
    var json = JSON.parse(model.wzName);
    if (verify.isArray(json)) {
        var i, i_items=json, i_len=json.length, jsonitem;
        for (i=0; i<i_len; i++) {
            jsonitem = json[i];
            ret.push(normalizeJSTNode(jsonitem, model.wzParent))
        }
        utilnode.replace(item, normalized);
    }
    else {
        ret.push(normalizeJSTNode(json, model.wzParent))
    }
    return ret;
}
;
function normalizeJSTNode(node, parent) {
    
    // loog 'normalizeJSTNode 2', node
    if (node.n === 'function') {
        node.paramNames = [];
        node.constrainedParams = [];
    }
    node.wzParent = parent;
    node.wzTag = node.n;
    if (__tagElementMapping[node.n]) {
        node.wzElement = __tagElementMapping[node.n];
    }
    else {
        node.wzElement = node.n;
    }
    node.wzName = node.v;
    node.statements = [];
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        if (node.n === 'function' && item.n === 'param') {
            node.paramNames.push(item.wzName);
        }
        else {
            node.statements.push(normalizeJSTNode(item, node))
        }
    }
    
    // loog 'normalizeJSTNode 2 ended'
    if (node.n === 'function') {
    }
    return node;
}
