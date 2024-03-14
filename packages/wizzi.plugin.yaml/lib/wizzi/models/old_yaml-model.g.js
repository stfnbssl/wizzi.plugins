/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi-override\lib\wizzi\models\old_yaml-model.g.js.ittf
    utc time: Mon, 11 Mar 2024 08:10:13 GMT
*/
'use strict';
/**
     Pseudo schema yaml
*/
var util = require('util');
var verify = require('wizzi-utils').verify;
var errors = require('wizzi-utils').errors;
var jsyaml = require('js-yaml');
var lineParser = require('./lineParser');

module.exports = function(mTree, ittfDocumentUri, request, callback) {
    // log 'wizzi.plugin.yaml.wizzi.models.yaml-model.g', mTree
    if (!(mTree.nodes && mTree.nodes.length == 1)) {
        return callback(error('Malformed mTree. Must have one root node. Found mTree.nodes: ' + mTree.nodes, {}));
    }
    var root = mTree.nodes[0];
    root.__mTree = mTree;
    var ctx = {
        sb: [
            
        ], 
        indent: 0, 
        prefix: '', 
        error: null
     };
    if (root.n == '{') {
        toYamlObject(root, ctx)
    }
    else if (root.n == '[') {
        toYamlArray(root, ctx)
    }
    else {
        return callback(error('The root node of a yaml.ittf document must be "{" or "["', root));
    }
    if (ctx.error) {
        return callback(ctx.error);
    }
    console.log('yaml source', '\n', ctx.sb.join('\n'), __filename);
    var yaml = jsyaml.load(ctx.sb.join('\n'));
    if (verify.isString(yaml)) {
        return callback(error('Invalid yaml format. js-yaml returned a string.', root));
    }
    console.log('yaml returned by jsyaml.load:\n', yaml, __filename);
    return callback(null, {
            yaml: yaml
         });
}
;
function toYamlObject(node, ctx) {
    console.log('toYamlObject', node.n, node.v, __filename);
    var isArrayItem = false;
    if (!node.v || node.v.length == 0) {
        
        // is root object
        if (!node.parent) {
        }
        
        // is array item
        else if (node.parent.n == '[') {
            isArrayItem = true;
        }
        else {
            ctx.error = error('A yaml object property must have a property name. Found: ' + node.n + ' ' + node.v, node)
            ;
        }
    }
    else {
        var indentString = new Array(ctx.indent * 2).join(' ');
        var nv = lineParser.parseNameValueRaw(node.v);
        ctx.sb.push(indentString + ctx.prefix + nv.name() + ': ' + nv.value())
    }
    var first = true;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        
        // skip comment
        if (child.n === '#') {
        }
        else if (child.n === '{') {
            if (!child.v || child.v.length == 0) {
                ctx.error = error('A yaml object must contain property items. Found: ' + child.n + ' ' + child.v, child)
                ;
            }
            else {
                if (isArrayItem) {
                    if (first) {
                        ctx.prefix = '- ';
                    }
                    else {
                        ctx.prefix = '  ';
                    }
                    toYamlObject(child, ctx);
                    ctx.prefix = '';
                }
                else {
                    ctx.indent++;
                    toYamlObject(child, ctx);
                    ctx.indent--;
                }
            }
        }
        else if (child.n === '[') {
            if (!child.v || child.v.length == 0) {
                ctx.error = error('A yaml array must contain property items. Found: ' + child.n + ' ' + child.v, child)
                ;
            }
            // FIXME
            else {
                if (isArrayItem) {
                    if (first) {
                        ctx.prefix = '- ';
                    }
                    else {
                        ctx.prefix = '  ';
                    }
                    toYamlArray(child, ctx);
                    ctx.prefix = '';
                }
                else {
                    ctx.indent++;
                    toYamlArray(child, ctx);
                    ctx.indent--;
                }
            }
        }
        else {
            if (isArrayItem) {
                if (first) {
                    ctx.prefix = '- ';
                }
                else {
                    ctx.prefix = '  ';
                }
                toYamlObjectProperty(child, ctx);
                ctx.prefix = '';
            }
            else {
                ctx.indent++;
                toYamlObjectProperty(child, ctx)
                ctx.indent--;
            }
        }
        if (ctx.error) {
            return ;
        }
        first = false;
    }
}
function toYamlObjectProperty(node, ctx) {
    console.log('toYamlObjectProperty', node.n, node.v, __filename);
    var indentString = new Array(ctx.indent * 2).join(' ');
    if (node.v && node.v.length > 0) {
        var value = yamlValue(node.v, node);
        if (value.__is_error) {
            ctx.error = value;
            return ;
        }
        ctx.sb.push(indentString + ctx.prefix + node.n + ': ' + value)
    }
    else {
        ctx.sb.push(indentString + ctx.prefix + node.n + ': null')
    }
    if (node.children && node.children.length > 0) {
        ctx.error = error('A yaml property node cannot have children nodes. Found: ' + node.n + ' ' + node.v + ' children.length: ' + node.children.length, node)
        ;
        return ;
    }
}
function toYamlArray(node, ctx) {
    console.log('toYamlArray', node.n, node.v, __filename);
    if (!node.v || node.v.length == 0) {
        
        // is root array
        if (!node.parent) {
        }
        else {
            ctx.error = error('A yaml array property must have a property name. Found: ' + child.n + ' ' + child.v, child)
            ;
        }
    }
    else {
        var indentString = new Array(ctx.indent * 2).join(' ');
        var nv = lineParser.parseNameValueRaw(node.v);
        ctx.sb.push(indentString + ctx.prefix + nv.name() + ': ' + nv.value())
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        
        // skip comment
        if (child.n === '#') {
        }
        else if (child.n === '{') {
            console.log('toYamlArray.child.v', child.v, __filename);
            if (child.v && child.v.length > 0) {
                ctx.error = error('A yaml object that is an item of array cannot have a property name. Found: ' + child.n + ' ' + child.v, child)
                ;
                return ;
            }
            ctx.indent++;
            toYamlObject(child, ctx);
            ctx.indent--;
        }
        else if (child.n === '[') {
            if (child.v && child.v.length > 0) {
                ctx.error = error('A yaml array that is an item of array cannot have a property name. Found: ' + node.n + ' ' + node.v, node)
                ;
            }
            ctx.indent++;
            toYamlArray(child, ctx);
            ctx.indent--;
        }
        else {
            ctx.indent++;
            toYamlArrayItem(child, ctx)
            ctx.indent--;
        }
        if (ctx.error) {
            return ;
        }
    }
}
function toYamlArrayOfObjects(node, ctx) {
    var first = true;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        
        // skip comment
        if (child.n === '#') {
        }
        else if (child.n === '{') {
            console.log('toYamlArrayOfObjects.child.v', child.v, __filename);
            if (child.v && child.v.length > 0) {
                ctx.error = error('A yaml object that is an item of array cannot have a property name. Found: ' + child.n + ' ' + child.v, child)
                ;
                return ;
            }
            ctx.indent++;
            toYamlObject(child, ctx);
            ctx.indent--;
        }
        else if (child.n === '[') {
            if (child.v && child.v.length > 0) {
                ctx.error = error('A yaml array that is an item of array cannot have a property name. Found: ' + node.n + ' ' + node.v, node)
                ;
            }
            ctx.indent++;
            toYamlArray(child, ctx);
            ctx.indent--;
        }
        else {
            ctx.indent++;
            toYamlArrayItem(child, ctx)
            ctx.indent--;
        }
        if (ctx.error) {
            return ;
        }
    }
}
function toYamlArrayItem(node, ctx) {
    console.log('toYamlArrayItem', node.n, node.v, __filename);
    var indentString = new Array(ctx.indent * 2).join(' ');
    var value = yamlValue(node.n + (verify.isNotEmpty(node.v) ? ' ' + node.v : ''), node);
    if (value.__is_error) {
        ctx.error = value;
        return ;
    }
    ctx.sb.push(indentString + ctx.prefix + '- ' + node.n + ' ' + node.v)
}
function yamlValue(value, node) {
    console.log('yamlValue 1', value, __filename);
    var yamlString = "{ \"value\": " + check(value) + " }";
    try {
        var yaml = JSON.parse(yamlString);
        console.log('yamlValue', value, yaml.value, __filename);
        return yaml.value;
    } 
    catch (ex) {
        console.log('yamlValue 2', quote(value), __filename);
        var yamlString = "{ \"value\": " + quote(check(value)) + " }";
        try {
            var yaml = JSON.parse(yamlString);
            console.log('yamlValue', value, yaml.value, __filename);
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
    console.log('isQuoted', value, __filename);
    if ((value.length > 1 && value[0] === "'" && value[value.length-1] === "'") || (value.length > 1 && value[0] === '"' && value[value.length-1] === '"')) {
        return true;
        console.log('isQuoted', value, true, __filename);
    }
    else {
        return false;
    }
}
function unquote(str) {
    return str.substr(1, str.length -2);
}
function quote(str) {
    console.log('quote 1', str, __filename);
    if (isQuoted(str)) {
        return str;
    }
    console.log('quote 2', check('"' + str + '"'), __filename);
    return check('"' + str + '"');
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
