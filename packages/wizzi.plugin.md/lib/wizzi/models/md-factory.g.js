/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\lib\artifacts\wfschema\factory\gen\ittf\wfschema-factory.js.ittf
*/
'use strict';
//
var path = require('path');
var util = require('util');
var _ = require('lodash');

var stringify = require('json-stringify-safe');

var mdschema = require('./md-model.g');

var md = module.exports = {};

//
// called from the wizzi.wizziFactory.getLoadModel method
// params
md.createLoadModel = function(wizziObject) {
    var options = wizziObject.options || {};
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var verify = wizziObject.verify;
    var errors = wizziObject.errors;
    var wizziFactory = wizziObject.wizziFactory;
    function loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, options, callback) {
        
        var start = Date.now(),
            mdmodel;
        if (mTree.nodes.length == 0) {
            var mdmodel = new mdmodelType('EmptyIttfDocument');
        }
        // Get the model type of the root node of the ittf model.
        // Load the WizziModel from the root node of the mTree
        else {
            var rootNode = mTree.nodes[0];
            var mdmodelType = mdschema[rootNode.n];
            if (!mdmodelType) {
                var maptag = mdschema.__tagElementMapping[rootNode.n];
                if (typeof maptag === 'string') {
                    mdmodelType = mdschema[maptag];
                }
                if (!mdmodelType) {
                    var error = new errors.WizziModelLoadError('In md Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: md', ittfDocumentUri);
                    return callback(error);
                }
            }
            mdmodel = new mdmodelType(rootNode.v);
            mdmodel.loadHistory = mTree.loadHistory;
            mdmodel.wzFactory = options.wizziFactory;
            try {
                // this is a sync call
                mdmodel.loadFromNode(rootNode);
            } 
            catch (ex) {
                var error = new errors.WizziModelLoadError(ex.message + '\nIn md Factory, calling loadFromNode.', ittfDocumentUri, ex);
                // TODO review errors.WizziModelLoadError
                error.stack = ex.stack;
                return callback(error);
            } 
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Loaded ittfDocument ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        // TODO Implement an initialize strategy to be declared in the wizzischema
        // Initialize and verify the loaded model
        var ctx = new mdschema.mdContext();
        mdmodel.wzInitialize(ctx);
        mdmodel.wzVerify(ctx);
        if (ctx.schemaIsValid() === false) {
            var errorsMessage = ctx.validationErrors.join('\n');
            var error = new errors.WizziModelLoadError('In md Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
            callback(error);
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        
        // dump for debug
        if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModel) && mdmodel.toJson && file.isFilePath(ittfDocumentUri)) {
            var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
            file.write(mTreeDump, stringify(mdmodel.toJson(), null, 2));
        }
        // TODO Generate this wzInitializeAsync call only if wizziModelRequested by the wizzischema
        mdmodel.wzInitializeAsync(ctx, function(err, result) {
            if (err) {
                return callback(err, null);
            }
            
            // dump for debug
            if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModelAfterInitializeAsync) && mdmodel.toJson && file.isFilePath(ittfDocumentUri)) {
                var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
                file.write(mTreeDump, stringify(mdmodel.toJson(), null, 2));
            }
            callback(null, mdmodel);
        })
    }
    
    /**
        * Load a WizziModel of type 'md' from an mTree
    */
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
        // Load a WizziModel of type 'md' from an IttfDocument uri
        // params
            // string ittfDocumentUri
            // { loadContext
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
        return function loadModel(ittfDocumentUri, loadContext, callback) {
                if (typeof callback !== 'function') {
                    throw new TypeError('callback must be a function');
                }
                if (typeof ittfDocumentUri !== 'string') {
                    return callback(error('InvalidArgument', 'loadModel', 'The ittfDocumentUri parameter must be a string'));
                }
                if (verify.isObject(loadContext) !== true) {
                    return callback(error('InvalidArgument', 'loadModel', 'The loadContext parameter must be an object'));
                }
                if (verify.isObject(loadContext.__productionManager) !== true) {
                    return callback(error('InvalidArgument', 'loadModel', 'The loadContext.__productionManager parameter must be an object'));
                }
                loadContext.mTreeBuildUpContext = Object.assign({}, loadContext.__productionManager.globalContext(), loadContext.mTreeBuildUpContext)
                ;
                var wizziModelRequest = loadContext.__request || {};
                var start = Date.now();
                // load the magical tree
                loadMTree(ittfDocumentUri, loadContext, function(err, mTree) {
                    if (err) {
                        return callback(err);
                    }
                    // TODO implement a stats object inside the wizziModelRequest object
                    // _ log.info('Loaded Wizzi model instance of schema md from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2))
                    }
                    loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, {
                        wizziFactory: wizziFactory
                     }, callback)
                })
            };
    }
}
;
function error(code, method, message) {
    return {
            __is_error_: true, 
            code: code, 
            method: method, 
            message: message, 
            source: __filename
         };
}

