/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.xml\.wizzi-override\root\index.js.ittf
    utc time: Wed, 13 Mar 2024 07:14:58 GMT
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var errors = require('./errors');

var md = module.exports = {};
md.name = 'wizzi.plugin.xml.index';

// window(s) vars must be declared even if empty
var window_modelFactories = {
    'xml': require('./lib/wizzi/models/xml-factory.g')
 };
var window_artifactGenerators = {
    'xml/document': require('./lib/artifacts/xml/document/gen/main')
 };
var window_transformers = {
    'xml/extended': require('./lib/artifacts/xml/extended/trans/main')
 };
var window_wizzifiers = {
    'xml/wizzifier': require('./lib/wizzifiers/xml/wizzifier')
 };
var window_schemaDefinitions = {};

/**
     FactoryPlugin class
*/
class FactoryPlugin {
    constructor(wizziPackage, provides) {
        this.file = wizziPackage.file;
        this.provides = provides;
        this.modelFactories = {};
        this.modelTransformers = {};
        this.artifactGenerators = {};
        this.wizzifiers = {};
        this.schemaDefinitions = {};
    }
    
    initialize(options, callback) {
        // TODO
        return callback(null);
    }
    
    getName() {
        return 'wizzi.plugin.xml';
    }
    
    getFilename() {
        return __filename;
    }
    
    getProvides() {
        return this.provides;
    }
    
    /**
         Retrieve a WizziModelFactory by its schema name
         searching the loader in this package.
         No search up in "node_modules" folders.
    */
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
    
    /**
         retrieve a ModelTransformer by its name
         searching the loader in this package
         No search up in "node_modules" folders.
    */
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
    
    /**
         Retrieve an ArtifactGenerator by its name
         Generators are searched in this package
         No search up in "node_modules" folders.
    */
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
    
    /**
         Retrieve a Wizzifier by its name
         Wizzifiers are searched in this package
         No search up in "node_modules" folders.
    */
    getWizzifier(wizzifierName) {
        
        var wizzifier = this.wizzifiers[wizzifierName] || null;
        if (wizzifier == null) {
            if (typeof window !== 'undefined') {
                wizzifier = window_wizzifiers[wizzifierName];
            }
            else {
                var modulePath = path.resolve(__dirname, './lib/wizzifiers/' + wizzifierName + '/wizzifier.js');
                if (this.file.exists(modulePath)) {
                    try {
                        wizzifier = require('./lib/wizzifiers/' + wizzifierName + '/wizzifier');
                    } 
                    catch (ex) {
                        return error('WizziPluginError', 'getWizzifier', 'Error loading wizzifier: ' + modulePath + ', in plugin: ' + this.getFilename(), ex);
                    } 
                }
            }
            this.wizzifiers[wizzifierName] = wizzifier;
        }
        return wizzifier;
    }
    
    /**
         Retrieve a WizziSchema definition in JSON format
         searching the loader in this package.
         No search up in "node_modules" folders.
    */
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
    version: '0.8.2', 
    provides: {
        schemas: [
            'xml'
        ], 
        schemasExt: [
            {
                name: 'xml', 
                fileExtensions: [
                    "xml"
                ], 
                artifactsGenerators: [
                    "document"
                ], 
                defaultArtifact: 'document'
             }
        ], 
        modelTransformers: [
            'xml/extended'
        ], 
        artifactGenerators: [
            'xml/document'
        ], 
        wizzifiers: [
            'xml'
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
