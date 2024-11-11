/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ai\.wizzi-override\lib\artifacts\ai\crewai\gen\writer.js.ittf
    utc time: Thu, 07 Nov 2024 16:13:20 GMT
*/
var verify = require('@wizzi/utils').verify;
var md = module.exports = {};
md.writeCrew = function(ctx, json) {
    if (true) {
        writeProgramStart(ctx, json)
        writeTools(ctx, json)
        writeModels(ctx, json)
        writeAgents(ctx, json)
        writeTasks(ctx, json)
        writeCrews(ctx, json)
    }
    else {
        ctx.write(JSON.stringify(json, null, 4))
    }
}
;
function writeProgramStart(ctx, json) {
    ctx.w("import os");
    ctx.w("");
    ctx.w("# Warning control");
    ctx.w("import warnings");
    ctx.w("warnings.filterwarnings('ignore')");
    ctx.w("");
    ctx.w("# import crew types");
    ctx.w("from crewai import Agent, Task, Crew");
    ctx.w("");
    ctx.w("# import dotenv");
    ctx.w("from dotenv import load_dotenv, find_dotenv");
    if (Object.keys(json.toolTypes).length > 0) {
        ctx.w("");
        ctx.w("# import tool types");
        for (const k in json.toolTypes) {
            var tt = json.toolTypes[k];
            if (verify.isNotEmpty(tt.from)) {
                ctx.w("from " + tt.from + " import " + tt.type);
            }
            else {
                ctx.w("import " + tt.type);
            }
        }
    }
    if (Object.keys(json.modelTypes).length > 0) {
        ctx.w("");
        ctx.w("# import model types");
        for (const k in json.modelTypes) {
            var mt = json.modelTypes[k];
            if (verify.isNotEmpty(mt.from)) {
                ctx.w("from " + mt.from + " import " + mt.type);
            }
            else {
                ctx.w("import " + mt.type);
            }
        }
    }
    if (Object.keys(json.displayTypes).length > 0) {
        ctx.w("");
        ctx.w("# import display types");
        for (const k in json.displayTypes) {
            var dt = json.displayTypes[k];
            if (verify.isNotEmpty(dt.from)) {
                ctx.w("from " + dt.from + " import " + dt.type);
            }
            else {
                ctx.w("import " + dt.type);
            }
        }
    }
    ctx.w("");
    ctx.w("# set environment variables");
    ctx.w("# these expect to find a .env file at the directory above.");
    ctx.w("# the format for that file is (without the comment)");
    ctx.w("# API_KEYNAME=AStringThatIsTheLongAPIKeyFromSomeService");
    ctx.w("");
    ctx.w("def load_env():");
    ctx.w("    _ = load_dotenv(find_dotenv())");
    for (const k in json.apiKeys) {
        var ak = json.apiKeys[k];
        ctx.w("");
        ctx.w("def get_" + ak.apiKey + "():");
        ctx.w("    load_env()");
        ctx.w("    " + ak.apiKey + " = os.getenv(\"" + ak.apiKey.toUpperCase() + "\")");
        ctx.w("    return " + ak.apiKey);
    }
    for (const k in json.llmTypes) {
        var lt = json.llmTypes[k];
        ctx.w("");
        ctx.w("def get_" + lt.apiKey + "():");
        ctx.w("    load_env()");
        ctx.w("    " + lt.apiKey + " = os.getenv(\"" + lt.apiKey.toUpperCase() + "\")");
        ctx.w("    return " + lt.apiKey);
    }
    for (const k in json.llmTypes) {
        var lt = json.llmTypes[k];
        ctx.w("");
        ctx.w("# " + lt.type);
        ctx.w(lt.apiKey + " = get_" + lt.apiKey + "()");
        ctx.w("os.environ[\"" + lt.modelEnvVar + "\"] = '" + lt.modelName + "'");
    }
    for (const k in json.apiKeys) {
        var ak = json.apiKeys[k];
        ctx.w("");
        ctx.w("# " + ak.type);
        ctx.w("os.environ[\"" + ak.modelEnvVar + "\"] = get_" + ak.apiKey + "()");
    }
}
function writeProperties(ctx, json) {
    for (var i = 0; i<json.properties.length; i++) {
        var p = json.properties[i];
        var comma = i<json.properties.length-1 ? ',' : '';
        if (p.lines && p.lines.length > 1) {
            var spaces1 = new Array(p.name.length+4).join(' ');
            ctx.w(p.name + '="' + escapeLine(p.lines[0]) + '"');
            for (var j=1; j<p.lines.length; j++) {
                var thiscomma = j<p.lines.length-1 ? '' : comma;
                ctx.w(spaces1 + '"' + escapeLine(p.lines[j]) + '"' + thiscomma);
            }
        }
        else {
            if (p.type == 'string') {
                ctx.w(p.name + '="' + escapeLine(p.value) + '"' + comma);
            }
            else if (p.type == 'boolean') {
                ctx.w(p.name + '=' + (p.value ? 'True' : 'False') + comma);
            }
            else if (p.type == 'array') {
                if (p.itemType == 'string') {
                    var i, i_items=p.value, i_len=p.value.length, item;
                    for (i=0; i<i_len; i++) {
                        item = p.value[i];
                        // TODO
                    }
                }
                else {
                    ctx.w(p.name + '=[' + p.value + ']' + comma);
                }
            }
            else {
                ctx.w(p.name + '=' + p.value + comma);
            }
        }
    }
}
function escapeLine(text) {
    return verify.replaceAll(text, '\"', '\\"');
}
function writeTool(ctx, json) {
    if (json.toolType == "Pydantic") {
        ctx.w("");
        ctx.w("# Define a Pydantic tool for " + json.name);
        ctx.w("class " + json.name + "(BaseTool):");
        ctx.indent();
        var i, i_items=json.properties, i_len=json.properties.length, p;
        for (i=0; i<i_len; i++) {
            p = json.properties[i];
            ctx.w(p.name + ": " + p.type);
        }
        ctx.deindent();
    }
}
function writeLlms(ctx, json) {
    if (json.llms.length > 0) {
        var i, i_items=json.tools, i_len=json.tools.length, tool;
        for (i=0; i<i_len; i++) {
            tool = json.tools[i];
            writeTool(ctx, tool)
        }
    }
}
function writeToolVars(ctx, json) {
    if (json.type == 'BaseTool') {
        writeCustomToolType(ctx, json)
    }
    else if (json.type == 'DirectoryReadTool') {
        if (verify.isNotEmpty(json.directory_path)) {
            ctx.w(json.name + '_path = "' + json.directory_path + '"');
        }
    }
    else if (json.type == 'FileReadTool') {
        if (verify.isNotEmpty(json.file_path)) {
            ctx.w(json.name + '_path = "' + json.file_path + '"');
        }
    }
    else if (json.type == 'MDXSearchTool') {
        if (verify.isNotEmpty(json.file_path)) {
            ctx.w(json.name + '_path = "' + json.file_path + '"');
        }
    }
    else if (json.type == 'ScrapeWebsiteTool') {
        if (verify.isNotEmpty(json.website_url)) {
            ctx.w(json.name + '_url = "' + json.website_url + '"');
        }
    }
    else if (json.type == 'WebsiteSearchTool') {
        if (verify.isNotEmpty(json.website_url)) {
            ctx.w(json.name + '_url = "' + json.website_url + '"');
        }
    }
}
function writeToolInstance(ctx, json) {
    if (json.type == 'BaseTool') {
        ctx.w(json.name + ' = ' + json.customType + '()');
    }
    else if (json.type == 'DirectoryReadTool') {
        ctx.w(json.name + ' = DirectoryReadTool(directory=' + json.name + '_path)');
    }
    else if (json.type == 'FileReadTool') {
        if (verify.isNotEmpty(json.file_path)) {
            ctx.w(json.name + ' = FileReadTool(file_path=' + json.name + '_path)');
        }
        else {
            ctx.w(json.name + ' = FileReadTool()');
        }
    }
    else if (json.type == 'MDXSearchTool') {
        if (verify.isNotEmpty(json.file_path)) {
            ctx.w(json.name + ' = MDXSearchTool(mdx=' + json.name + '_path)');
        }
        else {
            ctx.w(json.name + ' = MDXSearchTool()');
        }
    }
    else if (json.type == 'SerperDevTool') {
        if (json.properties.length > 0) {
            ctx.w(json.name + ' = SerperDevTool(');
            ctx.indent();
            writeProperties(ctx, json)
            ctx.deindent();
            ctx.w(')');
        }
        else {
            ctx.w(json.name + ' = SerperDevTool()');
        }
    }
    else if (json.type == 'ScrapeWebsiteTool') {
        if (verify.isNotEmpty(json.website_url)) {
            ctx.w(json.name + ' = ScrapeWebsiteTool(website_url=' + json.name + '_url)');
        }
        else {
            ctx.w(json.name + ' = ScrapeWebsiteTool()');
        }
    }
    else if (json.type == 'WebsiteSearchTool') {
        if (verify.isNotEmpty(json.website_url)) {
            ctx.w(json.name + ' = WebsiteSearchTool(website=' + json.name + '_url)');
        }
        else {
            ctx.w(json.name + ' = WebsiteSearchTool()');
        }
    }
}
function writeTools(ctx, json) {
    if (json.tools.length > 0) {
        ctx.w();
        ctx.w('# tools definitions');
        ctx.w();
        var i, i_items=json.tools, i_len=json.tools.length, tool;
        for (i=0; i<i_len; i++) {
            tool = json.tools[i];
            writeToolVars(ctx, tool)
        }
        var i, i_items=json.tools, i_len=json.tools.length, tool;
        for (i=0; i<i_len; i++) {
            tool = json.tools[i];
            writeToolInstance(ctx, tool)
        }
    }
}
function writeCustomToolType(ctx, json) {
    ctx.w("class " + json.customType + "(BaseTool):");
    ctx.indent();
    ctx.w("name: str = \"" + json.customName + "\"");
    ctx.w("description: str = \"" + json.customDescription + "\"");
    var i, i_items=json.methods, i_len=json.methods.length, m;
    for (i=0; i<i_len; i++) {
        m = json.methods[i];
        if (m.name == '_run') {
            ctx.w("def _run(self, text: str) -> str:");
            ctx.indent();
            var j, j_items=m.lines, j_len=m.lines.length, l;
            for (j=0; j<j_len; j++) {
                l = m.lines[j];
                ctx.w(l);
            }
            ctx.deindent();
        }
    }
    ctx.deindent();
}
function writeModel(ctx, json) {
    if (json.modelType == "Pydantic") {
        ctx.w("");
        ctx.w("# Define a Pydantic model for " + json.name);
        ctx.w("class " + json.name + "(BaseModel):");
        ctx.indent();
        var i, i_items=json.properties, i_len=json.properties.length, p;
        for (i=0; i<i_len; i++) {
            p = json.properties[i];
            ctx.w(p.name + ": " + p.type);
        }
        ctx.deindent();
    }
}
function writeModels(ctx, json) {
    if (json.models.length > 0) {
        var i, i_items=json.models, i_len=json.models.length, model;
        for (i=0; i<i_len; i++) {
            model = json.models[i];
            writeModel(ctx, model)
        }
    }
}
function writeAgent(ctx, json) {
    // log 'writeAgent', json, json.properties.length
    ctx.w("");
    ctx.w(json.name + " = Agent(");
    ctx.indent();
    writeProperties(ctx, json)
    ctx.deindent();
    ctx.w(")");
}
function writeAgents(ctx, json) {
    if (json.agents.length > 0) {
        var i, i_items=json.agents, i_len=json.agents.length, agent;
        for (i=0; i<i_len; i++) {
            agent = json.agents[i];
            writeAgent(ctx, agent)
        }
    }
}
function writeTask(ctx, json) {
    console.log('writeTask', json, json.properties.length, __filename);
    ctx.w("");
    ctx.w(json.name + " = Task(");
    ctx.indent();
    writeProperties(ctx, json)
    ctx.deindent();
    ctx.w(")");
}
function writeTasks(ctx, json) {
    if (json.tasks.length > 0) {
        var i, i_items=json.tasks, i_len=json.tasks.length, task;
        for (i=0; i<i_len; i++) {
            task = json.tasks[i];
            writeTask(ctx, task)
        }
    }
}
function writeCrew(ctx, json) {
    // log 'writeCrew', json, json.properties.length
    ctx.w("");
    ctx.w(json.name + " = Crew(");
    ctx.indent();
    // Agents
    var comma = json.tasks.length > 0 || json.properties.length > 0 ? ',' : '';
    ctx.write("agents=[");
    if (json.agents.length > 1) {
        ctx.w(json.agents[0] + ',');
        for (var j=1; j<json.agents.length; j++) {
            if (j < json.agents.length-1) {
                ctx.w('        ' + json.agents[j] + ',');
            }
            else {
                ctx.w('        ' + json.agents[j] + ']' + comma);
            }
        }
    }
    else if (json.agents.length > 0) {
        ctx.w(json.agents[0] + ']' + comma);
    }
    // Tasks
    var comma = json.properties.length > 0 ? ',' : '';
    ctx.write("tasks=[");
    if (json.tasks.length > 1) {
        ctx.w(json.tasks[0] + ',');
        for (var j=1; j<json.tasks.length; j++) {
            
            // log 221, comma
            if (j < json.tasks.length-1) {
                ctx.w('       ' + json.tasks[j] + ',');
            }
            // log 222, comma
            else {
                ctx.w('       ' + json.tasks[j] + ']' + comma);
            }
        }
    }
    else if (json.tasks.length > 0) {
        ctx.w(json.tasks[0] + ']' + comma);
    }
    writeProperties(ctx, json)
    ctx.deindent();
    ctx.w(")");
}
function writeCrewExec(ctx, crewJson, execJson) {
    console.log('writeCrewExec', crewJson, execJson, __filename);
    var resultName;
    if (execJson.inputs && execJson.inputs.length > 0) {
        resultName = crewJson.name + (execJson.name ? '_' + execJson.name : '') + '_result';
        ctx.w(resultName + " = " + crewJson.name + ".kickoff(");
        ctx.indent();
        ctx.w("inputs={");
        ctx.indent();
        for (var i=0; i<execJson.inputs.length; i++) {
            var comma = i < execJson.inputs.length-1 ? ',' : '';
            var p = execJson.inputs[i];
            ctx.w('"' + p.name + '": ' + p.value + comma);
        }
        ctx.deindent();
        ctx.w("}");
        ctx.deindent();
        ctx.w(");");
    }
    else {
        resultName = crewJson.name + "_result";
        ctx.w(resultName + " = " + crewJson.name + ".kickoff();");
    }
    var i, i_items=execJson.displays, i_len=execJson.displays.length, d;
    for (i=0; i<i_len; i++) {
        d = execJson.displays[i];
        writeCrewDisplay(ctx, d, resultName)
    }
}
function writeCrewDisplay(ctx, displayJson, resultName) {
    if (displayJson.type == 'markdown') {
        if (verify.isNotEmpty(displayJson.file_path)) {
            ctx.w("Markdown(\"" + displayJson.file_path + "\")");
        }
        else {
            ctx.w("Markdown(" + resultName + ")");
        }
    }
    else if (displayJson.type == 'pprint') {
        if (verify.isNotEmpty(displayJson.file_path)) {
            ctx.w("with open('" + displayJson.file_path + "') as f:");
            if (displayJson.format == 'json') {
                ctx.w("    data = json.load(f)");
            }
            ctx.w("pprint(data)");
        }
    }
}
function writeCrews(ctx, json) {
    if (json.crews.length > 0) {
        var i, i_items=json.crews, i_len=json.crews.length, crew;
        for (i=0; i<i_len; i++) {
            crew = json.crews[i];
            writeCrew(ctx, crew)
        }
        ctx.w("");
        ctx.w("# execution");
        var i, i_items=json.crews, i_len=json.crews.length, crew;
        for (i=0; i<i_len; i++) {
            crew = json.crews[i];
            if (crew.execs && crew.execs.length > 0) {
                var j, j_items=crew.execs, j_len=crew.execs.length, exec;
                for (j=0; j<j_len; j++) {
                    exec = crew.execs[j];
                    writeCrewExec(ctx, crew, exec)
                }
            }
            else {
                writeCrewExec(ctx, crew, {})
            }
        }
    }
}