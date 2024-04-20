/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\artifacts\md\tocss\gen\included_writers.js.ittf
    utc time: Sat, 20 Apr 2024 04:47:45 GMT
*/
'use strict';

var myname = 'md.document.included_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeCss = function(ctx, element, callback) {
    element.get_css((err, cssModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(cssModel, 'generated from md model', 'css/document', {
            forHtmlStyle: true, 
            noGeneratorComments: true
         }, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            ctx.writeAligned(artifactText);
            return callback();
        }
        )
    }
    )
}
;
