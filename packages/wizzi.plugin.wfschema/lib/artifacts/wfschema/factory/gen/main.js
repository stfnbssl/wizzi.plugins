/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wfschema\.wizzi-override\lib\artifacts\wfschema\factory\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;
var md = module.exports = {};
var myname = 'wfschema.factory.main';
md.gen = function(model, ctx, callback) {
    var bootWizziModel = new BootWizziSchema(model.wzName);
    bootWizziModel.loadFromWizziModel(model, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        var mTreeBuildUpContext = {
            schema: bootWizziModel, 
            request: {
                emitKey: ctx.emitKey || 'node-js', 
                toJson: ctx.toJson || false, 
                isWizziPackageSchema: isWizziPackageSchema(model.wzName)
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
            wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'wfschema-factory.js.ittf'), {
                modelRequestContext: mTreeBuildUpContext, 
                artifactRequestContext: {}
             }, 'js/module', (err, artifactText) => {
            
                if (err) {
                    return callback(err);
                }
                // loog 'wfschema-factory.artifactText', artifactText
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
function isWizziPackageSchema(name) {
    var ndx = [
        'nools', 
        'npmpackage', 
        'wftest', 
        'wfjob', 
        'wfpackage', 
        'wfschema'
    ].indexOf(name);
    return ndx > -1;
}
