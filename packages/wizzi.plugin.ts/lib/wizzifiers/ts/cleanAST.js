/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\wizzifiers\ts\cleanAST.js.ittf
    utc time: Tue, 07 Jan 2025 04:22:48 GMT
*/

var verify = require('@wizzi/utils').verify;

function cleanAST(ast) {
    if (ast.type != 'CommentBlock' && ast.type != 'ObjectProperty') {
        delete ast.loc
        delete ast.start
        delete ast.end
        var i, i_items=Object.keys(ast), i_len=Object.keys(ast).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(ast)[i];
            if (verify.isArray(ast[k])) {
                var temp = [];
                var j, j_items=ast[k], j_len=ast[k].length, node;
                for (j=0; j<j_len; j++) {
                    node = ast[k][j];
                    
                    // throw new Error(ast)
                    if (!node) {
                        console.log("[33m%s[0m", 'cleanBabel.Null ast node', k, ast);
                    }
                    else {
                        cleanAST(node);
                        temp.push(node);
                    }
                }
                ast[k] = temp;
            }
            if (verify.isObject(ast[k])) {
                cleanAST(ast[k]);
            }
        }
        return ast;
    }
}
module.exports = cleanAST;