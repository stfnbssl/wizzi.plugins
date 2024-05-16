/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.toml\.wizzi-override\lib\wizzifiers\toml\wizzifier.js.ittf
    utc time: Mon, 06 May 2024 14:25:48 GMT
*/
'use strict';
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;
var lineParser = require('../utils/lineParser');
var file = require('@wizzi/utils').file;
var cloner = require('../utils/cloner');
var ittfWriter = require("../utils/ittfWriter");
const TOML = require('@iarna/toml');

function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        syntax = TOML.parse(tobeWizzified)
        ;
        return callback(null, syntax);
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
        var root;
        if (verify.isObject(syntax)) {
            root = {
                tag: '{', 
                children: [
                    
                ]
             };
            parseObject(syntax, root)
        }
        else {
            root = {
                tag: '[', 
                children: [
                    
                ]
             };
            parseArray(syntax, root)
        }
        // loog "ittf\n", JSON.stringify(root, null, 4)
        return callback(null, root);
    }
    )
}
function parseObject(obj, parent) {
    for (var k in obj) {
        var ittf;
        if (verify.isObject(obj[k])) {
            ittf = {
                tag: '{', 
                name: k, 
                children: [
                    
                ]
             };
            parseObject(obj[k], ittf)
        }
        else if (verify.isArray(obj[k])) {
            ittf = {
                tag: '[', 
                name: k, 
                children: [
                    
                ]
             };
            parseArray(obj[k], ittf)
        }
        else {
            ittf = {
                tag: k, 
                name: JSON.stringify(obj[k]), 
                children: [
                    
                ]
             };
        }
        parent.children.push(ittf)
    }
}
function parseArray(arr, parent) {
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        var ittf;
        if (verify.isObject(item)) {
            ittf = {
                tag: '{', 
                name: '', 
                children: [
                    
                ]
             };
            parseObject(item, ittf)
        }
        else if (verify.isArray(item)) {
            ittf = {
                tag: '[', 
                name: '', 
                children: [
                    
                ]
             };
            parseArray(item, ittf)
        }
        else {
            ittf = {
                tag: JSON.stringify(item), 
                name: '', 
                children: [
                    
                ]
             };
        }
        parent.children.push(ittf)
    }
}
