/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.text\.wizzi-override\lib\wizzi\models\text-factory.g.js.ittf
    utc time: Mon, 06 May 2024 14:25:45 GMT
*/
'use strict';
var verify = require('@wizzi/utils').verify;
/**
     Pseudo schema text
*/
var path = require('path');
var util = require('util');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;

var textmodel = require('./text-model.g');

var md = module.exports = {};

// called from the wizzi.wizziFactory.getLoadModel method
/**
    params
        { wizziObject
            func loadMTree
             api-ref wizzi-mtree.loader.loadMTree
            { file
             api-ref wizzi-utils.file
            { errors
             type WizziModelLoadError
*/
md.createLoadModel = function(wizziObject) {
    if (verify.isObject(wizziObject) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject', message: 'The wizziObject parameter must be an object. Received: ' + wizziObject }
        );
    }
    if (verify.isFunction(wizziObject.loadMTree) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject.loadMTree', message: 'The wizziObject.loadMTree parameter must be a function. Received: ' + wizziObject.loadMTree }
        );
    }
    if (verify.isObject(wizziObject.file) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject.file', message: 'The wizziObject.file parameter must be an object. Received: ' + wizziObject.file }
        );
    }
    if (verify.isObject(wizziObject.errors) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'wizziObject.errors', message: 'The wizziObject.errors parameter must be an object. Received: ' + wizziObject.errors }
        );
    }
    var options = wizziObject.options || {};
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var errors = wizziObject.errors;
    var wizziFactory = wizziObject.wizziFactory;
    function loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, options, callback) {
        // loog 'wizzi.plugin.json.lib.wizzi.models.text-factory.g, loaded from mTree'
        textmodel(mTree, ittfDocumentUri, wizziModelRequest, callback);
    }
    
    // Load a WizziModel of type 'text' from an mTree
    if (options.loadFromMTree) {
        return function(mTree, wizziModelRequest, callback) {
                if (verify.isFunction(callback) !== true) {
                    callback = wizziModelRequest;
                    wizziModelRequest = {};
                }
                if (verify.isFunction(callback) !== true) {
                    throw new TypeError('callback must be a function');
                }
                if (verify.isObject(mTree) !== true) {
                    return callback(error('InvalidArgument', 'mTree', 'The mTree parameter must be an object'));
                }
                loadModelFromMTree(mTree, 'Unavailable (loaded from mTree)', wizziModelRequest || {}, {
                    wizziFactory: wizziFactory
                 }, callback)
            };
    }
    /**
        // Load a WizziModel of type text from an IttfDocument uri
        // params
            // string ittfDocumentUri
            // { requestContext
                // { __productionManager
                    // { productionContext
                        // { aclstat
                // { __ittfDocumentStore
                // { mTreeBuildUpContext
                    // optional
                // { __request
                    // This is a legacy that should disappear.
                    // See the wizzi.production.productionContext class.
                    // boolean dumpAll
                    // boolean dumpIttfModel
                    // boolean dumpModel
                    // boolean dumpModelAfterInitializeAsync
            // callback
    */
    else {
        return function loadModel(ittfDocumentUri, requestContext, callback) {
                if (typeof callback !== 'function') {
                    throw new TypeError('callback must be a function');
                }
                if (typeof ittfDocumentUri !== 'string') {
                    return callback(error(999, 'loadModel', 'ittfDocumentUri parameter must be a string, received: ' + typeof(ittfDocumentUri), new Error('inner track')));
                }
                if (verify.isObject(requestContext) !== true) {
                    return callback(error(999, 'loadModel', 'requestContext parameter must be an object', new Error('inner track')));
                }
                if (verify.isObject(requestContext.__productionManager) !== true) {
                    return callback(error(999, 'loadModel', 'requestContext.__productionManager parameter must be an object', new Error('inner track')));
                }
                requestContext.mTreeBuildUpContext = Object.assign({}, requestContext.__productionManager.globalContext(), requestContext.mTreeBuildUpContext)
                ;
                // STOP set context.sourcePreprocessor = preprocessText
                var wizziModelRequest = requestContext.__request || {};
                var start = Date.now();
                // load the magical tree
                loadMTree(ittfDocumentUri, requestContext, function(err, mTree) {
                    if (err) {
                        return callback(err);
                    }
                    // TODO implement a stats object inside the wizziModelRequest object
                    // loog 'Loaded mTree instance for pseudo schema text from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms'
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2))
                    }
                    // loog 'wizzi.plugin.json.lib.wizzi.models.text-factory.g current __dirname', __dirname
                    // loog 'wizzi.plugin.json.lib.wizzi.models.text-factory.g, loaded from ittfDocumentUri: ', ittfDocumentUri, mTree
                    textmodel(mTree, ittfDocumentUri, wizziModelRequest, callback);
                })
            };
    }
}
;
function isCommandNode(line) {
    var state = 0;
    var i, i_items=line, i_len=line.length, ch;
    for (i=0; i<i_len; i++) {
        ch = line[i];
        if (state == 1) {
            if (ch == ' ' || ch == '\t') {
                return false;
            }
            if (ch == '(') {
                return true;
            }
        }
        else {
            if (ch !== ' ' && ch !== '\t') {
                if (ch == '$') {
                    return true;
                }
                else {
                    state = 1;
                }
            }
        }
    }
    return false;
}
function preprocessText(text) {
    // loog 'wizzi-core.wizzi.models.text-factory.g.preprocessText text: ' + text
    if (!text || text.length == 0) {
        return text;
    }
    var len = text.length,
        ch,
        line = [],
        indent = 0,
        seenNotWs = false;
    var sb = [ 'text' ];
    for (var i = 0; i<len; i++) {
        ch = text[i];
        
        // loog 'wizzi-core.wizzi.models.text-factory.g.preprocessText line[0]', line[0]
        if (ch === '\n' || ch === '\r') {
            if (isCommandNode(line)) {
                sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
            }
            // + Ä
            else {
                sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
            }
            line = [];
            indent = 0;
            seenNotWs = false;
            if (i < len-1) {
                
                // loog 'wizzi-core.wizzi.models.text-factory.g. preprocessText skip'
                if ((ch === '\n' && text[i+1] === '\r') || (ch === '\r' && text[i+1] === '\n')) {
                    i++;
                }
            }
        }
        else {
            if (!seenNotWs) {
                if (ch === ' ') {
                    indent++;
                }
                else if (ch === '\t') {
                    indent += 4;
                }
                else {
                    seenNotWs = true;
                }
            }
            line.push(ch);
        }
    }
    if (isCommandNode(line)) {
        sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
    }
    
    // + Ä
    else if (line.length > 0) {
        sb.push('    ' + line.join('') + (indent > 0 ? ' || ' + indent.toString() : ''))
    }
    // loog 'wizzi-core.wizzi.models.text-factory.g.preprocessText result', sb.join('\n')
    return sb.join('\n');
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi.plugin.json.lib.wizzi.models.text-factory.g.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
