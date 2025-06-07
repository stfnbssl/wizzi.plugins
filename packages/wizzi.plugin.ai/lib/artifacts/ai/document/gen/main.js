/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ai\.wizzi-override\lib\artifacts\ai\document\gen\main.js.ittf
    utc time: Thu, 20 Feb 2025 12:19:37 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var axios = require('axios');
var marked = require('marked');
var included_writers = require('./writers/included');
var api = null;

var myname = 'wizzi.plugin.ai.artifacts.ai.document.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    var modelTypeIsValid = verify.isObject(model);
    if (!modelTypeIsValid) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'ai') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "ai". Received: ' + model.wzElement, model));
    }
    try {
        ctx.__json = {
            ai: {
                calls: [
                    
                ]
             }
         };
        md.ai(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            console.log('ctx.artifactGenerationErrors.length', ctx.artifactGenerationErrors.length, __filename);
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            else if (false) {
                ctx.w(JSON.stringify(ctx.__json, null, 4))
                return callback(null, ctx);
            }
            // generation OK
            else {
                var schema;
                if (false) {
                    schema = "html";
                }
                else {
                    schema = "ittf";
                }
                ctx.wizziFactory.createFsFactory({
                    reuse: true
                 }, (err, fsWf) => {
                    if (err) {
                        return callback(err);
                    }
                    fsWf.loadModelAndGenerateArtifact(path.join(__dirname, schema, 'document.' + schema + '.ittf'), {
                        modelRequestContext: {
                            schema: ctx.__json
                         }, 
                        artifactRequestContext: {}
                     }, schema + '/document', (err, artifactText) => {
                        if (err) {
                            return callback(err);
                        }
                        console.log('ai-document', artifactText, __filename);
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
md.ai = function(model, ctx, callback) {
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
md.call = function(model, ctx, callback) {
    ctx.__current = {};
    ctx.__json.ai.calls.push(ctx.__current)
    ctx.__current.name = model.wzName;
    ctx.__current.description = model.description;
    ctx.__current.prompt = model.prompt;
    ctx.__current.messages = [];
    md.genItems(model.messages, ctx, {
        indent: true
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        setResponseFormat(model.response_format, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (api && ctx.__current.messages && ctx.__current.messages.length > 0) {
                try {
                    api.post('aiapicall', {
                        model: model.model, 
                        max_tokens: parseInt(model.max_tokens), 
                        temperature: parseFloat(model.temperature), 
                        frequency_penalty: parseInt(model.frequency_penalty), 
                        presence_penalty: parseInt(model.presence_penalty), 
                        messages: ctx.__current.messages, 
                        response_format: ctx.__current.response_format, 
                        prompt: ctx.__current.prompt
                     }).then((response) => {
                        console.log('ctx.__current.main_message_data', ctx.__current.main_message_data, __filename);
                        console.log('response.data -> ', response.data, __filename);
                        ctx.__current.info = response.data.info;
                        ctx.__current.response = response.data.result;
                        ctx.__current.usage = response.usage;
                        ctx.__current.finish_reason = response.finish_reason;
                        try {
                            ctx.__current.response = JSON.parse(getCleanJsonString(response.data.result))
                            ;
                            if (verify.isObject(ctx.__current.main_message_data)) {
                                ctx.__current.response = Object.assign({}, ctx.__current.main_message_data, ctx.__current.response)
                                ;
                            }
                            console.log('Object.keys(ctx.__current.response)', Object.keys(ctx.__current.response), __filename);
                        } 
                        catch (ex) {
                            console.log("[31m%s[0m", 'Error parsing ai apicall: ' + ex.message);
                            console.log("[31m%s[0m", ex);
                            ctx.__current.response = Object.assign({}, ctx.__current.main_message_data, {
                                ERROR_MESSAGE: 'Error parsing ai apicall: ' + ex.message
                             })
                            ;
                        } 
                        ctx.__current.responseHTML = marked.parse(response.data.result)
                        ;
                        return callback(null);
                    }
                    ).catch((err) => {
                        console.log("[31m%s[0m", 'Error code:', err.code);
                        console.log("[31m%s[0m", err.errors);
                        callback(ctx.error('Error calling aiapicall: ' + err.code, model))
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
        )
    }
    )
}
;
md.message = function(model, ctx, callback) {
    if (model.json_content) {
        md.json_message_format(model.json_content, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            var content = ctx.__current.json_message_format.jsonText;
            var data = ctx.__current.json_message_format.json;
            if (verify.isNotEmpty(ctx.__current.json_message_format.json.content)) {
                content = ctx.__current.json_message_format.json.content;
                data = ctx.__current.json_message_format.json.data;
            }
            ctx.__current.messages.push({
                role: model.role, 
                content: content
             })
            ctx.__current.main_message_data = data;
            return callback(null);
        }
        )
    }
    else {
        ctx.__current.messages.push({
            role: model.role, 
            content: model.content
         })
        return callback(null);
    }
}
;
function setResponseFormat(model, ctx, callback) {
    if (!model) {
        ctx.__current.response_format = null;
        return callback(null);
    }
    md.json_message_format(model, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current.response_format = ctx.__current.json_message_format.json;
        return callback(null);
    }
    )
}
md.json_message_format = function(model, ctx, callback) {
    const jsonEl = {
        name: model.wzName
     };
    ctx.__current.json_message_format = jsonEl;
    // log 'model', model
    // log 'model.nodes[0]', model.nodes[0]
    if (model.nodes.length = 1) {
        let jsonModel = model.nodes[0];
        if (jsonModel) {
            if (jsonModel.get_json) {
                included_writers.getIncludeJsonArtifact(ctx, jsonModel, (err, artifactText) => {
                    if (err) {
                        return callback(err);
                    }
                    jsonEl.jsonText = artifactText;
                    jsonEl.json = JSON.parse(artifactText);
                    return callback(null);
                }
                )
            }
            else {
                jsonEl.err = {
                    message: "something went wrong processing json"
                 };
                return callback(null);
            }
        }
        else {
            jsonEl.err = {
                message: "no data"
             };
            return callback(null);
        }
    }
    else {
        jsonEl.err = {
            message: "no data"
         };
        return callback(null);
    }
}
;
function getCleanJsonString(response) {
    const match = response.match(/```json\n([\s\S]*?)\n```|{[\s\S]*}/);
    if (match) {
        return match[1] || match[0]; // Extract JSON content;
    }
    else {
        return response.replace(/```(?:json)?\n?([\s\S]*?)\n?```/, '$1').trim();
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
            method: 'wizzi.plugin.ai/lib/artifacts/ai/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}