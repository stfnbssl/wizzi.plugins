/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi-override\lib\wizzi\models\yaml-model.g.js.ittf
    utc time: Thu, 21 Mar 2024 16:06:09 GMT
*/
'use strict';
/**
     Pseudo schema yaml
*/
var util = require('util');
var verify = require('wizzi-utils').verify;
var errors = require('wizzi-utils').errors;

var myname = 'wizzi.plugin.yaml.lib.wizzi.models.yaml-model.g.js.ittf';

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    // loog myname, mTree
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes, {}));
    }
    var root = mTree.nodes[0];
    root.__mTree = mTree;
    if (root.n !== "{" && root.n !== "[") {
        return callback(error('The root node of a yaml ittf document must be : "{" or "[". Found: ' + root.n + ' ' + root.v, root));
    }
    if (root.n === "{") {
        var yaml = toYamlObject(root.children);
        if (yaml && yaml.__is_error) {
            console.log("[31m%s[0m", '__is_error ', yaml);
            return callback(yaml);
        }
    }
    else {
        var yaml = toYamlArray(root.children);
        if (yaml && yaml.__is_error) {
            console.log("[31m%s[0m", '__is_error ', yaml);
            return callback(yaml);
        }
    }
    return callback(null, yaml);
}
;
function toYamlObject(mTreeNodeChilds) {
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
                    return error('A yaml object must contain property items. Found: ' + node.n + ' ' + node.v, node);
                }
                else {
                    if (node.n === '{') {
                        value = toYamlObject(node.children);
                        ;
                        if (value && value.__is_error) {
                            return value;
                        }
                    }
                    else {
                        value = toYamlArray(node.children);
                        ;
                        if (value && value.__is_error) {
                            return value;
                        }
                    }
                    ret[node.v] = value;
                }
            }
            else if (node.v && node.v.length > 0) {
                var value = yamlValue(node.v, node);
                if (value && value.__is_error) {
                    return value;
                }
                ret[node.n] = value;
                if (node.children && node.children.length > 0) {
                    return error('A yaml property node cannot have children nodes. Found: ' + node.n + ' ' + node.v + ' children.length: ' + node.children.length, node);
                }
            }
            else {
                if (!node.children || node.children.length == 0) {
                    ret[node.n] = null;
                }
                else if (node.children.length == 1) {
                    if (node.children[0].n === '{') {
                        var value = toYamlObject(node.children[0].children);
                        if (value && value.__is_error) {
                            return value;
                        }
                        ret[node.n] = value;
                    }
                    else if (node.children[0].n === '[') {
                        var value = toYamlArray(node.children[0].children);
                        if (value && value.__is_error) {
                            return value;
                        }
                        ret[node.n] = value;
                    }
                    else {
                        return error('A yaml property must have a value or a single child, object or array. Found: ' + node.n + ' ' + node.v + ' first child: ' + node.children[0].n + ' ' + node.children[0].v, node);
                    }
                }
                else {
                    return error('A yaml property must have a value or a single child, object or array. Found: ' + node.n + ' ' + node.v + ' children count: ' + node.children.length, node);
                }
            }
        }
    }
    return ret;
}
function toYamlArray(mTreeNodeChilds) {
    var ret = [];
    if (mTreeNodeChilds) {
        var i, i_items=mTreeNodeChilds, i_len=mTreeNodeChilds.length, node;
        for (i=0; i<i_len; i++) {
            node = mTreeNodeChilds[i];
            
            // skip comment
            if (node.n === '#') {
            }
            else if (node.n === '{') {
                var value = toYamlObject(node.children);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value)
            }
            else if (node.n === '[') {
                var value = toYamlArray(node.children);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value)
            }
            else {
                var value = yamlValue(node.n + (verify.isNotEmpty(node.v) ? ' ' + node.v : ''), node);
                if (value && value.__is_error) {
                    return value;
                }
                ret.push(value)
            }
        }
    }
    return ret;
}
function yamlValue(value, node) {
    // loog 'yamlValue 1', value
    var yamlString = "{ \"value\": " + check(value) + " }";
    try {
        var yaml = JSON.parse(yamlString);
        // loog 'yamlValue', value, yaml.value
        return yaml.value;
    } 
    catch (ex) {
        // loog 'yamlValue 2', quote(value)
        var yamlString = "{ \"value\": " + quote(check(value)) + " }";
        try {
            var yaml = JSON.parse(yamlString);
            // loog 'yamlValue', value, yaml.value
            return yaml.value;
        } 
        catch (ex) {
            return error('Error parsing yaml value. Message: ' + ex.message + '. Value: ' + value, node);
        } 
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
    // loog 'isQuoted', value
    
    // loog 'isQuoted', value, true
    if ((value.length > 1 && value[0] === "'" && value[value.length-1] === "'") || (value.length > 1 && value[0] === '"' && value[value.length-1] === '"')) {
        return true;
    }
    else {
        return false;
    }
}
function unquote(str) {
    return str.substr(1, str.length -2);
}
function quote(str) {
    // loog 'quote 1', str
    if (isQuoted(str)) {
        return str;
    }
    // loog 'quote 2', check('"' + str + '"')
    return check('"' + str + '"');
}
function error(message, node) {
    // loog myname, node
    nodeInfo(node, message)
    return {
            __is_error: true, 
            source: myname, 
            node: node.n + ' ' + node.v + ' pos: ' + node.r + ', ' + node.c, 
            message: message, 
            errorLines: nodeInfo(node, message)
         };
}
function nodeInfo(node, message) {
    return errors.getErrorLinesFromMTreeNode(node, message);
}
