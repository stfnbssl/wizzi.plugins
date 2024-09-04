/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.lab\.wizzi-override\lib\artifacts\lab\document\gen\included_writers.js.ittf
    utc time: Fri, 30 Aug 2024 16:41:06 GMT
*/

var myname = 'lab.document.included_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeMd = function(ctx, element, callback) {
    // loog myname, 'enter writeIncludeMd'
    element.get_md((err, mdModel) => {
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(mdModel, 'generated from lab model', 'md/document', {}, (err, artifactText) => {
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