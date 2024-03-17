/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.dart\.wizzi-override\lib\wizzifiers\dart\parser\ast.js.ittf
    utc time: Fri, 15 Mar 2024 19:45:56 GMT
*/
'use strict';
const md = module.exports = {};
class AstNode {
    constructor(tag, name) {
        this.tag = tag;
        this.name = name || '';
        this.children = [];
    }
    add(tag, name) {
        const node = new AstNode(tag, name);
        node.parent = this;
        this.children.push(node)
        return node;
    }
    nameIs(value) {
        const test = this.name.trim().split(' ');
        return value == test[0];
    }
    toIttf() {
        const sb = [];
        this._toIttfDeep(sb, 0)
        return sb.join('\n');
    }
    _toIttfDeep(sb, indent) {
        const spaces = new Array( (indent||0) * 4 + 1).join(' ');
        sb.push(spaces + this.tag + ' ' + this.name);
        var i, i_items=this.children, i_len=this.children.length, c;
        for (i=0; i<i_len; i++) {
            c = this.children[i];
            c._toIttfDeep(sb, indent + 1)
        }
    }
}
md.AstNode = AstNode;
