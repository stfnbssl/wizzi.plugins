/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.svg\.wizzi-override\lib\artifacts\svg\document\gen\included_writers.js.ittf
    utc time: Wed, 12 Jun 2024 10:55:37 GMT
*/
'use strict';

var myname = 'svg.document.gen.included_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeJs = function(ctx, element, callback) {
    element.get_js((err, jsModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from svg model', 'js/module', {}, (err, artifactText) => {
            if (err) {
                return callback(err);
            }
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
md.writeIncludeCss = function(ctx, element, callback) {
    element.get_css((err, cssModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(cssModel, 'generated from svg model', 'css/document', {}, (err, artifactText) => {
            if (err) {
                return callback(err);
            }
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