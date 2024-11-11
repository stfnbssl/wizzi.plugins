/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\lib\artifacts\logbot\jsonupload\gen\main.js.ittf
    utc time: Tue, 29 Oct 2024 10:22:29 GMT
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
            manufacturerDeviceModels: [
                
            ], 
            userGatewayModels: [
                
            ], 
            userDeviceModels: [
                
            ], 
            tenants: [
                
            ], 
            userGroups: [
                
            ], 
            modelSchemas: [
                
            ], 
            plants: [
                
            ], 
            plantPermissions: [
                
            ], 
            gateways: [
                
            ], 
            gatewayPermissions: [
                
            ], 
            dynamicTags: [
                
            ], 
            dynamicTagAllowedValues: [
                
            ], 
            scripts: [
                
            ], 
            devices: [
                
            ], 
            devicePermissions: [
                
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
md.meta = function(model, ctx, callback) {
    // nothing to do
    return callback(null);
}
;
md.manufacturer = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        org_xid: model.org_xid, 
        description: model.description
     };
    ctx.__current.manufacturers.push(json)
    var i, i_items=model.manufacturerDeviceModels, i_len=model.manufacturerDeviceModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.manufacturerDeviceModels[i];
        // loog 'manufacturer.deviceModel', item.wzName
        deviceModel(ctx.__current, model, item)
    }
    return callback(null);
}
;
md.tenant = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        org_xid: model.org_xid, 
        description: model.description
     };
    ctx.__current.tenants.push(json)
    var i, i_items=model.userGatewayModels, i_len=model.userGatewayModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.userGatewayModels[i];
        gateway('userGatewayModel', ctx.__current, model, item)
    }
    var i, i_items=model.userDeviceModels, i_len=model.userDeviceModels.length, item;
    for (i=0; i<i_len; i++) {
        item = model.userDeviceModels[i];
        deviceModel(ctx.__current, model, item)
    }
    var i, i_items=model.userGroups, i_len=model.userGroups.length, item;
    for (i=0; i<i_len; i++) {
        item = model.userGroups[i];
        userGroup(ctx.__current, model, item)
    }
    var i, i_items=model.plants, i_len=model.plants.length, item;
    for (i=0; i<i_len; i++) {
        item = model.plants[i];
        plant(ctx.__current, model, item)
    }
    return callback(null);
}
;
md.modelSchema = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        version: model.version, 
        nameKey: model.wzName, 
        description: model.description
     };
    ctx.__current.modelSchemas.push(json)
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

function userGroup(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: model.wzName, 
        tenant: getKeyPath(parentModel)
     };
    jsonDataTables.userGroups.push(json)
}

function plant(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        tenant: getKeyPath(parentModel), 
        owner: model.owner, 
        plant_xid: model.plant_xid, 
        description: model.description, 
        modelSchema: model.modelSchema, 
        configState: model.configState, 
        instanceRole: model.instanceRole, 
        itemConfigState: model.itemConfigState, 
        activityState: model.activityState, 
        modifiedId: model.modifiedId, 
        plant_model_data: {
            tags: {
                
             }
         }
     };
    var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.staticTags[i];
        staticTag(jsonDataTables, model, item, json.plant_model_data)
    }
    var i, i_items=model.userGroups, i_len=model.userGroups.length, ug;
    for (i=0; i<i_len; i++) {
        ug = model.userGroups[i];
        jsonDataTables.plantPermissions.push({
            plant: getKeyPath(model), 
            userGroup: ug.wzName
         })
    }
    jsonDataTables.plants.push(json)
    var i, i_items=model.gateways, i_len=model.gateways.length, item;
    for (i=0; i<i_len; i++) {
        item = model.gateways[i];
        gateway('gw', jsonDataTables, model, item)
    }
}

function gateway(kind, jsonDataTables, parentModel, model) {
    if (kind == "userGatewayModel") {
        var json = {
            name: model.wzName, 
            nameKey: getKeyPath(model), 
            description: model.description, 
            tenant: getKeyPath(parentModel), 
            owner: model.owner, 
            version: model.version, 
            modelSchema: model.modelSchema, 
            gw_model_data: {
                tags: {
                    
                 }, 
                dynamic_tags: [
                    
                ], 
                scripts: [
                    
                ]
             }
         };
        jsonDataTables.userGatewayModels.push(json)
        var i, i_items=model.dynamicTags, i_len=model.dynamicTags.length, item;
        for (i=0; i<i_len; i++) {
            item = model.dynamicTags[i];
            dynamicTag(jsonDataTables, model, item, json.gw_model_data)
        }
        var i, i_items=model.scripts, i_len=model.scripts.length, item;
        for (i=0; i<i_len; i++) {
            item = model.scripts[i];
            script(jsonDataTables, model, item, json.gw_model_data)
        }
    }
    else {
        var json = {
            name: model.wzName, 
            nameKey: getKeyPath(model), 
            description: model.description, 
            tenant: getKeyPath(parentModel.wzParent), 
            owner: model.owner, 
            plant: getKeyPath(parentModel), 
            gw_xid: model.gw_xid, 
            iot_xid: model.iot_xid, 
            balenaId: model.balenaId, 
            deviceModel: model.deviceModel, 
            settings: model.settings, 
            modelSchema: model.modelSchema, 
            configState: model.configState, 
            instanceRole: model.instanceRole, 
            itemConfigState: model.itemConfigState, 
            activityState: model.activityState, 
            modifiedId: model.modifiedId, 
            settings: model.settings, 
            batching_maxSize: model.batching_maxSize, 
            batching_period: model.batching_period, 
            userGatewayModel: model.userGatewayModel ? model.userGatewayModel.wzName : null, 
            gw_model_data: {
                tags: {
                    
                 }
             }
         };
        var i, i_items=model.userGroups, i_len=model.userGroups.length, ug;
        for (i=0; i<i_len; i++) {
            ug = model.userGroups[i];
            jsonDataTables.gatewayPermissions.push({
                gateway: getKeyPath(model), 
                userGroup: ug.wzName
             })
        }
        jsonDataTables.gateways.push(json)
        var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
        for (i=0; i<i_len; i++) {
            item = model.staticTags[i];
            staticTag(jsonDataTables, model, item, json.gw_model_data)
        }
        var i, i_items=model.devices, i_len=model.devices.length, item;
        for (i=0; i<i_len; i++) {
            item = model.devices[i];
            device(jsonDataTables, model, item)
        }
    }
}

function dynamicTag(jsonDataTables, parentModel, model, gw_model_data) {
    var json = {
        nameKey: getKeyPath(model), 
        gateway: getKeyPath(parentModel), 
        tag_xid: model.wzName, 
        default_value: model.default_value, 
        description: model.description, 
        ref_device_xid: model.ref_device_xid, 
        ref_metric_name: model.ref_metric_name
     };
    var gw_model_data_dynamicTag = {
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
    jsonDataTables.dynamicTags.push(json)
    var i, i_items=model.dynamicTagAllowedValues, i_len=model.dynamicTagAllowedValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagAllowedValues[i];
        dynamicTagAllowedValue(jsonDataTables, model, item, gw_model_data_dynamicTag)
    }
    var i, i_items=model.dynamicTagRegexAllowedValues, i_len=model.dynamicTagRegexAllowedValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.dynamicTagRegexAllowedValues[i];
        dynamicTagRegexAllowedValue(jsonDataTables, model, item, gw_model_data_dynamicTag)
    }
    gw_model_data.dynamic_tags.push(gw_model_data_dynamicTag)
}

function dynamicTagAllowedValue(jsonDataTables, parentModel, model, gw_model_data_dynamicTag) {
    var json = {
        nameKey: getKeyPath(model), 
        dynamicTag: getKeyPath(parentModel), 
        tag_value: model.wzName, 
        is_regex: false
     };
    jsonDataTables.dynamicTagAllowedValues.push(json)
    gw_model_data_dynamicTag.allowed_values.push(model.wzName)
}

function dynamicTagRegexAllowedValue(jsonDataTables, parentModel, model, gw_model_data_dynamicTag) {
    var json = {
        nameKey: getKeyPath(model), 
        dynamicTag: getKeyPath(parentModel), 
        tag_value: model.wzName, 
        is_regex: true
     };
    jsonDataTables.dynamicTagAllowedValues.push(json)
    gw_model_data_dynamicTag.regex_allowed_values.push(model.wzName)
}

function script(jsonDataTables, parentModel, model, gw_model_data) {
    var json = {
        nameKey: getKeyPath(model), 
        gateway: getKeyPath(parentModel), 
        script_xid: model.wzName, 
        script_type: model.script_type, 
        script_description: model.script_description, 
        script_timeout: model.script_timeout, 
        script_content: model.script_content
     };
    var script = {
        script_xid: model.wzName, 
        script_type: model.script_type, 
        script_description: model.script_description, 
        script_timeout: model.script_timeout, 
        script_content: model.script_content
     };
    gw_model_data.scripts.push(script)
    jsonDataTables.scripts.push(json)
}

function deviceModel(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: parentModel.wzElement == 'manufacturer' ? model.wzName : getKeyPath(model), 
        description: model.description, 
        owner: model.owner, 
        protocol: model.protocol, 
        version: model.version, 
        modelSchema: model.modelSchema, 
        manufacturer: null, 
        tenant: null, 
        device_model_data: {
            protocol: model.protocol, 
            metrics: [
                
            ]
         }
     };
    // loog 'deviceModel.parentModel.wzElement', parentModel.wzElement
    if (parentModel.wzElement == 'manufacturer') {
        json.manufacturer = getKeyPath(parentModel);
        jsonDataTables.manufacturerDeviceModels.push(json)
    }
    else if (parentModel.wzElement == 'tenant') {
        json.tenant = getKeyPath(parentModel);
        jsonDataTables.userDeviceModels.push(json)
    }
    var i, i_items=model.metrics, i_len=model.metrics.length, item;
    for (i=0; i<i_len; i++) {
        item = model.metrics[i];
        metric('manufacturerDevice', jsonDataTables, model, item, json.device_model_data)
    }
}

function device(jsonDataTables, parentModel, model) {
    var json = {
        name: model.wzName, 
        nameKey: getKeyPath(model), 
        description: model.description, 
        owner: model.owner, 
        tenant: getKeyPath(parentModel.wzParent.wzParent), 
        gateway: getKeyPath(parentModel), 
        protocol: model.protocol, 
        device_xid: model.device_xid, 
        deviceModel: model.deviceModel, 
        modelConnectionSchema: model.modelConnectionSchema, 
        modelSchema: model.modelSchema, 
        configState: model.configState, 
        instanceRole: model.instanceRole, 
        itemConfigState: model.itemConfigState, 
        activityState: model.activityState, 
        modifiedId: model.modifiedId, 
        manufacturerDeviceModel: model.manufacturerDeviceModel ? model.manufacturerDeviceModel.wzName : null, 
        userDeviceModel: model.userDeviceModel ? model.userDeviceModel.wzName : null, 
        device_model_connection_data: {
            protocol: model.protocol, 
            connection: {
                
             }
         }, 
        device_model_data: {
            tags: {
                
             }
         }
     };
    var i, i_items=model.userGroups, i_len=model.userGroups.length, ug;
    for (i=0; i<i_len; i++) {
        ug = model.userGroups[i];
        jsonDataTables.devicePermissions.push({
            device: getKeyPath(model), 
            userGroup: ug.wzName
         })
    }
    jsonDataTables.devices.push(json)
    var i, i_items=model.connectionValues, i_len=model.connectionValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.connectionValues[i];
        connectionValue(jsonDataTables, model, item, json.device_model_connection_data)
    }
    var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
    for (i=0; i<i_len; i++) {
        item = model.staticTags[i];
        staticTag(jsonDataTables, model, item, json.device_model_data)
    }
}

function connectionValue(jsonDataTables, parentModel, model, device_model_connection_data) {
    var json = {
        connectionProperty: model.wzName + '-' + parentModel.protocol, 
        nameKey: getKeyPath(model), 
        device: getKeyPath(parentModel), 
        value: model.value
     };
    jsonDataTables.connectionValues.push(json)
    device_model_connection_data.connection[model.wzName] = model.wzRoot().meta.getConnectionTypedValue(parentModel.protocol, model.wzName, model.value)
    ;
}

function metric(kind, jsonDataTables, parentModel, model, device_model_data) {
    var device_model_data_metric = {
        name: model.wzName, 
        interval: model.interval, 
        tags: {
            
         }, 
        description: model.description, 
        topic: model.topic, 
        script: model.scriptRef ? getKeyPath(parentModel.wzParent) + '+' + model.scriptRef.wzName : null, 
        script_value: model.script_value, 
        ret_policy: model.ret_policy
     };
    if (kind == 'manufacturerDevice') {
        var i, i_items=model.metricValues, i_len=model.metricValues.length, item;
        for (i=0; i<i_len; i++) {
            item = model.metricValues[i];
            metricValue(jsonDataTables, model, item, device_model_data_metric)
        }
        device_model_data.metrics.push(device_model_data_metric)
    }
    else {
        var json = {
            name: model.wzName, 
            nameKey: getKeyPath(model), 
            device: getKeyPath(parentModel), 
            script: model.scriptRef ? getKeyPath(parentModel.wzParent) + '+' + model.scriptRef.wzName : null, 
            interval: model.interval, 
            description: model.description, 
            topic: model.topic, 
            script_value: model.script_value, 
            ret_policy: model.ret_policy
         };
        device_model_data.metrics.push(device_model_data_metric)
        jsonDataTables.metrics.push(json)
        var i, i_items=model.staticTags, i_len=model.staticTags.length, item;
        for (i=0; i<i_len; i++) {
            item = model.staticTags[i];
            staticTag(jsonDataTables, model, item, device_model_data_metric)
        }
        var i, i_items=model.dynamicTagRefs, i_len=model.dynamicTagRefs.length, item;
        for (i=0; i<i_len; i++) {
            item = model.dynamicTagRefs[i];
            dynamicTagRef(jsonDataTables, model, item, device_model_data_metric)
        }
        var i, i_items=model.metricValues, i_len=model.metricValues.length, item;
        for (i=0; i<i_len; i++) {
            item = model.metricValues[i];
            metricValue(jsonDataTables, model, item, device_model_data_metric)
        }
    }
}

function staticTag(jsonDataTables, parentModel, model, device_model_data_metric) {
    var json = {
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        key: model.wzName, 
        value: model.tag_value
     };
    jsonDataTables.staticTags.push(json)
    if (!device_model_data_metric.tags.static) {
        device_model_data_metric.tags.static = [];
    }
    device_model_data_metric.tags.static.push({
        key: model.wzName, 
        value: model.tag_value
     })
}

function dynamicTagRef(jsonDataTables, parentModel, model, device_model_data_metric) {
    var json = {
        key: model.wzName, 
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        dynamicTag: model.value_ref, 
        value_itself: model.value_itself
     };
    jsonDataTables.dynamicTagRefs.push(json)
    if (!device_model_data_metric.tags.dynamic) {
        device_model_data_metric.tags.dynamic = [];
    }
    device_model_data_metric.tags.dynamic.push({
        key: model.wzName, 
        value: model.value_ref
     })
}

function metricValue(jsonDataTables, parentModel, model, device_model_data_metric) {
    var json = {
        metricProperty: model.wzName + '-' + parentModel.wzParent.protocol, 
        nameKey: getKeyPath(model), 
        metric: getKeyPath(parentModel), 
        value: model.value
     };
    device_model_data_metric[model.wzName] = model.wzRoot().meta.getMetricTypedValue(parentModel.wzParent.protocol, model.wzName, model.value)
    ;
    jsonDataTables.metricValues.push(json)
}

function getKeyPath(model, rootEl) {
    if (model.wzElement == 'tenant') {
        return model.wzName;
    }
    const names = [ model.wzName ];
    let parent = model.wzParent;
    while (parent != null) {
        names.push(parent.wzName)
        if (parent.wzElement == 'tenant') {
            return [...names].reverse().join('+');
        }
        parent = parent.wzParent;
    }
    return names.join('+');
}