/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\artifacts\md\tohtml\gen\main.js.ittf
    utc time: Thu, 18 Apr 2024 16:31:10 GMT
*/
'use strict';


var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('@wizzi/utils').helpers.lineParser;
var errors = require('../../../../../errors');
const wizzi = require('@wizzi/factory');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
var marked = require('marked');

var myname = 'wizzi.plugin.md.artifacts.md.tohtml.gen.main';

var md = module.exports = {};


md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'md') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "md". Received: ' + model.wzElement, model));
    }
    try {
        console.log('=====================> generateCssDocument', __filename);
        generateCssDocument(model, (err, cssArtifactText) => {
        
            if (err) {
                return callback(err);
            }
            console.log('=====================> generateMdDocument', __filename);
            generateMdDocument(model, (err, mdArtifactText) => {
            
                if (err) {
                    return callback(err);
                }
                try {
                    const window = new JSDOM('').window;
                    const DOMPurify = createDOMPurify(window);
                    const clean = DOMPurify.sanitize(marked.parse(mdArtifactText));
                    ctx.w(generateHtml(cssArtifactText, clean))
                    return callback(null, ctx);
                } 
                catch (ex) {
                    callback(ex)
                } 
            }
            )
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
            method: 'wizzi.plugin.md/lib/artifacts/md/tohtml/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function generateHtml(css, body) {
    var sb = [];
    sb.push('<html>');
    sb.push('<head>');
    sb.push('<style>');
    sb.push(css);
    sb.push('</style>');
    sb.push('</head>');
    sb.push('<body>');
    sb.push(body);
    sb.push('</body>');
    sb.push('</html>');
    return sb.join('\n');
}
function createWizziFactory(callback) {
    wizzi.fsFactory({
        plugins: {
            items: [
                './wizzi.plugin.md/index', 
                './wizzi.plugin.html/index', 
                './wizzi.plugin.css/index', 
                './wizzi.plugin.svg/index'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', '..', '..', '..', '..')
         }
     }, callback)
}
function generateMdDocument(model, callback) {
    var artifactRequestContext = {};
    createWizziFactory((err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.generateArtifact(model, 'from artifact md/tohtml', 'md/document', artifactRequestContext, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'md/tohtml.artifactText', artifactText
            return callback(null, artifactText);
        }
        )
    }
    )
}
function generateCssDocument(model, callback) {
    var artifactRequestContext = {};
    createWizziFactory((err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.generateArtifact(model, 'from artifact md/tohtml', 'md/tocss', artifactRequestContext, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'md/tocss.artifactText', artifactText
            return callback(null, artifactText);
        }
        )
    }
    )
}
