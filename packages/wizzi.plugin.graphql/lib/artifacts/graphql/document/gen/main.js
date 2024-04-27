/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.graphql\.wizzi-override\lib\artifacts\graphql\document\gen\main.js.ittf
    utc time: Thu, 25 Apr 2024 11:41:00 GMT
*/
'use strict';
var verify = require('@wizzi/utils').verify;
var myname = 'wizzi-web.lib.artifacts.graphql.schema.gen.main';

var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;

var lineParser = require('../../../utils/lineParser');

var md = module.exports = {};
md.stm = {};
md.gen = function gen(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(model) === false) {
        return callback(error(
            'InvalidArgument', 'gen', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
        ));
    }
    if (verify.isObject(ctx) === false) {
        return callback(error(
            'InvalidArgument', 'gen', { parameter: 'ctx', message: 'The ctx parameter must be an object. Received: ' + ctx }
        ));
    }
    // check the model is a wizzi model of type 'graphql'
    if (model.wzElement !== 'graphql') {
        return callback(ctx.error(myname + " error: the model paramater should be an 'graphql' wizzi model", model));
    }
    md.graphql(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        return callback(null, ctx);
    }
    )
}
;
md.graphql = function(model, ctx, callback) {
    async.mapSeries(model.typeDefs, md.typeDef(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        async.mapSeries(model.operations, md.operation(ctx), (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            async.mapSeries(model.fragments, md.fragmentCtx(ctx), (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (model.selectionSet) {
                    md.selectionSet(model.selectionSet, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.deindent();
                        return callback(null);
                    }
                    )
                }
                else {
                    return callback(null);
                }
            }
            )
        }
        )
    }
    )
}
;
md.typeDef = function(ctx) {
    return function(model, callback) {
            var method = md[model.wzElement];
            method(model, ctx, callback)
        };
}
;
md.schemaDef = function(model, ctx, callback) {
    ctx.w('schema ' + '{ ');
    ctx.indent();
    var len_1 = model.operationTypes.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.operationTypes[index_1];
        md[item_1.wzElement](item_1, ctx, (err, notUsed) => {
        
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
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    }
}
;
md.queryType = function(model, ctx, callback) {
    ctx.w('query ' + model.wzName);
    return callback(null);
}
;
md.mutationType = function(model, ctx, callback) {
    ctx.w('mutation ' + model.wzName);
    return callback(null);
}
;
md.subscriptionType = function(model, ctx, callback) {
    ctx.w('subscription ' + model.wzName);
    return callback(null);
}
;
md.objectTypeDef = function(model, ctx, callback) {
    console.log('objectTypeDef', __filename);
    ctx.w('type ' + model.wzName + ' { ');
    ctx.indent();
    var len_1 = model.fieldDefs.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.fieldDefs[index_1];
        console.log('objectTypeDef.item_1.wzElement', item_1.wzElement, __filename);
        md[item_1.wzElement](item_1, ctx, (err, notUsed) => {
        
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
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    }
}
;
md.enumType = function(model, ctx, callback) {
    ctx.w( 'enum ' + model.wzName + ' {' );
    ctx.indent();
    var i, i_items=model.enumValues, i_len=model.enumValues.length, item;
    for (i=0; i<i_len; i++) {
        item = model.enumValues[i];
        ctx.w( item.wzName );
    }
    ctx.deindent();
    ctx.w( '}' );
    return callback(null);
}
;
md.scalarTypeDef = function(model, ctx, callback) {
    ctx.w( 'scalar ' + model.wzName );
    return callback(null);
}
;
md.stringNameType = function(model, ctx, callback) {
    ctx.write('String');
    return callback(null);
}
;
md.intNameType = function(model, ctx, callback) {
    ctx.write('Int');
    return callback(null);
}
;
md.floatNameType = function(model, ctx, callback) {
    ctx.write('Float');
    return callback(null);
}
;
md.booleanNameType = function(model, ctx, callback) {
    ctx.write('Boolean');
    return callback(null);
}
;
md.DateNameType = function(model, ctx, callback) {
    ctx.write('Date');
    return callback(null);
}
;
md.refNameType = function(model, ctx, callback) {
    ctx.write(model.wzName);
    return callback(null);
}
;
md.inputValueDef = function(model, ctx, callback) {
    ctx.write( model.wzName );
    if (model.nameType) {
        ctx.write(': ');
        md[model.nameType.wzElement](model.nameType, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w();
            return callback(null);
        }
        )
    }
    else {
        ctx.w();
        return callback(null);
    }
}
;
md.fieldDef = function(model, ctx, callback) {
    ctx.write( model.wzName );
    if (model.inputValueDefs && model.inputValueDefs.length > 0) {
        ctx.w('(');
        ctx.indent();
        var len_1 = model.inputValueDefs.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.inputValueDefs[index_1];
            md[item_1.wzElement](item_1, ctx, (err, notUsed) => {
            
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
            ctx.deindent();
            ctx.write(')');
            fieldDef_step2(model, ctx, callback)
        }
    }
    else {
        fieldDef_step2(model, ctx, callback)
    }
}
;
function fieldDef_step2(model, ctx, callback) {
    if (model.nameType) {
        ctx.write(': ');
        md[model.nameType.wzElement](model.nameType, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w();
            return callback(null);
        }
        )
    }
    else {
        ctx.w();
        return callback(null);
    }
}
md.method = function(model, ctx, callback) {
    var args = [];
    var i, i_items=model.fieldDefs, i_len=model.fieldDefs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.fieldDefs[i];
        args.push(getTypedArgumentDeclaration(item))
    }
    ctx.write( model.wzName + '(' + args.join(', ') + ') ' );
    if (model.selectionSet) {
        md.selectionSet(model.selectionSet, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
    else {
        ctx.w(': ' + model.type);
        return callback(null);
    }
}
;
md.interfaceTypeDef = function(model, ctx, callback) {
    ctx.w( 'interface ' + model.wzName + ' {' );
    ctx.indent();
    async.mapSeries(model.fieldDefs, md.fieldDef(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w( '}' );
        return callback(null);
    }
    )
}
;
md.unionTypeDef = function(model, ctx, callback) {
    ctx.write( 'union ' + model.wzName + ' = ');
    var i, i_items=model.unionMemberTypes, i_len=model.unionMemberTypes.length, item;
    for (i=0; i<i_len; i++) {
        item = model.unionMemberTypes[i];
        if (i > 0) {
            ctx.write(' | ');
        }
        ctx.write( item.wzName );
    }
    ctx.w();
    return callback(null);
}
;
md.inputObjectTypeDef = function(model, ctx, callback) {
    ctx.write( 'input ' + model.wzName + ' ');
    if (model.objectValueDef) {
        md.objectValueDef(model.objectValueDef, ctx, callback)
    }
    else {
        return callback(null);
    }
}
;
md.objectValueDef = function(model, ctx, callback) {
    ctx.w('{');
    ctx.indent();
    async.mapSeries(model.valueDefs, md.valueDef(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    }
    )
}
;
md.valueDef = function(ctx) {
    return function(model, callback) {
            // loog 'valueDef', model.wzElement, model.wzName
            ctx.w( model.wzName + ': ' + model.type);
            return callback(null);
        };
}
;
md.directiveDef = function(model, ctx, callback) {
    var args = [];
    // loog 'fieldDef', model.wzElement, model.wzName
    var i, i_items=model.argumentDefs, i_len=model.argumentDefs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.argumentDefs[i];
        args.push(getTypedArgumentDeclaration(item))
    }
    var argsString = args.length > 0 ? '(' + args.join(', ') + ')' : '';
    var loc = [];
    var i, i_items=model.directiveLocations, i_len=model.directiveLocations.length, item;
    for (i=0; i<i_len; i++) {
        item = model.directiveLocations[i];
        loc.push(item.wzName)
    }
    var locString = loc.length > 0 ? ' on ' + loc.join(' | ') : '';
    ctx.w( 'directive ' + model.wzName + argsString + locString );
    return callback(null);
}
;
md.operation = function(ctx) {
    return function(model, callback) {
            // loog 'calling operation', model.wzElement
            var method = md[model.wzElement];
            method(model, ctx, callback)
        };
}
;
md.fragmentCtx = function(ctx) {
    return function(model, callback) {
            md.fragment(model, ctx, callback)
        };
}
;
md.query = function(model, ctx, callback) {
    getVariableDeclarations(model, ctx, (err, vars) => {
    
        if (err) {
            return callback(err);
        }
        var varsDeclare = vars.length > 0 ? '(' + vars.join(', ') + ')' : '';
        ctx.write( 'query' + (model.wzName.length > 0 ? ' ' + model.wzName : '') + varsDeclare + ' ');
        if (model.directives.length > 0) {
            ctx.w();
            ctx.indent();
        }
        writeDirectives(model.directives, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (model.directives.length > 0) {
                ctx.deindent();
            }
            if (model.selectionSet) {
                md.selectionSet(model.selectionSet, ctx, callback)
            }
            else {
                return callback(null);
            }
        }
        )
    }
    )
}
;
md.mutation = function(model, ctx, callback) {
    getVariableDeclarations(model, ctx, (err, vars) => {
    
        if (err) {
            return callback(err);
        }
        var varsDeclare = vars.length > 0 ? '(' + vars.join(', ') + ')' : '';
        ctx.write( 'mutation' + (model.wzName.length > 0 ? ' ' + model.wzName : '') + varsDeclare + ' ' );
        if (model.selectionSet) {
            md.selectionSet(model.selectionSet, ctx, callback)
        }
        else {
            return callback(null);
        }
    }
    )
}
;
md.selectionSet = function(model, ctx, callback) {
    // loog 'selectionSet', model.selections.length
    if (model.wzName.length > 0) {
        ctx.write( model.wzName);
        writeArguments(model.xarguments || [], ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write( ' ' );
            selectionSet_step_2(model, ctx, callback)
        }
        )
    }
    else {
        selectionSet_step_2(model, ctx, callback)
    }
}
;
function selectionSet_step_2(model, ctx, callback) {
    // loog 'selectionSet_step_2'
    ctx.w( '{' );
    ctx.indent();
    async.mapSeries(model.selections, md.selection(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w( '}' );
        return callback(null);
    }
    )
}
md.selection = function(ctx) {
    return function(model, callback) {
            // loog 'selection'
            // loog 'calling selection', model.wzElement
            var method = md[model.wzElement];
            method(model, ctx, callback)
        };
}
;
md.field = function(model, ctx, callback) {
    // loog 'field'
    if (model.alias && model.alias.length > 0) {
        ctx.write( model.alias + ': ' );
    }
    ctx.write( model.wzName );
    if (model.selectionSet) {
        ctx.write( ' ' );
        md.selectionSet(model.selectionSet, ctx, callback)
    }
    else {
        ctx.w();
        return callback(null);
    }
}
;
md.functionField = function(model, ctx, callback) {
    // loog 'field'
    if (model.alias && model.alias.length > 0) {
        ctx.write( model.alias + ': ' );
    }
    ctx.write( model.wzName );
    writeArguments(model.xarguments || [], ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        // loog 'field.model.selectionSet', model.selectionSet
        if (model.selectionSet) {
            ctx.write( ' ' );
            md.selectionSet(model.selectionSet, ctx, callback)
        }
        else {
            ctx.w();
            return callback(null);
        }
    }
    )
}
;
md.fragmentSpread = function(model, ctx, callback) {
    var blank = model.wzName && model.wzName.length > 0 ? ' ' : '';
    ctx.write( '...' + blank + model.wzName + ' ' );
    writeDirectives(model.directives, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (model.selectionSet) {
            md.selectionSet(model.selectionSet, ctx, callback)
        }
        else {
            ctx.w();
            return callback(null);
        }
    }
    )
}
;
md.inlineFragment = function(model, ctx, callback) {
    var blank = model.wzName && model.wzName.length > 0 ? ' ' : '';
    ctx.w( '... on' + blank + model.wzName + ' ');
    writeDirectives(model.directives, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (model.selectionSet) {
            md.selectionSet(model.selectionSet, ctx, callback)
        }
        else {
            ctx.w();
            return callback(null);
        }
    }
    )
}
;
md.fragment = function(model, ctx, callback) {
    var typeCondition = model.typeCondition && model.typeCondition.length > 0 ? ' on ' + model.typeCondition : '';
    ctx.write( 'fragment ' + model.wzName + typeCondition + ' ' );
    if (model.selectionSet) {
        md.selectionSet(model.selectionSet, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
    else {
        ctx.w();
        return callback(null);
    }
}
;
function getDirectives(directives, ctx) {
    var ret = [];
    var i, i_items=directives, i_len=directives.length, d;
    for (i=0; i<i_len; i++) {
        d = directives[i];
        var args = [];
        var j, j_items=d.xarguments, j_len=d.xarguments.length, a;
        for (j=0; j<j_len; j++) {
            a = d.xarguments[j];
            args.push(getArgumentDeclaration(a))
        }
        var argsString = args.length > 0 ? '(' + args.join(', ') + ')' : '';
        ret.push('@' + d.wzName + argsString)
    }
    return ret.join(' ');
}
md.valueCtx = function(ctx) {
    return function(model, callback) {
            md.value(model, ctx, callback)
        };
}
;
md.value = function(model, ctx, callback) {
    var method = md[model.wzElement];
    method(model, ctx, callback)
}
;
md.intValue = function(model, ctx, callback) {
    ctx.write(model.wzName);
    return callback(null);
}
;
md.floatValue = function(model, ctx, callback) {
    ctx.write(model.wzName);
    return callback(null);
}
;
md.booleanValue = function(model, ctx, callback) {
    ctx.write(model.wzName);
    return callback(null);
}
;
md.stringValue = function(model, ctx, callback) {
    if (verify.isNotEmpty(model.wzName)) {
        ctx.write('"' + model.wzName + '"');
        return callback(null);
    }
    else {
        ctx.w('"""');
        ctx.indent();
        var i, i_items=model.texts, i_len=model.texts.length, item;
        for (i=0; i<i_len; i++) {
            item = model.texts[i];
            writeText(item, ctx)
        }
        ctx.deindent();
        ctx.write('"""');
        return callback(null);
    }
}
;
md.arrayValue = function(model, ctx, callback) {
    ctx.w( '[' );
    if (!model.values || model.values.length == 0) {
        ctx.write( ']' );
        return callback(null);
    }
    ctx.indent();
    var len_1 = model.values.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.values[index_1];
        if (index_1 > 0) {
            ctx.write(', ');
        }
        md.value(item_1, ctx, (err, notUsed) => {
        
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
        ctx.w();
        ctx.deindent();
        ctx.write( ']' );
        return callback(null);
    }
}
;
md.objectValue = function(model, ctx, callback) {
    ctx.w( '{' );
    if (!model.objectFields || model.objectFields.length == 0) {
        ctx.write( '}' );
        return callback(null);
    }
    ctx.indent();
    var len_1 = model.objectFields.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.objectFields[index_1];
        if (index_1 > 0) {
            ctx.w(', ');
        }
        console.log("item_1.wzElement", item_1.wzElement, __filename);
        md[item_1.wzElement](item_1, ctx, (err, notUsed) => {
        
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
        ctx.w();
        ctx.deindent();
        ctx.write( '}' );
        return callback(null);
    }
}
;
md.objectField = function(model, ctx, callback) {
    if (model.value) {
        ctx.write( model.wzName + ': ');
        md[model.value.wzElement](model.value, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
    else {
        var p = lineParser.parseNameValueRaw(model.wzName, model);
        var name = p.name();
        var value = p.value();
        ctx.write( name + ': ' + value );
        return callback(null);
    }
}
;
function writeText(model, ctx) {
    ctx.w(model.wzName);
    ctx.indent();
    var i, i_items=model.texts, i_len=model.texts.length, item;
    for (i=0; i<i_len; i++) {
        item = model.texts[i];
        writeText(item, ctx)
    }
    ctx.deindent();
}
md.genericArgument = function(model, ctx, callback) {
    if (model.defaultValue) {
        console.log('genericArgument,model.defaultValue', model.defaultValue, __filename);
        ctx.write( model.wzName + ': ' + model.defaultValue);
        return callback(null);
    }
    else if (model.value) {
        ctx.write( model.wzName + ': ');
        console.log('genericArgument,model.value.wzElement', model.value.wzElement, __filename);
        md[model.value.wzElement](model.value, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
    else {
        var p = lineParser.parseNameValueRaw(model.wzName, model);
        var name = p.name();
        var value = p.value();
        ctx.write( name + ': ' + value );
        return callback(null);
    }
}
;
md.ifArgument = function(model, ctx, callback) {
    ctx.write( 'if: ');
    if (model.value) {
        md[model.value.wzElement](model.value, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
    else {
        ctx.write( model.wzName );
        return callback(null);
    }
}
;
function writeArguments(args, ctx, callback) {
    if (args.length < 1) {
        return callback(null);
    }
    ctx.write('(');
    var len_1 = args.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = args[index_1];
        if (index_1 > 0) {
            ctx.write(', ');
        }
        console.log('writeArguments,item_1.wzElement', item_1.wzElement, __filename);
        md[item_1.wzElement](item_1, ctx, (err, notUsed) => {
        
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
        ctx.write(') ');
        return callback(null);
    }
}
function writeValue(model, ctx) {
    if (model.wzElement === 'arrayValue') {
        writeArrayValue(model, ctx)
    }
    else if (model.wzElement === 'objectValue') {
        writeObjectValue(model, ctx)
    }
    else if (model.wzElement === 'objectField') {
        writeObjectField(model, ctx)
    }
}
function writeArrayValue(model, ctx) {
    var saveState = ctx.genState;
    ctx.genState = 'arrayValue';
    ctx.write( '[' );
    var i, i_items=model.values, i_len=model.values.length, item;
    for (i=0; i<i_len; i++) {
        item = model.values[i];
        if (i > 0) {
            ctx.write(', ');
        }
        writeValue(item, ctx)
    }
    ctx.write( ']' );
    ctx.genState = saveState;
}
function writeObjectValue(model, ctx) {
    var saveState = ctx.genState;
    ctx.genState = 'objectValue';
    ctx.write( '{' );
    var i, i_items=model.values, i_len=model.values.length, item;
    for (i=0; i<i_len; i++) {
        item = model.values[i];
        if (i > 0) {
            ctx.write(', ');
        }
        writeValue(item, ctx)
    }
    ctx.write( '}' );
    ctx.genState = saveState;
}
function writeObjectField(model, ctx) {
    if (ctx.genState === 'objectValue') {
    }
    else {
        ctx.write( model.wzName );
    }
}
md.genericDirective = function(model, ctx, callback) {
    ctx.write('@' + model.wzName);
    return callback(null);
}
;
md.isListDirective = function(model, ctx, callback) {
    ctx.write('@isList ');
    return callback(null);
}
;
md.isRequiredDirective = function(model, ctx, callback) {
    ctx.write('@required ');
    return callback(null);
}
;
md.isDeprecatedDirective = function(model, ctx, callback) {
    ctx.write('@deprecated ');
    return callback(null);
}
;
md.skipDirective = function(model, ctx, callback) {
    ctx.write('@skip ');
    return callback(null);
}
;
md.includeDirective = function(model, ctx, callback) {
    ctx.write('@include ');
    return callback(null);
}
;
function writeDirectives(directives, ctx, callback) {
    if (directives.length < 1) {
        return callback(null);
    }
    var len_1 = directives.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = directives[index_1];
        // loog 'writeDirectives 1', item_1.wzElement
        md[item_1.wzElement](item_1, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'writeDirectives 2'
            writeArguments(item_1.xarguments, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        )
    }
    repeater_1(0);
    function next_1() {
        // loog 'writeDirectives 3'
        return callback(null);
    }
}
function getArgumentDeclaration(model, callback) {
    var p = lineParser.parseNameValueRaw(model.wzName, model);
    var name = p.name();
    var value = p.value();
    var ret = [ name ];
    if (value) {
        ret.push(' : ');
        ret.push( value );
        return callback(null, ret.join(''));
    }
    else {
        if (model.value) {
            md.value(model.value, ctx, (err, result) => {
            
                if (err) {
                    return callback(err);
                }
                ret.push(' : ');
                ret.push( result );
                return callback(null, ret.join(''));
            }
            )
        }
    }
}
function getTypedArgumentDeclaration(model) {
    var type = model.isList ? '[' + model.type + ']' : model.type;
    type = model.isRequired ? type + '!' : type;
    var ret = [ model.wzName ];
    if (model.type) {
        ret.push(' : ');
        ret.push(type);
    }
    return ret.join('');
}
function getVariableDeclarations(model, ctx, callback) {
    var vars = [];
    function doVar(ndx) {
        if (!model.variables[ndx]) {
            return callback(null, vars);
        }
        getVariableDeclaration(model.variables[ndx], ctx, (err, text) => {
        
            if (err) {
                return callback(err);
            }
            vars.push(text);
            return doVar(ndx + 1);
        }
        )
    }
    doVar(0);
}
function getVariableDeclaration(model, ctx, callback) {
    var name = model.wzName;
    var type = model.type;
    var ret = [ name ];
    console.log('getVariableDeclaration', model.wzName, model.defaultValue, __filename);
    if (type) {
        ret.push(' : ');
        ret.push(type);
    }
    if (model.defaultValue) {
        ret.push(' = ' + model.defaultValue);
    }
    var childCtx = ctx.createChildGenContext();
    if (model.directives.length > 0) {
        ret.push(' ');
        writeDirectives(model.directives, childCtx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            console.log('childCtx.getContent()', 'x' + childCtx.getContent() + 'x', __filename);
            ret.push(verify.replaceAll(childCtx.getContent(), '\n', ''))
            return callback(null, ret.join(''));
        }
        )
    }
    else {
        return callback(null, ret.join(''));
    }
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-web@0.8.6.lib.artifacts.graphql.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
