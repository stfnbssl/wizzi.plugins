/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.css\.wizzi-override\lib\wizzifiers\utils\cloner.js.ittf
    utc time: Tue, 11 Apr 2023 19:38:15 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
function clone(obj) {
    if (verify.isArray(obj)) {
        var ret = [];
        var i, i_items=obj, i_len=obj.length, item;
        for (i=0; i<i_len; i++) {
            item = obj[i];
            var value = clone(item);
            if (value !== null) {
                ret.push(value);
            }
        }
        return ret;
    }
    else if (verify.isObject(obj)) {
        var ret = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ret[prop] = clone(obj[prop]);
            }
        }
        return ret;
    }
    else {
        return obj;
    }
}
module.exports = function(ast) {
    return clone(ast);
}
;