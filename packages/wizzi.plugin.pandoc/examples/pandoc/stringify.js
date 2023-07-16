/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docx\.wizzi-override\examples\pandoc\index.js.ittf
    utc time: Fri, 26 May 2023 08:48:04 GMT
*/
'use strict';
var fs = require('fs');

let arg = process.argv[2];
const fileName = arg && arg.length > 0 ? arg : 'first';

fs.readFile("./" + fileName + ".json", "utf-8", (err, data) => {

    if (err) {
        console.log("[31m%s[0m", 'err', err);
        throw err;
    }
    var jsonData = JSON.parse(data);
    fs.writeFile("./" + fileName + ".ast.fmt.json", JSON.stringify(jsonData, null, 4), (err, data) => {
    
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            throw err;
        }
        console.log("Successfully Written to File.", __filename);
    }
    )
    fs.writeFile("./" + fileName + ".ast.schema.json", JSON.stringify(ejs(jsonData), null, 4), (err, data) => {
    
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            throw err;
        }
        console.log("Successfully Written to File.", __filename);
    }
    )
}
)
function isPlainObject(obj) {
    return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
}
const supportType = [
    'string', 
    'number', 
    'array', 
    'object', 
    'boolean', 
    'integer'
];
function getType(type) {
    if (!type) {
        type = 'string';
    }
    if (supportType.indexOf(type) !== -1) {
        return type;
    }
    return typeof type;
}
function isSchema(object) {
    if (supportType.indexOf(object.type) !== -1) {
        return true;
    }
    return false;
}
function handleSchema(json, schema, jsonBaxSchema) {
    Object.assign(schema, json);
    if (schema.type === 'object') {
        delete schema.properties
        parse(json.properties, schema, jsonBaxSchema);
    }
    if (schema.type === 'array') {
        delete schema.items
        schema.items = {};
        parse(json.items, schema.items, jsonBaxSchema);
    }
}
function handleArray(arr, schema, jsonBaxSchema) {
    schema.type = 'array';
    var props = schema.items = {};
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        parse(item, props, jsonBaxSchema);
    }
}
function handleObject(json, schema, jsonBaxSchema) {
    if (isSchema(json)) {
        return handleSchema(json, schema, jsonBaxSchema);
    }
    schema.type = 'object';
    schema.required = [];
    var props = schema.properties = {};
    if (json.t && json.c) {
        var curSchema = props[key] = {};
        jsonBaxSchema.curPath.push('t_' + json.t);
        parse(json.c, curSchema, jsonBaxSchema);
        jsonBaxSchema.curPath.pop();
    }
    else {
        for (var key in json) {
            var item = json[key];
            var curSchema = props[key] = {};
            if (key[0] === '*') {
                delete props[key]
                key = key.substr(1);
                schema.required.push(key);
                props[key] = {};
            }
            jsonBaxSchema.curPath.push(key == 't' ? 't_' + json[key] : key);
            parse(item, curSchema, jsonBaxSchema);
            jsonBaxSchema.curPath.pop();
        }
    }
}
function parse(json, schema, jsonBaxSchema) {
    if (Array.isArray(json)) {
        jsonBaxSchema.curPath.push('[');
        handleArray(json, schema, jsonBaxSchema);
        jsonBaxSchema.curPath.pop();
    }
    else {
        if (isPlainObject(json)) {
            jsonBaxSchema.curPath.push('{');
            handleObject(json, schema, jsonBaxSchema);
            jsonBaxSchema.curPath.pop();
        }
        else {
            jsonBaxSchema.curPath.push(getType(json));
            jsonBaxSchema.paths[jsonBaxSchema.curPath.join('.')] = json;
            jsonBaxSchema.curPath.pop();
        }
    }
}
function ejs(data) {
    var JsonSchema = {};
    var JsonBaxSchema = {
        curPath: [
            
        ], 
        paths: {
            
         }
     };
    parse(data, JsonSchema, JsonBaxSchema);
    return JsonBaxSchema;
}
