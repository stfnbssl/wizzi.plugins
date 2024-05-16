/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.bin\.wizzi-override\lib\wizzifiers\utils\ittfWriter.js.ittf
    utc time: Thu, 09 May 2024 13:28:11 GMT
*/
'use strict';
var util = require('util');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;
var StringWriter = require("./stringWriter");

function logError(label, obj, depth) {
    var message = util.inspect(obj, {
        depth: depth || null
     });
    console.log("[31m%s[0m", '.wizzifiers.utils.ittfWriter', label, message);
}

var writer = function() {
};

writer.prototype.write = function(filepath, node, callback) {
    this.indentValue = 0;
    file.openWrite(filepath, (err, stream) => {
    
        if (err) {
            return callback(err);
        }
        this.stream = stream;
        this.node(node);
        this.stream.end();
        return callback(null, null);
    }
    )
}
;

writer.prototype.stringify = function(node, options) {
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
    if (node.tag === '$dummy') {
        return ;
    }
    if (node.tag === '$group') {
        node.children.forEach((item) => {
        
            if (!item) {
                throw new Error(logError('node has an empty child', node, 2));
            }
            item.__parent = node;
            this.node(item);
        }
        )
        return ;
    }
    var indent = Array(this.indentValue * 4 + 1).join(" ");
    this.stream.write(indent + node.tag);
    if (typeof node.name !== 'undefined') {
        this.stream.write(' ' + formatName(node.name) + ((node.__deleted ? '  (deleted)' : '')))
    }
    this.stream.write('\n');
    this.indentValue++;
    indent = Array(this.indentValue * 4 + 1).join(" ");
    
    if (node.attribs) {
        for (var k in node.attribs) {
            this.stream.write(indent + k + ' ' + formatAttrib(node.attribs[k]) + '\n');
        }
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
        throw new Error(logError('node without children', node));
    }
    
    node.children.forEach((item) => {
    
        if (!item) {
            throw new Error(logError('node has an empty child', node, 2));
        }
        else {
            item.__parent = node;
            this.node(item);
        }
    }
    )
    this.indentValue--;
}
;

function formatName(name) {
    if (verify.isObject(name)) {
        log('ittfWriter.formatName', name);
    }
    return name && name.trim ? name.trim() : name;
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
    new writer().write(filepath, node, callback)
}
;

exports.stringify = function(node, options) {
    options = options || {};
    return new writer().stringify(node, options);
}
;
