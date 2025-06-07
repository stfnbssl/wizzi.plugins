/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\lib\artifacts\logbot\jsonupload\gen\main.js.ittf
    utc time: Fri, 24 Jan 2025 15:11:10 GMT
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
            manufacturers: [
                
            ], 
            gatewayModels: [
                
            ], 
            deviceModels: [
                
            ], 
            userGroups: [
                
            ], 
            plants: [
                
            ], 
            gateways: [
                
            ], 
            devices: [
                
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
md.meta = function(model, ctx, callback) {
    // nothing to do
    return callback(null);
}
;
md.manufacturer = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model)
     };
    ctx.__current.manufacturers.push(json)
    var i, i_items=model.gatewayModels, i_len=model.gatewayModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.gatewayModels[i];
        // loog 'manufacturer.gatewayModels', item.wzName
        gateway("gatewayModel", ctx.__current, model, item)
    }
    var i, i_items=model.deviceModels, i_len=model.deviceModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.deviceModels[i];
        // loog 'manufacturer.deviceModel', item.wzName
        deviceModel(ctx.__current, model, item)
    }
    return callback(null);
}
;
md.userGroup = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        org_xid: model.org_xid, 
        description: model.description
     };
    ctx.__current.userGroups.push(json)
    var i, i_items=model.gatewayModels, i_len=model.gatewayModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.gatewayModels[i];
        gateway('gatewayModel', ctx.__current, model, item)
    }
    var i, i_items=model.deviceModels, i_len=model.deviceModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.deviceModels[i];
        deviceModel(ctx.__current, model, item)
    }
    var i, i_items=model.gateways, i_len=model.gateways.length, item;
    for (i=0; i<i_len; i++) {
        item = model.gateways[i];
        gateway("gw", ctx.__current, model, item)
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

function plant(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        groupId: getKeyPath(parentModel), 
        description: model.description, 
        address: model.address, 
        tags: {
            
         }
     };
    var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.staticTags[i];
        staticTag(jsonDataTables, model, item, json.tags)
    }
    jsonDataTables.plants.push(json)
    var i, i_items=model.gateways, i_len=model.gateways.length, item;
    for (i=0; i<i_len; i++) {
        item = model.gateways[i];
        gateway('gw', jsonDataTables, model, item)
    }
}

function gateway(kind, jsonDataTables, parentModel, model) {
    if (kind == "gatewayModel") {
        var json = {
            name: model.wzName, 
            nameKey: getKeyPath(model), 
            groupId: model.groupId, 
            description: model.description, 
            version: model.version, 
            ingestionConfigData: {
                dynamic_tags: [
                    
                ], 
                scripts: [
                    
                ]
             }
         };
        if (parentModel.wzElement == 'manufacturer') {
            json.manufacturer = getKeyPath(parentModel);
        }
        else {
            json.groupId = getKeyPath(parentModel);
        }
        jsonDataTables.gatewayModels.push(json)
        var i, i_items=model.dynamicTags, i_len=model.dynamicTags.length, item;
        for (i=0; i<i_len; i++) {
            item = model.dynamicTags[i];
            dynamicTag(jsonDataTables, model, item, json.ingestionConfigData)
        }
        var i, i_items=model.scripts, i_len=model.scripts.length, item;
        for (i=0; i<i_len; i++) {
            item = model.scripts[i];
            script(jsonDataTables, model, item, json.ingestionConfigData)
        }
    }
    else {
        var json = {
            name: model.wzName, 
            nameKey: getKeyPath(model), 
            description: model.description, 
            balenaId: model.balenaId, 
            status: model.status, 
            orderCode: model.orderCode, 
            deviceVersion: model.deviceVersion, 
            serialCode: model.serialCode, 
            gatewayModel: model.gatewayModel ? model.gatewayModel.wzName : null, 
            tags: {
                
             }
         };
        if (parentModel.wzElement == 'plant') {
            json.plant = getKeyPath(parentModel);
            json.groupId = getKeyPath(parentModel.wzParent);
        }
        else {
            json.groupId = getKeyPath(parentModel);
        }
        if (model.batching_maxSize || model.batching_maxSize == 0 || model.batching_period || model.batching_period == 0) {
            json.ingestionConfigData = {};
            json.ingestionConfigData.batching = {};
            json.ingestionConfigData.batching.batching_maxSize = model.batching_maxSize;
            json.ingestionConfigData.batching.batching_period = model.batching_period;
        }
        jsonDataTables.gateways.push(json)
        var i, i_items=model.dynamicTags, i_len=model.dynamicTags.length, item;
        for (i=0; i<i_len; i++) {
            item = model.dynamicTags[i];
            dynamicTag(jsonDataTables, model, item, json)
        }
        var i, i_items=model.scripts, i_len=model.scripts.length, item;
        for (i=0; i<i_len; i++) {
            item = model.scripts[i];
            script(jsonDataTables, model, item, json)
        }
        var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
        for (i=0; i<i_len; i++) {
            item = model.staticTags[i];
            staticTag(jsonDataTables, model, item, json.tags)
        }
        var i, i_items=model.devices, i_len=model.devices.length, item;
        for (i=0; i<i_len; i++) {
            item = model.devices[i];
            device(jsonDataTables, model, item)
        }
    }
}

function dynamicTag(jsonDataTables, parentModel, model, ingestionConfigData) {
    var json = {
        tag_xid: model.wzName, 
        default_value: model.default_value, 
        description: model.description, 
        ref_device_xid: model.ref_device_xid, 
        ref_metric_name: model.ref_metric_name, 
        allowed_values: [
            
        ], 
        regex_allowed_values: [
            
        ]
     };
    var i, i_items=model.dynamicTagAllowedValues, i_len=model.dynamicTagAllowedValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagAllowedValues[i];
        json.allowed_values.push(item.wzName)
    }
    var i, i_items=model.dynamicTagRegexAllowedValues, i_len=model.dynamicTagRegexAllowedValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagRegexAllowedValues[i];
        json.regex_allowed_values.push(item.wzName)
    }
    ingestionConfigData.dynamic_tags.push(json)
}
function script(jsonDataTables, parentModel, model, ingestionConfigData) {
    var json = {
        script_xid: model.wzName, 
        script_type: model.script_type, 
        script_description: model.script_description, 
        script_timeout: model.script_timeout, 
        script_content: model.script_content
     };
    ingestionConfigData.scripts.push(json)
}

function deviceModel(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: parentModel.wzElement == 'manufacturer' ? model.wzName : getKeyPath(model), 
        groupId: model.groupId, 
        description: model.description, 
        protocol: model.protocol, 
        version: model.version, 
        ingestionConfigData: {
            metric: [
                
            ]
         }
     };
    // loog 'deviceModel.parentModel.wzElement', parentModel.wzElement
    if (parentModel.wzElement == 'manufacturer') {
        json.manufacturer = getKeyPath(parentModel);
    }
    else if (parentModel.wzElement == 'gatewayModel') {
        json.gatewayModel = getKeyPath(parentModel);
        if (parentModel.wzParent.wzElement == 'manufacturer') {
            json.manufacturer = getKeyPath(parentModel.wzParent);
        }
        else {
            json.groupId = getKeyPath(parentModel.wzParent);
        }
    }
    else {
        json.groupId = getKeyPath(parentModel);
    }
    jsonDataTables.deviceModels.push(json)
    var i, i_items=model.metrics, i_len=model.metrics.length, item;
    for (i=0; i<i_len; i++) {
        item = model.metrics[i];
        metric('deviceModel', jsonDataTables, model, item, json)
    }
}

function device(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        description: model.description, 
        protocol: model.protocol, 
        status: model.status, 
        orderCode: model.orderCode, 
        deviceVersion: model.deviceVersion, 
        serialCode: model.serialCode, 
        deviceModel: model.deviceModel, 
        deviceModel: model.deviceModel ? model.deviceModel.wzName : null, 
        connection: {
            connection: {
                
             }
         }, 
        tags: {
            
         }
     };
    console.log('Device', parentModel.wzElement, parentModel.wzParent.wzElement, parentModel.wzParent.wzParent.wzElement, __filename);
    console.log('Device', parentModel.wzName, parentModel.wzParent.wzName, parentModel.wzParent.wzParent.wzName, __filename);
    if (parentModel.wzElement == 'gateway') {
        json.gateway = getKeyPath(parentModel);
        json.groupId = parentModel.wzParent.wzParent.wzName;
    }
    else {
        json.groupId = parentModel.wzParent.wzName;
    }
    jsonDataTables.devices.push(json)
    var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.staticTags[i];
        staticTag(jsonDataTables, model, item, json.tags)
    }
    var i, i_items=model.connectionValues, i_len=model.connectionValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.connectionValues[i];
        connectionValue(jsonDataTables, model, item, json.connectionConfiguration)
    }
    var i, i_items=model.metrics, i_len=model.metrics.length, item;
    for (i=0; i<i_len; i++) {
        item = model.metrics[i];
        metric('device', jsonDataTables, model, item, json)
    }
}

function connectionValue(jsonDataTables, parentModel, model, connectionConfiguration) {
    var json = {
        connectionProperty: model.wzName + '-' + parentModel.protocol, 
        nameKey: getKeyPath(model), 
        device: getKeyPath(parentModel), 
        value: model.value
     };
    connectionConfiguration.connection[model.wzName] = model.wzRoot().meta.getConnectionTypedValue(parentModel.protocol, model.wzName, model.value)
    ;
}

function metric(kind, jsonDataTables, parentModel, model, json) {
    var ingestionConfigData_metric = {
        name: model.wzName, 
        interval: model.interval, 
        description: model.description, 
        topic: model.topic, 
        script: model.scriptRef ? getKeyPath(parentModel.wzParent) + '+' + model.scriptRef.wzName : null, 
        script_value: model.script_value, 
        ret_policy: model.ret_policy, 
        tags: {
            
         }
     };
    var i, i_items=model.metricValues, i_len=model.metricValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.metricValues[i];
        metricValue(jsonDataTables, model, item, ingestionConfigData_metric)
    }
    var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.staticTags[i];
        staticTag(jsonDataTables, model, item, ingestionConfigData_metric.tags)
    }
    if (kind == 'device' || (kind == 'deviceModel' && model.wzParent.wzParent.wzElement == 'userGroup' )) {
        var i, i_items=model.dynamicTagRefs, i_len=model.dynamicTagRefs.length, item;
        for (i=0; i<i_len; i++) {
            item = model.dynamicTagRefs[i];
            dynamicTagRef(jsonDataTables, model, item, ingestionConfigData_metric.tags)
        }
    }
    if (!json.ingestionConfigData) {
        json.ingestionConfigData = {};
    }
    if (!json.ingestionConfigData.metric) {
        json.ingestionConfigData.metric = [];
    }
    json.ingestionConfigData.metric.push(ingestionConfigData_metric)
}

function staticTag(jsonDataTables, parentModel, model, tags) {
    var json = {
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        key: model.wzName, 
        value: model.tag_value
     };
    if (!tags.static) {
        tags.static = [];
    }
    tags.static.push({
        key: model.wzName, 
        value: model.tag_value
     })
}

function dynamicTagRef(jsonDataTables, parentModel, model, tags) {
    var json = {
        key: model.wzName, 
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        dynamicTag: model.value_ref, 
        value_itself: model.value_itself
     };
    if (!tags.dynamic) {
        tags.dynamic = [];
    }
    tags.dynamic.push({
        key: model.wzName, 
        value: model.value_ref
     })
}

function metricValue(jsonDataTables, parentModel, model, ingestionConfigData_metric) {
    var json = {
        metricProperty: model.wzName + '-' + parentModel.wzParent.protocol, 
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        value: model.value
     };
    ingestionConfigData_metric[model.wzName] = model.wzRoot().meta.getMetricTypedValue(parentModel.wzParent.protocol, model.wzName, model.value)
    ;
}

function getKeyPath(model, rootEl) {
    if (model.wzElement == 'userGroup' || model.wzElement == 'manufacturer') {
        return model.wzName;
    }
    const names = [ model.wzName ];
    let parent = model.wzParent;
    while (parent != null) {
        names.push(parent.wzName)
        if (parent.wzElement == 'userGroup') {
            return [...names].reverse().join('+');
        }
        parent = parent.wzParent;
    }
    return names.join('+');
}