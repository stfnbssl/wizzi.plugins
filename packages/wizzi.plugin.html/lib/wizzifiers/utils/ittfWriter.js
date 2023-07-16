/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\wizzifiers\utils\ittfWriter.js.ittf
    utc time: Wed, 07 Jun 2023 07:55:35 GMT
*/
'use strict';
var chalk = require('chalk');
var util = require('util');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var StringWriter = require("./stringWriter");
function log(label, obj) {
    console.log(label, util.inspect(obj, {
        depth: null
     }))
}
var writer = function() {
};
writer.prototype.write = function(filepath, node, callback) {
    this.indentValue = 0;
    var _this = this;
    file.openWrite(filepath, function(err, stream) {
        if (err) {
            callback(err);
            return ;
        }
        _this.stream = stream;
        _this.node(node);
        _this.stream.end();
        callback(null, null);
    })
}
;
writer.prototype.stringify = function(node, options) {
    this.lang = options.lang;
    this.keepDeleted = options.keepDeleted;
    this.indentValue = 0;
    this.stream = new StringWriter();
    this.node(node);
    return this.stream.toString();
}
;
writer.prototype.node = function(node) {
    if (!this.keepDeleted && node.__deleted) {
        return ;
    }
    if (!node.tag) {
        return ;
    }
    var _this = this;
    var indent = Array(this.indentValue * 4 + 1).join(" ");
    if (!node.tag) {
    }
    if (node.tag === '$dummy') {
        return ;
    }
    if (node.tag === '$group') {
        node.children.forEach(function(item) {
            item.__parent = node;
            if (!item) {
                throw new Error('node has empty children, ' + (util.inspect(node, {
                        depth: 2
                     })));
            }
            _this.node(item);
        })
        return ;
    }
    if (this.lang === 'js' && node.tag === 'block') {
        if (preserveBlockTags.indexOf(node.__parent.tag) == -1) {
            node.children.forEach(function(item) {
                if (!item) {
                    throw new Error('node has empty children,' + (util.inspect(node, {
                            depth: 2
                         })));
                }
                item.__parent = node;
                _this.node(item);
            })
            return ;
        }
    }
    if (node.children.length == 1) {
        var c = node.children[0];
        if (!c) {
            throw new Error('node has empty children,' + (util.inspect(node, {
                    depth: 2
                 })));
        }
        var t = c.tag;
        if (([
            '@', 
            'var', 
            'decl', 
            'block'
        ].indexOf(node.tag)) === -1 && t === 'iife') {
            console.log(chalk.red('IttfWriter ATTENTION: written iife suppressing parent tag ' + node.tag));
            _this.node(c);
            return ;
        }
        if (node.tag === 'set' && t === 'set') {
            _this.node(c);
            return ;
        }
        if (node.tag === 'set' && t === '_' && formatName(node.name).length == 0) {
            _this.node(c);
            return ;
        }
    }
    this.stream.write(indent + node.tag);
    if (typeof node.name !== 'undefined') {
        this.stream.write(' ' + formatName(node.name) + ((node.__deleted ? '  (deleted)' : '')))
    }
    // if (typeof node.source !== 'undefined' && node.source.length < 50 ) this.stream.write('    $$ ' + node.source);
    this.stream.write('\n');
    this.indentValue++;
    indent = Array(this.indentValue * 4 + 1).join(" ");
    for (var k in node.attribs) {
        this.stream.write(indent + k + ' ' + formatAttrib(node.attribs[k]) + '\n');
    }
    if (node.lines && node.lines.length > 0) {
        var lindent = indent;
        if (node.tag !== '$.') {
            this.stream.write(indent + "$.\n");
            lindent = lindent + "    ";
        }
        var self = this;
        node.lines.forEach(function(l) {
            self.stream.write(lindent + l + '\n');
        })
    }
    if (!node.children) {
        log('node without children', node);
    }
    node.children.forEach(function(item) {
        if (!item) {
            console.log('node has empty children, ' + (util.inspect(node, {
                depth: 2
             })))
        }
        else {
            item.__parent = node;
            _this.node(item);
        }
    })
    this.indentValue--;
}
;
function formatName(name) {
    if (verify.isObject(name)) {
        log('ittfwriter.formatName', name);
    }
    return name && name.trim ? name.trim() : '';
}
function formatAttrib(a) {
    if (typeof a === 'undefined' || a == null) {
        return '';
    }
    // log('attrib', a);
    var lines = file.splitLines(a.trim());
    if (lines.length === 1) {
        return lines[0];
    }
    else {
        acc = [];
        lines.forEach(function(l) {
            acc.push(l.trim());
        })
        return acc.join(' ');
    }
}
exports.write = function(filepath, node, callback) {
    new writer().write(filepath, node, function(err, result) {
        if (err) {
            callback(err);
            return ;
        }
        callback(null, result);
    })
}
;
exports.stringify = function(node, options) {
    options = options || {};
    return new writer().stringify(node, options);
}
;
var preserveBlockTags = [
    'if', 
    'else', 
    'elif', 
    'for', 
    'while', 
    'do', 
    'case', 
    'default'
];
