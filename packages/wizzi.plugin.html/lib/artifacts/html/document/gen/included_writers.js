/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\artifacts\html\document\gen\included_writers.js.ittf
    utc time: Thu, 21 Mar 2024 16:05:31 GMT
*/
'use strict';

var myname = 'html.document.include_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeCssLegacy = function(ctx, model, callback) {
    model.get_css((err, cssModel) => {
    
        if (err) {
            return callback(err);
        }
        if (cssModel.rules.length == 0 && verify.isEmpty(cssModel.wzName) == false) {
            ctx.w('<link href="' + cssModel.wzName + '" rel="stylesheet" />');
            callback();
        }
        else {
            md.generateCssArtifact(ctx, cssModel, (err, artifactText) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.w('<style>');
                ctx.indent();
                ctx.writeAligned(artifactText);
                ctx.deindent();
                ctx.w('</style>');
                callback();
            }
            )
        }
    }
    )
}
;
md.generateCssArtifact = function(ctx, cssModel, callback) {
    ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
        forHtmlStyle: true
     }, (err, artifactText) => {
    
        if (err) {
            return callback(err);
        }
        return callback(null, artifactText);
    }
    )
}
;
md.writeIncludeCss = function(ctx, element, callback) {
    element.get_css((err, cssModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
            forHtmlStyle: true, 
            noGeneratorComments: true
         }, (err, artifactText) => {
        
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
md.writeIncludeJs = function(ctx, element, callback) {
    element.get_js((err, jsModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from html model', 'js/module', {
            forHtmlScript: true, 
            noUseStrict: true, 
            noGeneratorComments: true
         }, (err, artifactText) => {
        
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
md.writeIncludeSvg = function(ctx, element, callback) {
    element.get_svg((err, svgModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(svgModel, 'generated from html model', 'svg/document', {
            forHtmlSvgElement: true
         }, (err, artifactText) => {
        
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
md.writeIncludeJson = function(ctx, element, callback) {
    element.get_json((err, jsonModel) => {
    
        if (err) {
            return callback(err);
        }
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from html model', 'json/document', {
            forHtmlJson: true
         }, (err, artifactText) => {
        
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
