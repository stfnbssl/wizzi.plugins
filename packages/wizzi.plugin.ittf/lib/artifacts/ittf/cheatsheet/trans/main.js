/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ittf\.wizzi-override\lib\artifacts\ittf\cheatsheet\trans\main.js.ittf
    utc time: Mon, 06 May 2024 14:25:24 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = verify.lineParser;
var errors = require('../../../../../errors');
var stringify = require('json-stringify-safe');
var pretty = require('@wizzi/utils').pretty;
function loadCheats(model, workObj) {
    var i, i_items=model.children, i_len=model.children.length, itemTop;
    for (i=0; i<i_len; i++) {
        itemTop = model.children[i];
        if (itemTop.name !== 'element') {
            workObj[itemTop.name] = itemTop.value;
        }
    }
    var i, i_items=model.children, i_len=model.children.length, itemTop;
    for (i=0; i<i_len; i++) {
        itemTop = model.children[i];
        // loog 'name, value', itemTop.name, itemTop.value
        if (itemTop.name === 'element') {
            var elementResult = {
                name: itemTop.value, 
                items: [
                    
                ]
             };
            var j, j_items=itemTop.children, j_len=itemTop.children.length, itemEl;
            for (j=0; j<j_len; j++) {
                itemEl = itemTop.children[j];
                if (itemEl.name === 'item') {
                    var itemResult = {
                        schema: workObj.schema, 
                        render: 'artifact'
                     };
                    var k, k_items=itemEl.children, k_len=itemEl.children.length, item;
                    for (k=0; k<k_len; k++) {
                        item = itemEl.children[k];
                        
                        // loog 'item.name, toIttf(item.children[0])', item.name, toIttf(item.children[0])
                        if (item.name === 'ittf') {
                            if (item.children.length == 1) {
                                
                                // is already ok, has the correct root
                                
                                // ??? set itemResult[item.name] = toIttf(item.children[0])
                                if ((workObj.schema === 'json' && (item.children[0].name === '{' || item.children[0].name === '[')) || item.children[0].name === ittfRootFromSchema(workObj.schema) || ittfRootFromSchema(workObj.schema) === 'any') {
                                    itemResult[item.name] = toIttf(item.children[0]);
                                    itemResult[item.name + 'Wrapped'] = itemResult[item.name];
                                }
                                // wrap it
                                else {
                                    var ittfNode = wrapperForSchema(workObj.schema);
                                    var l, l_items=item.children, l_len=item.children.length, node;
                                    for (l=0; l<l_len; l++) {
                                        node = item.children[l];
                                        ittfNode.children.push(node)
                                    }
                                    itemResult[item.name] = toIttf(item.children[0]);
                                    itemResult[item.name + 'Wrapped'] = toIttf(ittfNode);
                                }
                            }
                            // wrap them
                            else {
                                var ittfNode = wrapperForSchema(workObj.schema);
                                var l, l_items=item.children, l_len=item.children.length, node;
                                for (l=0; l<l_len; l++) {
                                    node = item.children[l];
                                    ittfNode.children.push(node)
                                }
                                itemResult[item.name] = toIttf(item.children);
                                itemResult[item.name + 'Wrapped'] = toIttf(ittfNode);
                            }
                        }
                        else {
                            itemResult[item.name] = item.value;
                        }
                    }
                    elementResult.items.push(itemResult)
                    workObj._all_items.push(itemResult)
                }
                else {
                    elementResult[itemEl.name] = itemEl.value;
                }
            }
            workObj.elements.push(elementResult)
        }
    }
    var dump = stringify(workObj, null, 2);
    // loog 'loadCheats, _all_items.length', workObj._all_items.length
    // loog 'loadCheats, workObj\n', dump
}
function generateArtifacts(ctx, workObj, callback_main) {
    var counter = 0;
    async.mapSeries(workObj._all_items, function(item, callback) {
        console.log('counter', ++counter, __filename);
        process.nextTick(function() {
            pretty.prettifyIttfHtmlFromString(item.ittfWrapped, (err, pretty) => {
            
                if (err) {
                    return callback(err);
                }
                item.ittfPretty = pretty;
                // loog 'pretty', pretty
                // loog 'ittf.cheatsheet.ctx', ctx
                // loog 'counter.prettified', counter
                
                // loog 'ctx.wizziFactory.loadMTreeBuildupScriptFromText', ctx.wizziFactory.loadMTreeBuildupScriptFromText
                if (item.render === 'script') {
                    ctx.wizziFactory.loadMTreeBuildupScriptFromText(item.ittfWrapped, {}, (err, script) => {
                    
                        // loog 'counter', --counter
                        if (err) {
                            item.generated = '\n' + verify.htmlEscape(stringify(err, null, 2));
                        }
                        else {
                            item.generated = '\n' + verify.htmlEscape(script.mTreeBuildUpScript);
                        }
                        callback(null)
                    }
                    )
                }
                // loog 'ctx.wizziFactory.loadModelAndGenerateArtifactFromText', ctx.wizziFactory.loadModelAndGenerateArtifactFromText, artifactNameFromSchema(item.schema)
                else {
                    ctx.wizziFactory.loadModelAndGenerateArtifactFromText(item.ittfWrapped, {
                        artifactRequestContext: {
                            noUseStrict: true, 
                            noGeneratorComments: true
                         }
                     }, artifactNameFromSchema(item.schema), (err, artifactText) => {
                    
                        // loog 'err, artifactText', err, artifactText
                        // loog 'counter', --counter
                        if (err) {
                            item.generated = '\n' + verify.htmlEscape(stringify(err, null, 2));
                        }
                        else {
                            artifactText = verify.htmlEscape(artifactText);
                            item.generated = '\n' + artifactText;
                        }
                        callback(null)
                    }
                    )
                }
            }
            )
        })
    }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        var dump = stringify(workObj, null, 2);
        console.log('workObj final\n', dump, __filename);
        console.log('Ending transform ittf/cheatsheet', __filename);
        callback_main(null, {
            schema: workObj.schema, 
            elements: workObj.elements
         })
    }
    )
}
function toIttf(node) {
    var buffer = [];
    if (verify.isArray(node)) {
        var i, i_items=node, i_len=node.length, item;
        for (i=0; i<i_len; i++) {
            item = node[i];
            if (item.children) {
                _toIttfNodeDeep(item, 0, buffer);
            }
            else {
                item.nodes.forEach(function(node) {
                    _toIttfNodeDeep(node, 0, buffer);
                })
            }
        }
    }
    else {
        if (node && node.children) {
            _toIttfNodeDeep(node, 0, buffer);
        }
        else {
            node.nodes.forEach(function(node) {
                _toIttfNodeDeep(node, 0, buffer);
            })
        }
    }
    return buffer.join('\n');
}
function _toIttfNodeDeep(node, indent, buffer) {
    if (node.name) {
        buffer.push(spaces(indent * 4) + node.name + ' ' + (node.value || ''))
    }
    else {
        buffer.push(spaces(indent * 4) + node.n + ' ' + (node.v || ''))
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _toIttfNodeDeep(child, indent + 1, buffer);
    }
}
function spaces(num) {
    return Array(num + 1).join(" ")
    ;
}
function wrapperForSchema(schema) {
    if (schema === 'js' || schema === 'jsx') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                     }
                ]
             };
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
             };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
             };
    }
}
var schemaArtifactMap = {
    js: 'js/module', 
    jsx: 'js/module', 
    ts: 'ts/module', 
    html: 'html/document', 
    css: 'css/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    vtt: 'vtt/document', 
    md: 'md/document', 
    vue: 'vue/document', 
    graphql: 'graphql/document', 
    json: 'json/document', 
    yaml: 'yaml/document', 
    ittf: 'ittf/document', 
    xml: 'xml/document', 
    text: 'text/document'
 };
function artifactNameFromSchema(schema) {
    // loog 'artifactNameFromSchema', schema, schemaArtifactMap[schema]
    return schemaArtifactMap[schema];
}
var schemaIttfRootMap = {
    js: 'module', 
    jsx: 'module', 
    html: 'html', 
    css: 'css', 
    scss: 'scss', 
    svg: 'svg', 
    md: 'md', 
    vtt: 'vtt', 
    vue: 'vue', 
    graphql: 'graphql', 
    json: '{', 
    yaml: 'yaml', 
    ittf: 'any', 
    text: 'text', 
    xml: 'xml'
 };
function ittfRootFromSchema(schema) {
    // loog 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}

var md = module.exports = {};
var myname = 'wizzi.plugin.ittf.ittf.cheatsheet.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    try {
        // loog 'Starting transform ittf/cheatsheet'
        var workObj = {
            elements: [
                
            ], 
            _all_items: [
                
            ]
         };
        loadCheats(model, workObj)
        console.log('main.loadCheats.done', __filename);
        generateArtifacts(ctx, workObj, (err, result) => {
        
            if (err) {
                return callback(err);
            }
            console.log('main.generateArtifacts.result', result, __filename);
            callback(null, result)
        }
        )
    } 
    catch (ex) {
        return callback(ex);
    } 
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
            method: 'wizzi.plugin.ittf/lib/artifacts/ittf/cheatsheet/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj)
    }
}
var functors = {};
