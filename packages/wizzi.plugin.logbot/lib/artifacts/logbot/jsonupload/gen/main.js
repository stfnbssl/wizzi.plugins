/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\lib\artifacts\logbot\jsonupload\gen\main.js.ittf
    utc time: Wed, 04 Sep 2024 13:08:58 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');

var myname = 'wizzi.plugin.logbot.artifacts.logbot.jsonupload.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    var modelTypeIsValid = verify.isObject(model);
    if (!modelTypeIsValid) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'logbot') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "logbot". Received: ' + model.wzElement, model));
    }
    try {
        ctx.__json = {
            oems: [
                
            ], 
            users: [
                
            ], 
            plants: [
                
            ], 
            gateways: [
                
            ], 
            dynamicTags: [
                
            ], 
            dynamicTagAllowedValues: [
                
            ], 
            scripts: [
                
            ], 
            plcs: [
                
            ], 
            connectionValues: [
                
            ], 
            metrics: [
                
            ], 
            metricValues: [
                
            ], 
            staticTags: [
                
            ], 
            dynamicTagRefs: [
                
            ]
         };
        ctx.__current = ctx.__json;
        md.logbot(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            // generation OK
            else {
                ctx.w(JSON.stringify(ctx.__json, null, 2))
                return callback(null, ctx);
            }
        }
        )
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
    function terminate_gen(model, ctx, callback) {
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
md.logbot = function(model, ctx, callback) {
    md.genItems(model.nodes, ctx, {
        indent: true
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        return callback(null);
    }
    )
}
;
md.oem = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model)
     };
    ctx.__current.oems.push(json)
    var i, i_items=model.users, i_len=model.users.length, item;
    for (i=0; i<i_len; i++) {
        item = model.users[i];
        user(ctx.__current, model, item)
    }
    var i, i_items=model.plants, i_len=model.plants.length, item;
    for (i=0; i<i_len; i++) {
        item = model.plants[i];
        plant(ctx.__current, model, item)
    }
    return callback(null);
}
;

/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.logbot/lib/artifacts/logbot/jsonupload/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}

function user(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        oem: getKeyPath(parentModel)
     };
    jsonDataTables.users.push(json)
}

function plant(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        oem: getKeyPath(parentModel), 
        plant_id: model.plant_id
     };
    jsonDataTables.plants.push(json)
    var i, i_items=model.gateways, i_len=model.gateways.length, item;
    for (i=0; i<i_len; i++) {
        item = model.gateways[i];
        gateway(jsonDataTables, model, item)
    }
}

function gateway(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        plant: getKeyPath(parentModel), 
        iot_id: model.iot_id, 
        batching_maxSize: model.batching_maxSize, 
        batching_period: model.batching_period
     };
    jsonDataTables.gateways.push(json)
    var i, i_items=model.dynamicTags, i_len=model.dynamicTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTags[i];
        dynamicTag(jsonDataTables, model, item)
    }
    var i, i_items=model.scripts, i_len=model.scripts.length, item;
    for (i=0; i<i_len; i++) {
        item = model.scripts[i];
        script(jsonDataTables, model, item)
    }
    var i, i_items=model.plcs, i_len=model.plcs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.plcs[i];
        plc(jsonDataTables, model, item)
    }
}

function dynamicTag(jsonDataTables, parentModel, model) {
    var json = {
        nameKey: getKeyPath(model), 
        gateway: getKeyPath(parentModel), 
        tag_id: model.wzName, 
        default_value: model.default_value, 
        description: model.description, 
        ref_plc_id: model.ref_plc_id, 
        ref_metric_name: model.ref_metric_name
     };
    jsonDataTables.dynamicTags.push(json)
    var i, i_items=model.dynamicTagAllowedValues, i_len=model.dynamicTagAllowedValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagAllowedValues[i];
        dynamicTagAllowedValue(jsonDataTables, model, item)
    }
    var i, i_items=model.dynamicTagRegexAllowedValues, i_len=model.dynamicTagRegexAllowedValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagRegexAllowedValues[i];
        dynamicTagRegexAllowedValue(jsonDataTables, model, item)
    }
}

function dynamicTagAllowedValue(jsonDataTables, parentModel, model) {
    var json = {
        nameKey: getKeyPath(model), 
        dynamicTag: getKeyPath(parentModel), 
        tag_value: model.wzName, 
        is_regex: false
     };
    jsonDataTables.dynamicTagAllowedValues.push(json)
}

function dynamicTagRegexAllowedValue(jsonDataTables, parentModel, model) {
    var json = {
        nameKey: getKeyPath(model), 
        dynamicTag: getKeyPath(parentModel), 
        tag_value: model.wzName, 
        is_regex: true
     };
    jsonDataTables.dynamicTagAllowedValues.push(json)
}

function script(jsonDataTables, parentModel, model) {
    var json = {
        nameKey: getKeyPath(model), 
        gateway: getKeyPath(parentModel), 
        script_id: model.wzName, 
        script_type: model.script_type, 
        script_description: model.script_description, 
        script_timeout: model.script_timeout, 
        script_content: model.script_content
     };
    jsonDataTables.scripts.push(json)
}

function plc(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        gateway: getKeyPath(parentModel), 
        protocol: model.protocol, 
        plc_id: model.plc_id
     };
    jsonDataTables.plcs.push(json)
    var i, i_items=model.connectionValues, i_len=model.connectionValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.connectionValues[i];
        connectionValue(jsonDataTables, model, item)
    }
    var i, i_items=model.metrics, i_len=model.metrics.length, item;
    for (i=0; i<i_len; i++) {
        item = model.metrics[i];
        metric(jsonDataTables, model, item)
    }
}

function connectionValue(jsonDataTables, parentModel, model) {
    var json = {
        connectionProperty: model.wzName + '-' + parentModel.protocol, 
        nameKey: getKeyPath(model), 
        plc: getKeyPath(parentModel), 
        value: model.value
     };
    jsonDataTables.connectionValues.push(json)
}

function metric(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        plc: getKeyPath(parentModel), 
        script: model.scriptRef ? getKeyPath(parentModel.wzParent) + '+' + model.scriptRef.wzName : null, 
        interval: model.interval, 
        description: model.description, 
        topic: model.topic, 
        script_value: model.script_value, 
        ret_policy: model.ret_policy
     };
    jsonDataTables.metrics.push(json)
    var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.staticTags[i];
        staticTag(jsonDataTables, model, item)
    }
    var i, i_items=model.dynamicTagRefs, i_len=model.dynamicTagRefs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagRefs[i];
        dynamicTagRef(jsonDataTables, model, item)
    }
    var i, i_items=model.metricValues, i_len=model.metricValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.metricValues[i];
        metricValue(jsonDataTables, model, item)
    }
}

function staticTag(jsonDataTables, parentModel, model) {
    var json = {
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        key: model.wzName, 
        value: model.tag_value
     };
    jsonDataTables.staticTags.push(json)
}

function dynamicTagRef(jsonDataTables, parentModel, model) {
    var json = {
        key: model.wzName, 
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        dynamicTag: model.value_ref, 
        value_itself: model.value_itself
     };
    jsonDataTables.dynamicTagRefs.push(json)
}

function metricValue(jsonDataTables, parentModel, model) {
    var json = {
        metricProperty: model.wzName + '-' + parentModel.wzParent.protocol, 
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        value: model.value
     };
    jsonDataTables.metricValues.push(json)
}

function getKeyPath(model, rootEl) {
    if (model.wzElement == 'oem') {
        return model.wzName;
    }
    const names = [ model.wzName ];
    let parent = model.wzParent;
    while (parent != null) {
        names.push(parent.wzName)
        if (parent.wzElement == 'oem') {
            return [...names].reverse().join('+');
        }
        parent = parent.wzParent;
    }
    return names.join('+');
}