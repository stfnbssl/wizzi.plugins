/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\lib\artifacts\logbot\docdump\gen\main.js.ittf
    utc time: Fri, 24 Jan 2025 15:11:10 GMT
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
var api = null;

var myname = 'wizzi.plugin.lbot.artifacts.logbot.document.gen.main';

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
        md.lbot(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            // generation OK
            else {
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
    ctx.w('<lbot>');
    md.genItems(model.nodes, ctx, {
        indent: true
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.w('</lbot>');
        return callback(null);
    }
    )
}
;
md.aiCall = function(model, ctx, callback) {
    ctx.w('<ai-call>');
    ctx.indent();
    ctx.w('<name>' + model.wzName + '</name>');
    ctx.w('<description>' + model.description + '</description>');
    ctx.w('<ai-messages>');
    let messages = null;
    if (model.aiMessages.length > 0) {
        messages = [];
        var i, i_items=model.aiMessages, i_len=model.aiMessages.length, message;
        for (i=0; i<i_len; i++) {
            message = model.aiMessages[i];
            ctx.w('<role>' + message.role + '</role>');
            writeTextElement(ctx, 'content', message.content, true)
            messages.push({
                role: message.role, 
                content: message.content
             })
        }
    }
    ctx.w('</ai-messages>');
    console.log('aiCall, model.messages', messages, __filename);
    if (api && messages && messages.length > 0) {
        try {
            api.post('aiapicall', {
                model: model.model, 
                max_tokens: parseInt(model.max_tokens), 
                temperature: parseFloat(model.temperature), 
                frequency_penalty: parseInt(model.frequency_penalty), 
                presence_penalty: parseInt(model.presence_penalty), 
                messages: messages, 
                prompt: model.aiPrompt
             }).then((response) => {
                console.log(model.aiPrompt, ' -> ', response.data, __filename);
                ctx.w('<ai-info>');
                ctx.indent();
                ctx.w(response.data.info);
                ctx.deindent();
                ctx.w('</ai-info>');
                ctx.w('<ai-response>');
                ctx.indent();
                ctx.w(response.data.result);
                ctx.deindent();
                ctx.w('</ai-call>');
                return callback(null);
            }
            ).catch((err) => {
                console.log("[31m%s[0m", 'Error:', err.message);
                ctx.w('<ai-error>');
                ctx.indent();
                ctx.w('Error:', err.message);
                if (err.response) {
                    ctx.w('Response data:', err.response.data);
                    ctx.w('Response status:', err.response.status);
                }
                ctx.deindent();
                ctx.w('</ai-error>');
                ctx.deindent();
                ctx.w('</ai-call>');
                return callback(null);
            }
            )
        } 
        catch (ex) {
            console.log("[31m%s[0m", 'Exception.message:', ex.message);
            console.log("[31m%s[0m", 'Exception:', ex);
            ctx.w('<ai-error>');
            ctx.indent();
            ctx.w('Error:', ex.message);
            ctx.deindent();
            ctx.w('</ai-error>');
            ctx.deindent();
            ctx.w('</ai-call>');
            return callback(null);
        } 
    }
    else {
        ctx.deindent();
        ctx.w('</ai-call>');
        return callback(null);
    }
}
;
function aiCall_close(model, ctx, info, callback) {
    ctx.deindent();
    ctx.w('</ai-response>');
    if (info != null) {
        ctx.w('<ai-info>');
        ctx.indent();
        ctx.w(info);
        ctx.deindent();
        ctx.w('</ai-info>');
    }
    ctx.deindent();
    ctx.w('</ai-call>');
    return callback(null);
}
md.transformation = function(model, ctx, callback) {
    ctx.w('<transformation>');
    ctx.indent();
    ctx.w('<name>' + model.wzName + '</name>');
    ctx.w('<description>' + model.description + '</description>');
    ctx.w('<aiprompt>' + model.aiPrompt + '</aiprompt>');
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
                ctx.deindent();
                ctx.w('</transformation>');
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
    ctx.w('<input>');
    ctx.indent();
    ctx.w('<name>' + model.wzName + '</name>');
    let jsonModel = model.jsonObjectInclude;
    if (!jsonModel) {
        jsonModel = model.jsonArrayInclude;
    }
    if (jsonModel) {
        ctx.w("<script>");
        console.log(1, __filename);
        if (jsonModel.get_json) {
            console.log(2, __filename);
            included_writers.writeIncludeJson(ctx, jsonModel, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                console.log(3, __filename);
                ctx.w("</script>");
                ctx.deindent();
                ctx.w('</input>');
                return callback(null);
            }
            )
        }
        else {
            console.log(4, __filename);
            ctx.indent();
            ctx.w("something went wrong processing json");
            ctx.deindent();
            ctx.w("</script>");
            ctx.deindent();
            ctx.w('</input>');
            return callback(null);
        }
    }
    else {
        console.log(5, __filename);
        ctx.w("no data");
        ctx.deindent();
        ctx.w('</input>');
        return callback(null);
    }
}
;
md.aiResult = function(model, ctx, callback) {
    ctx.w('<aiResult>');
    ctx.indent();
    ctx.w('<name>' + model.wzName + '</name>');
    if (model.jsonata) {
        md.jsonata(model.jsonata, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('</aiResult>');
            return callback(null);
        }
        )
    }
}
;
md.jsonata = function(model, ctx, callback) {
    ctx.w('<jsonata>');
    if (model.jsInclude) {
        ctx.indent();
        ctx.w("<script>");
        if (model.jsInclude.get_js) {
            included_writers.writeIncludeJs(ctx, model.jsInclude, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.w("</script>");
                ctx.deindent();
                ctx.w('</jsonata>');
                return callback(null);
            }
            )
        }
        else {
            ctx.indent();
            ctx.w("something went wrong processing js");
            ctx.deindent();
            ctx.w("</script>");
            ctx.deindent();
            ctx.w('</jsonata>');
            return callback(null);
        }
    }
    else if (verify.isNotEmpty(model.wzName)) {
        writeTextElement(ctx, 'script', model.wzName)
        ctx.w('</jsonata>');
        return callback(null);
    }
    else {
        ctx.w("<error>Could not retrieve a jsonata expression</error>");
        ctx.w('</jsonata>');
        return callback(null);
    }
}
;
md.apply = function(model, ctx, callback) {
    ctx.w('<apply>');
    ctx.indent();
    ctx.w('<name>' + model.wzName + '</name>');
    md.genItems(model.tos, ctx, {
        indent: false
     }, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w('</apply>');
        return callback(null);
    }
    )
}
;
md.to = function(model, ctx, callback) {
    ctx.w('<to>');
    ctx.indent();
    ctx.w('<name>' + model.wzName + '</name>');
    ctx.deindent();
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
                            ctx.indent();
                            ctx.w('<result>');
                            ctx.indent();
                            const jsonInputParsed = JSON.parse(jsonInput);
                            console.log("inputEl.jsonInputParsed", jsonInputParsed, __filename);
                            try {
                                jsonata(jsonataExpression).evaluate(jsonInputParsed).then((result) => {
                                    console.log("jsonata.result", result, __filename);
                                    ctx.writeAligned(JSON.stringify(result, null, 2))
                                    ctx.deindent();
                                    ctx.w('</result>');
                                    ctx.deindent();
                                    ctx.w('</to>');
                                    return callback(null);
                                }
                                )
                                
                            } 
                            catch (ex) {
                                console.log("[31m%s[0m", ex);
                                ctx.w('Error calling jsonata: ' + ex.message);
                                ctx.deindent();
                                ctx.w('</result>');
                                ctx.deindent();
                                ctx.w('</to>');
                                return callback(null);
                            } 
                        }
                        )
                    }
                    else {
                        ctx.w('<error>Cannot retrieve json from input data: ' + model.wzName + '</error>');
                        ctx.deindent();
                        ctx.w('</to>');
                        return callback(null);
                    }
                }
                else {
                    ctx.w('<error>Missing input data: ' + model.wzName + '</error>');
                    ctx.deindent();
                    ctx.w('</to>');
                    return callback(null);
                }
            }
            else {
                ctx.w('<error>Could not retrieve a jsonata expression in: ' + model.wzParent.wzName + '</error>');
                ctx.deindent();
                ctx.w('</to>');
                return callback(null);
            }
        }
        )
    }
    else {
        ctx.w('<error>Missing ai result: ' + model.wzParent.wzName + '</error>');
        ctx.deindent();
        ctx.w('</to>');
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
function writeTextElement(ctx, name, text, indent) {
    if (indent) {
        ctx.indent();
    }
    ctx.w('<' + name + '>');
    ctx.indent();
    ctx.w(text);
    ctx.deindent();
    ctx.w('</' + name + '>');
    if (indent) {
        ctx.deindent();
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
            method: 'wizzi.plugin.lbot/lib/artifacts/logbot/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}