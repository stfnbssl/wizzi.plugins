/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\utils\stm.js.ittf
    utc time: Sat, 06 Apr 2024 05:38:00 GMT
*/
'use strict';
// var verify = require('./verify')
var verify = require('@wizzi/utils').helpers.verify;
var myname = 'wizzi-js.artifacts.js.module.codegen.util.stm';
var md = module.exports = {};
var parents_of_top_statements = [
    'xfunction', 
    'asyncfunction', 
    'asyncarrowfunction', 
    'arrowfunction', 
    'generatorfunction', 
    'xclass', 
    'ctor', 
    'method', 
    'module', 
    'xmodule', 
    'ready', 
    'html_f', 
    'html_dom', 
    'html_hb', 
    'block', 
    'xfor', 
    'foreach', 
    'backeach', 
    'each', 
    'filter', 
    'reduce', 
    'find', 
    'xwhile', 
    'xdo', 
    'xif', 
    'xelse', 
    'elif', 
    'xtry', 
    'xfinally', 
    'xcatch', 
    'xcase', 
    'xdefault', 
    'describe', 
    'iife', 
    'it', 
    'before', 
    'itAsync', 
    'beforeAsync', 
    'afterAsync', 
    'beforeEach', 
    'after', 
    'afterEach', 
    'xlabel', 
    'wzIife', 
    'wzFunction', 
    'render', 
    'willMount', 
    'didMount', 
    'willUnmount', 
    'shouldUpdate', 
    'didUpdate', 
    'willUpdate', 
    'willReceiveProps', 
    '_js', 
    '_css', 
    'codeline', 
    'statement', 
    'exportDefault', 
    'xexport', 
    'set', 
    'setter', 
    'get'
];
var __tags = "a abbr address area article aside audio b base bdi bdo big blockquote body br" + " button canvas caption cite code col colgroup data datalist dd del details dfn" + " dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5" + " h6 head header hr html i iframe img input ins kbd keygen label legend li link" + " main map mark menu menuitem meta meter nav noscript object ol optgroup option" + " output p param picture pre progress q rp rt ruby s samp script section select" + " small source span strong _style sub summary sup svg table tbody td textarea tfoot th" + " thead time title tr track u ul var video wbr" + " altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform" + " circle clipPath color-profile cursor defs desc discard ellipse" + " @filter font font-face font-face-format font-face-name font-face-src font-face-uri" + " foreignObject g glyph glyphRef hatch hatchpath hkern image line linearGradient" + " marker mask metadata missing-glyph mpath @param path pattern polygon polyline radialGradient" + " rect solidcolor stop style svg switch symbol text textPath tref tspan" + " unknown use video view vkern";

var fb_html_supported_tags = __tags.split(' ');
md.isChildOf = function(model, parent) {
    if (!model.wzParent) {
        return false;
    }
    return model.wzParent.wzElement == parent;
}
;
md.isDescendentOf = function(model, ancestor) {
    if (!model.wzParent) {
        return false;
    }
    if (model.wzParent.wzElement == ancestor) {
        return true;
    }
    return md.isDescendentOf(model.wzParent, ancestor);
}
;
md.isTopStatement = function(model, ctx) {
    if (!model.wzParent) {
        return true;
    }
    if (ctx.arrowFunctionNoGraphs) {
        return false;
    }
    var prnElement = model.wzParent.wzElement;
    if (prnElement == 'arrowfunction' && md.isImplicitReturn(model.wzParent)) {
        return false;
    }
    return parents_of_top_statements.indexOf(prnElement) > - 1;
}
;
md.isDeclare = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['xvar'].indexOf(model.wzParent.wzElement) > -1;
}
;
md.isObjectProperty = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['jsObject', 'state'].indexOf(model.wzParent.wzElement) > -1;
}
;
md.isEnumValue = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['typeEnum'].indexOf(model.wzParent.wzElement) > -1;
}
;
md.writeComments = function(model, ctx, newline) {
    var temp = [];
    var written = false;
    var indented = false;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment' || item.wzElement == 'commentmultiline') {
            ctx.w();
            __writeComments(item, ctx, item.wzElement == 'commentmultiline')
            written = true;
            
            // loog '§§§ stm.writeComments', model.wzName
            if (item.wzName.indexOf('@ts-ignore') > -1) {
                ctx.__inlineNext = true;
            }
            else {
                ctx.__inlineNext = false;
            }
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return model;
}
;
function __writeComments(model, ctx, multi) {
    // loog '__writeComments-model', model
    if (multi || model.statements.length > 0) {
        ctx.w('/**');
        ctx.indent();
        ctx.__inside_comment = true;
        if (verify.isNotEmpty(model.wzName)) {
            ctx.w('* ' + model.wzName);
        }
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            __writeCommentLine(item, ctx)
        }
    }
    else {
        ctx.w('// ' + model.wzName);
    }
    if (multi || model.statements.length > 0) {
        ctx.deindent();
        ctx.__inside_comment = false;
        ctx.w('*/');
    }
}
function __writeCommentLine(model, ctx) {
    ctx.w((ctx.__inside_comment ? '* ' : '// ') + model.wzName);
    if (model.statements.length > 0) {
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            __writeCommentLine(item, ctx)
        }
        ctx.deindent();
    }
}
md.writeComments_template = function(model, ctx, newline, newlineindent) {
    var temp = [];
    var written = false;
    var indented = false;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment') {
            if (newline && !written) {
                if (newlineindent) {
                    ctx.indent();
                    indented = true;
                }
                ctx.w();
            }
            ctx.w('// ' + item.wzName);
            written = true;
            
            // loog '§§§ stm.writeComments', model.wzName
            if (item.wzName.indexOf('@ts-ignore') > -1) {
                ctx.__inlineNext = true;
            }
            else {
                ctx.__inlineNext = false;
            }
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return indented;
}
;
md.isComment = function(model) {
    return ['comment', 'commentmultiline'].indexOf(model.wzElement) > -1;
}
;
md.nonCommentStatements = function(model) {
    var ret = [];
    if (model.statements) {
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            if (md.isComment(item) == false) {
                ret.push(item);
            }
        }
    }
    if (model.jsPropertyOrValues) {
        var i, i_items=model.jsPropertyOrValues, i_len=model.jsPropertyOrValues.length, item;
        for (i=0; i<i_len; i++) {
            item = model.jsPropertyOrValues[i];
            if (md.isComment(item) == false) {
                ret.push(item);
            }
        }
    }
    return ret;
}
;
md.isBlockStatement = function(model) {
    return ['xif','xfor','foreach','xwhile','backeach','xtry','xthrow','xswitch', 'xyield','xawait','xdo','xlabel','xfunction','xdelete', 'xvar','xconst','xlet','decl','log'].indexOf(model.wzElement) > -1;
}
;
md.isMemberAccess = function(model) {
    if (['memberAccess', 'memberAccessComputed', 'memberCall', 'decoratorCall', 'callOnValue', 'typeAs'].indexOf(model.wzElement) > -1) {
        return true;
    }
}
;
md.isMemberAccessOrCall = function(model) {
    if (md.isMemberAccess(model)) {
        return true;
    }
    if (!model.wzParent) {
        return false;
    }
    if (model.wzElement === 'call' && model.wzParent.wzElement === 'call') {
        return true;
    }
    return false;
}
;
md.isCallArgument = function(model) {
    return model.wzElement === 'call' && model.wzParent && model.wzParent.wzElement === 'call';
}
;
md.isArgumentOfCall = function(model) {
    return model.wzParent && ['call', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzParent.wzElement) > -1;
}
;
md.firstChildIs = function(model, elementsArray) {
    var ss = md.nonCommentStatements(model);
    // loog 'firstChildIs', ss.length > 0 && ss[0].wzElement
    return ss.length > 0 && elementsArray.indexOf(ss[0].wzElement) > -1;
}
;
md.onlyChildIs = function(model, element) {
    var ss = md.nonCommentStatements(model);
    return ss.length == 1 && ss[0].wzElement === element;
}
;
md.onlyChildIsNot = function(model, element) {
    var ss = md.nonCommentStatements(model);
    return ss.length == 1 && ss[0].wzElement !== element;
}
;
md.isImplicitReturn = function(model) {
    var ss = md.nonCommentStatements(model);
    return md.onlyChildIsNot(model, 'xreturn') && !md.isBlockStatement(ss[0]);
}
;
md.onlyChildIsHtmlElement = function(model) {
    var ss = md.nonCommentStatements(model);
    return ss.length == 1 && ( fb_html_supported_tags.indexOf(ss[0].wzElement) > -1 || ss[0].wzElement === 'htmlelement' );
}
;
md.isSingleParamForArrowFunction = function(model) {
    if (model.params.length != 1) {
        return false;
    }
    // loog 'model.params', model.params
    // loog 'model.params[0]', model.params[0]
    if (model.params[0].wzName.startsWith('...')) {
        return false;
    }
    var ss = md.nonCommentStatements(model.params[0]);
    // loog 'return', ss.length == 0
    return ss.length == 0;
}
;
md.hasStatementChildren = function(model) {
    var ss = md.nonCommentStatements(model);
    if (ss.length > 0) {
        return true;
    }
    return false;
}
;
md.parentIs = function(model, element) {
    return model.wzParent && model.wzParent.wzElement === element;
}
;
md.parentIsHtmlElement = function(model) {
    if (! (model.wzParent)) {
        return false;
    }
    var test = model.wzParent.wzElement;
    if (test == 'htmlelement') {
        return true;
    }
    // return ['htmlelement', 'a', 'br', 'button', 'div', 'form', 'h1', 'h2', 'h3', 'h4', 'head', 'header', 'i', 'img', 'input', 'label', 'legend', 'li', 'meta', 'option', 'p', 'select', 'span', 'table', 'tbody', 'td', 'textarea', 'th', 'thead', 'tr', 'ul'].indexOf(model.wzParent.wzElement) > - (1)
    return fb_html_supported_tags.indexOf(model.wzParent.wzElement) > -1;
}
;
md.isValue = function(model) {
    if (! (model.wzParent)) {
        return false;
    }
    return ['jsArray', 'jsPropertyOrValue', 'memberAccessComputed', 'or', 'and'].indexOf(model.wzParent.wzElement) > -1;
}
;
md.isParamValue = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['call', 'memberCall', 'decoratorCall', 'callOnValue', 'iife', 'xnew', 'arrayOf', 'concat'].indexOf(model.wzParent.wzElement) > -1;
}
;
md.semicolon = function(text) {
    return verify.endsWith(text, ';') ? '' : ';';
}
;
md.unparen = function(text) {
    if (verify.isEmpty(text)) {
        return text;
    }
    var s = text.trim();
    return md.isParenEnclosed(s) ? s.substr(1, s.length - 2) : text;
}
;
md.setOperator = function(text, statements) {
    if (verify.isEmpty(text)) {
        return '';
    }
    text = text.trim();
    if (statements.length === 1 && statements[0].wzElement === 'memberAccessComputed') {
        return text + '';
    }
    var t1 = text.substr(-1, 1);
    var t2 = text.substr(-2, 2);
    if (op1.indexOf(t1) > -1) {
        return text + ' ';
    }
    if (op2.indexOf(t2) > -1) {
        return text + ' ';
    }
    return text + ' = ';
}
;
md.encloseParen = function(text) {
    var s = text.trim();
    if (md.isParenEnclosed(s) === false) {
        if (s.substr(0, 1) !== '(') {
            s = '(' + s;
        }
        if (s.substr(-1, 1) !== ')' && s.substr(-2, 2) !== ');') {
            s = s + ')';
        }
        return s;
    }
    else {
        return text;
    }
}
;
md.isGraphEnclosed = function(text) {
    if (verify.isEmpty(text)) {
        return false;
    }
    text = text.trim();
    return text.substr(0, 1) === '{' && text.substr(-1, 1) === '}';
}
;
md.isParenEnclosed = function(text) {
    if (verify.isEmpty(text)) {
        return false;
    }
    text = text.trim();
    var hasEndParens = text.substr(-1, 1) === ')' || text.substr(-2, 2) === ');';
    if (!hasEndParens || text.substr(0, 1) !== '(') {
        return false;
    }
    var count = 1,
        quote = null;
    for (var ch, i = 1; i < text.length; i++) {
        ch = text[i];
        if (ch === '"' || ch === "'") {
            if (quote === ch) {
                quote = null;
            }
            else if (quote === null) {
                quote = ch;
            }
        }
        else if (quote !== null) {
            ;
        }
        else if (ch === '(') {
            count++;
        }
        else if (ch === ')') {
            count--;
        }
        if (i < (text.length - 1) && count === 0) {
            return false;
        }
    }
    return true;
}
;
md.isQuoted = function(text) {
    if (verify.isEmpty(text) || text.length < 2) {
        return false;
    }
    return (text.substr(0, 1) === '"' && text.substr(-1, 1) === '"') || (text.substr(0, 1) === '\'' && text.substr(-1, 1) === '\'');
}
;
md.unquote = function(text) {
    if (verify.isEmpty(text) || text.length < 2) {
        return text;
    }
    if (md.isQuoted(text)) {
        return text.substr(1, text.length-2);
    }
    else {
        return text;
    }
}
;
md.checkInlineEnter = function(model, ctx) {
    if (ctx.__inlineNext) {
        ctx.inlineOn();
        model.__inlineNext = true;
        ctx.__inlineNext = false;
    }
}
;
md.checkInlineExit = function(model, ctx) {
    if (model.__inlineNext) {
        delete model.__inlineNext
        ctx.inlineOff();
    }
}
;
md.forceInlineOff = function(model, ctx) {
    if (model.__inlineNext) {
        delete model.__inlineNext
    }
    ctx.inlineOff();
}
;
var op1 = [
    '='
];
var op2 = [
    '+=', 
    '-=', 
    '/=', 
    '*='
];
var parenOp = [
    '||', 
    '>>>', 
    '>>'
];
md.getOpenParen = function(oper) {
    return parenOp.indexOf(oper) > -1 ? '(' : '';
}
;
md.getCloseParen = function(oper) {
    return parenOp.indexOf(oper) > -1 ? ')' : '';
}
;
md.getParentOfType = function(model, type) {
    var prn = model.wzParent;
    while (prn != null && prn.wzElement !== type) {
        prn = prn.wzParent;
    }
    return prn;
}
;
md.hasArguments = function(callText) {
    if (typeof(callText) !== 'string') {
        return false;
    }
    callText = callText.trim();
    // loog 'callText.substr(0, 1) ', callText.substr(0, 1)
    var hasEndParens = ((callText.substr(- (1), 1) === ')') || (callText.substr(- (2), 2) === ');'));
    // loog 'hasArguments.hasEndParens', hasEndParens
    if (!hasEndParens) {
        return false;
    }
    
    // assume regular expression
    if (callText.substr(0, 1) === '/') {
        return true;
    }
    var namecount = 0;
    var enclosedcount = 0;
    var seen = false;
    var count = 0,
        quote = null;
    for (var ch, i = 0; i < callText.length; i++) {
        ch = callText[i];
        if ((ch === '"') || (ch === "'")) {
            if (quote === ch) {
                quote = null;
            }
            else if (quote === null) {
                quote = ch;
            }
        }
        else if (quote !== null) {
            ;
        }
        else if (ch === '(') {
            seen = true;
            count++;
        }
        else if (ch === ')') {
            count--;
            if (count === 0) {
                enclosedcount++;
            }
        }
        else if (! (seen)) {
            namecount++;
        }
    }
    return seen && (namecount > 0 || enclosedcount > 1) && count == 0;
}
;
md.emitBlock = function(cnt, tag, model, items, count, ctx, callback) {
    emitBlock_begin(cnt, tag, model, items, count, ctx, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        emitBlock_end(cnt, items, ctx, count, callback)
    }
    )
}
;
function emitBlock_begin(cnt, tag, model, items, count, ctx, callback) {
    var blockIndex = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    if (ctx.values.__preserveBlock) {
        if (count > blockIndex && items[blockIndex].wzElement === 'block') {
            if (tag === 'case') {
                ctx.w(tag + ' ' + model.wzName + ': {');
                return callback(null);
            }
            else if (tag === 'else') {
                ctx.w(tag + ' {');
                return callback(null);
            }
            else {
                md.emitTest(cnt, tag, model, items, ctx, ' {', callback)
            }
        }
        else {
            if (tag === 'case') {
                ctx.w(tag + ' ' + model.wzName + ':');
                return callback(null);
            }
            else if (tag === 'else') {
                ctx.w(tag);
                return callback(null);
            }
            else {
                md.emitTest(cnt, tag, model, items, ctx, '', callback)
            }
        }
    }
    else {
        if (tag === 'case') {
            ctx.w(tag + ' ' + model.wzName + ': {');
            return callback(null);
        }
        else if (tag === 'else') {
            ctx.w(tag + ' {');
            return callback(null);
        }
        else {
            md.emitTest(cnt, tag, model, items, ctx, ' {', callback)
        }
    }
}
function emitBlock_end(cnt, items, ctx, count, callback) {
    var blockIndex = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    var from = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    cnt.genItems(items, ctx, {
        indent: true, 
        from: from
     }, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (ctx.values.__preserveBlock) {
            if (count > blockIndex && items[blockIndex].wzElement === 'block') {
                ctx.w('}');
            }
        }
        else {
            ctx.w('}');
        }
        return callback(null);
    }
    )
}
md.emitTest = function(cnt, tag, model, items, ctx, open, callback) {
    if (items.length > 0 && items[0].wzElement === 'test') {
        ctx.write(tag + ' ');
        cnt.genItem(items[0], ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.w(open);
            return callback(null);
        }
        )
    }
    else {
        ctx.w(tag + ' (' + md.unparen(model.wzName) + ')' + open);
        return callback(null);
    }
}
;
/**
     TYPESCRIPT
*/
md.isTSSimpleType = function(model) {
    return [
            'typeNumber', 
            'typeString', 
            'typeBoolean', 
            'typeAny', 
            'typeArray', 
            'typeObject', 
            'typeObjectLiteral', 
            'typeVoid', 
            'typeNull', 
            'typeUndefined', 
            'typeUnknown', 
            'typeLiteral', 
            'typeTypeof', 
            'typeReference', 
            'typeFunction', 
            'typeArrowFunction', 
            'typeUnion', 
            'typeIntersect', 
            'typeKeyOf'
        ].indexOf(model.wzElement) > -1;
}
;
md.extractTSSimpleType = function(model) {
    if (!model.statements || model.statements.length == 0) {
        return ;
    }
    var ret, retIndex;
    model.statements.some((item, index) => {
    
        // loog 'extractTSSimpleType', item.wzElement
        if (md.isTSSimpleType(item)) {
            ret = item;
            retIndex = index;
            return true;
        }
    }
    )
    if (ret) {
        model.statements.splice(retIndex, 1);
    }
    return ret;
}
;
md.extractTSParameterDecl = function(model) {
    if (!model.statements || model.statements.length == 0) {
        return ;
    }
    var ret, retIndex;
    model.statements.some((item, index) => {
    
        if (item.wzElement == 'typeParameterDecl') {
            ret = item;
            retIndex = index;
            return true;
        }
    }
    )
    if (ret) {
        model.statements.splice(retIndex, 1);
    }
    return ret;
}
;
md.extractTS = function(model, element) {
    if (!model.statements || model.statements.length == 0) {
        return ;
    }
    var ret, retIndex;
    model.statements.some((item, index) => {
    
        if (item.wzElement === element) {
            ret = item;
            retIndex = index;
            return true;
        }
    }
    )
    if (ret) {
        model.statements.splice(retIndex, 1);
    }
    return ret;
}
;
md.genParams = function(model, ctx, cnt, callback) {
    if (!!(model.params && model.params.length > 0) == false) {
        return callback(null);
    }
    // loog 'genParams enter', model.wzElement
    var len_1 = model.params.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.params[index_1];
        var p = item_1;
        // loog 'genParams p', p
        if (index_1 > 0) {
            ctx.write(', ');
        }
        // loog 'genParams', index_1, (p.statements && p.statements.length) || (p.jsPropertyOrValues && p.jsPropertyOrValues.length)
        if ((!p.statements || p.statements.length == 0) && (!p.jsPropertyOrValues || p.jsPropertyOrValues.length == 0)) {
            ctx.write(p.wzName);
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            })
        }
        else if (p.wzElement === 'objectParam' || p.wzElement === 'jsObject') {
            p.wzElement = 'jsObject';
            cnt.stm[p.wzElement](p, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                p.wzElement = 'objectParam';
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        
        // loog 'genParams.s0.wzElement', s0.wzElement
        
        // if s0.wzElement === 'typeInitValue' || s0.wzElement === 'typeCTor' || s0.wzElement === 'typeNever'
        
        // loog 'genParams.s0.statements.length', s0.statements.length
        else if (p.statements.length > 0 && p.statements.length < 3) {
            ctx.write(p.wzName);
            var s0 = p.statements[0];
            genParams_close(s0, ctx, cnt, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        // loog 'jswizzifier.genParams.p', p, 'statements', p.statements
        else {
            callback(ctx.error(myname + '.genParams.statements.length should be 0 or 1.found: ' + p.statements.length, model))
        }
    }
    repeater_1(0);
    function next_1() {
        // loog 'genParams.exit'
        return callback(null);
    }
}
;
function genParams_close(s0, ctx, cnt, callback) {
    
    // loog 'genParams_close 1 item.wzElement', item.wzElement
    if (s0.statements.length == 2) {
        var item = s0.statements[0];
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(' = ');
            var item = s0.statements[1];
            // loog 'genParams_close 2 item.wzElement', item.wzElement
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        )
    }
    // loog 'genParams_close 3 item.wzElement', s0.wzElement
    else {
        ctx.write(' = ');
        cnt.stm[s0.wzElement](s0, ctx, callback)
    }
}
md.genTSParams = function(model, ctx, cnt, callback) {
    if (!!(model.params && model.params.length > 0) == false) {
        return callback(null);
    }
    // loog 'genTSParams enter', model.wzElement
    var len_1 = model.params.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.params[index_1];
        var p = item_1;
        // loog 'genTSParams p', p
        if (index_1 > 0) {
            ctx.write(', ');
        }
        var ptype = md.extractTSSimpleType(p);
        md.genAccessorsAndExtra(p, ctx)
        // loog 'genTSParams', index_1, p.statements.length, ptype && ptype.wzElement
        if (!p.statements || p.statements.length == 0) {
            ctx.write(p.wzName);
            if (p.typeOptional) {
                ctx.write('?');
            }
            if (ptype) {
                ctx.write(': ');
                cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                )
            }
            else {
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
        }
        else if (p.wzElement === 'objectParam' || p.wzElement === 'jsObject') {
            p.wzElement = 'jsObject';
            cnt.stm[p.wzElement](p, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                p.wzElement = 'objectParam';
                if (ptype) {
                    ctx.write(': ');
                    cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        })
                    }
                    )
                }
                else {
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
            }
            )
        }
        
        // loog 'genTSParams.s0.wzElement', s0.wzElement
        
        // if s0.wzElement === 'typeInitValue' || s0.wzElement === 'typeCTor' || s0.wzElement === 'typeNever'
        
        // loog 'genTSParams.s0.statements.length', s0.statements.length
        
        // else
        
        // throw new Error('jswizzifier.genTSParams.statements[0].wzElement should be "typeInitValue or typeCTor".found: ' + s0.wzElement)
        else if (p.statements.length > 0 && p.statements.length < 3) {
            ctx.write(p.wzName);
            if (p.typeOptional) {
                ctx.write('?');
            }
            var s0 = p.statements[0];
            if (ptype) {
                ctx.write(': ');
                cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    genTSParams_close(s0, ctx, cnt, (err, notUsed) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        })
                    }
                    )
                }
                )
            }
            else {
                genTSParams_close(s0, ctx, cnt, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                )
            }
        }
        // loog 'jswizzifier.genTSParams.p', p, 'statements', p.statements
        else {
            callback(ctx.error(myname + '.genTSParams.statements.length should be 0 or 1.found: ' + p.statements.length, model))
        }
    }
    repeater_1(0);
    function next_1() {
        // loog 'genTSParams.exit'
        return callback(null);
    }
}
;
function genTSParams_close(s0, ctx, cnt, callback) {
    
    // loog 'genTSParams_close 1 item.wzElement', item.wzElement
    if (s0.statements.length == 2) {
        var item = s0.statements[0];
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.write(' = ');
            var item = s0.statements[1];
            // loog 'genTSParams_close 2 item.wzElement', item.wzElement
            cnt.stm[item.wzElement](item, ctx, callback)
        }
        )
    }
    // loog 'genTSParams_close 3 item.wzElement', s0.wzElement
    else {
        ctx.write(' = ');
        cnt.stm[s0.wzElement](s0, ctx, callback)
    }
}
md.genAccessorsAndExtra = function(model, ctx) {
    if (model.typePublic) {
        ctx.write('public ');
    }
    if (model.typeProtected) {
        ctx.write('protected ');
    }
    if (model.typePrivate) {
        ctx.write('private ');
    }
    if (model.typeReadonly) {
        ctx.write('readonly ');
    }
    if (model.typeAbstract) {
        ctx.write('abstract ');
    }
}
;
md.genTSTypeParameters = function(model, ctx, cnt, callback) {
    // loog 'model.statements.length', model.statements.length, 'Object.keys(model)', Object.keys(model)
    genTSTypeParameters_partial(model, ctx, cnt, (err, notUsed) => {
    
        if (err) {
            return callback(err);
        }
        if (model.extends && model.extends.length > 0) {
            ctx.write( ' extends ');
            var len_1 = model.extends.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.extends[index_1];
                if (index_1 > 0) {
                    ctx.write(', ');
                }
                ctx.write(item_1.wzName);
                md.genTSTypeParameterInsts(item_1, ctx, cnt, (err, notUsed) => {
                
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    })
                }
                )
            }
            repeater_1(0);
            function next_1() {
                return callback(null);
            }
        }
        else {
            return callback(null);
        }
    }
    )
}
;
function genTSTypeParameters_partial(model, ctx, cnt, callback) {
    if (model.typeParameterDecls && model.typeParameterDecls.length > 0) {
        ctx.write('<');
        var len_1 = model.typeParameterDecls.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.typeParameterDecls[index_1];
            if (index_1 > 0) {
                ctx.write(', ');
            }
            cnt.stm.typeParameterDecl(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            ctx.write('>');
            return callback(null);
        }
    }
    else {
        return callback(null);
    }
}
md.genTSTypeParameterInsts = function(model, ctx, cnt, callback) {
    // loog 'genTSTypeParameterInsts', Object.keys(model), model.typeParameterInsts
    if (model.typeParameterInsts && model.typeParameterInsts.length > 0) {
        ctx.write('<');
        var len_1 = model.typeParameterInsts.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.typeParameterInsts[index_1];
            if (index_1 > 0) {
                ctx.write(', ');
            }
            cnt.stm[item_1.wzElement](item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            ctx.write('>');
            return callback(null);
        }
    }
    else {
        return callback(null);
    }
}
;
md.indexedTSNeedsGraphs = function(model) {
    return [
            'typeMapped', 
            'typeConditional'
        ].indexOf(model.wzElement) > -1;
}
;
md.genTSDecorators = function(model, ctx, cnt, callback) {
    var decorators = [];
    var temp = [];
    var i, i_items=model.statements, i_len=model.statements.length, s;
    for (i=0; i<i_len; i++) {
        s = model.statements[i];
        if (s.wzElement == 'decorator') {
            decorators.push(s);
        }
        else {
            temp.push(s);
        }
    }
    model.statements = temp;
    if (decorators.length > 0) {
        var len_1 = decorators.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = decorators[index_1];
            cnt.stm.decorator(item_1, ctx, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                })
            }
            )
        }
        repeater_1(0);
        function next_1() {
            return callback(null);
        }
    }
    else {
        return callback(null);
    }
}
;
