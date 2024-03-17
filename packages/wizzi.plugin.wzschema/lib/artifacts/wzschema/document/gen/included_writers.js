/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wzschema\document\gen\included_writers.js.ittf
    utc time: Fri, 15 Mar 2024 20:53:19 GMT
*/
'use strict';

var myname = 'wzschema.document.included_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeJs = function(ctx, element, callback) {
    // loog myname, 'enter writeIncludeJs'
    element.get_js((err, jsModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from wzschema model', 'js/module', {}, (err, artifactText) => {
        
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
