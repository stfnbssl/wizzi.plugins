/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\wizzifiers\utils\cloner.js.ittf
    utc time: Wed, 27 Nov 2024 09:20:15 GMT
*/
// usefull: https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
var verify = require('@wizzi/utils').verify;
function clone(obj, objects, path) {
    var objects = objects || new WeakMap();
    if (verify.isArray(obj)) {
        var ret = [];
        var i, i_items=obj, i_len=obj.length, item;
        for (i=0; i<i_len; i++) {
            item = obj[i];
            var value = clone(item, objects, path + "[" + i + "]");
            if (value !== null) {
                ret.push(value);
            }
        }
        return ret;
    }
    else if (verify.isObject(obj)) {
        var old_path = objects.get(obj);
        if (old_path !== undefined) {
            return {
                    $ref: old_path
                 };
        }
        objects.set(obj, path);
        var ret = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ret[prop] = clone(obj[prop], objects, path + "[" + JSON.stringify(prop) + "]");
            }
        }
        return ret;
    }
    else {
        return obj;
    }
}
module.exports = function(ast) {
    return clone(ast, null, '');
}
;