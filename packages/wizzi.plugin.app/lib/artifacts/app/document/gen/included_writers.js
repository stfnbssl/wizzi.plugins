/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.app\.wizzi-override\lib\artifacts\app\document\gen\included_writers.js.ittf
    utc time: Mon, 20 Jan 2025 16:29:21 GMT
*/

var myname = 'app.document.included_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeJson = function(ctx, element, callback) {
    // loog myname, 'enter writeIncludeJson'
    element.get_json((err, jsonModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from app model', 'json/document', {}, (err, artifactText) => {
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