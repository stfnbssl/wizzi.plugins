/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.xml\.wizzi-override\lib\wizzifiers\xml\wizzifier.js.ittf
    utc time: Thu, 21 Mar 2024 16:06:07 GMT
*/
'use strict';
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('wizzi-utils').verify;
var lineParser = require('../utils/lineParser');
var file = require('wizzi-utils').file;
var cloner = require('../utils/cloner');
var ittfWriter = require("../utils/ittfWriter");
var xml2js = require('xml2js');
var xml_parser = new xml2js.Parser();
var cleanAST = require('./cleanAST');

function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        xml_parser.parseString(tobeWizzified, (err, syntax) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null, syntax);
        }
        )
    } 
    catch (ex) {
        return callback(ex);
    } 
}
var verbose = false;
function log(label, obj, force) {
    if (verbose || force) {
        console.log(label, util.inspect(obj, {
            depth: null
         }))
    }
}
var md = module.exports = {};
md.getCodeAST = function(tobeWizzified, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    options.input = tobeWizzified;
    options.stack = [];
    parseInternal(tobeWizzified, options, callback)
}
;
md.getWizziTree = function(input, options, callback) {
    options = (options || {});
    if (typeof (options.verbose) !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    // loog 'startTime', startTime
    wizzify(input, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        if (options.syntaxOutFile) {
            parseInternal(input, options, (err, syntax) => {
            
                if (err) {
                    return callback(err);
                }
                file.write(options.syntaxOutFile, stringify(syntax, null, 2))
            }
            )
        }
        // loog 'Parsed in ' + Date.now() - startTime + ' ms'
        callback(null, syntax);
    }
    )
}
;
md.getWizziIttf = function(input, options, callback) {
    md.getWizziTree(input, options, (err, result) => {
    
        if (err) {
            return callback(err);
        }
        md.getWizzifierIncludes(options, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            result = cloner(result, options);
            callback(null, ittfWriter.stringify(result, options))
        }
        )
    }
    )
}
;
// ovveridable
md.getWizzifierIncludes = function(options, callback) {
    return callback(null);
}
;

function wizzify(tobeWizzified, options, callback) {
    options = options || {};
    options.input = tobeWizzified;
    options.stack = [];
    options.formatTextNodes = [];
    options.verbose = true;
    parseInternal(tobeWizzified, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        return callback(null, syntax);
    }
    )
}
function wizzify(tobeWizzified, options, callback) {
    var wizziTree = {
        children: []
     };
    parseInternal(tobeWizzified, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        console.log('syntax', Object.keys(syntax), __filename);
        if (options.dumpfile) {
            file.write(options.dumpfile, JSON.stringify(syntax, null, 2))
        }
        for (var prop in syntax) {
            if (syntax.hasOwnProperty(prop)) {
                var root = syntax[prop];
                if (verify.isObject(root) === false) {
                    return callback(new Error("Root is not an object. Prop: " + prop + ', root: ' + root));
                }
                var ac = getAttribsAndChilds(root);
                wizziTree = {
                    tag: prop, 
                    attribs: [], 
                    children: []
                 };
                var aObj = ac.a;
                for (var aName in aObj) {
                    wizziTree.children.push({
                        tag: '@', 
                        name: (((aName + ' ')) + aObj[aName]), 
                        children: []
                     })
                }
                for (var j = 0; j < ac.c.length; j++) {
                    var childnode = ac.c[j];
                    if (verify.isArray(childnode.value) === false) {
                        console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value, __filename);
                    }
                    else {
                        appendChilds(childnode.name, childnode.value, wizziTree)
                    }
                }
            }
        }
        return callback(null, wizziTree);
    }
    )
}
function appendChilds(name, nodeArray, parent) {
    // loog 'appendChilds.name', name
    var i, i_items=nodeArray, i_len=nodeArray.length, node;
    for (i=0; i<i_len; i++) {
        node = nodeArray[i];
        if (verify.isString(node)) {
            parent.name = node;
        }
        else {
            var ac = getAttribsAndChilds(node);
            var tag = {
                tag: name, 
                children: []
             };
            parent.children.push(tag);
            var aObj = ac.a;
            for (var aName in aObj) {
                tag.children.push({
                    tag: '@', 
                    name: (((aName + ' ')) + aObj[aName]), 
                    children: []
                 })
            }
            var j, j_items=ac.c, j_len=ac.c.length, childnode;
            for (j=0; j<j_len; j++) {
                childnode = ac.c[j];
                if (verify.isArray(childnode.value) === false) {
                    console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value, __filename);
                }
                else {
                    appendChilds(childnode.name, childnode.value, tag)
                }
            }
        }
    }
}
function getAttribsAndChilds(node) {
    var attribs = {};
    var children = [];
    for (var prop in node) {
        if (node.hasOwnProperty(prop)) {
            
            // log('getAttribsAndChilds.$', attribsObj, true)
            if (prop === '$') {
                var attribsObj = node[prop];
                for (var k in attribsObj) {
                    attribs[k] = attribsObj[k];
                }
            }
            else {
                var value = node[prop];
                var isArray = verify.isArray(value);
                children.push({
                    name: prop, 
                    value: node[prop]
                 })
            }
        }
    }
    return {
            a: attribs, 
            c: children
         };
}
