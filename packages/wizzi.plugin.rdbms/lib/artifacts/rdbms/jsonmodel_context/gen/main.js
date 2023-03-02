/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.rdbms\.wizzi-override\lib\artifacts\rdbms\jsonmodel_context\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var md = module.exports = {};
var myname = 'rdbms.jsonmodel_persister.main';
md.gen = function(model, ctx, callback) {
    // log myname, util.inspect(model, {depth:1})
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
        wf.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'jsonmodel_context.js.ittf'), {
            modelRequestContext: {
                rdbms: model
             }, 
            artifactRequestContext: {}
         }, 'js/module', (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // loog 'jsoncrud.artifactText', artifactText
            ctx.w(artifactText);
            return callback(null, ctx);
        }
        )
    }
    )
}
;
