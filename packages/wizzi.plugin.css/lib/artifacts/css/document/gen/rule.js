/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.css\.wizzi-override\lib\artifacts\css\document\gen\rule.js.ittf
    utc time: Thu, 25 Apr 2024 11:40:57 GMT
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = require('../../../utils/lineParser');
var mymd = module.exports = {};
var myname = 'css.document.rule';
mymd.load = function(md) {
    md.elementRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(md, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    }
    ;
    md.classRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(md, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    }
    ;
    md.idRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(md, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    }
    ;
    md.gtRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(md, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    }
    ;
    md.pseudoElementRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(md, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    }
    ;
    md.ampersand = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(md, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    }
    ;
    md.placeholder = function(model, ctx, callback) {
        writeRule(md, model, ctx, callback);
    }
    ;
    md.media = function(model, ctx, callback) {
        if (model.wzName.indexOf(')') > -1) {
            ctx.w('@media ' + model.wzName + ' {');
        }
        else {
            ctx.w('@media (' + model.wzName + ') {');
        }
        ctx.indent();
        var selector = model.getSelector();
        // loog '*** selector', selector
        if (selector && selector.length > 0) {
            if (!!ctx.__isStyledComponent == false) {
                ctx.w(model.getSelector() + ' {');
                ctx.indent();
            }
            async.mapSeries(model.getProperties(), getWriteProperty(ctx), (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                if (!!ctx.__isStyledComponent == false) {
                    ctx.deindent();
                    ctx.w('}');
                }
                md.genItems(model.rules, ctx, {
                    indent: false
                 }, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.deindent();
                    ctx.w('}');
                    return callback(null);
                }
                )
            }
            )
        }
        else {
            md.genItems(model.rules, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w('}');
                return callback(null);
            }
            )
        }
    }
    ;
    md.fontface = function(model, ctx, callback) {
        ctx.w('@font-face {');
        ctx.indent();
        if (verify.isNotEmpty(model.featureSetting)) {
            ctx.w('font-feature-setting: ' + model.featureSetting + ';');
        }
        if (verify.isNotEmpty(model.fontFamily)) {
            ctx.w('font-family: ' + model.fontFamily + ';');
        }
        if (verify.isNotEmpty(model.src)) {
            ctx.w('src: ' + model.src + ';');
        }
        if (verify.isNotEmpty(model.fontStretch)) {
            ctx.w('font-stretch: ' + model.fontStretch + ';');
        }
        if (verify.isNotEmpty(model.fontStyle)) {
            ctx.w('font-style: ' + model.fontStyle + ';');
        }
        if (verify.isNotEmpty(model.fontWeight)) {
            ctx.w('font-weight: ' + model.fontWeight + ';');
        }
        if (verify.isNotEmpty(model.fontDisplay)) {
            ctx.w('font-display: ' + model.fontDisplay + ';');
        }
        if (verify.isNotEmpty(model.fontVariant)) {
            ctx.w('font-variant: ' + model.fontVariant + ';');
        }
        if (verify.isNotEmpty(model.fontVariationSetting)) {
            ctx.w('font-variation-setting: ' + model.fontVariationSetting + ';');
        }
        if (verify.isNotEmpty(model.unicodeRange)) {
            ctx.w('unicode-range: ' + model.unicodeRange + ';');
        }
        md.genItems(model.rules, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
    ;
    md.keyframes = function(model, ctx, callback) {
        if (model.wzName != '--styled--') {
            ctx.w('@' + (model.vendor || '') + 'keyframes ' + model.wzName + ' {');
        }
        md.genItems(model.rules, ctx, {
            indent: model.wzName != '--styled--'
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (model.wzName != '--styled--') {
                ctx.w('}');
            }
            return callback(null);
        }
        )
    }
    ;
    md.keyframe = function(model, ctx, callback) {
        ctx.w(model.wzName + ' {');
        ctx.indent();
        async.mapSeries(model.getProperties(), getWriteProperty(ctx), (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
    ;
    md.keyframeFrom = function(model, ctx, callback) {
        ctx.w("from " + model.wzName + ' {');
        ctx.indent();
        async.mapSeries(model.getProperties(), getWriteProperty(ctx), (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
    ;
    md.keyframeTo = function(model, ctx, callback) {
        ctx.w("to " + model.wzName + ' {');
        ctx.indent();
        async.mapSeries(model.getProperties(), getWriteProperty(ctx), (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
    ;
    md.ximport = function(model, ctx, callback) {
        ctx.w('@import ' + model.wzName + ';');
        return callback(null);
    }
    ;
    md.comment = function(model, ctx, callback) {
        if (model.rules && model.rules.length > 0) {
            if (ctx.__comment_level === 0) {
                ctx.w('/**');
            }
            ctx.indent();
            if (model.wzName.length > 0) {
                ctx.w(model.wzName)
            }
            ctx.__comment_level++;
            md.genItems(model.rules, ctx, {
                indent: false
             }, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                ctx.__comment_level--;
                ctx.deindent();
                if (ctx.__comment_level === 0) {
                    ctx.w('*/');
                }
                return callback(null);
            }
            )
        }
        else {
            if (ctx.__comment_level > 0) {
                ctx.w(model.wzName ? (' ' + model.wzName) : '');
            }
            else {
                ctx.w('/**' + (model.wzName ? (' ' + model.wzName) : '') + ' */');
            }
            return callback(null);
        }
    }
    ;
}
;
function writeRule(md, model, ctx, callback) {
    // loog 'writeRule, model.ruleParts', model.ruleParts
    if (!!ctx.__isStyledComponent == false) {
        var wzName = model.wzElement === 'ampersand' ? '&' + model.wzName : model.wzName;
    }
    var ruleText = model.getSelector(true);
    var isStyledComponent = model.wzElement == "elementRule" && model.wzName == "--styled--";
    var isInsideStyledComponent = ctx.__isStyledComponent;
    // loog 'isStyledComponent, ctx.__isStyledComponent, isInsideStyledComponent, model.wzName', isStyledComponent, ctx.__isStyledComponent, isInsideStyledComponent, model.wzName
    if (isInsideStyledComponent && model.wzElement === 'ampersand') {
        var text = ['+', '~'].indexOf(model.wzName[0]) > -1 ? ' ' + model.wzName : model.wzName;
        ctx.w('&' + text + ' {');
        ctx.indent();
    }
    else if (isInsideStyledComponent) {
        var pref = model.wzElement === 'classRule' ? '.' : model.wzElement === 'pseudoElementRule' ? '::' : model.wzElement === 'elementRule' ? '' : model.wzElement === 'idRule' ? '#' : model.wzElement + '-not-mamaged';
        ctx.w(pref + model.wzName + ' {');
        ctx.indent();
    }
    else if (isStyledComponent) {
        ctx.__isStyledComponent = true;
    }
    else {
        ctx.w(ruleText + ' {');
        ctx.indent();
    }
    async.mapSeries(model.getProperties(), getWriteProperty(ctx), (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (isInsideStyledComponent) {
            ctx.deindent();
            ctx.w('}');
        }
        else {
            if (!!isStyledComponent == false) {
                ctx.deindent();
                ctx.w('}');
            }
        }
        md.genItems(model.rules, ctx, {
            indent: false
         }, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            if (isStyledComponent) {
                ctx.__isStyledComponent = false;
            }
            return callback(null);
        }
        )
    }
    )
}
function getWriteProperty(ctx) {
    return function writeProperty(prop, callback) {
            var name = prop.name;
            var value = prop.value;
            // loog 'getWriteProperty', prop.name, prop.value, prop.wzElement, prop.wzName, prop.get_js, prop.prop && prop.prop.get_js
            if (prop.wzElement && prop.prop && prop.prop.get_svg) {
                if (prop.wzElement === "background_image") {
                    prop.prop.get_svg((err, svgModel) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        ctx.wizziFactory.generateArtifact(svgModel, 'generated from css model', 'svg/document', {
                            CRLF: '', 
                            forCssImage: true, 
                            noGeneratorComments: true
                         }, (err, artifactText) => {
                        
                            if (err) {
                                return callback(err);
                            }
                            ctx.w('background-image: url("data:image/svg+xml,' + artifactText + '");');
                            return callback(null);
                        }
                        )
                    }
                    )
                }
                else {
                    throw ctx.error(myname + '. writeProperty unknown  prop.wzElement: ' + prop.wzElement);
                }
            }
            else if (prop.wzElement && prop.prop && prop.prop.get_js) {
                prop.prop.get_js((err, jsModel) => {
                
                    if (err) {
                        return callback(err);
                    }
                    ctx.wizziFactory.generateArtifact(jsModel, 'generated from css model', 'js/module', {
                        noGeneratorComments: true, 
                        noUseStrict: true
                     }, (err, artifactText) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        function _indent(txt, ind) {
                            var ret = [];
                            var i, i_items=txt.split('\n'), i_len=txt.split('\n').length, item;
                            for (i=0; i<i_len; i++) {
                                item = txt.split('\n')[i];
                                ret.push(new Array(ind+1).join(' ') + item)
                            }
                            return ret.join('\n');
                        }
                        var code = "$" + "{props => {\n" + _indent(artifactText,4) + "\n}}";
                        ctx.w(code);
                        return callback(null);
                    }
                    )
                }
                )
            }
            else if (name == '$') {
                ctx.w('$' + '{' + value + '}');
                return callback(null);
            }
            else {
                if (prop.styledprop) {
                    value = "£{props => " + prop.styledprop + "}";
                }
                value = verify.replaceAll(value, "£{", "${");
                if (name === "align-items") {
                    ctx.w("-webkit-align-items: " + value  + ";");
                    ctx.w("-webkit-box-align: " + value  + ";");
                    ctx.w("-ms-flex-align: " + value  + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "animation") {
                    ctx.w("-webkit-" + name + ": " + value  + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "appearance") {
                    ctx.w("-webkit-appearance: " + value  + ";");
                    ctx.w("-moz-appearance: " + value  + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "background-image") {
                    if (value && value.indexOf && value.indexOf("linear-gradient") >= 0) {
                        ctx.w(name + ": " + value.replace("linear-gradient", "-webkit-linear-gradient") + ";");
                        ctx.w(name + ": " + value.replace("linear-gradient", "-moz-linear-gradient") + ";");
                        ctx.w(name + ": " + value.replace("linear-gradient", "-o-linear-gradient") + ";");
                        ctx.w(name + ": " + value.replace("linear-gradient", "-ms-linear-gradient") + ";");
                        ctx.w(name + ": " + value + ";");
                    }
                    else {
                        ctx.w(name + ": " + value + ";");
                    }
                }
                else if (name === "border-radius") {
                    ctx.w("-webkit-border-radius: " + value + ";");
                    ctx.w("-khtml-border-radius: " + value + ";");
                    ctx.w("-moz-border-radius: " + value + ";");
                    ctx.w("-o-border-radius: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "box-shadow") {
                    ctx.w("-webkit-box-shadow: " + value + ";");
                    ctx.w("-moz-box-shadow: " + value + ";");
                    ctx.w("-o-box-shadow: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "display" && value === 'flex') {
                    ctx.w(name + ": -ms-flexbox;");
                    ctx.w(name + ": -webkit-box;");
                    ctx.w(name + ": -webkit-flex;");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "display" && value === 'inline-flex') {
                    ctx.w(name + ": -webkit-inline-box;");
                    ctx.w(name + ": -webkit-inline-flex;");
                    ctx.w(name + ": -ms-inline-flexbox;");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex") {
                    ctx.w("-ms-flex: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flexbox") {
                    ctx.w("-webkit-box: " + value + ";");
                    ctx.w("-webkit-flex: " + value + ";");
                    ctx.w("-moz-box: " + value + ";");
                    ctx.w("-ms-flexbox: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex-basis") {
                    ctx.w("-ms-flex-preferred-size: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex-direction") {
                    ctx.w("-webkit-flex-direction: " + value + ";");
                    ctx.w("-ms-flex-direction: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex-grow") {
                    ctx.w("-webkit-flex-grow: " + value + ";");
                    ctx.w("-webkit-box-flex: " + value + ";");
                    ctx.w("-ms-flex-positive: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "order") {
                    ctx.w("-ms-flex-order: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex-flow") {
                    ctx.w("-webkit-flex-flow: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex-shrink") {
                    ctx.w("-webkit-flex-shrink: " + value + ";");
                    ctx.w("-ms-flex-negative: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "flex-wrap") {
                    ctx.w("-webkit-flex-wrap: " + value + ";");
                    ctx.w("-ms-flex-wrap: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "justify-content") {
                    ctx.w("-webkit-box-pack: " + value + ";");
                    ctx.w("-ms-flex-pack: " + value + ";");
                    ctx.w("-webkit-justify-content: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "letter-spacing") {
                    ctx.w("-webkit-" + name + ": " + value + ";");
                    ctx.w("-moz-" + name + ": " + value + ";");
                    ctx.w("-ms-" + name + ": " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "text-decoration") {
                    ctx.w("-webkit-" + name + ": " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "transition") {
                    ctx.w("-webkit-transition: " + value + ";");
                    ctx.w("-moz-transition: " + value + ";");
                    ctx.w("-o-transition: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "transform") {
                    ctx.w("-webkit-transform: " + value + ";");
                    ctx.w("-ms-transition: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else if (name === "user-select") {
                    ctx.w("-webkit-user-select: " + value + ";");
                    ctx.w("-moz-user-select: " + value + ";");
                    ctx.w("-ms-user-select: " + value + ";");
                    ctx.w("-o-user-select: " + value + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else {
                    ctx.w(name + ": " + value + ";");
                }
                process.nextTick(callback)
            }
        };
}
