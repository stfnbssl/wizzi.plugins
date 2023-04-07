/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wfschema\model\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'wfschema.model.main';
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;
md.gen = function(model, ctx, callback) {
    // loog 'wizzi-core.wfschema.gen.model started', ittfDocumentPath
    // loog 'wizzi-core.artifacts.wfschema.model.model', Object.keys(model)
    var bootWizziModel = new BootWizziSchema(model.wzName);
    bootWizziModel.loadFromWizziModel(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        var mTreeBuildupContext = {
            schema: bootWizziModel, 
            request: {
                emitKey: ctx.emitKey || null, 
                toJson: bootWizziModel.exportToJson(), 
                toXml: bootWizziModel.exportToXml(), 
                toPrettify: bootWizziModel.exportToPrettify()
             }
         };
        wizzi.fsFactory({
            plugins: {
                items: [
                    'wizzi-core', 
                    'wizzi-web', 
                    'wizzi-js'
                ]
             }
         }, (err, wf) => {
        
            if (err) {
                return callback(err);
            }
            wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'wfschema-model.js.ittf'), {
                modelRequestContext: mTreeBuildupContext, 
                artifactRequestContext: {}
             }, 'js/module', (err, artifactText) => {
            
                if (err) {
                    return callback(err);
                }
                // loog 'wfschema-model.artifactText', artifactText
                ctx.w(artifactText);
                return callback(null, ctx);
            }
            )
        }
        )
    }
    )
}
;
