/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.json\.wizzi-override\lib\wizzifiers\json\cloner.js.ittf
    utc time: Tue, 21 Jan 2025 16:37:12 GMT
*/
var util = require('util');
var verify = require('@wizzi/utils').verify;
function transform(node, options) {
    // loog 'cloner.transform', node.tag, node.name
    var ret = {
        tag: node.tag, 
        name: node.name, 
        children: []
     };
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