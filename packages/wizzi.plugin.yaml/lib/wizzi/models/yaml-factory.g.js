/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.yaml\.wizzi-override\lib\wizzi\models\yaml-factory.g.js.ittf
    utc time: Tue, 02 Apr 2024 09:37:40 GMT
*/
'use strict';
var verify = require('@wizzi/utils').verify;
/**
     Pseudo schema yaml
*/
var path = require('path');
var util = require('util');
var stringify = require('json-stringify-safe');
var verify = require('@wizzi/utils').verify;

var yamlmodel = require('./yaml-model.g');

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
            { wizziFactory
             type wizzi.WizziFactory
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
        // loog 'wizzi-core.wizzi.models.yaml-factory.g, loaded from mTree'
        yamlmodel(mTree, ittfDocumentUri, wizziModelRequest, callback);
    }
    
    // Load a WizziModel of type 'yaml' from an mTree
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
        // Load a WizziModel of type yaml from an IttfDocument uri
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
                var wizziModelRequest = requestContext.__request || {};
                var start = Date.now();
                // load the magical tree
                loadMTree(ittfDocumentUri, requestContext, function(err, mTree) {
                    if (err) {
                        return callback(err);
                    }
                    // TODO implement a stats object inside the wizziModelRequest object
                    // loog 'Loaded mTree instance for pseudo schema yaml from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms'
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2))
                    }
                    // loog 'wizzi-core.wizzi.models.yaml-factory.g current __dirname', __dirname
                    // loog 'wizzi-core.wizzi.models.yaml-factory.g, loaded from ittfDocumentUri: ', ittfDocumentUri, mTree
                    yamlmodel(mTree, ittfDocumentUri, wizziModelRequest, callback);
                })
            };
    }
}
;
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
        method: 'wizzi-core.lib.wizzi.models.yaml-factory.g.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
