/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ittf\.wizzi-override\examples\ittf_extended.js.ittf
    utc time: Thu, 21 Mar 2024 16:05:35 GMT
*/
'use strict';
var path = require('path');
var fs = require('fs');
var async = require('async');
var wizzi = null;
var wizziUtils = require('@wizzi/utils');
var mtree = require('@wizzi/mtree');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var errors = wizziUtils.exampleErrors;
var stringify = require('json-stringify-safe');
var packageIndex = require('../index.js');
function executeExample() {
    
    let arg = process.argv[2];
    const moduleName = arg && arg.length > 0 ? arg : 'first';
    getWzCtx(path.resolve(__dirname, '..', '.wizzi-override', 'models'), (err, wzCtx) => {
    
        if (err) {
            console.log("[31m%s[0m", err);
            return ;
        }
        executeGenerateModules([
            moduleName
        ], (err, result) => {
        
            if (err) {
                console.log("[31m%s[0m", 'ittf.examples.executeGenerateModules.err', err);
                console.log("[31m%s[0m", 'ittf.examples.executeGenerateModules.err.toString()', err.toString());
                if (err.inner) {
                    console.log("[31m%s[0m", 'ittf.examples.executeGenerateModules.err.inner.toString()', err.inner.toString());
                }
            }
            else {
            }
        }
        )
    }
    )
    function executeGenerateModules(modules, callback) {
        async.mapSeries(modules, (module, callback) => {
        
            var ittfDocumentUri = path.join(__dirname, 'ittf', module + '.ittf.ittf');
            var outputLoadedPath = path.join(__dirname, 'results', module + '.ittf.json');
            var outputExtendedPath = path.join(__dirname, 'results', module + '.ittf.extended.json');
            loadWizziModel(ittfDocumentUri, {}, (err, model) => {
            
                if (err) {
                    return callback(err);
                }
                if (model.toJson && verify.isFunction(model.toJson)) {
                    file.write(outputLoadedPath, stringify(model.toJson(), null, 4))
                }
                loadModelAndTransform(ittfDocumentUri, {}, "ittf/extended", (err, model) => {
                
                    if (err) {
                        return callback(err);
                    }
                    file.write(outputExtendedPath, stringify(model, null, 4))
                    return callback(null);
                }
                )
            }
            )
        }
        , callback)
    }
}
function createPluginFactory(callback) {
    return packageIndex.createFactoryPlugin({
            file: file
         }, {}, callback);
}
function createWizziFactory(globalContext, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    
    // The wizzi package will be the npm version from wizzi/node_modules
    if (wizzi == null) {
        wizzi = require('@wizzi/factory');
    }
    
    console.log('"wizzi" package version', wizzi.version);
    
    if (plugins) {
        wizzi.fsFactory({
            plugins: plugins, 
            globalContext: globalContext || {}
         }, callback)
    }
    else {
        wizzi.fsFactory({
            plugins: {
                items: [
                    './wizzi.plugin.ittf/index.js', 
                    './wizzi.plugin.json/index.js'
                ], 
                pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages"
             }, 
            globalContext: globalContext || {}
         }, callback)
    }
}

function loadMTree(ittfDocumentUri, context, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadMTree(ittfDocumentUri, context, callback)
    }
    )
}
function loadMTreeBuildUpScript(ittfDocumentUri, context, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadMTreeBuildUpScript(ittfDocumentUri, context, callback)
    }
    )
}
function loadWizziModel(ittfDocumentUri, context, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadModel(fi.schema, ittfDocumentUri, {
            mTreeBuildUpContext: context, 
            globalContext: {}
         }, callback)
    }
    )
}
function loadWizziModelAndSaveToJson(ittfDocumentUri, context, outputFolder, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    var fi = fileInfoByPath(ittfDocumentUri);
    loadWizziModel(ittfDocumentUri, context, plugins, (err, model) => {
    
        if (err) {
            return callback(err);
        }
        file.write(path.join(outputFolder, fi.basename + '.json'), stringify(model.toJson(), null, 4))
        return callback(null);
    }
    )
}
function loadModelAndGenerateArtifact(ittfDocumentUri, context, artifactName, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
            modelRequestContext: context, 
            artifactRequestContext: {}
         }, artifactName, callback)
    }
    )
}
function loadModelAndGenerateArtifactFromText(ittfContent, context, artifactName, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifactFromText(ittfContent, {
            modelRequestContext: context, 
            artifactRequestContext: {}
         }, artifactName, callback)
    }
    )
}
function loadModelAndTransform(ittfDocumentUri, context, transformName, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        loadWizziModel(ittfDocumentUri, context, (err, model) => {
        
            if (err) {
                return callback(err);
            }
            wf.transformModel(model, transformName, context, callback)
        }
        )
    }
    )
}
function executeWizziJob(ittfDocumentUri, context, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    createWizziFactory({}, options, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.executeJob({
            name: path.basename(ittfDocumentUri), 
            path: ittfDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
             }), 
            modelContext: context || {}, 
            jobContext: {}
         }, callback)
    }
    )
}
function executegenerateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, plugins, callback) {
    
    if (!callback) {
        callback = plugins;
        plugins = null;
    }
    
    createWizziFactory({}, plugins, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.generateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback)
    }
    )
}
function getIttfFilesBySchema(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
        
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        }
        )
    ;
}
function fileInfoByPath(filePath, baseFolder) {
    if (typeof baseFolder === 'undefined') {
        baseFolder = path.dirname(filePath);
    }
    filePath = normalize(filePath);
    var basename = path.basename(filePath);
    var dirname = path.dirname(filePath);
    var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr();
    var ss = basename.split('.');
    if (ss[ss.length-1] === 'ittf') {
        var name = ss.slice(0, ss.length-2).join('.');
        var schema = ss[ss.length-2];
        var mime = DEFAULT_MIME[schema] || schema;
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: true, 
                isFragment: filePath.indexOf('/t/') > -1, 
                schema: schema, 
                mime: mime, 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: name + '.' + mime, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + name + '.' + mime : name + '.' + mime
             };
    }
    else {
        return {
                name: ss.slice(0, ss.length-1).join('.'), 
                basename: basename, 
                isIttfDocument: false, 
                schema: null, 
                mime: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: basename, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + basename : basename
             };
    }
}
var DEFAULT_MIME = {
    css: 'css', 
    graphql: 'graphql', 
    html: 'html', 
    ittf: 'ittf', 
    js: 'js', 
    json: 'json', 
    md: 'md', 
    scss: 'scss', 
    text: 'text', 
    ts: 'ts', 
    vtt: 'vtt', 
    vue: 'vue', 
    xml: 'xml', 
    yaml: 'yaml'
 };

function getWzCtx(folderpath, callback) {
    loadWizziModel(path.join(folderpath, 'wzctx.json.ittf'), {}, (err, model) => {
    
        if (err) {
            return callback(err);
        }
        return callback(null, model);
    }
    )
}

function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}

module.exports = executeExample;

if (require.main === module) {
    executeExample();
}
