/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ppt\.wizzi-override\lib\artifacts\ppt\document\gen\included_writers.js.ittf
    utc time: Fri, 06 Jun 2025 19:59:24 GMT
*/

var myname = 'ppt.document.include_writers';

var verify = require('@wizzi/utils').verify;

var md = module.exports = {};
md.writeIncludeSvg = function(ctx, element, callback) {
    console.log(myname, 'enter writeIncludeSvg', __filename);
    element.get_svg((err, svgModel) => {
        if (err) {
            return callback(err);
        }
        console.log(myname, 'svgModel', __filename);
        ctx.wizziFactory.generateArtifact(svgModel, 'generated from ppt model', 'svg/document', {
            forHtmlSvgElement: true
         }, (err, artifactText) => {
            if (err) {
                return callback(err);
            }
            console.log(myname, 'svg module artifactText', artifactText, __filename);
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