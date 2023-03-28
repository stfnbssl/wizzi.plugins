/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.raml\.wizzi-override\lib\artifacts\raml\js_client\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'raml.js.client.main';
md.gen = function(model, ctx, callback) {
    wizzi.fsFactory({
        plugins: {
            items: [
                'wizzi-core', 
                'wizzi-js'
            ]
         }
     }, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'js-client.js.ittf'), {
            modelRequestContext: {
                raml: model
             }, 
            artifactRequestContext: {}
         }, 'js/module', (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'raml.js-client.artifactText', artifactText
            ctx.w(artifactText);
            return callback(null, ctx);
        }
        )
    }
    )
}
;
