/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.html\.wizzi-override\lib\artifacts\html\document\gen\included_writers.js.ittf
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
        // log myname, 'cssModel.rules', cssModel.rules
        
        // log myname, 1
        if (cssModel.rules.length == 0 && verify.isEmpty(cssModel.wzName) == false) {
            ctx.w('<link href="' + cssModel.wzName + '" rel="stylesheet" />');
            callback();
        }
        // log myname, 2
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
    // log myname, 3
    // log myname, 'cssModel', cssModel, 'cssModel.rules', cssModel.rules
    ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
        forHtmlStyle: true
     }, (err, artifactText) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'css artifactText', artifactText
        return callback(null, artifactText);
    }
    )
}
;
md.writeIncludeCss = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeJs'
    element.get_css((err, cssModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'cssModel', cssModel
        ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
            forHtmlStyle: true, 
            noGeneratorComments: true
         }, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // log myname, 'css module artifactText', artifactText
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
    // log myname, 'enter writeIncludeJs'
    element.get_js((err, jsModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'jsModel', jsModel
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from html model', 'js/module', {
            forHtmlScript: true, 
            noUseStrict: true, 
            noGeneratorComments: true
         }, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // log myname, 'js module artifactText', artifactText
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
    // log myname, 'enter writeIncludeSvg'
    element.get_svg((err, svgModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'svgModel', svgModel
        ctx.wizziFactory.generateArtifact(svgModel, 'generated from html model', 'svg/document', {
            forHtmlSvgElement: true
         }, (err, artifactText) => {
        
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
md.writeIncludeJson = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeSvg'
    element.get_json((err, jsonModel) => {
    
        if (err) {
            return callback(err);
        }
        // log myname, 'jsonModel', jsonModel
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from html model', 'json/document', {
            forHtmlJson: true
         }, (err, artifactText) => {
        
            if (err) {
                return callback(err);
            }
            // log myname, 'json module artifactText', artifactText
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
