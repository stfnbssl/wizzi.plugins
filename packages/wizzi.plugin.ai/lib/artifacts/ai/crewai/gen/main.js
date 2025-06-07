/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ai\.wizzi-override\lib\artifacts\ai\crewai\gen\main.js.ittf
    utc time: Thu, 20 Feb 2025 12:19:37 GMT
*/


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
var axios = require('axios');
var writer = require('./writer');
var api = null;

var myname = 'wizzi.plugin.ai.artifacts.ai.crewai.gen.main';

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
            kind: "root", 
            apiKeys: {
                
             }, 
            llmTypes: {
                
             }, 
            llms: [
                
            ], 
            toolTypes: {
                
             }, 
            tools: [
                
            ], 
            modelTypes: {
                
             }, 
            models: [
                
            ], 
            displayTypes: {
                
             }, 
            agentsDict: {
                
             }, 
            agents: [
                
            ], 
            tasksDict: {
                
             }, 
            tasks: [
                
            ], 
            crewsDict: {
                
             }, 
            crews: [
                
            ]
         };
        ctx.__current = ctx.__json;
        md.ai(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (ctx.artifactGenerationErrors.length > 0) {
                return callback(ctx.artifactGenerationErrors);
            }
            // generation OK
            else {
                writer.writeCrew(ctx, ctx.__json)
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
    md.genItems(model.nodes, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        return callback(null);
    }
    )
}
;
md.agent = function(model, ctx, callback) {
    // log 'agent', ctx.__current
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("agent declaration must be on root");
    }
    ctx.__current = {
        kind: 'agent', 
        name: model.wzName, 
        properties: [
            
        ], 
        tools: [
            
        ]
     };
    addStringProperty(ctx.__current, 'role', model.role);
    addStringProperty(ctx.__current, 'goal', model.goal);
    addStringProperty(ctx.__current, 'backstory', model.backstory);
    var tools = [];
    var i, i_items=model.toolRefs, i_len=model.toolRefs.length, tool;
    for (i=0; i<i_len; i++) {
        tool = model.toolRefs[i];
        tools.push(tool.wzName)
    }
    addArrayProperty(ctx.__current, 'tools', tools, 'array');
    addStringProperty(ctx.__current, 'llm', model.llm);
    addStringProperty(ctx.__current, 'function_calling_llm', model.function_calling_llm);
    addNumberProperty(ctx.__current, 'max_iter', model.max_iter, 25);
    addStringProperty(ctx.__current, 'max_rpm', model.max_rpm);
    addStringProperty(ctx.__current, 'max_execution_time', model.max_execution_time);
    addBooleanProperty(ctx.__current, 'verbose', model.verbose, false);
    // TODO step_callback
    addBooleanProperty(ctx.__current, 'allow_delegation', model.allow_delegation, false);
    addBooleanProperty(ctx.__current, 'cache', model.cache, true);
    addStringProperty(ctx.__current, 'system_template', model.system_template);
    addStringProperty(ctx.__current, 'prompt_template', model.prompt_template);
    addStringProperty(ctx.__current, 'response_template', model.response_template);
    addBooleanProperty(ctx.__current, 'allow_code_execution', model.allow_code_execution, false);
    addNumberProperty(ctx.__current, 'max_retry_limit', model.max_retry_limit, 2);
    addBooleanProperty(ctx.__current, 'use_system_prompt', model.use_system_prompt, true);
    addBooleanProperty(ctx.__current, 'respect_context_window', model.respect_context_window, true);
    addStringProperty(ctx.__current, 'code_execution_mode', model.code_execution_mode, 'safe');
    saveCurrent.agentsDict[model.wzName] = ctx.__current;
    saveCurrent.agents.push(ctx.__current);
    md.genItems(model.nodes, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.task = function(model, ctx, callback) {
    // log 'task', ctx.__current
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("task declaration must be on root");
    }
    ctx.__current = {
        kind: 'task', 
        name: model.wzName, 
        properties: [
            
        ]
     };
    addStringProperty(ctx.__current, 'description', model.description);
    addStringProperty(ctx.__current, 'expected_output', model.expected_output);
    addBooleanProperty(ctx.__current, 'async_execution', model.async_execution, false);
    addInstanceProperty(ctx.__current, 'output_json', model.output_json);
    addInstanceProperty(ctx.__current, 'output_pydantic', model.output_pydantic);
    addStringProperty(ctx.__current, 'output_file', model.output_file);
    addStringProperty(ctx.__current, 'output', model.output);
    addStringProperty(ctx.__current, 'callback', model.callback);
    addBooleanProperty(ctx.__current, 'human_input', model.human_input, false);
    addStringProperty(ctx.__current, 'converter_cls', model.converter_cls);
    if (verify.isObject(model.agent)) {
        addInstanceProperty(ctx.__current, 'agent', model.agent.wzName);
    }
    if (verify.isObject(model.taskContext)) {
        var context = [];
        var i, i_items=model.taskContext.taskRefs, i_len=model.taskContext.taskRefs.length, item;
        for (i=0; i<i_len; i++) {
            item = model.taskContext.taskRefs[i];
            context.push(item.wzName)
        }
        addArrayProperty(ctx.__current, 'context', context);
    }
    if (verify.isObject(model.config)) {
        var config = {};
        var i, i_items=model.config.properties, i_len=model.config.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = model.config.properties[i];
            var nv = verify.getNameValueRaw(item.wzName);
            config[nv.name()] = nv.value();
        }
        addObjectProperty(ctx.__current, 'config', config);
    }
    var tools = [];
    var i, i_items=model.toolRefs, i_len=model.toolRefs.length, tool;
    for (i=0; i<i_len; i++) {
        tool = model.toolRefs[i];
        tools.push(tool.wzName)
    }
    addArrayProperty(ctx.__current, 'tools', tools, 'array');
    saveCurrent.tasksDict[model.wzName] = ctx.__current;
    saveCurrent.tasks.push(ctx.__current);
    md.genItems(model.nodes, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.crew = function(model, ctx, callback) {
    // log 'crew', ctx.__current
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("crew declaration must be on root");
    }
    ctx.__current = {
        kind: 'crew', 
        name: model.wzName, 
        properties: [
            
        ], 
        agents: [
            
        ], 
        tasks: [
            
        ], 
        execs: [
            
        ]
     };
    addStringProperty(ctx.__current, 'process', model.process, 'sequential');
    addBooleanProperty(ctx.__current, 'verbose', model.verbose, false);
    addStringProperty(ctx.__current, 'manager_llm', model.manager_llm);
    addStringProperty(ctx.__current, 'function_calling_llm', model.function_calling_llm);
    addStringProperty(ctx.__current, 'function_calling_llm', model.function_calling_llm);
    if (verify.isObject(model.config)) {
        var config = {};
        var i, i_items=model.config.properties, i_len=model.config.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = model.config.properties[i];
            var nv = verify.getNameValueRaw(item.wzName);
            config[nv.name()] = nv.value();
        }
        addObjectProperty(ctx.__current, 'config', config);
    }
    addStringProperty(ctx.__current, 'max_rpm', model.max_rpm);
    addStringProperty(ctx.__current, 'language', model.language, "English");
    addStringProperty(ctx.__current, 'language_file', model.language_file);
    addBooleanProperty(ctx.__current, 'memory', model.memory, false);
    addBooleanProperty(ctx.__current, 'cache', model.cache, true);
    addBooleanProperty(ctx.__current, 'full_output', model.full_output, false);
    addStringProperty(ctx.__current, 'output_log_file', model.output_log_file);
    addStringProperty(ctx.__current, 'manager_agent', model.manager_agent);
    addStringProperty(ctx.__current, 'prompt_file', model.prompt_file);
    addBooleanProperty(ctx.__current, 'planning', model.planning, false);
    addStringProperty(ctx.__current, 'planning_llm', model.planning_llm);
    var i, i_items=model.agentRefs, i_len=model.agentRefs.length, agent;
    for (i=0; i<i_len; i++) {
        agent = model.agentRefs[i];
        ctx.__current.agents.push(agent.wzName)
    }
    var i, i_items=model.taskRefs, i_len=model.taskRefs.length, task;
    for (i=0; i<i_len; i++) {
        task = model.taskRefs[i];
        ctx.__current.tasks.push(task.wzName)
    }
    parseExecs(model, saveCurrent, ctx.__current)
    saveCurrent.crewsDict[model.wzName] = ctx.__current;
    saveCurrent.crews.push(ctx.__current);
    md.genItems(model.nodes, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.OpenAI = function(model, ctx, callback) {
    console.log('OpenAI', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("llm declaration must be on root");
    }
    // TODO model.model and modelEnvVar
    // is a model selectable by agents or tasks?
    // need we to manage many models for a single LLM?
    ctx.__current = {
        kind: 'llm', 
        name: model.wzName, 
        type: 'OpenAI', 
        modelName: model.model, 
        modelEnvVar: 'OPENAI_MODEL_NAME'
     };
    saveCurrent.llmTypes['OpenAI'] = {
        kind: 'llm-type', 
        type: 'OpenAI', 
        apiKey: 'openai_api_key', 
        modelName: model.model, 
        modelEnvVar: 'OPENAI_MODEL_NAME'
     };
    saveCurrent.llms.push(ctx.__current);
    md.genItems(model.nodes, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
md.DirectoryRead = function(model, ctx, callback) {
    console.log('DirectoryRead', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'DirectoryReadTool', 
        from: 'crewai_tools', 
        directory_path: model.directory_path
     };
    saveCurrent.toolTypes['DirectoryReadTool'] = {
        kind: 'tool-type', 
        type: 'DirectoryReadTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.FileRead = function(model, ctx, callback) {
    console.log('FileRead', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'FileReadTool', 
        from: 'crewai_tools', 
        file_path: model.file_path
     };
    saveCurrent.toolTypes['FileReadTool'] = {
        kind: 'tool-type', 
        type: 'FileReadTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.GoogleSerperSearch = function(model, ctx, callback) {
    console.log('GoogleSerperSearch', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'SerperDevTool', 
        from: 'crewai_tools', 
        properties: [
            
        ]
     };
    addStringProperty(ctx.__current, 'search_url', model.search_url);
    addStringProperty(ctx.__current, 'country', model.country);
    addStringProperty(ctx.__current, 'location', model.location);
    addStringProperty(ctx.__current, 'locale', model.locale);
    addNumberProperty(ctx.__current, 'n_results', model.n_results, 10);
    saveCurrent.toolTypes['SerperDevTool'] = {
        kind: 'tool-type', 
        type: 'SerperDevTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.apiKeys['SerperDevTool'] = {
        kind: 'api-key', 
        type: 'SerperDevTool', 
        apiKey: 'serper_api_key', 
        modelEnvVar: 'SERPER_API_KEY'
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.MdxRagSearch = function(model, ctx, callback) {
    console.log('MdxRagSearch', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'MDXSearchTool', 
        from: 'crewai_tools', 
        file_path: model.file_path
     };
    saveCurrent.toolTypes['MDXSearchTool'] = {
        kind: 'tool-type', 
        type: 'MDXSearchTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.ScrapeWebsite = function(model, ctx, callback) {
    console.log('ScrapeWebsite', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'ScrapeWebsiteTool', 
        from: 'crewai_tools', 
        website_url: model.website_url
     };
    saveCurrent.toolTypes['ScrapeWebsiteTool'] = {
        kind: 'tool-type', 
        type: 'ScrapeWebsiteTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.WebsiteRagSearch = function(model, ctx, callback) {
    console.log('WebsiteRagSearch', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'WebsiteSearchTool', 
        from: 'crewai_tools', 
        website_url: model.website_url
     };
    saveCurrent.toolTypes['WebsiteSearchTool'] = {
        kind: 'tool-type', 
        type: 'WebsiteSearchTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.CustomTool = function(model, ctx, callback) {
    console.log('CustomTool', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("tool declaration must be on root");
    }
    ctx.__current = {
        kind: 'tool', 
        name: model.wzName, 
        type: 'BaseTool', 
        from: 'crewai_tools', 
        customType: model.type, 
        customName: model.name, 
        customDescription: model.description, 
        methods: [
            
        ]
     };
    var i, i_items=model.nodes, i_len=model.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = model.nodes[i];
        if (node.wzElement == 'method') {
            var method = {
                name: node.wzName, 
                lines: [
                    
                ]
             };
            var j, j_items=node.nodes, j_len=node.nodes.length, child;
            for (j=0; j<j_len; j++) {
                child = node.nodes[j];
                if (child.wzElement == 'codeLine') {
                    method.lines.push(child.wzName)
                }
            }
            ctx.__current.methods.push(method)
        }
    }
    saveCurrent.toolTypes['CustomTool'] = {
        kind: 'tool-type', 
        type: 'BaseTool', 
        from: 'crewai_tools', 
        apiKey: null
     };
    saveCurrent.tools.push(ctx.__current);
    ctx.__current = saveCurrent;
    return callback(null);
}
;
md.Pydantic = function(model, ctx, callback) {
    console.log('Pydantic', ctx.__current, __filename);
    var saveCurrent = ctx.__current;
    if (saveCurrent.kind != 'root') {
        throw new Error("model declaration must be on root");
    }
    ctx.__current = {
        kind: 'model', 
        name: model.wzName, 
        modelType: 'Pydantic', 
        type: 'BaseModel', 
        from: 'pydantic', 
        properties: [
            
        ]
     };
    saveCurrent.modelTypes['Pydantic'] = {
        kind: 'model-type', 
        type: 'BaseModel', 
        from: 'pydantic'
     };
    var i, i_items=model.modelProperties, i_len=model.modelProperties.length, mp;
    for (i=0; i<i_len; i++) {
        mp = model.modelProperties[i];
        ctx.__current.properties.push({
            name: mp.wzName, 
            type: mp.type
         })
    }
    saveCurrent.models.push(ctx.__current);
    md.genItems(model.nodes, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.__current = saveCurrent;
        return callback(null);
    }
    )
}
;
function parseExecs(model, mainJson, crewJson) {
    var i, i_items=model.execs, i_len=model.execs.length, exec;
    for (i=0; i<i_len; i++) {
        exec = model.execs[i];
        var execObj = {
            inputs: [
                
            ], 
            displays: [
                
            ]
         };
        if (verify.isObject(exec.inputs)) {
            var j, j_items=exec.inputs.properties, j_len=exec.inputs.properties.length, item;
            for (j=0; j<j_len; j++) {
                item = exec.inputs.properties[j];
                var p = lineParser.parseNameValueRaw(item.wzName, item);
                if (p.hasValue()) {
                    execObj.inputs.push({
                        name: p.name(), 
                        value: p.value()
                     })
                }
                else {
                    execObj.inputs.push({
                        name: p.name()
                     })
                }
            }
        }
        var j, j_items=exec.displays, j_len=exec.displays.length, display;
        for (j=0; j<j_len; j++) {
            display = exec.displays[j];
            parseDisplay(display, mainJson, execObj)
        }
        crewJson.execs.push(execObj)
    }
}
function parseDisplay(model, mainJson, execObj) {
    if (model.wzName == 'markdown') {
        mainJson.displayTypes['Markdown'] = {
            from: 'IPython.display', 
            type: 'Markdown'
         };
    }
    else if (model.wzName == 'pprint') {
        mainJson.displayTypes['pprint'] = {
            from: 'pprint', 
            type: 'pprint'
         };
        if (model.format == 'json') {
            mainJson.displayTypes['json'] = {
                type: 'json'
             };
        }
    }
    execObj.displays.push({
        type: model.wzName, 
        file_path: model.file_path, 
        format: model.format
     })
}
function addStringProperty(json, name, value, defaultValue) {
    if (verify.isNotEmpty(value) && value != defaultValue) {
        json.properties.push({
            name, 
            value, 
            lines: getPropertyLines(value), 
            type: 'string'
         })
    }
}
function addBooleanProperty(json, name, value, defaultValue) {
    if (value != defaultValue) {
        json.properties.push({
            name, 
            value, 
            type: 'boolean'
         })
    }
}
function addNumberProperty(json, name, value, defaultValue) {
    if (value != defaultValue) {
        json.properties.push({
            name, 
            value, 
            type: 'number'
         })
    }
}
function addArrayProperty(json, name, value, itemType) {
    json.properties.push({
        name, 
        value, 
        type: 'array', 
        itemType
     })
}
function addObjectProperty(json, name, value) {
    json.properties.push({
        name, 
        value, 
        type: 'object'
     })
}
function addInstanceProperty(json, name, value) {
    if (verify.isNotEmpty(value)) {
        json.properties.push({
            name, 
            value, 
            type: 'instance'
         })
    }
}
function getPropertyLines(text) {
    var lines = [];
    var words = [];
    var word = [];
    var count = 0;
    for (var i=0; i<text.length; i++) {
        var ch = text[i];
        var chNext = text[i+1];
        if (ch == ' ') {
            if (word.length > 0) {
                words.push(word.join(''))
            }
            word = [];
            count++;
            
            // log 'words ++', words
            if (count > 60) {
                if (word.length > 0) {
                    words.push(word.join(''))
                }
                word = [];
                lines.push(words.join(' '))
                words = [];
                count = 0;
            }
        }
        else if (ch == '.' && chNext == ' ') {
            word.push(ch);
            words.push(word.join(''))
            word = [];
            lines.push(words.join(' '))
            words = [];
            count = 0;
        }
        else {
            if (word.length == 0 && words.length == 0 && lines.length > 0) {
                lines[lines.length-1] = lines[lines.length-1] + ' ';
            }
            word.push(ch);
            count++;
        }
    }
    if (word.length > 0) {
        words.push(word.join(''))
    }
    if (words.length > 0) {
        lines.push(words.join(' '))
    }
    return lines;
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
            method: 'wizzi.plugin.ai/lib/artifacts/ai/crewai/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}