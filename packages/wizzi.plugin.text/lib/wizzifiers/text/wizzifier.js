/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.text\.wizzi-override\lib\wizzifiers\text\wizzifier.js.ittf
    utc time: Mon, 06 May 2024 14:25:45 GMT
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
var text_parser = require('./parser');

function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        syntax = text_parser.parse(tobeWizzified)
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
md.getCodeAST = function(input, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    parseInternal(input, options, callback)
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
    options.verbose = false;
    parseInternal(tobeWizzified, options, (err, syntax) => {
    
        if (err) {
            return callback(err);
        }
        var wizziTree = {
            tag: 'text', 
            name: '', 
            children: [
                
            ]
         };
        var i, i_items=syntax, i_len=syntax.length, line;
        for (i=0; i<i_len; i++) {
            line = syntax[i];
            wizziTree.children.push({
                tag: line, 
                name: '', 
                children: [
                    
                ]
             })
        }
        console.log('wizziTree', wizziTree, __filename);
        return callback(null, wizziTree);
    }
    )
}
