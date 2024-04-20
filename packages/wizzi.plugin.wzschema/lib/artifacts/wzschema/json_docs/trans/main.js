/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wzschema\.wizzi-override\lib\artifacts\wzschema\json_docs\trans\main.js.ittf
    utc time: Fri, 19 Apr 2024 09:19:00 GMT
*/
'use strict';


var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;
var lineParser = verify.lineParser;
var errors = require('../../../../../errors');
var _ = require('lodash');
var utilsErrors = require('@wizzi/utils').errors;
var BootWizziSchema = require('../../bootstrap/wfschema-boot-model').WizziSchema;
// taken from C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\wizzi\models\js-model.g.js
var js__tagElementMapping = { '+': 'statement', '#': 'comment', '##': 'commentmultiline', 'module': 'xmodule', '++': 'statementmultiline', 'var': 'xvar', 'wz-var': 'wzVar', 'wzvar': 'wzVar', 'const': 'xconst', 'wz-const': 'wzConst', 'wzconst': 'wzConst', 'let': 'xlet', '=': 'initValue', '@id': 'identifier', '@expr': 'expressionMember', 'void': 'xvoid', 'op!': 'not', '!!': 'notnot', '||': 'or', 'op||': 'or', '&&': 'and', 'op&&': 'and', '??': 'op_nullish', 'op??': 'op_nullish', '===': 'op_eq_strict', 'op===': 'op_eq_strict', '!==': 'op_noteq_strict', 'op!==': 'op_noteq_strict', '==': 'op_eq', 'op==': 'op_eq', '!=': 'op_noteq', 'op!=': 'op_noteq', 'minus': 'op_minus', 'op-': 'op_minus', 'op': 'op_minus', 'plus': 'op_plus', 'op+': 'op_plus', 'times': 'op_times', 'op*': 'op_times', 'divide': 'op_div', 'op/': 'op_div', 'power': 'op_power', 'op**': 'op_power', 'mod': 'op_mod', 'op&': 'bit_and', 'op|': 'bit_or', 'xor': 'op_xor', 'op^': 'op_xor', 'xand': 'op_xand', 'op~': 'bit_not', 'op<<': 'bit_left_shift', 'op>>': 'bit_right_shift', 'op>>>': 'zero_fill_right_shift', 'gt': 'op_gt', 'op>': 'op_gt', '>=': 'op_ge', 'op>=': 'op_ge', 'lt': 'op_lt', 'op<': 'op_lt', '<=': 'op_le', 'op<=': 'op_le', 'typeof': 'op_typeof', 'optypeof': 'op_typeof', 'require': 'xrequire', 'import': 'ximport', 'export': 'xexport', 'export-default': 'exportDefault', 'exportdefault': 'exportDefault', 'if': 'xif', 'else': 'xelse', 'for': 'xfor', 'left': 'xleft', 'of': 'xof', 'in': 'xin', 'break': 'xbreak', 'continue': 'xcontinue', 'while': 'xwhile', 'do': 'xdo', 'switch': 'xswitch', 'case': 'xcase', 'default': 'xdefault', 'try': 'xtry', 'catch': 'xcatch', 'finally': 'xfinally', 'throw': 'xthrow', 'delete': 'xdelete', ':param': 'typeParameterInst', '_': 'call', '._': 'memberCall', '@_': 'decoratorCall', '(': 'callOnValue', '.': 'memberAccess', '.[': 'memberAccessComputed', '{': 'jsObject', '[': 'jsArray', '@': 'jsPropertyOrValue', '@[': 'jsPropertyOrValueComputed', '...': 'jsRest', ':': 'namedCallParam', 'jst': 'jsonStatementTree', 'function': 'xfunction', 'wz-iife': 'wzIife', 'wziife': 'wzIife', '=>': 'arrowfunction', 'async=>': 'asyncarrowfunction', 'function*': 'generatorfunction', 'async-function': 'asyncfunction', 'm': 'method', 'wz-function': 'wzFunction', 'wzfunction': 'wzFunction', 'yield': 'xyield', 'await': 'xawait', 'return': 'xreturn', 'class': 'xclass', 'wz-class': 'wzClass', 'wzclass': 'wzClass', 'new': 'xnew', '`lit': 'template', '`tag': 'taggedTemplate', '_`': 'tagFunctionCall', 'macro': 'macroExpr', 'react': 'reactComponent', 'react-f': 'reactFunction', 'reactf': 'reactFunction', 'set-state': 'setState', 'setstate': 'setState', 'will-mount': 'willMount', 'willmount': 'willMount', 'did-mount': 'didMount', 'didmount': 'didMount', 'will-unmount': 'willUnmount', 'willunmount': 'willUnmount', 'should-update': 'shouldUpdate', 'shouldupdate': 'shouldUpdate', 'did-update': 'didUpdate', 'didupdate': 'didUpdate', 'will-update': 'willUpdate', 'willupdate': 'willUpdate', 'will-receive-props': 'willReceiveProps', 'willreceiveprops': 'willReceiveProps', 'event': 'htmlevent', '<': 'htmlelement', 'style-jsx': 'styleJsx', 'stylejsx': 'styleJsx', 'styled-css': 'styledCss', 'styledcss': 'styledCss', '@param': 'htmlParam', '@filter': 'htmlFilter', 'wz-require': 'wzRequire', 'wzrequire': 'wzRequire', 'graphql-query': 'graphqlQuery', 'graphqlquery': 'graphqlQuery', 'graphql-mutation': 'graphqlMutation', 'graphqlmutation': 'graphqlMutation', '{{': 'handlebar', 'log?': 'inspect', 'it-async': 'itAsync', 'itasync': 'itAsync', 'before-async': 'beforeAsync', 'beforeasync': 'beforeAsync', 'before-each': 'beforeEach', 'beforeeach': 'beforeEach', 'after-async': 'afterAsync', 'afterasync': 'afterAsync', 'after-each': 'afterEach', 'aftereach': 'afterEach', 'enum': 'enumFacet', 'max-length': 'maxLengthFacet', 'maxlength': 'maxLengthFacet', 'min-length': 'minLengthFacet', 'minlength': 'minLengthFacet', 'max-value': 'maxValueFacet', 'maxvalue': 'maxValueFacet', 'min-value': 'minValueFacet', 'minvalue': 'minValueFacet', 'range': 'rangeFacet', 'regexp': 'regexpFacet', 'array-of': 'arrayOf', 'arrayof': 'arrayOf', 'instance-of': 'instanceOf', 'instanceof': 'instanceOf', 'one-of': 'oneOf', 'oneof': 'oneOf', 'one-of-type': 'oneOfType', 'oneoftype': 'oneOfType', 'string': 'stringParam', 'boolean': 'booleanParam', 'number': 'numberParam', 'date': 'dateParam', 'func': 'functionParam', 'symbol': 'symbolParam', 'node': 'nodeParam', 'element': 'elementParam', 'exact': 'exactParam', 'any': 'anyParam', 'callback': 'callbackParam', 'options-callback': 'optionsCallbackParam', 'optionscallback': 'optionsCallbackParam', '[{': 'arrayOrObjectParam', 'react-style': 'reactStyleParam', 'reactstyle': 'reactStyleParam', 'shape': 'shapeParam' };

var md = module.exports = {};
var myname = 'wizzi.plugin.wzschema.wzschema.schemaboot.trans.main';

md.trans = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'wzschema') {
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "wzschema". Received: ' + model.wzElement, model));
    }
    
    try {
        var bootWizziModel = new BootWizziSchema(model.wzName);
        bootWizziModel.loadFromWizziModel(model, ctx, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            ctx.result = {
                name: bootWizziModel.wzName, 
                preserveTags: bootWizziModel.preserveTags
             };
            md.wfschema(bootWizziModel, ctx);
            callback(null, ctx.result);
        }
        )
    } 
    catch (ex) {
        return callback(ex);
    } 
}
;

/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.wzschema/lib/artifacts/wzschema/schemaboot/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
md.wfschema = function(model, ctx, parent) {
    ctx.result.requires = [];
    ctx.result.exportTos = [];
    ctx.result.elements = [];
    var i, i_items=model.exportTos, i_len=model.exportTos.length, exportTo;
    for (i=0; i<i_len; i++) {
        exportTo = model.exportTos[i];
        md.exportTo(exportTo, ctx, ctx.result);
    }
    var i, i_items=model.elements, i_len=model.elements.length, element;
    for (i=0; i<i_len; i++) {
        element = model.elements[i];
        md.element(element, ctx, ctx.result);
    }
}
;
md.exportTo = function(model, ctx, parent) {
    parent.exportTos.push(model.wzName);
}
;
md.element = function(model, ctx, parent) {
    var flags = '';
    flags += model.isAbstract ? 'is-abstract ' : '';
    flags += model.addToChildren ? 'add-to-children ' : '';
    var tagEscaped = verify.replaceAll(model.tagName, '\\|', '__&%%&__');
    var tagsEscaped = tagEscaped.split('|');
    var tags = [];
    var i, i_items=tagsEscaped, i_len=tagsEscaped.length, tag;
    for (i=0; i<i_len; i++) {
        tag = tagsEscaped[i];
        tags.push(verify.replaceAll(tag, '__&%%&__', '|'))
    }
    var node = {
        name: model.wzId, 
        super: model.superId, 
        isRoot: model.isRoot, 
        tags: tags, 
        flags: flags, 
        attributes: [], 
        relations: [], 
        derived: [], 
        restricts: [], 
        methods: [], 
        comments: []
     };
    var flatAttributes = model.getFlatAttributes();
    var i, i_items=flatAttributes, i_len=flatAttributes.length, attr;
    for (i=0; i<i_len; i++) {
        attr = flatAttributes[i];
        node.attributes.push(attr);
    }
    var flatRelations = model.getFlatRelations();
    var i, i_items=flatRelations, i_len=flatRelations.length, r;
    for (i=0; i<i_len; i++) {
        r = flatRelations[i];
        node.relations.push(r);
    }
    var i, i_items=model.derived, i_len=model.derived.length, d;
    for (i=0; i<i_len; i++) {
        d = model.derived[i];
        var tagEscaped = verify.replaceAll(d.tagName, '\\|', '__&%%&__');
        var tagsEscaped = tagEscaped.split('|');
        var tags = [];
        var j, j_items=tagsEscaped, j_len=tagsEscaped.length, tag;
        for (j=0; j<j_len; j++) {
            tag = tagsEscaped[j];
            tags.push(verify.replaceAll(tag, '__&%%&__', '|'))
        }
        node.derived.push({
            name: d.wzId, 
            tags: tags
         })
    }
    var i, i_items=model.methods, i_len=model.methods.length, m;
    for (i=0; i<i_len; i++) {
        m = model.methods[i];
        var methodNode = {
            name: m.wzName, 
            emitKey: m.emitKey, 
            isStatic: m.isStatic, 
            isKnownMethod: m.isKnownMethod, 
            params: [], 
            statements: [], 
            comments: []
         };
        var j, j_items=m.params, j_len=m.params.length, param;
        for (j=0; j<j_len; j++) {
            param = m.params[j];
            methodNode.params.push(param.wzName);
        }
        var j, j_items=m.statements, j_len=m.statements.length, stm;
        for (j=0; j<j_len; j++) {
            stm = m.statements[j];
            var k, k_items=normalizeJST(stm.wzName), k_len=normalizeJST(stm.wzName).length, item;
            for (k=0; k<k_len; k++) {
                item = normalizeJST(stm.wzName)[k];
                methodNode.statements.push(item);
            }
        }
        var j, j_items=m.comments, j_len=m.comments.length, comment;
        for (j=0; j<j_len; j++) {
            comment = m.comments[j];
            methodNode.comments.push(comment.wzName);
        }
        node.methods.push(methodNode);
    }
    var i, i_items=model.restricts, i_len=model.restricts.length, restrict;
    for (i=0; i<i_len; i++) {
        restrict = model.restricts[i];
        node.restricts.push(getRestrictFill(restrict));
    }
    var i, i_items=model.comments, i_len=model.comments.length, comment;
    for (i=0; i<i_len; i++) {
        comment = model.comments[i];
        node.comments.push(comment.wzName);
    }
    parent.elements.push(node);
}
;
function getRestrictFill(model) {
    var restrictCloned = {
        facets: [], 
        comments: []
     };
    var i, i_items=model.facets, i_len=model.facets.length, facet;
    for (i=0; i<i_len; i++) {
        facet = model.facets[i];
        var facetCloned = {
            type: facet.wzElement, 
            value: facet.wzName, 
            comments: []
         };
        var j, j_items=facet.comments, j_len=facet.comments.length, comment;
        for (j=0; j<j_len; j++) {
            comment = facet.comments[j];
            facetCloned.comments.push(comment.wzName);
        }
        restrictCloned.facets.push(facetCloned);
    }
    var i, i_items=model.comments, i_len=model.comments.length, comment;
    for (i=0; i<i_len; i++) {
        comment = model.comments[i];
        restrictCloned.comments.push(comment.wzName);
    }
    return restrictCloned;
}
function normalizeJST(stm) {
    var json = JSON.parse(stm);
    var ret = [];
    if (verify.isArray(json)) {
        var i, i_items=json, i_len=json.length, item;
        for (i=0; i<i_len; i++) {
            item = json[i];
            ret.push(normalizeJSTNode(item));
        }
    }
    else {
        ret.push(normalizeJSTNode(json));
    }
    return ret;
}
function normalizeJSTNode(jstnode) {
    var node = {
        tag: jstnode.n, 
        name: jstnode.n, 
        value: jstnode.v, 
        statements: []
     };
    if (js__tagElementMapping[jstnode.n]) {
        node.name = js__tagElementMapping[jstnode.n];
    }
    if (jstnode.children) {
        var i, i_items=jstnode.children, i_len=jstnode.children.length, item;
        for (i=0; i<i_len; i++) {
            item = jstnode.children[i];
            node.statements.push(normalizeJSTNode(item));
        }
    }
    return node;
}
