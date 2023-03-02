/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.rdbms\.wizzi-override\lib\artifacts\rdbms\html_docs\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'rdbms.html.docs.main';
md.gen = function(model, ctx, callback) {
    wizzi.fsFactory({
        plugins: {
            items: [
                'wizzi-core', 
                'wizzi-web'
            ]
         }
     }, (err, wf) => {
    
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'rdbms-docs.html.ittf'), {
            modelRequestContext: {
                rdbms: model
             }, 
            artifactRequestContext: {}
         }, 'html/document', (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w(artifactText);
            return callback(null, ctx);
        }
        )
    }
    )
}
;
