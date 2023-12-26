/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\main.js.ittf
    utc time: Thu, 27 Jul 2023 14:19:09 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('wizzi-utils').helpers.lineParser;
var errors = require('../../../../../errors');
var module_es6 = require('./es6/module');
var statement = require('./statement');
// VIA var wzIife = require('./wziife')
var preprocess = require('./preprocess');

var myname = 'wizzi.plugin.js.artifacts.js.module.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'xmodule') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "xmodule". Received: ' + model.wzElement, model));
    }
    try {
        preprocess.exec(model, ctx);
        ctx.__jskind = model.kind;
        ctx.__ecma = model.ecma;
        main_init(model, ctx)
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            statement.gen(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            main_close(model, ctx)
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            else {
                return callback(null, ctx);
            }
        }
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
    function terminate_gen(model, ctx) {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            return callback(null, ctx);
        }
    }
}
;

// ITTF Fragment lib/artifacts/tfolder/async-md-gen-items.js.ittf
md.genItems = function(items, ctx, options, callback) {
    if (typeof callback == 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.mapItem(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        process.nextTick(callback)
    }
    )
}
;
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
}
;
md.genItem = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
    }
}
;
function main_init(model, ctx) {
    if (model.kind === 'nodejs.bin') {
        ctx.w('#!/usr/bin/env node');
    }
    if ((!!ctx.values.noGeneratorComments) == false) {
        ctx.w('/*');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    package: wizzi-js@');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        ctx.w('    utc time: ' + new Date().toUTCString());
        ctx.w('*/');
    }
    emitResources(model.resources, ctx)
    if (!model.no_strict && (!!ctx.values.noUseStrict) == false) {
        ctx.w("'use strict';");
    }
    main_es6_module(model, ctx)
    if (model.hasFeature('argument-check')) {
        if ((!!ctx.values.isLegacy) == false) {
            if ((!!ctx.values.isWizziUtilsPackage) == true) {
                ctx.w("var verify = require('wizzi-helpers').verify;");
            }
            else {
                ctx.w("var verify = require('wizzi-utils').verify;");
            }
        }
    }
    if (ctx.__wzItems && ctx.__wzItems.length > 0) {
        emit_Iife_WzModule(model, ctx);
    }
}
function main_es6_module(model, ctx) {
    var hasClasses = model.wzModelState.hasClasses,
        ecma = model.ecma;
    // loog '==== wizzi-js.artifacts.js.main', model.wzName, model.ecma, model.wzModelState.hasClasses
    if (ecma === 'es5' && hasClasses) {
        ctx.w('// generated by ' + myname);
        ctx.w("function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }");
        ctx.w("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }");
        ctx.w("var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };");
        ctx.w();
    }
}
function main_close(model, ctx) {
    if (ctx.__wzModule && ctx.__wzModule.seen) {
        emit_top_WzModule(model, ctx);
    }
    
    // _ ctx.w('    innerError = innerError || new Error(\'Error created for trace.\');')
    if (model.hasFeature('argument-check')) {
        ctx.w('/**');
        ctx.w('  params');
        ctx.w('    string code');
        ctx.w('      # the error name or number');
        ctx.w('    string method');
        ctx.w('    string message');
        ctx.w('      # optional');
        ctx.w('    { innerError');
        ctx.w('      # optional');
        ctx.w('*/');
        ctx.w('function error(code, method, message, innerError) {');
        ctx.w('    var parameter = null;');
        ctx.w('    if (verify.isObject(message)) {');
        ctx.w('        parameter = message.parameter;');
        ctx.w('        message = message.message;');
        ctx.w('    }');
        ctx.w("    return verify.error(innerError, {");
        ctx.w("        name: ( verify.isNumber(code) ? 'Err-' + code : code ),");
        ctx.w("        method: '" + model.wzName + ".' + method,");
        ctx.w("        parameter: parameter,");
        ctx.w("        sourcePath: __filename");
        ctx.w("    }, message || 'Error message unavailable');");
        ctx.w('}');
    }
}
function emitResources(requestedResources, ctx) {
    if (requestedResources && requestedResources.length > 0 && ctx.values.jsResources) {
        var resourceRepo = ctx.values.jsResources;
        resourceRepo.clearJsDependencies();
        var i, i_items=requestedResources, i_len=requestedResources.length, item;
        for (i=0; i<i_len; i++) {
            item = requestedResources[i];
            resourceRepo.addJsDependency(item.wzName);
        }
        resourceRepo.emitJsDependencies(ctx);
    }
}
function emit_top_WzModule(model, ctx) {
    ctx.w('');
    ctx.w('module.exports = {');
    ctx.indent();
    var seen = false;
    var i, i_items=ctx.__wzModule.vars, i_len=ctx.__wzModule.vars.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.vars[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write(ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_items=ctx.__wzModule.consts, i_len=ctx.__wzModule.consts.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.consts[i];
        if (seen) {
            ctx.w(',');
        }
        var ss = item.wzName.split(' ');
        ctx.write(ss[0] + ': ' + ss[0]);
        seen = true;
    }
    var i, i_items=ctx.__wzModule.functions, i_len=ctx.__wzModule.functions.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.functions[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write(item.wzName + ': ' + item.wzName);
        seen = true;
    }
    var i, i_items=ctx.__wzModule.classes, i_len=ctx.__wzModule.classes.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzModule.classes[i];
        if (seen) {
            ctx.w(',');
        }
        ctx.write(item.wzName + ': ' + item.wzName);
        seen = true;
    }
    if (seen) {
        ctx.w('');
    }
    ctx.deindent();
    ctx.w('};');
}
function emit_Iife_WzModule(model, ctx) {
    ctx.w('var __wz = (function() {');
    ctx.indent();
    ctx.w('var res = {};');
    var i, i_items=ctx.__wzItems, i_len=ctx.__wzItems.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__wzItems[i];
        var j, j_items=item.requires, j_len=item.requires.length, require;
        for (j=0; j<j_len; j++) {
            require = item.requires[j];
            var from = require.from ? require.from : require.wzName;
            ctx.w('res["' + require.wzName + '"] = require("' + from + '");');
        }
    }
    ctx.w('return {');
    ctx.w('    require: function(name) {');
    ctx.w('        return res[name];');
    ctx.w('    }');
    ctx.w('}');
    ctx.deindent();
    ctx.w('})();');
}
var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isAttrValue(a, v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}
function getAttrs(e) {
    var retval = [];
    for (var a in e) {
        if (isAttrValue(a, e[a])) {
            retval.push({ name: verify.replaceAll(a, '_', '-'), value: e[a] });
        }
        else if (a.substr(0, 3) === 'ng-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'data-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'aria-') {
            retval.push({ name: a, value: e[a] });
        }
    }
    if (e.attributes) {
        var i, i_items=e.attributes, i_len=e.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = e.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                retval.push({ name: p.name(), value: p.value() });
            }
            else {
                retval.push({ name: p.name() });
            }
        }
    }
    return retval;
}

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.js/lib/artifacts/js/module/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
// error changed in v08
