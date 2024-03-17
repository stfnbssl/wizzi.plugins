/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.dart\.wizzi-override\lib\wizzifiers\dart\wizzifier.js.ittf
    utc time: Fri, 15 Mar 2024 19:45:56 GMT
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
var dart_parser = require('./parser');
var cleanAST = require('./cleanAST');

function parseInternal(tobeWizzified, options, callback) {
    var syntax;
    try {
        syntax = dart_parser.parse(tobeWizzified);
        ;
        // _ cleanAST(syntax)
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
            // set result = cloner(result, options)
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

function isKnownType(type) {
    return ['Int', 'Float', 'Boolean', 'String'].indexOf(type) > -1;
}

function getTypeName(type) {
    return isKnownType(type) ? type.toLowerCase() : type;
}
