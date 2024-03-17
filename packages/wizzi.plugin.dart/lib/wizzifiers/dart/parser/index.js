/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.dart\.wizzi-override\lib\wizzifiers\dart\parser\index.js.ittf
    utc time: Fri, 15 Mar 2024 19:45:56 GMT
*/
'use strict';
var AstNode = require('./ast').AstNode;
const md = module.exports = {};
md.parse = function(source) {
    const asts = [];
    const root = new AstNode('Program');
    let current = root.add('+');
    for (var i=0; i<source.length; i++) {
        let ch = source[i];
        if (['{', '(', '['].indexOf(ch) > -1) {
            const ast = current.add(ch);
            asts.push(current);
            current = ast.add('+')
            ;
        }
        else if (['}', ')', ']'].indexOf(ch) > -1) {
            current = asts.pop();
            current = current.parent.add('+')
            ;
        }
        else if (ch == '\n') {
            current = current.parent.add('+');
            ;
        }
        else if (ch == '\r') {
        }
        else if (ch == '/' && source[i+1] == '/' && source[i+2] == '/') {
            while (ch != '\n' || i == source.length) {
                current.name += ch;
                ch = source[++i];
            }
            current = current.parent.add('+');
            ;
        }
        else {
            current.name += ch;
        }
    }
    const reviewdNode = new AstNode("Program");
    var i, i_items=root.children, i_len=root.children.length, node;
    for (i=0; i<i_len; i++) {
        node = root.children[i];
        reviewNodes(node, reviewdNode)
    }
    // return root
    return reviewdNode;
}
;
function reviewNodes(old_ast, new_ast) {
    let next_new = new_ast;
    if (old_ast.tag == '+' && old_ast.name.length == 0) {
        if (old_ast.children.length == 0) {
            return ;
        }
    }
    else {
        knownTags(old_ast);
        next_new = new_ast.add(old_ast.tag, old_ast.name)
        ;
    }
    var i, i_items=old_ast.children, i_len=old_ast.children.length, c;
    for (i=0; i<i_len; i++) {
        c = old_ast.children[i];
        reviewNodes(c, next_new)
    }
}
function knownTags(ast) {
    inlineTagWithParen('if', ast);
    inlineTagWithParen('for', ast);
    inlineTagWithParen('while', ast);
}
function inlineTagWithParen(tagName, ast) {
    if (ast.nameIs(tagName)) {
        console.log('inlineTagWithParen', tagName, ast.children.length, __filename);
        if (ast.children.length == 1 && ast.children[0].tag == '(') {
            const sb = ['('];
            var i, i_items=ast.children[0].children, i_len=ast.children[0].children.length, c;
            for (i=0; i<i_len; i++) {
                c = ast.children[0].children[i];
                inlineTags(c, sb)
            }
            sb.push(')');
            ast.tag = tagName;
            ast.name = sb.join('');
            ast.children = [];
            return true;
        }
    }
    return false;
}
function inlineTags(ast, sb) {
    if (ast.tag == '+') {
        sb.push(ast.name);
    }
    else if (['{', '(', '['].indexOf(ast.tag) > -1) {
        sb.push(ast.tag);
        sb.push(ast.name);
    }
    else {
        throw new Error('Parsing dart file unexpected tag in "inlineTags" method: ' + ast.tag);
    }
    var i, i_items=ast.children, i_len=ast.children.length, c;
    for (i=0; i<i_len; i++) {
        c = ast.children[i];
        inlineTags(c, sb)
    }
    if (ast.tag == '{') {
        sb.push('}');
    }
    if (ast.tag == '(') {
        sb.push(')');
    }
    if (ast.tag == '[') {
        sb.push(']');
    }
}
