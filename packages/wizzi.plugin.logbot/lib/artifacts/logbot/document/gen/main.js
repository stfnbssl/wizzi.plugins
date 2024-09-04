/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\lib\artifacts\logbot\document\gen\main.js.ittf
    utc time: Wed, 04 Sep 2024 13:08:58 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var included_writers = require('./included_writers');
var jsonata = require('jsonata');
var axios = require('axios');
var marked = require('marked');
var api = null;

var myname = 'wizzi.plugin.logbot.artifacts.logbot.document.gen.main';

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
            lbot: {
                aiCalls: [
                    
                ], 
                transformations: [
                    
                ]
             }
         };
        md.lbot(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            // generation OK
            else {
                ctx.wizziFactory.createFsFactory({
                    reuse: true
                 }, (err, fsWf) => {
                    if (err) {
                        return callback(err);
                    }
                    fsWf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'document.html.ittf'), {
                        modelRequestContext: {
                            schema: ctx.__json
                         }, 
                        artifactRequestContext: {}
                     }, 'html/document', (err, artifactText) => {
                        if (err) {
                            return callback(err);
                        }
                        // loog 'logbot-document', artifactText
                        ctx.w(artifactText);
                        return callback(null, ctx);
                    }
                    )
                }
                )
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
md.lbot = function(model, ctx, callback) {
    if (verify.isNotEmpty(model.apiUrl)) {
        api = axios.create({
            baseURL: model.apiUrl, 
            headers: {
                ['Content-Type']: "application/json"
             }
         })
        ;
    }
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
md.aiCall = function(model, ctx, callback) {
    ctx.__current = {};
    ctx.__json.lbot.aiCalls.push(ctx.__current)
    ctx.__current.name = model.wzName;
    ctx.__current.description = model.description;
    ctx.__current.aiPrompt = model.aiPrompt;
    if (model.aiMessages.length > 0) {
        ctx.__current.aiMessages = [];
        var i, i_items=model.aiMessages, i_len=model.aiMessages.length, message;
        for (i=0; i<i_len; i++) {
            message = model.aiMessages[i];
            ctx.__current.aiMessages.push({
                role: message.role, 
                content: message.content
             })
        }
    }
    console.log('aiCall, model.messages', ctx.__current.aiMessages, __filename);
    if (api && ctx.__current.aiMessages && ctx.__current.aiMessages.length > 0) {
        try {
            api.post('aiapicall', {
                model: model.model, 
                max_tokens: parseInt(model.max_tokens), 
                temperature: parseFloat(model.temperature), 
                frequency_penalty: parseInt(model.frequency_penalty), 
                presence_penalty: parseInt(model.presence_penalty), 
                messages: ctx.__current.aiMessages, 
                prompt: ctx.__current.aiPrompt
             }).then((response) => {
                console.log(model.aiPrompt, ' -> ', response.data, __filename);
                ctx.__current.info = response.data.info;
                ctx.__current.aiResponse = response.data.result;
                ctx.__current.usage = response.usage;
                ctx.__current.finish_reason = response.finish_reason;
                ctx.__current.aiResponseHTML = marked.parse(response.data.result)
                ;
                return callback(null);
            }
            ).catch((err) => {
                console.log("[31m%s[0m", 'Error:', err.message);
                console.log("[31m%s[0m", 'Error:', err);
                ctx.__current.err = {
                    message: err.message
                 };
                if (err.response) {
                    ctx.__current.err.data = err.response.data;
                    ctx.__current.err.status = err.response.status;
                }
                return callback(null);
            }
            )
        } 
        catch (ex) {
            console.log("[31m%s[0m", 'Exception.message:', ex.message);
            console.log("[31m%s[0m", 'Exception:', ex);
            ctx.__current.ex = {
                message: ex.message
             };
            return callback(null);
        } 
    }
    else {
        return callback(null);
    }
}
;
md.transformation = function(model, ctx, callback) {
    ctx.__current = {
        inputs: [
            
        ], 
        aiResults: [
            
        ], 
        applies: [
            
        ]
     };
    ctx.__json.lbot.transformations.push(ctx.__current)
    ctx.__current.name = model.wzName;
    ctx.__current.description = model.description;
    ctx.__current.aiPrompt = model.aiPrompt;
    md.genItems(model.inputs, ctx, {
        indent: false
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        md.genItems(model.aiResults, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            md.genItems(model.applies, ctx, {
                indent: false
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
md.input = function(model, ctx, callback) {
    const inputEl = {
        name: model.wzName
     };
    ctx.__current.inputs.push(inputEl)
    let jsonModel = model.jsonObjectInclude;
    if (!jsonModel) {
        jsonModel = model.jsonArrayInclude;
    }
    if (jsonModel) {
        if (jsonModel.get_json) {
            included_writers.getIncludeJsonArtifact(ctx, jsonModel, (err, artifactText) => {
                if (err) {
                    return callback(err);
                }
                inputEl.jsonText = artifactText;
                return callback(null);
            }
            )
        }
        else {
            inputEl.err = {
                message: "something went wrong processing json"
             };
            return callback(null);
        }
    }
    else {
        inputEl.err = {
            message: "no data"
         };
        return callback(null);
    }
}
;
md.aiResult = function(model, ctx, callback) {
    const aiResult = {
        name: model.wzName
     };
    ctx.__current.aiResults.push(aiResult)
    ctx.__aiResult = aiResult;
    if (model.jsonata) {
        md.jsonata(model.jsonata, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
}
;
md.jsonata = function(model, ctx, callback) {
    if (model.jsInclude) {
        if (model.jsInclude.get_js) {
            included_writers.getIncludeJsArtifact(ctx, model.jsInclude, (err, artifactText) => {
                if (err) {
                    return callback(err);
                }
                ctx.__aiResult.jsText = artifactText;
                return callback(null);
            }
            )
        }
        else {
            ctx.__aiResult.err = {
                message: "something went wrong processing json"
             };
            return callback(null);
        }
    }
    else if (verify.isNotEmpty(model.wzName)) {
        ctx.__aiResult.jsText = model.wzName;
        return callback(null);
    }
    else {
        ctx.__aiResult.err = {
            message: "Could not retrieve a jsonata expression"
         };
        return callback(null);
    }
}
;
md.apply = function(model, ctx, callback) {
    const apply = {
        name: model.wzName
     };
    ctx.__current.applies.push(apply)
    ctx.__apply = apply;
    md.genItems(model.tos, ctx, {
        indent: false
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        return callback(null);
    }
    )
}
;
md.to = function(model, ctx, callback) {
    ctx.__apply.to = {
        name: model.wzName
     };
    const inputEl = model.wzParent.wzParent.getInputByName(model.wzName);
    const aiResultEl = model.wzParent.wzParent.getAiResultByName(model.wzParent.wzName);
    if (aiResultEl) {
        getJsonataExpression(aiResultEl, ctx, (err, jsonataExpression) => {
            if (err) {
                return callback(err);
            }
            if (jsonataExpression) {
                console.log("aiResultEl.jsonataExpression", jsonataExpression, __filename);
                if (inputEl) {
                    let jsonModel = inputEl.jsonObjectInclude;
                    if (!jsonModel) {
                        jsonModel = inputEl.jsonArrayInclude;
                    }
                    if (jsonModel) {
                        included_writers.getIncludeJsonArtifact(ctx, jsonModel, (err, jsonInput) => {
                            if (err) {
                                return callback(err);
                            }
                            const jsonInputParsed = JSON.parse(jsonInput);
                            console.log("inputEl.jsonInputParsed", jsonInputParsed, __filename);
                            try {
                                jsonata(jsonataExpression).evaluate(jsonInputParsed).then((result) => {
                                    console.log("jsonata.result", result, __filename);
                                    ctx.__apply.result = result;
                                    return callback(null);
                                }
                                )
                                
                            } 
                            catch (ex) {
                                console.log("[31m%s[0m", 'Exception.message:', ex.message);
                                console.log("[31m%s[0m", 'Exception:', ex);
                                ctx.__apply.err = {
                                    message: 'Error calling jsonata: ' + ex.message
                                 };
                                return callback(null);
                            } 
                        }
                        )
                    }
                    else {
                        ctx.__apply.err = {
                            message: 'Cannot retrieve json from input data: ' + model.wzName
                         };
                        return callback(null);
                    }
                }
                else {
                    ctx.__apply.err = {
                        message: 'Missing input data: ' + model.wzName
                     };
                    return callback(null);
                }
            }
            else {
                ctx.__apply.err = {
                    message: 'Could not retrieve a jsonata expression in: ' + model.wzParent.wzName
                 };
                return callback(null);
            }
        }
        )
    }
    else {
        ctx.__apply.err = {
            message: 'Missing ai result: ' + model.wzParent.wzName
         };
        return callback(null);
    }
}
;
function getJsonataExpression(aiResultEl, ctx, callback) {
    if (aiResultEl && aiResultEl.jsonata && aiResultEl.jsonata.jsInclude) {
        included_writers.getIncludeJsArtifact(ctx, aiResultEl.jsonata.jsInclude, (err, jsonataExpression) => {
            if (err) {
                return callback(err);
            }
            return callback(null, jsonataExpression);
        }
        )
    }
    else if (aiResultEl && aiResultEl.jsonata && verify.isNotEmpty(aiResultEl.jsonata.wzName)) {
        return callback(null, aiResultEl.jsonata.wzName);
    }
    else {
        return callback(null, null);
    }
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
            method: 'wizzi.plugin.logbot/lib/artifacts/logbot/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}