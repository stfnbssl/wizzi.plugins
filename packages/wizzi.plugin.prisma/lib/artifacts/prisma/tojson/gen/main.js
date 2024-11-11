/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.prisma\.wizzi-override\lib\artifacts\prisma\tojson\gen\main.js.ittf
    utc time: Fri, 18 Oct 2024 06:10:47 GMT
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
            mainMetas: {
                fieldKeyAttributes: [
                    {
                        name: 'isId', 
                        meaning: 'The field is a single field primary key.'
                     }, 
                    {
                        name: 'isRelated', 
                        meaning: 'The field is a single field foreign key, can be `idRelated` or `objectRelated`.'
                     }, 
                    {
                        name: 'idRelated', 
                        meaning: 'The field is a scalar single field foreign key in a `many-to-one` relation.'
                     }, 
                    {
                        name: 'objectRelated', 
                        meaning: [
                            'The field contains (is populated with) the instance/s of the related model item/s.', 
                            'When relationCardinality is `one-to-many` contains an array of related instances.', 
                            'When relationCardinality is `many-to-one` or `one-to-one` contains an object of the related instance.'
                        ]
                     }, 
                    {
                        name: 'relation', 
                        meaning: [
                            'When The field is `objectRelated` and relationCardinality is `many-to-one` or `one-to-one` ...', 
                            '... the attribute contains a relation structure that can have a multi field foreign key.'
                        ]
                     }
                ], 
                relationCardinalities: [
                    'one-to-one', 
                    'one-to-many', 
                    'many-to-one', 
                    'many-to-many'
                ], 
                fieldTypes: [
                    'String', 
                    'Boolean', 
                    'Int', 
                    'BigInt', 
                    'Float', 
                    'Decimal', 
                    'DateTime', 
                    'Json', 
                    'Bytes'
                ], 
                constraints: [
                    'min', 
                    'max', 
                    'minLength', 
                    'maxLength', 
                    'regExp', 
                    'enum'
                ], 
                editFormats: [
                    'Checkbox', 
                    'Radio', 
                    'Color', 
                    'Select', 
                    'Switch', 
                    'Slider', 
                    'Rate', 
                    'Upload', 
                    'Markdown'
                ]
             }, 
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
            
        ], 
        tags: [
            
        ]
     };
    if (model.extNoUpload) {
        jsonModel.extNoUpload = true;
    }
    ctx.__current.models.push(jsonModel)
    ctx.__current = jsonModel;
    setTags(model, jsonModel)
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
        editFormat: model.getEditFormat(), 
        attributes: [
            
        ], 
        constraints: [
            
        ], 
        dbColumns: [
            
        ], 
        tags: [
            
        ]
     };
    if (model.idRelated) {
        jsonField.isRelated = true;
        jsonField.idRelated = true;
        jsonField.relatedModel = model.relatedModel;
        jsonField.relationName = model.relationName;
        jsonField.relationCardinality = model.relationCardinality;
        jsonField.relationTarget = model.relationTarget;
        jsonField.referenceTwinObject = model.referenceTwinObject;
        if (verify.isNotEmpty(model.relationName)) {
            var inversedByField = get_FieldInversedBy_ByRelationName(model, model.relationName);
            if (inversedByField) {
                jsonField.inversedBy = inversedByField.wzName;
            }
            else {
                throw new Error("In field " + model.wzName + ' cannot find inversedBy for relationName: ' + model.relationName);
            }
        }
    }
    else if (verify.isNotEmpty(model.relationCardinality)) {
        jsonField.isRelated = true;
        jsonField.objectRelated = true;
        jsonField.relationCardinality = model.relationCardinality;
        jsonField.relationTarget = model.relationTarget;
    }
    ctx.__current.fields.push(jsonField)
    setTags(model, jsonField)
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
        var i, i_items=model.dbColumns, i_len=model.dbColumns.length, fdbc;
        for (i=0; i<i_len; i++) {
            fdbc = model.dbColumns[i];
            var dbc = {
                type: fdbc.wzElement
             };
            fdbc.setField(dbc)
            ctx.__current.dbColumns.push(dbc)
            fdbc.setField(ctx.__current)
        }
        setJSON_KnownFieldTypes(jsonField)
        if (jsonField.relation && verify.isNotEmpty(jsonField.relation.name)) {
            var mappedBy = get_FieldInversedBy_ByRelationName(model, jsonField.relation.name);
            if (mappedBy) {
                jsonField.mappedBy = mappedBy.wzName;
            }
            else {
                throw new Error("In field " + model.wzName + ' cannot find inversedBy for relationName: ' + jsonField.relation.name);
            }
        }
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
function get_FieldInversedBy_ByRelationName(field, relationName) {
    var i, i_items=field.wzParent.wzParent.models, i_len=field.wzParent.wzParent.models.length, model;
    for (i=0; i<i_len; i++) {
        model = field.wzParent.wzParent.models[i];
        if (model.wzName != field.wzParent.wzName) {
            var j, j_items=model.fields, j_len=model.fields.length, cfield;
            for (j=0; j<j_len; j++) {
                cfield = model.fields[j];
                var k, k_items=cfield.fieldAttributes, k_len=cfield.fieldAttributes.length, fieldAttribute;
                for (k=0; k<k_len; k++) {
                    fieldAttribute = cfield.fieldAttributes[k];
                    
                    // loog "get_FieldInversedBy_ByRelationName", cfield.wzName
                    if (fieldAttribute.wzName == 'relation') {
                        var args = [];
                        var l, l_items=fieldAttribute.valueAssigns, l_len=fieldAttribute.valueAssigns.length, item;
                        for (l=0; l<l_len; l++) {
                            item = fieldAttribute.valueAssigns[l];
                            var arg = {};
                            
                            // loog "get_FieldInversedBy_ByRelationName.arg", arg
                            if (item.setJSON) {
                                item.setJSON(arg)
                                args.push(arg)
                            }
                            else {
                                args.push(verify.unquote(item.getValueString()))
                            }
                        }
                        var l, l_items=args, l_len=args.length, arg;
                        for (l=0; l<l_len; l++) {
                            arg = args[l];
                            for (var k in arg) {
                                // loog "get_FieldInversedBy_ByRelationName.k, arg[k]", k, arg[k]
                                if (k == 'name' && arg[k] == relationName) {
                                    return cfield;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}
function setJSON_KnownFieldTypes(jsonField) {
    
    // loog 'setJSON_KnownFieldTypes', jsonField.attributes.length, jsonField.attributes[0]
    if (jsonField.name == 'xrequired' || jsonField.name == 'pattern') {
    }
    if (jsonField.attributes.length > 0 && jsonField.attributes[0].type == "@function" && jsonField.attributes[0].name == "relation") {
        jsonField.isRelated = true;
        jsonField.objectRelated = true;
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
    if (jsonField.attributes.length > 0 && jsonField.attributes[0].type == "@" && jsonField.attributes[0].name == "unique") {
        jsonField.isUnique = true;
    }
    
    // loog 'jsonField.constraints', jsonField.name, jsonField.constraints
    if (jsonField.attributes.length > 0 && jsonField.attributes[0].type == "@function" && jsonField.attributes[0].name == "default") {
        if (jsonField.attributes[0].args[0]) {
            if (verify.isNotEmpty(jsonField.attributes[0].args[0].name)) {
                jsonField.constraints.push({
                    type: "defaultValue", 
                    defaultValue: jsonField.attributes[0].args[0].name
                 })
            }
            else if (verify.isNotEmpty(jsonField.attributes[0].args[0])) {
                jsonField.constraints.push({
                    type: "defaultValue", 
                    defaultValue: getTypedValue(jsonField.type, jsonField.attributes[0].args[0])
                 })
            }
            else {
                console.log("[31m%s[0m", 'jsonField.attributes[0].args', jsonField.attributes[0].args);
                throw new Error("Missing name attribute on default of field " + jsonField.name);
            }
        }
        else {
            console.log("[31m%s[0m", 'jsonField.attributes[0].args', jsonField.attributes[0].args);
            throw new Error("Missing name attribute on default of field " + jsonField.name);
        }
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
            
            // the field is a many-to-one Object Field (model reference)
            if (field.objectRelated) {
                setOneToManyOrToOneRelation(models, model, field)
            }
        }
    }
}
function setTags(model, json) {
    var i, i_items=model.tags, i_len=model.tags.length, tag;
    for (i=0; i<i_len; i++) {
        tag = model.tags[i];
        var nv = lineParser.parseNameValueRaw(tag.wzName, tag);
        var name = nv.name();
        var value = nv.value();
        json.tags.push({
            name: name, 
            value: value
         })
    }
}
function setOneToManyOrToOneRelation(models, manyOrOneModel, manyOrOneField) {
    // the manyOrOneField.type is set in
    // .
    // .   .field
    // .   .   .ref <model.Name>
    var i, i_items=models, i_len=models.length, model;
    for (i=0; i<i_len; i++) {
        model = models[i];
        if (model.Name == manyOrOneField.type) {
            model.relations.push({
                model: manyOrOneField.type, 
                toModel: {
                    Name: manyOrOneModel.Name, 
                    name: manyOrOneModel.name, 
                    namePlural: manyOrOneModel.namePlural
                 }, 
                relationCardinality: manyOrOneField.relationCardinality
             })
        }
    }
}
function getForeignFieldInModel(jsonModel, fieldName) {
    var i, i_items=jsonModel.fields, i_len=jsonModel.fields.length, field;
    for (i=0; i<i_len; i++) {
        field = jsonModel.fields[i];
        if (field.idRelated && field.name == fieldName) {
            return {
                    relatedModel: field.relatedModel, 
                    relationCardinality: field.relationCardinality, 
                    relationTarget: field.relationTarget, 
                    optional: field.optional
                 };
        }
    }
    return null;
}
function getTypedValue(type, value) {
    if (type == "Boolean") {
        return value == 'true' ? true : false;
    }
    else if (type == "Int") {
        return parseInt(value);
    }
    else if (type == "Float" || type == "Decimal") {
        return parseFloat(value);
    }
    else {
        return value;
    }
}