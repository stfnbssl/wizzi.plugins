/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.toml\.wizzi-override\lib\wizzi\models\toml-model.g.js.ittf
    utc time: Mon, 06 May 2024 14:25:48 GMT
*/
'use strict';
/**
     Pseudo schema toml
*/
var util = require('util');
var verify = require('@wizzi/utils').verify;
var errors = require('@wizzi/utils').errors;

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    // loog 'wizzi-core.wizzi.models.toml-model.g', mTree
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes, {}));
    }
    var root = mTree.nodes[0];
    root.__mTree = mTree;
    if (root.n !== "{" && root.n !== "[") {
        return callback(error('The root node of a toml ittf document must be : "{" or "[". Found: ' + root.n + ' ' + root.v, root));
    }
    if (root.n === "{") {
        var toml = toJsonObject(root.children);
        if (toml && toml.__is_error) {
            console.log("[31m%s[0m", '__is_error ', toml);
            return callback(toml);
        }
    }
    else {
        var toml = toJsonArray(root.children);
        if (toml && toml.__is_error) {
            console.log("[31m%s[0m", '__is_error ', toml);
            return callback(toml);
        }
    }
    return callback(null, toml);
}
;
function toJsonObject(mTreeNodeChilds) {
    var ret = {}, value;
    if (mTreeNodeChilds) {
        var i, i_items=mTreeNodeChilds, i_len=mTreeNodeChilds.length, node;
        for (i=0; i<i_len; i++) {
            node = mTreeNodeChilds[i];
            
            // skip comment
            if (node.n === '#') {
            }
            else if (node.n === '{' || node.n === '[') {
                if (!node.v || node.v.length == 0) {
                    return error('A toml object must contain property items. Found: ' + node.n + ' ' + node.v, node);
                }
                else {
                    if (node.n === '{') {
                        value = toJsonObject(node.children);
                        ;
                        if (value && value.__is_error) {
                            return value;
                        }
                    }
                    else {
                        value = toJsonArray(node.children);
                        ;
                        if (value && value.__is_error) {
                            return value;
                        }
                    }
                    ret[node.v] = value;
                }
            }
            else if (node.v && node.v.length > 0) {
                var value = tomlValue(node.v, node);
                if (value && value.__is_error) {
                    return value;
                }
                ret[node.n] = value;
                if (node.children && node.children.length > 0) {
                    return error('A toml property node cannot have children nodes. Found: ' + node.n + ' ' + node.v + ' children.length: ' + node.children.length, node);
                }
            }
            else {
                if (!node.children || node.children.length == 0) {
                    return error('A toml property must have a value or a child object or array. Found: ' + node.n + ' ' + node.v, node);
                }
                else if (node.children.length == 1) {
                    if (node.children[0].n === '{') {
                        var value = toJsonObject(node.children[0].children);
                        if (value && value.__is_error) {
                            return value;
                        }
                        ret[node.n] = value;
                    }
                    else if (node.children[0].n === '[') {
                        var value = toJsonArray(node.children[0].children);
                        if (value && value.__is_error) {
                            return value;
                        }
                        ret[node.n] = value;
                    }
                    else {
                        return error('A toml property must have a value or a child object or array. Found: ' + node.n + ' ' + node.v + ' first child: ' + node.children[0].n + ' ' + node.children[0].v, node);
                    }
                }
                else {
                    return error('A toml property must have a value or a single child, object or array. Found: ' + node.n + ' ' + node.v + ' children count: ' + node.children.length, node);
                }
            }
        }
    }
    return ret;
}
function toJsonArray(mTreeNodeChilds) {
    var ret = [];
    if (mTreeNodeChilds) {
        var i, i_items=mTreeNodeChilds, i_len=mTreeNodeChilds.length, node;
        for (i=0; i<i_len; i++) {
            node = mTreeNodeChilds[i];
            
            // skip comment
            if (node.n === '#') {
            }
            else if (node.n === '{') {
                var value = toJsonObject(node.children);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value)
            }
            else if (node.n === '[') {
                var value = toJsonArray(node.children);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value)
            }
            else if (node.v && node.v.length && isQuoted(node.n + ' ' + node.v) == false) {
                return error('A toml array item must be an object, an array or a value not a property. Found: ' + node.n + ' ' + node.v, node);
            }
            else {
                var value = tomlValue(node.n + (verify.isNotEmpty(node.v) ? ' ' + node.v : ''), node);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value)
            }
        }
    }
    return ret;
}
function tomlValue(value, node) {
    var tomlString = "{ \"value\": " + check(value) + "}";
    try {
        var toml = JSON.parse(tomlString);
        return toml.value;
    } 
    catch (ex) {
        return error('Error parsing toml value. Message: ' + ex.message + '. Value: ' + value, node);
    } 
}
function check(value) {
    if ((value.length > 1 && value[0] === "'" && value[value.length-1] === "'") || (value.length > 1 && value[0] === '"' && value[value.length-1] === '"')) {
        return "\"" + verify.replaceAll(verify.replaceAll(unquote(value), "\\", "\\\\"), '"', '\\"') + "\"";
    }
    else if (value.indexOf('"') > -1 && value.indexOf("'") > -1) {
        return "\"" + verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"') + "\"";
    }
    else {
        return value;
    }
}
function isQuoted(value) {
    if ((value.length > 1 && value[0] === "'" && value[value.length-1] === "'") || (value.length > 1 && value[0] === '"' && value[value.length-1] === '"')) {
        return true;
    }
    else {
        return value;
    }
}
function unquote(str) {
    return str.substr(1, str.length -2);
}
function error(message, node) {
    // loog 'wizzi-core.wizzi.models.toml-model.g.error', node
    nodeInfo(node, message)
    return {
            __is_error: true, 
            source: 'wizzi.plugin.toml/lib/wizzi/models/toml-model.g', 
            node: node.n + ' ' + node.v + ' pos: ' + node.r + ', ' + node.c, 
            message: message, 
            errorLines: nodeInfo(node, message)
         };
}
function nodeInfo(node, message) {
    return errors.getErrorLinesFromMTreeNode(node, message);
}
