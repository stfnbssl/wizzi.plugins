/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.regexp\.wizzi-override\root\index.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var errors = require('./errors');

var md = module.exports = {};
md.name = 'wizzi.plugin.regexp.index';

// window(s) vars must be declared even if empty
var window_modelFactories = {
    'regexp': require('./lib/wizzi/models/regexp-factory.g')
 };
var window_artifactGenerators = {
    'regexp/document': require('./lib/artifacts/regexp/document/gen/main')
 };
var window_transformers = {
    'regexp/extended': require('./lib/artifacts/regexp/extended/trans/main')
 };
var window_schemaDefinitions = {};

//
class FactoryPlugin {
    constructor(wizziPackage, provides) {
        this.file = wizziPackage.file;
        this.provides = provides;
        this.modelFactories = {};
        this.modelTransformers = {};
        this.artifactGenerators = {};
        this.schemaDefinitions = {};
    }
    
    initialize(options, callback) {
        // TODO
        return callback(null);
    }
    
    getName() {
        return 'wizzi.plugin.regexp';
    }
    
    getFilename() {
        return __filename;
    }
    
    getProvides() {
        return this.provides;
    }
    
    //
    getModelFactory(schemaName) {
        var factory = this.modelFactories[schemaName] || null;
        if (factory == null) {
            if (typeof window !== 'undefined') {
                factory = window_modelFactories[schemaName];
            }
            else {
                var modulePath = path.resolve(__dirname, './lib/wizzi/models/' + schemaName + '-factory.g.js');
                if (this.file.exists(modulePath)) {
                    try {
                        factory = require('./lib/wizzi/models/' + schemaName + '-factory.g');
                    } 
                    catch (ex) {
                        return error('WizziPluginError', 'getModelFactory', 'Error loading wizzi model factory: ' + modulePath + ', in plugin: ' + this.getFilename(), ex);
                    } 
                }
            }
            this.modelFactories[schemaName] = factory;
        }
        return factory;
    }
    
    //
    getModelTransformer(transformerName) {
        
        var transformer = this.modelTransformers[transformerName] || null;
        if (transformer == null) {
            if (typeof window !== 'undefined') {
                transformer = window_transformers[transformerName];
            }
            else {
                var modulePath = path.resolve(__dirname, './lib/artifacts/' + transformerName + '/trans/main.js');
                if (this.file.exists(modulePath)) {
                    try {
                        transformer = require('./lib/artifacts/' + transformerName + '/trans/main');
                    } 
                    catch (ex) {
                        return error('WizziPluginError', 'getModelTransformer', 'Error loading wizzi model transformer: ' + modulePath + ', in plugin: ' + this.getFilename(), ex);
                    } 
                }
            }
            this.modelTransformers[transformerName] = transformer;
        }
        return transformer;
    }
    
    //
    getArtifactGenerator(generationName) {
        
        var generator = this.artifactGenerators[generationName] || null;
        if (generator == null) {
            if (typeof window !== 'undefined') {
                generator = window_artifactGenerators[generationName];
            }
            else {
                var modulePath = path.resolve(__dirname, './lib/artifacts/' + generationName + '/gen/main.js');
                if (this.file.exists(modulePath)) {
                    try {
                        generator = require('./lib/artifacts/' + generationName + '/gen/main');
                    } 
                    catch (ex) {
                        return error('WizziPluginError', 'getArtifactGenerator', 'Error loading artifact generator: ' + modulePath + ', in plugin: ' + this.getFilename(), ex);
                    } 
                }
            }
            this.artifactGenerators[generationName] = generator;
        }
        return generator;
    }
    
    //
    getSchemaDefinition(schemaName) {
        var definition = this.schemaDefinitions[schemaName] || null;
        if (definition == null) {
            if (typeof window !== 'undefined') {
                definition = window_schemaDefinitions[schemaName];
            }
            else {
                var schemaJsonUri = path.resolve(__dirname, './lib/wizzi/models/' + schemaName + '-schema.g.json');
                if (this.file.exists(schemaJsonUri)) {
                    try {
                        definition = this.file.readJSON(schemaJsonUri);
                    } 
                    catch (ex) {
                        return error('WizziPluginError', 'getSchemaDefinition', 'Error loading wizzi schema definition: ' + schemaJsonUri + ', in plugin: ' + this.getFilename(), ex);
                    } 
                    this.schemaDefinitions[schemaName] = definition;
                }
            }
        }
        return definition;
    }
}

function error(errorName, method, message, innerError) {
    return new errors.WizziPluginError(message, null, {
            errorName: errorName, 
            method: md.name + '.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}

module.exports = {
    provides: {
        schemas: [
            'regexp'
        ], 
        modelTransformers: [
            'regexp/extended'
        ], 
        artifactGenerators: [
            'regexp/document'
        ]
     }, 
    createFactoryPlugin: function(wizziPackage, options, callback) {
        var plugin = new FactoryPlugin(wizziPackage, this.provides);
        plugin.initialize(options, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null, plugin);
        }
        )
    }
 };
