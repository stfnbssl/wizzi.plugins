/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.svg\.wizzi-override\lib\artifacts\svg\document\gen\included_writers.js.ittf
*/
'use strict';

var myname = 'svg.document.gen.included_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeJs = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeJs'
    element.get_js((err, jsModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'jsModel', jsModel
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from svg model', 'js/module', {}, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // log myname, 'js module artifactText', artifactText
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            return callback();
        }
        )
    }
    )
}
;
