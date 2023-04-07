/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wfschema\html_docs\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;
var md = module.exports = {};
var myname = 'wfschema.html.docs.main';
md.gen = function(modelFrom_json_docs_transformation, ctx, callback) {
    var mTreeBuildupContext = {
        schema: modelFrom_json_docs_transformation, 
        request: {}
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
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'wfschema-docs.html.ittf'), {
            modelRequestContext: mTreeBuildupContext, 
            artifactRequestContext: {}
         }, 'html/document', (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'wfschema-docs.html.ittf.artifactText', artifactText
            ctx.w(artifactText);
            return callback(null, ctx);
        }
        )
    }
    )
}
;
