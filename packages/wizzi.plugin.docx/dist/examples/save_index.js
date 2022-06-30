/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.plugin.docx\.wizzi\ittf\examples\save_index.js.ittf
    utc time: Fri, 26 Feb 2021 10:58:52 GMT
*/
'use strict';
const H2_Size = 28;
const Big_Size = 24;
const Normal_Size = 24;
const P_spacing_before = 20 * 72 * 0.05;
const P_spacing_before_h2 = 20 * 72 * 0.2;
const P_spacing_after = 20 * 72 * 0.025;
const P_spacing_after_h2 = 20 * 72 * 0.1;
var path = require('path');
var fs = require('fs');
var async = require('async');
var wizzi = null;
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
var errors = wizziUtils.exampleErrors;
var stringify = require('json-stringify-safe');
var wizziTools = require('wizzi-tools');
function executeExample() {
    executeGenerateModules([
        'Tutti a tavola'
    ], function(err, result) {
        if (err) {
            console.log('docx.examples.executeGenerateModules.err', err);
            console.log('docx.examples.executeGenerateModules.err.toString()', err.toString());
            if (err.inner) {
                console.log('docx.examples.executeGenerateModules.err.inner.toString()', err.inner.toString());
            }
        }
        else {
            console.log('docx.examples.executeGenerateModules.result', result);
        }
    })
    function executeGenerateModules(modules, callback) {
        async.mapSeries(modules, (moduleFileName, callback) => {
            var context = file.readJSON(path.join(__dirname, 'ittf', moduleFileName + '.docx.json'));
            context.items.sort(sortItems);
            // log 'context', context
            transformContext(context, function(err, context) {
                if (err) {
                    return callback(err);
                }
                // log 'context', context
                var ittfDocumentUri = path.join(__dirname, 'ittf', moduleFileName + '.docx.ittf');
                var outputPath = path.join(__dirname, 'dist', 'first.docx.js');
                var outputPathJson = path.join(__dirname, 'dist', moduleFileName + '.docx.json');
                var outputPathDebugTxt = path.join(__dirname, 'dist', moduleFileName + '.docx.debug.txt');
                var outputPathBuildUpIttf = path.join(__dirname, 'dist', moduleFileName + '.docx.buildup.ittf');
                file.write(outputPathJson, stringify(context, null, 4))
                var sb = [];
                buildBeginDocxIttf("beba", sb)
                buildIttfLine('hyperlinks', '', 1, sb)
                var i, i_items=context.items, i_len=context.items.length, article;
                for (i=0; i<i_len; i++) {
                    article = context.items[i];
                    buildIttfLine('link-def', 'testo_' + article.NWS_ID, 2, sb)
                    buildIttfLine('link', article.url, 3, sb)
                    buildIttfLine('text', 'Edita sul backend', 3, sb)
                    buildIttfLine('type', 'EXTERNAL', 3, sb)
                }
                buildIttfLine('section', '', 1, sb)
                var i, i_items=context.items, i_len=context.items.length, article;
                for (i=0; i<i_len; i++) {
                    article = context.items[i];
                    buildItemDocxIttf(article, 2, sb)
                }
                var ittfText = sb.join('\n');
                file.write(outputPathBuildUpIttf, ittfText)
                loadModelAndGenerateArtifactFromText(ittfText, {
                    category: context.category
                }, 'docx/document', function(err, artifactText) {
                    if (err) {
                        return callback(err);
                    }
                    file.write(outputPath, artifactText)
                    return callback(null, artifactText);
                })
            })
        }, callback)
    }
    function transformContext(beba, callback) {
        async.mapSeries(beba.items, (item, callback) => {
            var itemTesto = verify.replaceAll(item.Testo, ' />', '&endtag;');
            itemTesto = verify.replaceAll(itemTesto, ' ', '&nbsp;');
            itemTesto = verify.replaceAll(itemTesto, '&endtag;', ' />');
            wizziTools.htmlwizzifier.getWizziIttf(itemTesto, {}, function(err, ittf) {
                if (err) {
                    console.log('err', err);
                    if (err.toString()) {
                        console.log('err.toString()', err.toString());
                    }
                    if (err.inner) {
                        console.log('err.inner', err.inner);
                        if (err.inner.toString) {
                            console.log('err.inner.toString()', err.inner.toString());
                        }
                    }
                    throw new Error(err.message);
                }
                // log 'transformBeba', ittf
                loadModelAndGenerateArtifactFromText(ittf, {}, 'ittf/tojson', (err, artifactText) => {
                    if (err) {
                        return callback(err);
                    }
                    // log 'transformBeba to json', artifactText
                    console.log('transformBeba.item.NWS_FK_TNW_ID', item.NWS_FK_TNW_ID);
                    item.TestoJson = JSON.parse(artifactText);
                    return callback(null, artifactText);
                })
            })
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, beba);
        })
    }
    function sortItems(a, b) {
        var num_a = a.NWS_FK_TNW_ID;
        var num_b = b.NWS_FK_TNW_ID;
        console.log("sortItems", num_a, num_b);
        if (num_a > num_b) {
            return -1;
        }
        else if (num_b > num_a) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function buildBeginDocxIttf(moduleFileName, sb) {
        var beginFromFile = file.read(path.join(__dirname, 'ittf', moduleFileName + '_begin.docx.ittf'));
        var i, i_items=beginFromFile.split('\n'), i_len=beginFromFile.split('\n').length, line;
        for (i=0; i<i_len; i++) {
            line = beginFromFile.split('\n')[i];
            sb.push(line);
        }
    }
    function buildItemDocxIttf(item, indent, sb) {
        buildIttfLine('h2', item.Titolo, indent, sb)
        buildAbstract('dalla ' + item.SettimanaDal + ' alla ' + item.SettimanaAl, item.Abstract, indent, sb)
        var ctx = {
            stack: [
                
            ]
        };
        preprocessTesto(item.TestoJson, ctx)
        buildTestoDocxIttf(item.TestoJson, indent - 1, sb, '', ctx)
        buildPara('', 'h2', indent, sb)
        buildIttfLine('link-ref', 'testo_' + item.NWS_ID, indent + 1, sb)
    }
    function buildTestoDocxIttf(item, indent, sb, prev, ctx) {
        if (item.deleted) {
            return ;
        }
        if (item.name == 'p') {
            buildPara(item.value, 'normal', indent + 1, sb)
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                buildTestoDocxIttf(child, indent + 1, sb, '', ctx)
            }
        }
        else if (item.name == 'h2') {
            console.log('is h2', item.needsParagraph);
            if (item.needsParagraph) {
                buildPara(item.value, 'h2', indent + 1, sb)
                if (item.value && item.value.length > 0) {
                    buildIttfLine('+', item.value, indent + 2, sb)
                    buildInlineStyle('h2', indent + 3, sb)
                }
                else {
                    // TODO exclude that can have a parent not == 'p'
                    var i, i_items=item.children, i_len=item.children.length, child;
                    for (i=0; i<i_len; i++) {
                        child = item.children[i];
                        buildTestoDocxIttf(child, indent, sb, 'h2', ctx)
                    }
                }
            }
            else {
                if (item.value && item.value.length > 0) {
                    buildIttfLine('+', item.value, indent + 1, sb)
                    buildIttfLine('style', (prev && prev.length > 0 ? '_' : '') + 'h2', indent + 2, sb)
                }
                else {
                    var i, i_items=item.children, i_len=item.children.length, child;
                    for (i=0; i<i_len; i++) {
                        child = item.children[i];
                        buildTestoDocxIttf(child, indent, sb, 'h2', ctx)
                    }
                }
            }
        }
        else if (['strong','big'].indexOf(item.name) > -1) {
            if (item.value && item.value.length > 0) {
                buildIttfLine('+', item.value, indent + 1, sb)
                buildInlineStyle((prev && prev.length > 0 ? prev + '_' : '') + item.name, indent + 2, sb)
                if (item.break) {
                    buildIttfLine('br', '', indent + 2, sb)
                }
                if (item.children.length > 0) {
                    ctx.flatten = true;
                    var i, i_items=item.children, i_len=item.children.length, child;
                    for (i=0; i<i_len; i++) {
                        child = item.children[i];
                        buildTestoDocxIttf(child, indent, sb, (prev && prev.length > 0 ? prev + '_' : '') + item.name, ctx)
                    }
                }
            }
            else {
                var i, i_items=item.children, i_len=item.children.length, child;
                for (i=0; i<i_len; i++) {
                    child = item.children[i];
                    buildTestoDocxIttf(child, indent + 1, sb, (prev && prev.length > 0) ? prev + '_' + item.name : item.name, ctx)
                }
            }
        }
        else if (item.name == 'br') {
            // done
        }
        else if (item.name == '+') {
            buildIttfLine('+', item.value, indent + 1, sb)
            if (prev && prev.length > 0) {
                buildInlineStyle(prev, indent + 2, sb)
            }
        }
        else {
            if (item.name != 'html') {
                console.log('+++++++++++++++++++++. Unknown', item.name);
                throw new Error(item.name + '/' + item.value);
            }
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                buildTestoDocxIttf(child, indent, sb, prev, ctx)
            }
        }
    }
    function buildAbstract(text1, text2, indent, sb) {
        buildPara('', 'h2', indent, sb)
        buildIttfLine('border', null, indent + 1, sb)
        buildBorder('top', 'single', 3, 2, null, indent + 2, sb)
        buildBorder('bottom', 'single', 3, 2, null, indent + 2, sb)
        buildIttfLine('+', 'Settimane', indent + 1, sb)
        buildIttfLine('bold', null, indent + 2, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
        buildIttfLine('+', ': ' + text1, indent + 1, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
        buildIttfLine('+', 'Abstract', indent + 1, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
        buildIttfLine('bold', null, indent + 2, sb)
        buildIttfLine('br', null, indent + 2, sb)
        buildIttfLine('+', ': ' + text2, indent + 1, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
    }
    function buildBorder(position, type, size, space, color, indent, sb) {
        buildIttfLine(position, null, indent, sb)
        buildIttfLine('size', size, indent + 1, sb)
        buildIttfLine('value', type, indent + 1, sb)
        buildIttfLine('space', space, indent + 1, sb)
        if (color) {
            buildIttfLine('color', color, indent + 1, sb)
        }
    }
    function buildPara(text, type, indent, sb) {
        buildIttfLine('p', text, indent, sb)
        if (type == 'normal') {
            buildIttfLine('alignment', 'JUSTIFIED', indent + 1, sb)
        }
        buildIttfLine('font', 'Garamond', indent + 1, sb)
        buildIttfLine('spacing', text, indent + 1, sb)
        buildIttfLine('before', type == 'h2' ? P_spacing_before_h2 : P_spacing_before, indent + 2, sb)
        buildIttfLine('after', type == 'h2' ? P_spacing_after_h2 : P_spacing_after, indent + 2, sb)
    }
    function buildInlineStyle(style, indent, sb) {
        buildIttfLine('style', style, indent, sb)
        if (style.indexOf('strong') > -1 || style.indexOf('h2') > -1) {
            buildIttfLine('bold', '', indent, sb)
        }
        if (style.indexOf('h2') > -1) {
            buildIttfLine('size', H2_Size, indent, sb)
        }
        else if (style.indexOf('big') > -1) {
            buildIttfLine('size', Big_Size, indent, sb)
        }
        else {
            buildIttfLine('size', Normal_Size, indent, sb)
        }
    }
    function buildIttfLine(tag, value, indent, sb) {
        sb.push(new Array(1 + indent).join('\t') + tag + (value ? ' ' + value : ''))
    }
    function preprocessTesto(item, ctx) {
        // log 'enter preprocessTesto', item.children.length
        if (item.name == 'h3') {
            item.name = 'h2';
        }
        if (item.name == 'h2') {
            console.log('is h2', 'stack', ctx.stack.join(','));
            if (ctx.stack.indexOf('p') < 0) {
                console.log('setting needsParagraph');
                item.needsParagraph = true;
            }
        }
        ctx.stack.push(item.name);
        item.children.forEach((child, index) => {
            child.parent = item;
            // log 'preprocessTesto', child.name, child.value
            if ((index < item.children.length-1) && item.children[index+1].name == "br") {
                // log '+++++++++++++++ break set on', child.name, child.value
                child.break = true;
                item.children[index+1].deleted = true;
            }
            preprocessTesto(child, ctx)
        })
        ctx.stack.pop();
    }
}
function createWizziFactory(globalContext, callback) {
    if (wizzi == null) {
        var wizzi = require('../../../wizzi/dist/index');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsnoaclFactory({
        plugins: {
            items: [
                './wizzi.plugin.docx/dist/index.js', 
                './wizzi-core/dist/index.js'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', '..')
        }, 
        globalContext: globalContext || {}
    }, callback)
}
function loadMTree(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTree(ittfDocumentUri, context, callback)
    })
}
function loadMTreeDebugInfo(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTreeDebugInfo(ittfDocumentUri, context, callback)
    })
}
function loadWizziModel(ittfDocumentUri, context, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModel(fi.schema, ittfDocumentUri, {
            mTreeBuildUpContext: context, 
            globalContext: {}
        }, callback)
    })
}
function loadWizziModelAndSaveToJson(ittfDocumentUri, context, outputFolder, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    loadWizziModel(ittfDocumentUri, context, function(err, model) {
        if (err) {
            return callback(err);
        }
        file.write(path.join(outputFolder, fi.basename + '.json'), stringify(model.toJson(), null, 4))
        return callback(null);
    })
}
function loadModelAndGenerateArtifact(ittfDocumentUri, context, artifactName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
            modelRequestContext: context, 
            artifactRequestContext: {}
        }, artifactName, callback)
    })
}
function loadModelAndGenerateArtifactFromText(ittfContent, context, artifactName, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifactFromText(ittfContent, {
            modelRequestContext: context, 
            artifactRequestContext: {}
        }, artifactName, callback)
    })
}
function loadModelAndTransform(ittfDocumentUri, context, transformName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        loadWizziModel(ittfDocumentUri, context, function(err, model) {
            if (err) {
                return callback(err);
            }
            wf.transformModel(model, transformName, context, callback)
        })
    })
}
function executeWizziJob(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
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
    })
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
        user: 'stefi', 
        role: 'admin', 
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
function executeGenerateModelTypes(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.generateModelTypes(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback)
    })
}
function getIttfFilesBySchema(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        })
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
