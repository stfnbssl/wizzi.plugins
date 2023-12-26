/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.svg\.wizzi-override\examples\svg_document.js.ittf
    utc time: Thu, 27 Jul 2023 15:14:34 GMT
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
function executeExample() {
    let arg = process.argv[2];
    const moduleName = arg && arg.length > 0 ? arg : 'first';
    executeGenerateModules([
        moduleName
    ], (err, result) => {
    
        if (err) {
            console.log("[31m%s[0m", 'svg.examples.executeGenerateModules.err', err);
            console.log("[31m%s[0m", 'svg.examples.executeGenerateModules.err.toString()', err.toString());
            if (err.inner) {
                console.log("[31m%s[0m", 'svg.examples.executeGenerateModules.err.inner.toString()', err.inner.toString());
            }
        }
        else {
        }
    }
    )
    function executeGenerateModules(modules, callback) {
        async.mapSeries(modules, (module, callback) => {
        
            console.log('svg.example.executeGenerateModules.module: ' + module, __filename);
            var ittfDocumentUri = path.join(__dirname, 'ittf', module + '.svg.ittf');
            var outputPath = path.join(__dirname, 'results', module + '.svg.document.html');
            loadWizziModel(ittfDocumentUri, {}, (err, wizziModel) => {
            
                if (err) {
                    return callback(err);
                }
                if (wizziModel.toJson) {
                    file.write(outputPath + '.json', stringify(wizziModel.toJson(), null, 4))
                }
                loadModelAndGenerateArtifact(ittfDocumentUri, {}, 'svg/document', (err, artifactText) => {
                
                    if (err) {
                        return callback(err);
                    }
                    console.log('svg.example.executeGenerateModules.outputPath: ' + outputPath, __filename);
                    file.write(outputPath, artifactText)
                    return callback(null, artifactText);
                }
                )
            }
            )
        }
        , callback)
    }
}
function createWizziFactory(globalContext, callback) {
    
    // The wizzi package will be the npm version from wizzi/node_modules
    if (wizzi == null) {
        wizzi = require('@wizzi/factory');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsFactory({
        plugins: {
            items: [
                './index.js', 
                '@wizzi/plugin.js'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..')
         }, 
        globalContext: globalContext || {}
     }, callback)
}
function loadMTree(ittfDocumentUri, context, callback) {
    createWizziFactory({}, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadMTree(ittfDocumentUri, context, callback)
    }
    )
}
function loadMTreeBuildupScript(ittfDocumentUri, context, callback) {
    createWizziFactory({}, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadMTreeBuildupScript(ittfDocumentUri, context, callback)
    }
    )
}
function loadWizziModel(ittfDocumentUri, context, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadModel(fi.schema, ittfDocumentUri, {
            mTreeBuildupContext: context, 
            globalContext: {}
         }, callback)
    }
    )
}
function loadWizziModelAndSaveToJson(ittfDocumentUri, context, outputFolder, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    loadWizziModel(ittfDocumentUri, context, (err, model) => {
    
        if (err) {
            return callback(err);
        }
        file.write(path.join(outputFolder, fi.basename + '.json'), stringify(model.toJson(), null, 4))
        return callback(null);
    }
    )
}
function loadModelAndGenerateArtifact(ittfDocumentUri, context, artifactName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, (err, wf) => {
    
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
function loadModelAndGenerateArtifactFromText(ittfContent, context, artifactName, callback) {
    createWizziFactory({}, (err, wf) => {
    
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
function loadModelAndTransform(ittfDocumentUri, context, transformName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, (err, wf) => {
    
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
function executeWizziJob(ittfDocumentUri, context, callback) {
    createWizziFactory({}, (err, wf) => {
    
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
function executeWizziJob_2(wfjobDocumentUri, options) {
    options = options || {};
    options.plugins = options.plugins || [];
    options.globalContext = options.globalContext || {};
    var jobPlugins = [
        'wizzi-core', 
        'wizzi-meta', 
        'wizzi-js', 
        'wizzi-web'
    ];
    var i, i_items=options.plugins, i_len=options.plugins.length, item;
    for (i=0; i<i_len; i++) {
        item = options.plugins[i];
        jobPlugins.push(item);
    }
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    wizzi.executeWizziJob({
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: 'c:/my/wizzi/v5', 
            plugins: jobPlugins
         }, 
        job: {
            name: 'example ' + wfjobDocumentUri, 
            ittfDocumentUri: wfjobDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
             }), 
            globalContext: options.globalContext
         }
     }, function(err) {
        if (err) {
            wizzi.printWizziJobError('svg', err);
        }
    })
}
function executegenerateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildupContext, callback) {
    createWizziFactory({}, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.generateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildupContext, callback)
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
function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}
