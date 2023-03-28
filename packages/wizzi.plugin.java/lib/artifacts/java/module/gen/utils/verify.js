/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.java\.wizzi-override\lib\artifacts\java\module\gen\utils\verify.js.ittf
*/
'use strict';

var md = module.exports = {};
md.isArray = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Array]';
}
;
md.isObject = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Object]';
}
;
md.isFunction = function(functionToCheck) {
    if (functionToCheck === null || typeof(functionToCheck) === 'undefined') {
        return false;
    }
    return {}.toString.call(functionToCheck) === '[object Function]';
}
;
md.isString = function(test) {
    return test !== null && typeof(test) === 'string';
}
;
md.isEmpty = function(test) {
    return test == null || typeof(test) !== 'string' || test.length == 0;
}
;
md.isNotEmpty = function(test) {
    return test != null && typeof(test) === 'string' && test.length > 0;
}
;
md.startsWith = function(str, prefix) {
    if (md.isEmpty(str) || md.isEmpty(prefix)) {
        return false;
    }
    else {
        return str.indexOf(prefix) === 0;
    }
}
;
md.endsWith = function(str, suffix) {
    if (md.isEmpty(str) || md.isEmpty(suffix)) {
        return false;
    }
    else {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
}
;
md.replaceAll = function(text, find, replace) {
    if (md.isEmpty(text)) {
        return text;
    }
    return text.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
;
function escapeRegExp(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
