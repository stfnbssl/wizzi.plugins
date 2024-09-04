/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.json\.wizzi-override\lib\wizzifiers\json\wizzifier.js.ittf
    utc time: Tue, 13 Aug 2024 18:04:47 GMT
*/
var util = require('util');
var async = require('async');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;
var lineParser = require('../utils/lineParser');
var file = require('@wizzi/utils').file;
var cloner = require('../utils/cloner');
var ittfWriter = require("../utils/ittfWriter");
var json_parser = require('./parser');
var cloner = require('./cloner');

function parseInternal(tobeWizzified, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = (options || {});
    var wizziTree = {
        children: []
     };
    json_parser.parse(tobeWizzified, {
        onObject: function(open) {
            if (open) {
                var n = {
                    tag: '{', 
                    name: '', 
                    children: []
                 };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else {
                wizziTree = wizziTree.parent;
            }
        }, 
        onArray: function(open) {
            if (open) {
                var n = {
                    tag: '[', 
                    name: '', 
                    children: []
                 };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            // FIXME
            else {
                wizziTree = wizziTree.parent;
            }
        }, 
        onPropName: function(name) {
            var n = {
                tag: name, 
                name: '', 
                children: []
             };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        onProp: function(name, value) {
            var n = {
                tag: name, 
                name: value, 
                children: []
             };
            n.parent = wizziTree;
            wizziTree.children.push(n);
        }, 
        onObjectProp: function(name) {
            var n = {
                tag: '{', 
                name: name, 
                children: []
             };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        onArrayProp: function(name) {
            var n = {
                tag: '[', 
                name: name, 
                children: []
             };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        onClosePropName: function() {
            wizziTree = wizziTree.parent;
        }, 
        onArrayValue: function(value) {
            var n = {
                tag: value, 
                name: '', 
                children: []
             };
            wizziTree.children.push(n);
        }, 
        onHandlebar: function(hb) {
            var n = {
                tag: '{{', 
                name: hb, 
                children: []
             };
            wizziTree.children.push(n);
        }
     }, (err, result) => {
        if (err) {
            return callback(err);
        }
        while (wizziTree.parent != null) {
            wizziTree = wizziTree.parent;
        }
        var synthax = wizziTree.children[0];
        if (!synthax) {
            return callback(new Error('Json.Wizzifier.Wizzi parse failed. wizziTree: ' + util.inspect(wizziTree, {depth: 2})));
        }
        return callback(null, synthax);
    }
    )
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
    parseInternal(tobeWizzified, options, callback)
}