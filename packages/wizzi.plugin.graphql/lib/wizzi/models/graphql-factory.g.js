/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-legacy-v5\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\lib\artifacts\wfschema\factory\gen\ittf\wfschema-factory.js.ittf
    utc time: Mon, 27 Mar 2023 18:06:59 GMT
*/
'use strict';
/**
     graphql WizziModelFactory
*/
var path = require('path');
var util = require('util');
var _ = require('lodash');
var stringify = require('json-stringify-safe');
var graphqlmTreePreProcessor = require('./graphql-mtree-preprocessor.g');
var graphqlschema = require('./graphql-model.g');
var md = module.exports = {};
//
// called from the wizzi.wizziFactory.getLoadModel method
/**
    params
        { wizziObject
            func loadMTree
             api-ref wizzi-mtree.loader.loadMTree
            { file
             api-ref wizzi-utils.file
            { verify
             api-ref wizzi-utils.verify
            { errors
             type WizziModelLoadError
            { wizziFactory
             api-ref wizzi.wizziFactory
*/
md.createLoadModel = function(wizziObject) {
    var options = wizziObject.options || {};
    var loadMTree = wizziObject.loadMTree;
    var file = wizziObject.file;
    var verify = wizziObject.verify;
    var errors = wizziObject.errors;
    var wizziFactory = wizziObject.wizziFactory;
    function loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, options, callback) {
        var start = Date.now(),
            graphqlmodel;
        if (mTree.nodes.length == 0) {
            var graphqlmodel = new graphqlmodelType('EmptyIttfDocument');
        }
        else {
            // Get the model type of the root node of the ittf model.
            var rootNode = mTree.nodes[0];
            var graphqlmodelType = graphqlschema[rootNode.n];
            if (!graphqlmodelType) {
                var maptag = graphqlschema.__tagElementMapping[rootNode.n];
                if (typeof maptag === 'string') {
                    graphqlmodelType = graphqlschema[maptag];
                }
                if (!graphqlmodelType) {
                    var error = new errors.WizziModelLoadError('In graphql Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: graphql', ittfDocumentUri);
                    return callback(error);
                }
            }
            // Load the WizziModel from the root node of the mTree
            graphqlmodel = new graphqlmodelType(rootNode.v);
            graphqlmodel.loadHistory = mTree.loadHistory;
            graphqlmodel.wzFactory = options.wizziFactory;
            try {
                // this is a sync call
                graphqlmodel.loadFromNode(rootNode);
            } 
            catch (ex) {
                var error = new errors.WizziModelLoadError(ex.message + '\nIn graphql Factory, calling loadFromNode.', ittfDocumentUri, ex);
                // TODO review errors.WizziModelLoadError
                error.stack = ex.stack;
                return callback(error);
            } 
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Loaded ittfDocument ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        // TODO Implement an initialize strategy to be declared in the wizzischema
        // Initialize and verify the loaded model
        var ctx = new graphqlschema.graphqlContext();
        graphqlmodel.wzInitialize(ctx);
        graphqlmodel.wzVerify(ctx);
        if (ctx.schemaIsValid() === false) {
            var errorsMessage = ctx.validationErrors.join('\n');
            var error = new errors.WizziModelLoadError('In graphql Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
            callback(error);
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModel) && graphqlmodel.toJson && file.isFilePath(ittfDocumentUri)) {
            // dump for debug
            var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
            file.write(mTreeDump, stringify(graphqlmodel.toJson(), null, 2));
        }
        // TODO Generate this wzInitializeAsync call only if wizziModelRequested by the wizzischema
        graphqlmodel.wzInitializeAsync(ctx, function(err, result) {
            if (err) {
                return callback(err, null);
            }
            if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModelAfterInitializeAsync) && graphqlmodel.toJson && file.isFilePath(ittfDocumentUri)) {
                // dump for debug
                var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
                file.write(mTreeDump, stringify(graphqlmodel.toJson(), null, 2));
            }
            callback(null, graphqlmodel);
        });
    }
    if (options.loadFromMTree) {
        /**
             Load a WizziModel of type 'graphql' from an mTree
        */
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
                }, callback);
            };
    }
    else {
        /**
             Load a WizziModel of type 'graphql' from an IttfDocument uri
                params
                 string ittfDocumentUri
                    { loadContext
                        { __productionManager
                            { productionContext
                             { aclstat
                     { __ittfDocumentStore
                        { mTreeBuildupContext
                         optional
                        { __request
                         This is a legacy that should disappear.
                         See the wizzi.production.productionContext class.
                         boolean dumpAll
                         boolean dumpIttfModel
                         boolean dumpModel
                         boolean dumpModelAfterInitializeAsync
                 callback
        */
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
                loadContext.mTreeBuildupContext = Object.assign({}, loadContext.__productionManager.globalContext(), loadContext.mTreeBuildupContext);
                var wizziModelRequest = loadContext.__request || {};
                var start = Date.now();
                // load the magical tree
                loadMTree(ittfDocumentUri, loadContext, function(err, mTree) {
                    if (err) {
                        return callback(err);
                    }
                    // TODO implement a stats object inside the wizziModelRequest object
                    // _ log.info('Loaded Wizzi model instance of schema graphql from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2));
                    }
                    mTree = graphqlmTreePreProcessor(mTree, loadContext);
                    loadModelFromMTree(mTree, ittfDocumentUri, wizziModelRequest, {
                        wizziFactory: wizziFactory
                    }, callback);
                });
            };
    }
};
function error(code, method, message) {
    return {
            __is_error_: true, 
            code: code, 
            method: method, 
            message: message, 
            source: __filename
        };
}

