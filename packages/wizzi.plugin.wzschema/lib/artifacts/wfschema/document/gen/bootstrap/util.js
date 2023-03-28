/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wfschema\document\gen\bootstrap\util.js.ittf
*/
'use strict';
var inflect = require('i')();
var md = module.exports = {};
md.getIdentifier = function(str, checkKeyword) {
    if (md.isNotEmpty(str) === false) {
        return str;
    }
    str = str.trim();
    var ch, sb = [];
    for (var i=0; i<str.length; i++) {
        ch = str[i];
        sb.push( isIdentifierChar(ch) ? ch : '_');
    }
    var ret = sb.join('');
    if (checkKeyword) {
        return keywords.indexOf(ret) >= 0 ? 'x' + ret : ret;
    }
    else {
        return ret;
    }
}
;
md.isNotEmpty = function(str) {
    return typeof str === 'string' && str.trim().length > 0;
}
;
md.isEmpty = function(str) {
    return typeof str === 'undefined' || str == null || ( typeof str === 'string' && str.trim().length === 0 );
}
;
md.endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
;
md.startsWith = function(str, prefix) {
    return str.indexOf(prefix) === 0;
}
;
md.replaceAll = function(str, find, replace) {
    if (typeof str === 'undefined' || str == null) {
        return str;
    }
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
;
md.pluralize = function(str) {
    return inflect.pluralize(str);
}
;
md.capitalize = function(str) {
    // do not use inflect ( in inflect titleName becames Titlename non TitleName )
    if (str && str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    else {
        return str;
    }
}
;
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
md.escapeString = function(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
;
function isIdentifierChar(str) {
    return isAlphaNumeric(str) || str === '_';
}
function isAlphaNumeric(str) {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    return str.match(letterNumber);
}
var keywords = [
    'abstract', 
    'arguments', 
    'async', 
    'await', 
    'boolean', 
    'break', 
    'byte', 
    'case', 
    'catch', 
    'char', 
    'class', 
    'const', 
    'continue', 
    'debugger', 
    'default', 
    'delete', 
    'do', 
    'double', 
    'else', 
    'enum', 
    'eval', 
    'export', 
    'extends', 
    'false', 
    'final', 
    'finally', 
    'float', 
    'for', 
    'function', 
    'goto', 
    'if', 
    'implements', 
    'import', 
    'in', 
    'instanceof', 
    'int', 
    'interface', 
    'let', 
    'long', 
    'native', 
    'new', 
    'null', 
    'package', 
    'private', 
    'protected', 
    'public', 
    'require', 
    'return', 
    'short', 
    'static', 
    'super', 
    'switch', 
    'synchronized', 
    'this', 
    'throw', 
    'throws', 
    'transient', 
    'true', 
    'try', 
    'typeof', 
    'var', 
    'void', 
    'volatile', 
    'while', 
    'with', 
    'yield'
];
