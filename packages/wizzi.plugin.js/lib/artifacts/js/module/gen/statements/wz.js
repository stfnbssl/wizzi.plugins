/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\statements\wz.js.ittf
    utc time: Wed, 10 Jan 2024 14:54:20 GMT
*/
'use strict';
var u = require('../utils/stm');
var md = module.exports = {};
var myname = 'wizzi-js.artifacts.js.module.gen.statements.wz';
md.load = function(cnt) {
    cnt.stm.wzRequire = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.wzRequire');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.wzRequire. Got: ' + callback);
        }
        ctx.w('var ' + model.wzName + ' = __.require("' + model.wzName + '");');
        return callback(null);
    }
    ;
    cnt.stm.wzVar = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.wzVar');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.wzVar. Got: ' + callback);
        }
        cnt.stm.var(model, ctx, callback);
    }
    ;
    cnt.stm.wzConst = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.wzConst');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.wzConst. Got: ' + callback);
        }
        cnt.stm.const(model, ctx, callback);
    }
    ;
    cnt.stm.wzFunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.wzFunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.wzFunction. Got: ' + callback);
        }
        cnt.stm.xfunction(model, ctx, callback);
    }
    ;
    cnt.stm.wzClass = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.wzClass');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.wzClass. Got: ' + callback);
        }
        cnt.stm.xclass(model, ctx, callback);
    }
    ;
}
;
