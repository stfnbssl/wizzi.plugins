/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docx\.wizzi-override\examples\docx_document.js.ittf
    utc time: Thu, 18 May 2023 08:21:20 GMT
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
const spawn = require("child_process").spawn;
function executeExample() {
    let arg = process.argv[2];
    const moduleName = arg && arg.length > 0 ? arg : 'first';
    executeGenerateModules([
        moduleName
    ], (err, result) => {
    
        if (err) {
            console.log("[31m%s[0m", 'docx/document.examples.executeGenerateModules.err', err);
            console.log("[31m%s[0m", 'docx/document.examples.executeGenerateModules.err.toString()', err.toString());
            if (err.inner) {
                console.log("[31m%s[0m", 'docx/document.examples.executeGenerateModules.err.inner.toString()', err.inner.toString());
            }
        }
        else {
        }
    }
    )
    function executeGenerateModules(modules, callback) {
        async.mapSeries(modules, (module, callback) => {
        
            var ittfDocumentUri = path.join(__dirname, 'ittf', module + '.docx.ittf');
            var outputPath = path.join(__dirname, 'results', 'docx', module + '-document.g.docx');
            loadModelAndGenerateArtifact(ittfDocumentUri, {}, 'docx/document', (err, artifactText) => {
            
                if (err) {
                    return callback(err);
                }
                file.write(outputPath, artifactText)
                const docxProcess = spawn('node', [
                    outputPath
                ]);
                if (docxProcess.stdout) {
                    docxProcess.stdout.on('data', function(data) {
                        printValue('c stdout', data.toString(), 'dashes')
                    })
                }
                if (docxProcess.stderr) {
                    docxProcess.stderr.on('data', function(data) {
                        printValue('c stderr', data.toString(), 'dashes')
                    })
                }
                docxProcess.on('message', function(message) {
                    console.log(`child process message`, message);
                })
                docxProcess.on('error', function(err) {
                    console.log(`child process error`, err);
                })
                docxProcess.on('exit', function(code) {
                })
                return callback(null, artifactText);
            }
            )
        }
        , callback)
    }
    function heading1(text) {
        console.log('');
        console.log('*'.repeat(120));
        console.log('** level 1 - step 1 - docx - ' + text);
        console.log('*'.repeat(120));
        console.log('');
    }
    function heading2(text) {
        console.log('');
        console.log('   ', '-'.repeat(100));
        console.log('   ','-- docx - ' + text);
        console.log('   ', '-'.repeat(100));
        console.log('');
    }
    function printArray(name, arr, fields, format) {
        if (format === 'dashes') {
            console.log('   ', '-'.repeat(100));
        }
        console.log('   ', '* array ' + name + ' : ');
        var i, i_items=arr, i_len=arr.length, item;
        for (i=0; i<i_len; i++) {
            item = arr[i];
            console.log('    {', i);
            var keys = fields || Object.keys(item);
            var j, j_items=keys, j_len=keys.length, k;
            for (j=0; j<j_len; j++) {
                k = keys[j];
                printValue(k, item[k])
            }
        }
    }
    function printValue(key, value, format, p1) {
        if (format === 'dashes' || format === 'meter') {
            console.log('   ', '-'.repeat(100));
        }
        if (format === 'json') {
            value = stringify(value, null, 4)
            ;
        }
        if (verify.isNotEmpty(value)) {
            var lines = verify.splitLines(value, {
                numbered: true
             });
            if (lines.length === 1) {
                console.log('   ', key, ':', lines[0].text);
            }
            else {
                for (var i=0; i<lines.length; i++) {
                    if (i === 0) {
                        console.log('   ', key, ':', lines[0].numFmt, lines[0].text);
                    }
                    else {
                        console.log('   ', spaces(key.length+1), ' ', lines[i].numFmt, lines[i].text);
                    }
                }
            }
        }
        else if (verify.isObject(value)) {
            console.log('   ', key, ':', inspect(value));
        }
        else {
            console.log('   ', key, ':', value);
        }
        if (format === 'meter') {
            meterLine(p1, '     ' + new Array(1 + key.length).join(' '));
        }
    }
    function spaces(len) {
        return new Array(len).join(' ');
    }
    function meterLine(len, indent) {
        var sb = [];
        var numW = len < 10 ? 1 : ( len < 100 ? 2 : 3 );
        var x;
        for (var i=0; i<numW; i++) {
            for (var j=0; j<len; j++) {
                x = formatNum(j, numW);
                sb.push(x.substr(i,1));
            }
            console.log(indent, sb.join(''));
            sb = [];
        }
    }
    function formatNum(num, len) {
        var x = num.toString();
        return new Array(1 + len-x.length).join(' ') + x;
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
                './index.js'
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
            wizzi.printWizziJobError('docx', err);
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
