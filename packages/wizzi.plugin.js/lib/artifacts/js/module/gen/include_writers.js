/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\include_writers.js.ittf
    utc time: Sat, 03 Aug 2024 03:24:07 GMT
*/

var myname = 'wizzi.js.artifacts.module.gen.include_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeCss = function(ctx, model, callback) {
    model.get_css((err, cssModel) => {
        if (err) {
            return callback(err);
        }
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
    ctx.wizziFactory.generateArtifact(cssModel, 'generated from js model', 'css/document', {
        forHtmlStyle: true, 
        noGeneratorComments: true
     }, (err, artifactText) => {
        if (err) {
            return callback(err);
        }
        return callback(null, artifactText);
    }
    )
}
;