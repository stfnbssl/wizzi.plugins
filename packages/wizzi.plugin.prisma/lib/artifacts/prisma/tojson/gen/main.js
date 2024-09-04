/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\artifacts\prisma\tojson\gen\main.js.ittf
    utc time: Wed, 04 Sep 2024 13:19:52 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var functionAttributes = ['default', 'relation', 'map'];

var myname = 'wizzi.plugin.prisma.artifacts.prisma.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    var modelTypeIsValid = verify.isObject(model);
    if (!modelTypeIsValid) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'prisma') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "prisma". Received: ' + model.wzElement, model));
    }
    try {
        ctx.__json = {
            name: model.wzName, 
            datasources: [
                
            ], 
            generators: [
                
            ], 
            enums: [
                
            ], 
            models: [
                
            ], 
            relations: [
                
            ], 
            indexes: [
                
            ]
         };
        ctx.__current = ctx.__json;
        md.prisma(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            // generation OK
            else {
                setRelations(ctx.__json.models)
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
md.prisma = function(model, ctx, callback) {
    md.genItems(model.datasources, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        md.genItems(model.generators, ctx, {
            indent: false, 
            from: 0
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            md.genItems(model.models, ctx, {
                indent: false, 
                from: 0
             }, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            }
            )
        }
        )
    }
    )
}
;
md.datasource = function(model, ctx, callback) {
    var saveCurrent = ctx.__current;
    var json = {
        name: model.wzName, 
        configs: [
            
        ]
     };
    ctx.__current.datasources.push(json)
    ctx.__current = json;
    md.genItems(model.configs, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.generator = function(model, ctx, callback) {
    var saveCurrent = ctx.__current;
    var json = {
        name: model.wzName, 
        configs: [
            
        ]
     };
    ctx.__current.generators.push(json)
    ctx.__current = json;
    md.genItems(model.configs, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.model = function(model, ctx, callback) {
    var saveCurrent = ctx.__current;
    // loog 'model', model.wzName
    var jsonModel = {
        Name: model.wzName, 
        NamePlural: verify.pluralize(model.wzName), 
        name: model.wzName[0].toLowerCase() + model.wzName.substring(1), 
        namePlural: verify.pluralize(model.wzName[0].toLowerCase() + model.wzName.substring(1)), 
        fields: [
            
        ], 
        relations: [
            
        ], 
        attributes: [
            
        ], 
        indexes: [
            
        ]
     };
    if (model.extNoUpload) {
        jsonModel.extNoUpload = true;
    }
    ctx.__current.models.push(jsonModel)
    ctx.__current = jsonModel;
    md.genItems(model.fields, ctx, {
        indent: true, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        md.genItems(model.blockAttributes, ctx, {
            indent: true, 
            from: 0
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            setJSON_KnownModelAttributes(jsonModel)
            if (jsonModel.indexes.length > 0) {
                var i, i_items=jsonModel.indexes, i_len=jsonModel.indexes.length, index;
                for (i=0; i<i_len; i++) {
                    index = jsonModel.indexes[i];
                    var newFields = [];
                    var foreignCount = 0;
                    var j, j_items=index.fields, j_len=index.fields.length, field;
                    for (j=0; j<j_len; j++) {
                        field = index.fields[j];
                        var ffim = getForeignFieldInModel(jsonModel, field);
                        if (ffim) {
                            newFields.push({
                                name: field, 
                                foreign: ffim
                             })
                            foreignCount++;
                        }
                        else {
                            newFields.push({
                                name: field
                             })
                        }
                    }
                    index.fields = newFields;
                    index.foreignFields = foreignCount;
                }
                ctx.__json.indexes.push({
                    model: jsonModel.Name, 
                    indexes: jsonModel.indexes
                 })
            }
            ctx.__current = saveCurrent;
            return callback(null);
        }
        )
    }
    )
}
;
md.config = function(model, ctx, callback) {
    var json = {
        name: model.wzName, 
        value: verify.unquote(model.valueAssign.getValueString())
     };
    ctx.__current.configs.push(json)
    return callback(null);
}
;
md.field = function(model, ctx, callback) {
    var saveCurrent = ctx.__current;
    var jsonField = {
        name: model.wzName, 
        type: model.getType(), 
        optional: model.optional, 
        typeExtensions: model.getTypeExtensions(), 
        attributes: [
            
        ], 
        constraints: [
            
        ]
     };
    if (model.extIdRelated) {
        jsonField.extIdRelated = true;
        jsonField.relatedModel = model.relatedModel;
        jsonField.relationName = model.relationName;
        jsonField.relation = model.relation;
        jsonField.relationTarget = model.relationTarget;
    }
    else if (verify.isNotEmpty(model.relation)) {
        jsonField.extIdRelated = true;
        jsonField.relation = model.relation;
        jsonField.relationTarget = model.relationTarget;
    }
    ctx.__current.fields.push(jsonField)
    ctx.__current = jsonField;
    md.genItems(model.fieldAttributes, ctx, {
        indent: false, 
        from: 0
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        var i, i_items=model.fieldConstraints, i_len=model.fieldConstraints.length, fc;
        for (i=0; i<i_len; i++) {
            fc = model.fieldConstraints[i];
            var c = {
                type: fc.wzElement
             };
            fc.setField(c)
            ctx.__current.constraints.push(c)
            fc.setField(ctx.__current)
        }
        setJSON_KnownFieldTypes(jsonField)
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.fieldAttribute = function(model, ctx, callback) {
    var nv = lineParser.parseNameValueRaw(model.wzName, model);
    var name = nv.name();
    var value = nv.value();
    if (functionAttributes.indexOf(name) > - 1) {
    }
    if (model.valueAssigns.length > 0) {
        var json = {
            type: "@" + (functionAttributes.indexOf(name) > - 1 ? 'function' : ''), 
            name: name, 
            value: null, 
            args: [
                
            ]
         };
        var i, i_items=model.valueAssigns, i_len=model.valueAssigns.length, item;
        for (i=0; i<i_len; i++) {
            item = model.valueAssigns[i];
            var arg = {};
            if (item.setJSON) {
                item.setJSON(arg)
                json.args.push(arg)
            }
            else {
                json.args.push(verify.unquote(item.getValueString()))
            }
        }
        ctx.__current.attributes.push(json)
    }
    else {
        ctx.__current.attributes.push({
            type: "@", 
            name: name, 
            value: verify.isNotEmpty(value) ? value : null, 
            args: [
                
            ]
         })
    }
    if (functionAttributes.indexOf(name) > - 1) {
    }
    return callback(null);
}
;
md.fieldConstraint = function(model, ctx, callback) {
    var c = {
        type: fieldConstraint.wzElement
     };
    fieldConstraint.setField(c)
    ctx.__current.constraints.push(c)
    fieldConstraint.setField(ctx.__current)
    return callback(null);
}
;
md.blockAttribute = function(model, ctx, callback) {
    var json = {
        type: "@@" + model.wzName, 
        name: verify.unquote(model.name), 
        args: [
            
        ]
     };
    var i, i_items=model.valueAssigns, i_len=model.valueAssigns.length, item;
    for (i=0; i<i_len; i++) {
        item = model.valueAssigns[i];
        item.setJSON(json.args)
    }
    ctx.__current.attributes.push(json)
    if (model.wzName == 'unique') {
        ctx.__current.indexes.push({
            name: json.name, 
            fields: json.args
         })
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
            method: 'wizzi.plugin.prisma/lib/artifacts/prisma/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function setJSON_KnownFieldTypes(jsonField) {
    // loog 'setJSON_KnownFieldTypes', jsonField.attributes.length, jsonField.attributes[0]
    if (jsonField.attributes.length > 0 && jsonField.attributes[0].type == "@function" && jsonField.attributes[0].name == "relation") {
        jsonField.isRelation = true;
        var value = {
            model: jsonField.type
         };
        var i, i_items=jsonField.attributes[0].args, i_len=jsonField.attributes[0].args.length, arg;
        for (i=0; i<i_len; i++) {
            arg = jsonField.attributes[0].args[i];
            // loog 'setJSON_KnownFieldTypes.arg', arg
            for (var k in arg) {
                value[k] = arg[k];
            }
        }
        jsonField.relation = value;
    }
    if (jsonField.attributes.length > 0 && jsonField.attributes[0].type == "@" && jsonField.attributes[0].name == "id") {
        jsonField.isId = true;
    }
    if (jsonField.attributes.length > 0 && jsonField.attributes[0].type == "@" && jsonField.attributes[0].name == "id") {
        jsonField.isUnique = true;
    }
}
function setJSON_KnownModelAttributes(model) {
    var i, i_items=model.attributes, i_len=model.attributes.length, a;
    for (i=0; i<i_len; i++) {
        a = model.attributes[i];
        if (a.type == "@@unique") {
            model.hasUniqueIndex = true;
        }
    }
}
function setRelations(models) {
    var i, i_items=models, i_len=models.length, model;
    for (i=0; i<i_len; i++) {
        model = models[i];
        var j, j_items=model.fields, j_len=model.fields.length, field;
        for (j=0; j<j_len; j++) {
            field = model.fields[j];
            if (field.isRelation) {
                setOneToManyRelation(models, model, field)
            }
        }
    }
}
function setOneToManyRelation(models, manyModel, field) {
    var i, i_items=models, i_len=models.length, model;
    for (i=0; i<i_len; i++) {
        model = models[i];
        if (model.Name == field.type) {
            model.relations.push({
                model: field.type, 
                toModel: {
                    Name: manyModel.Name, 
                    name: manyModel.name, 
                    namePlural: manyModel.namePlural
                 }, 
                relation: field.relation
             })
        }
    }
}
function setIndexes(ctx) {
    var i, i_items=ctx.__json.indexes, i_len=ctx.__json.indexes.length, item;
    for (i=0; i<i_len; i++) {
        item = ctx.__json.indexes[i];
        var j, j_items=item.fields, j_len=item.fields.length, field;
        for (j=0; j<j_len; j++) {
            field = item.fields[j];
        }
    }
}
function getForeignFieldInModel(jsonModel, fieldName) {
    var i, i_items=jsonModel.fields, i_len=jsonModel.fields.length, field;
    for (i=0; i<i_len; i++) {
        field = jsonModel.fields[i];
        if (field.extIdRelated && field.name == fieldName) {
            return {
                    relatedModel: field.relatedModel, 
                    relation: field.relation, 
                    relationTarget: field.relationTarget, 
                    optional: field.optional
                 };
        }
    }
    return null;
}