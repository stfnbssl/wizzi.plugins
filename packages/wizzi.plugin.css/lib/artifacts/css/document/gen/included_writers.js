/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.css\.wizzi\lib\artifacts\css\document\gen\included_writers.js.ittf
*/
'use strict';

var myname = 'css.document.included_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeSvg = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeSvg'
    element.get_svg((err, svgModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'svgModel', svgModel
        ctx.wizziFactory.generateArtifact(svgModel, 'generated from css model', 'svg/document', {}, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // log myname, 'svg module artifactText', artifactText
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
