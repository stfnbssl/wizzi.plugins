/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.md\.wizzi-override\lib\artifacts\md\document\gen\included_writers.js.ittf
    utc time: Mon, 06 May 2024 14:32:29 GMT
*/
'use strict';

var myname = 'md.document.included_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeHtml = function(ctx, element, callback) {
    element.get_html((err, htmlModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(htmlModel, 'generated from md model', 'html/document', {
            noGeneratorComments: true, 
            noDocType: true, 
            noHtmlRoot: true
         }, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            console.log(myname, 'html module artifactText', '[' + artifactText + ']', __filename);
            ctx.writeAligned(artifactText);
            return callback();
        }
        )
    }
    )
}
;
md.writeIncludeJson = function(ctx, element, callback) {
    // loog myname, 'enter writeIncludeJson'
    element.get_json((err, jsonModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from md model', 'json/toyaml', {}, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w('---');
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            ctx.w('---');
            return callback();
        }
        )
    }
    )
}
;
