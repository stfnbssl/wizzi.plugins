/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\artifacts\md\document\gen\included_writers.js.ittf
    utc time: Tue, 11 Apr 2023 14:24:31 GMT
*/
'use strict';

var myname = 'md.document.included_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeHtml = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeHtml'
    element.get_html((err, htmlModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'htmlModel', htmlModel
        ctx.wizziFactory.generateArtifact(htmlModel, 'generated from md model', 'html/document', {
            noGeneratorComments: true
         }, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // log myname, 'html module artifactText', artifactText
            ctx.writeAligned(artifactText);
            return callback();
        }
        )
    }
    )
}
;
