/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.css\.wizzi-override\lib\wizzifiers\css\cleanAST.js.ittf
    utc time: Sat, 20 Apr 2024 03:49:41 GMT
*/
'use strict';
var verify = require('@wizzi/utils').verify;
function cleanAst(ast) {
    delete ast.loc
    var i, i_items=Object.keys(ast), i_len=Object.keys(ast).length, k;
    for (i=0; i<i_len; i++) {
        k = Object.keys(ast)[i];
        
        // loog 'k', k
        if (verify.isArray(ast[k])) {
            var temp = [];
            var j, j_items=ast[k], j_len=ast[k].length, node;
            for (j=0; j<j_len; j++) {
                node = ast[k][j];
                if (node.type === 'space') {
                }
                else {
                    cleanAst(node);
                    temp.push(node);
                }
            }
            ast[k] = temp;
        }
        
        // loog 'k', k
        if (verify.isObject(ast[k])) {
            cleanAst(ast[k]);
        }
    }
    return ast;
}
module.exports = cleanAst;
