/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.logbot\.wizzi-override\lib\artifacts\logbot\document\gen\included_writers.js.ittf
    utc time: Wed, 04 Sep 2024 13:08:58 GMT
*/

var myname = 'lbot.document.included_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeJs = function(ctx, element, callback) {
    // loog myname, 'enter writeIncludeJs'
    element.get_js((err, jsModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from lbot model', 'js/module', {}, (err, artifactText) => {
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
md.getIncludeJsArtifact = function(ctx, element, callback) {
    // loog myname, 'enter getIncludeJsArtifact'
    element.get_js((err, jsModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from lbot model', 'js/module', {}, (err, artifactText) => {
            if (err) {
                return callback(err);
            }
            return callback(null, artifactText);
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
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from lbot model', 'json/document', {}, (err, artifactText) => {
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
md.getIncludeJsonArtifact = function(ctx, element, callback) {
    // loog myname, 'enter writeIncludeJson'
    element.get_json((err, jsonModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from lbot model', 'json/document', {}, (err, artifactText) => {
            if (err) {
                return callback(err);
            }
            return callback(null, artifactText);
        }
        )
    }
    )
}
;