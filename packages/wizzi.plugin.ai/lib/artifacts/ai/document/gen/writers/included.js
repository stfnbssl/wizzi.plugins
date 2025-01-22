/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ai\.wizzi-override\lib\artifacts\ai\document\gen\writers\included.js.ittf
    utc time: Wed, 22 Jan 2025 15:19:02 GMT
*/

var myname = 'ai.document.writers.included';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.getIncludeJsonArtifact = function(ctx, element, callback) {
    // loog myname, 'enter getIncludeJsonArtifact'
    element.get_json((err, jsonModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from ia model', 'json/document', {}, (err, artifactText) => {
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