/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi-override\lib\wizzi\models\yaml-model.g.js.ittf
*/
'use strict';
//
var util = require('util');
var verify = require('wizzi-utils').verify;
var errors = require('wizzi-utils').errors;
var jsyaml = require('js-yaml');
var lineparser = require('./lineParser');

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    // loog 'wizzi-core.wizzi.models.yaml-model.g', mTree
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes, {}));
    }
    var root = mTree.nodes[0];
    root.__mTree = mTree;
    var sb = [];
    var i, i_items=root.children, i_len=root.children.length, node;
    for (i=0; i<i_len; i++) {
        node = root.children[i];
        appendNode(node, 0, sb)
    }
    console.log('yaml source', '\n' + sb.join('\n'), __filename);
    var yaml = jsyaml.load(sb.join('\n'));
    if (verify.isString(yaml)) {
        return callback(error('Invalid yaml format. js-yaml returned a string.', root));
    }
    console.log('yaml', yaml, __filename);
    return callback(null, yaml);
}
;
function appendNode(node, indent, sb) {
    console.log('appendNode', indent, node.n + ' ' + node.v, __filename);
    var indentString = new Array(indent * 2).join(' ');
    if (node.n === '-') {
        sb.push(indentString + node.n + ' ' + node.v)
    }
    else if (node.n === ':') {
        var nv = lineparser.parseNameValueRaw(node.v);
        sb.push(indentString + nv.name() + ': ' + nv.value())
    }
    else {
        sb.push(indentString + node.n + ' ' + node.v)
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        appendNode(child, indent + 1, sb)
    }
}
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
                    return error('A yaml property must have a value or a child object or array. Found: ' + node.n + ' ' + node.v, node);
                }
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
                    return error('A yaml property must have a value or a child object or array. Found: ' + node.n + ' ' + node.v + ' first child: ' + node.children[0].n + ' ' + node.children[0].v, node);
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
            else if (node.v && node.v.length && isQuoted(node.n + ' ' + node.v) == false) {
                return error('A yaml array item must be an object, an array or a value not a property. Found: ' + node.n + ' ' + node.v, node);
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
    var yamlString = "{ \"value\": " + check(value) + "}";
    try {
        var yaml = JSON.parse(yamlString);
        return yaml.value;
    } 
    catch (ex) {
        return error('Error parsing yaml value. Message: ' + ex.message + '. Value: ' + value, node);
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
    // loog 'wizzi-core.wizzi.models.yaml-model.g.error', node
    nodeInfo(node, message)
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/wizzi/models/yaml-model.g', 
            node: node.n + ' ' + node.v + ' pos: ' + node.r + ', ' + node.c, 
            message: message, 
            errorLines: nodeInfo(node, message)
         };
}
function nodeInfo(node, message) {
    return errors.getErrorLinesFromMTreeNode(node, message);
}
