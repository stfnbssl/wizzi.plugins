/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wzschema\factory\gen\main.js.ittf
    utc time: Fri, 15 Mar 2024 20:53:19 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;

var md = module.exports = {};
var myname = 'wzschema.factory.main';

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
        ctx.wizziFactory.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'wfschema-factory.js.ittf'), {
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
;
function isWizziPackageSchema(name) {
    var ndx = [
        'nools', 
        'npmpackage', 
        'wftest', 
        'wfjob', 
        'wzjob', 
        'wfpackage', 
        'wfschema', 
        'wzschema'
    ].indexOf(name);
    return ndx > -1;
}
