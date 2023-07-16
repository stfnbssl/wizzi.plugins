/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docs\.wizzi-override\lib\artifacts\utils\hast-to-html\index.js.ittf
    utc time: Fri, 16 Jun 2023 09:56:06 GMT
*/
'use strict';
var pretty = require('@wizzi/utils').pretty;
module.exports = function(hast, callback) {
    var builder = [];
    processType(hast, builder, 0, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        return callback(null, builder.join(''));
    }
    )
}
;
function processType(hastItem, builder, indent, callback) {
    if (hastItem.type == 'element') {
        return element(hastItem, builder, indent, callback);
    }
    if (hastItem.type == 'text') {
        return text(hastItem, builder, callback);
    }
    if (hastItem.type == 'codeLines') {
        return codeLines(hastItem, builder, indent, callback);
    }
    return callback(null);
}
function text(hastItem, builder, callback) {
    builder.push(hastItem.value)
    return callback(null);
}
function element(hastItem, builder, indent, callback) {
    builder.push(new Array(indent * 4).join(' '))
    builder.push('<');
    builder.push(hastItem.tagName);
    var attrs = attributes(hastItem);
    if (attrs && attrs.length > 0) {
        builder.push(' ');
        builder.push(attrs);
    }
    if (hastItem.children.length > 0) {
        builder.push('>');
    }
    else {
        builder.push('/>');
        builder.push('\n');
    }
    if (hastItem.children.length > 0) {
        if (hastItem.children[0].type != "text") {
            builder.push('\n');
        }
        function iterate(i) {
            var item = hastItem.children[i];
            if (!item) {
                if (hastItem.children[0].type != "text") {
                    builder.push(new Array(indent * 4).join(' '))
                }
                builder.push('</');
                builder.push(hastItem.tagName);
                builder.push('>');
                builder.push('\n');
                return callback(null);
            }
            processType(item, builder, indent + 1, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                iterate(i+1);
            }
            )
        }
        iterate(0);
    }
    else {
        return callback(null);
    }
}
function attributes(hastItem) {
    var builder = [];
    for (var k in hastItem.properties) {
        var first = builder.length == 0;
        var value = hastItem.properties[k];
        if (!first) {
            builder.push(' ');
        }
        builder.push(k);
        if (typeof value != "undefined") {
            builder.push('="');
            builder.push(value.toString());
            builder.push('"');
        }
    }
    return builder.join('');
}
function codeLines(hastItem, builder, indent, callback) {
    pretty.prettifyIttfHtmlFromString(hastItem.content, (err, pretty) => {
    
        if (err) {
            return callback(err);
        }
        builder.push(pretty)
        return callback(null);
    }
    )
}
