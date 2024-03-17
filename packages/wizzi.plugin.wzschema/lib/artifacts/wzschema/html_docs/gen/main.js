/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wzschema\html_docs\gen\main.js.ittf
    utc time: Fri, 15 Mar 2024 20:53:19 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;

var md = module.exports = {};
var myname = 'wfschema.html.docs.main';

md.gen = function(modelFrom_json_docs_transformation, ctx, callback) {
    var mTreeBuildUpContext = {
        schema: modelFrom_json_docs_transformation, 
        request: {}
     };
    ctx.wizziFactory.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'wfschema-docs.html.ittf'), {
        modelRequestContext: mTreeBuildUpContext, 
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
;
