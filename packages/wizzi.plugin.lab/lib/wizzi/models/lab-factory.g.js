/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.wzschema\lib\artifacts\wzschema\factory\gen\ittf\wfschema-factory.js.ittf
    utc time: Fri, 30 Aug 2024 16:41:06 GMT
*/
/**
     lab WizziModelFactory
*/
var path = require('path');
var util = require('util');
var _ = require('lodash');

var stringify = require('json-stringify-safe');
var labmTreePreProcessor = require('./lab-mtree-preprocessor.g');

var labschema = require('./lab-model.g');

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
            labmodel;
        if (mTree.nodes.length == 0) {
            var labmodel = new labmodelType('EmptyIttfDocument');
        }
        // Get the model type of the root node of the ittf model.
        // Load the WizziModel from the root node of the mTree
        else {
            var rootNode = mTree.nodes[0];
            var labmodelType = labschema[rootNode.n];
            if (!labmodelType) {
                var maptag = labschema.__tagElementMapping[rootNode.n];
                if (typeof maptag === 'string') {
                    labmodelType = labschema[maptag];
                }
                if (!labmodelType) {
                    var error = new errors.WizziModelLoadError('In lab Factory. Cannot map root node: ' + rootNode.n + ', to any entity of schema: lab', ittfDocumentUri);
                    return callback(error);
                }
            }
            labmodel = new labmodelType(rootNode.v);
            labmodel.loadHistory = mTree.loadHistory;
            labmodel.wzFactory = options.wizziFactory;
            try {
                // this is a sync call
                labmodel.loadFromNode(rootNode);
            } 
            catch (ex) {
                var error = new errors.WizziModelLoadError(ex.message + '\nIn lab Factory, calling loadFromNode.', ittfDocumentUri, ex);
                // TODO review errors.WizziModelLoadError
                error.stack = ex.stack;
                return callback(error);
            } 
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Loaded ittfDocument ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        // TODO Implement an initialize strategy to be declared in the wizzischema
        // Initialize and verify the loaded model
        var ctx = new labschema.labContext();
        labmodel.wzInitialize(ctx);
        labmodel.wzVerify(ctx);
        if (ctx.schemaIsValid() === false) {
            var errorsMessage = ctx.validationErrors.join('\n');
            var error = new errors.WizziModelLoadError('In lab Factory.\nWizziModel has validation errors: \n' + errorsMessage, ittfDocumentUri);
            callback(error);
        }
        // TODO implement a stats object inside the wizziModelRequest object
        // _ log.info('Initialized wmt model ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
        
        // dump for debug
        if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModel) && labmodel.toJson && file.isFilePath(ittfDocumentUri)) {
            var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.json');
            file.write(mTreeDump, stringify(labmodel.toJson(), null, 2));
        }
        // TODO Generate this wzInitializeAsync call only if wizziModelRequested by the wizzischema
        labmodel.wzInitializeAsync(ctx, function(err, result) {
            if (err) {
                return callback(err, null);
            }
            
            // dump for debug
            if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpModelAfterInitializeAsync) && labmodel.toJson && file.isFilePath(ittfDocumentUri)) {
                var mTreeDump = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.dump.after.initializeasync.json');
                file.write(mTreeDump, stringify(labmodel.toJson(), null, 2));
            }
            callback(null, labmodel);
        })
    }
    
    /**
        * Load a WizziModel of type 'lab' from an mTree
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
        // Load a WizziModel of type 'lab' from an IttfDocument uri
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
                    // _ log.info('Loaded Wizzi model instance of schema lab from Ittf document ' + ittfDocumentUri + ' in ' + (Date.now() - start) + ' ms')
                    if ((wizziModelRequest.dumpAll || wizziModelRequest.dumpIttfModel) && file.isFilePath(ittfDocumentUri)) {
                        var ittfDumpPath = path.join(path.dirname(ittfDocumentUri), '_debug', path.basename(ittfDocumentUri) + '.ittf.json');
                        file.write(ittfDumpPath, stringify(mTree, null, 2))
                    }
                    mTree = labmTreePreProcessor(mTree, loadContext)
                    ;
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