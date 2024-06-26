/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\document\gen\include_writers.js.ittf
*/
'use strict';

var myname = 'wizzi.js.artifacts.module.gen.include_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeCss = function(ctx, model, callback) {
    model.get_css((err, cssModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'cssModel.rules', cssModel.rules, Object.keys(cssModel)
        // log myname, 2
        md.generateCssArtifact(ctx, cssModel, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            callback();
        }
        )
    }
    )
}
;
md.generateCssArtifact = function(ctx, cssModel, callback) {
    // log myname, 3
    // log myname, 'cssModel', cssModel, 'cssModel.rules', cssModel.rules
    ctx.wizziFactory.generateArtifact(cssModel, 'generated from js model', 'css/document', {
        forHtmlStyle: true, 
        noGeneratorComments: true
     }, (err, artifactText) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'css artifactText', artifactText
        return callback(null, artifactText);
    }
    )
}
;
