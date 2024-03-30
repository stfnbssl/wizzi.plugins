/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.wfschema\.wizzi-override\lib\artifacts\wfschema\document\gen\bootstrap\wfschema-boot-modelDef.js.ittf
    utc time: Wed, 20 Mar 2024 07:13:55 GMT
*/
'use strict';
var util = require('util');
var BootWizziSchema = require('./wfschema-boot-model').WizziSchema;
var md = module.exports = {};
md.createInstance = function() {
    var wfschema = new BootWizziSchema('wfschema');
    // wfschema
    var e_wfschema = wfschema.addElement("wfschema", {});
    e_wfschema.xmlTagInternal = "wfschema";
    var e_wfschema_preserveTags = e_wfschema.addAttribute("preserveTags", {});
    e_wfschema_preserveTags.type = "boolean";
    e_wfschema_preserveTags.default = "false";
    e_wfschema_preserveTags.tagInternal = "preserve-tags";
    e_wfschema_preserveTags.defaultWhenDeclared = "true";
    var e_wfschema_unknownElementReplacer = e_wfschema.addAttribute("unknownElementReplacer", {});
    e_wfschema_unknownElementReplacer.tagInternal = "unknown-element-replacer";
    var e_wfschema_mTreeIsPreprocessed = e_wfschema.addAttribute("mTreeIsPreprocessed", {});
    e_wfschema_mTreeIsPreprocessed.type = "boolean";
    e_wfschema_mTreeIsPreprocessed.default = "false";
    e_wfschema_mTreeIsPreprocessed.tagInternal = "mtree-is-preprocessed";
    e_wfschema_mTreeIsPreprocessed.defaultWhenDeclared = "true";
    // element
    var e_element = wfschema.addElement("element", {});
    e_element.tagInternal = "e";
    e_element.xmlTagInternal = "element";
    var e_element_super = e_element.addAttribute("super", {});
    var e_element_isAbstract = e_element.addAttribute("isAbstract", {});
    e_element_isAbstract.type = "boolean";
    e_element_isAbstract.default = "false";
    e_element_isAbstract.tagInternal = "is-abstract";
    e_element_isAbstract.defaultWhenDeclared = "true";
    var e_element_isRoot = e_element.addAttribute("isRoot", {});
    e_element_isRoot.type = "boolean";
    e_element_isRoot.default = "false";
    e_element_isRoot.tagInternal = "is-root";
    e_element_isRoot.defaultWhenDeclared = "true";
    var e_element_tagInternal = e_element.addAttribute("tagInternal", {});
    e_element_tagInternal.tagInternal = "tag";
    var e_element_xmlTagInternal = e_element.addAttribute("xmlTagInternal", {});
    e_element_xmlTagInternal.tagInternal = "xml-tag";
    var e_element_acceptAnyTag = e_element.addAttribute("acceptAnyTag", {});
    e_element_acceptAnyTag.tagInternal = "any";
    var e_element_nameIsRequired = e_element.addAttribute("nameIsRequired", {});
    e_element_nameIsRequired.type = "boolean";
    e_element_nameIsRequired.default = "false";
    e_element_nameIsRequired.tagInternal = "name-is-required";
    e_element_nameIsRequired.defaultWhenDeclared = "true";
    var e_element_addToChildren = e_element.addAttribute("addToChildren", {});
    e_element_addToChildren.type = "boolean";
    e_element_addToChildren.default = "false";
    e_element_addToChildren.tagInternal = "add-to-children";
    e_element_addToChildren.defaultWhenDeclared = "true";
    var e_element_hasMTreeData = e_element.addAttribute("hasMTreeData", {});
    e_element_hasMTreeData.type = "boolean";
    e_element_hasMTreeData.default = "false";
    e_element_hasMTreeData.tagInternal = "has-mtree-data";
    e_element_hasMTreeData.defaultWhenDeclared = "true";
    var e_element_suppressCollectionEmit = e_element.addAttribute("suppressCollectionEmit", {});
    e_element_suppressCollectionEmit.type = "boolean";
    e_element_suppressCollectionEmit.default = "false";
    e_element_suppressCollectionEmit.tagInternal = "suppress-collection-emit";
    e_element_suppressCollectionEmit.defaultWhenDeclared = "true";
    // attribute
    var e_attribute = wfschema.addElement("attribute", {});
    e_attribute.tagInternal = "a";
    e_attribute.xmlTagInternal = "attribute";
    var e_attribute_tagInternal = e_attribute.addAttribute("tagInternal", {});
    e_attribute_tagInternal.tagInternal = "tag";
    var e_attribute_type = e_attribute.addAttribute("type", {});
    e_attribute_type.default = "string";
    var e_attribute_default = e_attribute.addAttribute("default", {});
    e_attribute_default.tagInternal = "default";
    var e_attribute_calculated = e_attribute.addAttribute("calculated ", {});
    var e_attribute_isRequired = e_attribute.addAttribute("isRequired", {});
    e_attribute_isRequired.type = "boolean";
    e_attribute_isRequired.default = "false";
    e_attribute_isRequired.tagInternal = "is-required";
    e_attribute_isRequired.defaultWhenDeclared = "true";
    var e_attribute_isDataType = e_attribute.addAttribute("isDataType", {});
    e_attribute_isDataType.type = "boolean";
    e_attribute_isDataType.default = "false";
    e_attribute_isDataType.tagInternal = "is-datatype";
    e_attribute_isDataType.defaultWhenDeclared = "true";
    var e_attribute_defaultWhenDeclared = e_attribute.addAttribute("defaultWhenDeclared", {});
    e_attribute_defaultWhenDeclared.tagInternal = "default-when-declared";
    // restrict
    var e_restrict = wfschema.addElement("restrict", {});
    e_restrict.xmlTagInternal = "restrict";
    var e_restrict_nameIsRequired = e_restrict.addAttribute("nameIsRequired", {});
    e_restrict_nameIsRequired.type = "boolean";
    e_restrict_nameIsRequired.default = "false";
    e_restrict_nameIsRequired.tagInternal = "name-is-required";
    e_restrict_nameIsRequired.defaultWhenDeclared = "true";
    // facet
    var e_facet = wfschema.addElement("facet", {});
    e_facet.IsAbstract = "true";
    e_facet.xmlTagInternal = "facet";
    // enumFacet
    var e_enumFacet = wfschema.addElement("enumFacet", {});
    e_enumFacet.tagInternal = "enum";
    e_enumFacet.super = "facet";
    e_enumFacet.xmlTagInternal = "enumFacet";
    // maxLengthFacet
    var e_maxLengthFacet = wfschema.addElement("maxLengthFacet", {});
    e_maxLengthFacet.tagInternal = "max-length";
    e_maxLengthFacet.super = "facet";
    e_maxLengthFacet.xmlTagInternal = "maxLengthFacet";
    // minLengthFacet
    var e_minLengthFacet = wfschema.addElement("minLengthFacet", {});
    e_minLengthFacet.tagInternal = "min-length";
    e_minLengthFacet.super = "facet";
    e_minLengthFacet.xmlTagInternal = "minLengthFacet";
    // relation
    var e_relation = wfschema.addElement("relation", {});
    e_relation.tagInternal = "r";
    e_relation.xmlTagInternal = "relation";
    var e_relation_noGetMethod = e_relation.addAttribute("noGetMethod", {});
    e_relation_noGetMethod.type = "boolean";
    e_relation_noGetMethod.default = "false";
    e_relation_noGetMethod.tagInternal = "no-get";
    e_relation_noGetMethod.defaultWhenDeclared = "true";
    var e_relation_hasAddOnce = e_relation.addAttribute("hasAddOnce", {});
    e_relation_hasAddOnce.type = "boolean";
    e_relation_hasAddOnce.default = "false";
    e_relation_hasAddOnce.tagInternal = "add-once";
    e_relation_hasAddOnce.defaultWhenDeclared = "true";
    var e_relation_isOneToOne = e_relation.addAttribute("isOneToOne", {});
    e_relation_isOneToOne.type = "boolean";
    e_relation_isOneToOne.default = "false";
    e_relation_isOneToOne.tagInternal = "one-to-one";
    e_relation_isOneToOne.defaultWhenDeclared = "true";
    // property
    var e_property = wfschema.addElement("property", {});
    e_property.tagInternal = "p";
    e_property.xmlTagInternal = "property";
    var e_property_emitkey = e_property.addAttribute("emitkey", {});
    // declare
    var e_declare = wfschema.addElement("declare", {});
    e_declare.tagInternal = "declare";
    e_declare.xmlTagInternal = "declare";
    // method
    var e_method = wfschema.addElement("method", {});
    e_method.tagInternal = "m";
    e_method.xmlTagInternal = "method";
    var e_method_emitkey = e_method.addAttribute("emitKey", {});
    e_method_emitkey.tagInternal = "emit-key";
    // param
    var e_param = wfschema.addElement("param", {});
    e_param.xmlTagInternal = "param";
    var e_param_type = e_param.addAttribute("type", {});
    // exportTo
    var e_exportTo = wfschema.addElement("exportTo", {});
    e_exportTo.tagInternal = "export-to";
    e_exportTo.xmlTagInternal = "exportTo";
    // require
    var e_require = wfschema.addElement("require", {});
    e_require.xmlTagInternal = "require";
    var e_require_kind = e_require.addAttribute("kind", {});
    var e_require_invoke = e_require.addAttribute("invoke", {});
    var e_require_declareVar = e_require.addAttribute("declareVar", {});
    e_require_declareVar.tagInternal = "declare-var";
    // include
    var e_include = wfschema.addElement("include", {});
    e_include.xmlTagInternal = "include";
    // comment
    var e_comment = wfschema.addElement("comment", {});
    e_comment.tagInternal = "#";
    e_comment.xmlTagInternal = "comment";
    // statement
    var e_statement = wfschema.addElement("statement", {});
    e_statement.xmlTagInternal = "statement";
    // codeline
    var e_codeline = wfschema.addElement("codeline", {});
    e_codeline.tagInternal = "+";
    e_codeline.super = "statement";
    // var
    var e_var = wfschema.addElement("var", {});
    e_var.tagInternal = "var";
    e_var.super = "statement";
    e_var.xmlTagInternal = "var";
    // decl
    var e_decl = wfschema.addElement("decl", {});
    e_decl.tagInternal = "decl";
    e_decl.super = "statement";
    e_decl.xmlTagInternal = "decl";
    // set
    var e_set = wfschema.addElement("set", {});
    e_set.super = "statement";
    // call
    var e_call = wfschema.addElement("call", {});
    e_call.tagInternal = "_";
    e_call.super = "statement";
    // function
    var e_function = wfschema.addElement("function", {});
    e_function.tagInternal = "function";
    e_function.super = "statement";
    // return
    var e_return = wfschema.addElement("return", {});
    e_return.tagInternal = "return";
    e_return.super = "statement";
    // new
    var e_new = wfschema.addElement("new", {});
    e_new.tagInternal = "new";
    e_new.super = "statement";
    // if
    var e_if = wfschema.addElement("if", {});
    e_if.tagInternal = "if";
    e_if.super = "statement";
    // elif
    var e_elif = wfschema.addElement("elif", {});
    e_elif.super = "statement";
    // else
    var e_else = wfschema.addElement("else", {});
    e_else.tagInternal = "else";
    e_else.super = "statement";
    // for
    var e_for = wfschema.addElement("for", {});
    e_for.tagInternal = "for";
    e_for.super = "statement";
    // break
    var e_break = wfschema.addElement("break", {});
    e_break.tagInternal = "break";
    e_break.super = "statement";
    // continue
    var e_continue = wfschema.addElement("continue", {});
    e_continue.tagInternal = "continue";
    e_continue.super = "statement";
    // foreach
    var e_foreach = wfschema.addElement("foreach", {});
    e_foreach.super = "statement";
    // while
    var e_while = wfschema.addElement("while", {});
    e_while.tagInternal = "while";
    e_while.super = "statement";
    // do
    var e_dowhile = wfschema.addElement("do", {});
    e_dowhile.tagInternal = "do";
    e_dowhile.super = "statement";
    // switch
    var e_switch = wfschema.addElement("switch", {});
    e_switch.tagInternal = "switch";
    e_switch.super = "statement";
    // case
    var e_case = wfschema.addElement("case", {});
    e_case.tagInternal = "case";
    e_case.super = "statement";
    // default
    var e_default = wfschema.addElement("default", {});
    e_default.tagInternal = "default";
    e_default.super = "statement";
    // try
    var e_try = wfschema.addElement("try", {});
    e_try.tagInternal = "try";
    e_try.super = "statement";
    // catch
    var e_catch = wfschema.addElement("catch", {});
    e_catch.tagInternal = "catch";
    e_catch.super = "statement";
    // finally
    var e_finally = wfschema.addElement("finally", {});
    e_finally.tagInternal = "finally";
    e_finally.super = "statement";
    // throw
    var e_throw = wfschema.addElement("throw", {});
    e_throw.tagInternal = "throw";
    e_throw.super = "statement";
    // log
    var e_log = wfschema.addElement("log", {});
    e_log.super = "statement";
    // jsArray
    var e_jsArray = wfschema.addElement("jsArray", {});
    e_jsArray.tagInternal = "[";
    e_jsArray.super = "statement";
    // jsObject
    var e_jsObject = wfschema.addElement("jsObject", {});
    e_jsObject.tagInternal = "{";
    e_jsObject.super = "statement";
    // jsPropertyOrValue
    var e_jsPropertyOrValue = wfschema.addElement("jsPropertyOrValue", {});
    e_jsPropertyOrValue.tagInternal = "@";
    e_jsPropertyOrValue.super = "statement";
    var r_wfschema_require = e_wfschema.addRelation("require", {});
    r_wfschema_require.childRole = "requires";
    r_wfschema_require.rightElement = e_require;
    var r_wfschema_element = e_wfschema.addRelation("element", {});
    r_wfschema_element.childRole = "elements";
    r_wfschema_element.rightElement = e_element;
    var r_wfschema_declare = e_wfschema.addRelation("declare", {});
    r_wfschema_declare.childRole = "declares";
    r_wfschema_declare.rightElement = e_declare;
    var r_wfschema_method = e_wfschema.addRelation("method", {});
    r_wfschema_method.childRole = "methods";
    r_wfschema_method.rightElement = e_method;
    var r_wfschema_exportTo = e_wfschema.addRelation("exportTo", {});
    r_wfschema_exportTo.childRole = "exportTos";
    r_wfschema_exportTo.rightElement = e_exportTo;
    var r_wfschema_comment = e_wfschema.addRelation("comment", {});
    r_wfschema_comment.childRole = "comments";
    r_wfschema_comment.rightElement = e_comment;
    var r_element_attribute = e_element.addRelation("attribute", {});
    r_element_attribute.childRole = "attributes";
    r_element_attribute.rightElement = e_attribute;
    var r_element_relation = e_element.addRelation("relation", {});
    r_element_relation.childRole = "relations";
    r_element_relation.rightElement = e_relation;
    var r_element_restrict = e_element.addRelation("restrict", {});
    r_element_restrict.childRole = "restricts";
    r_element_restrict.rightElement = e_restrict;
    var r_element_property = e_element.addRelation("property", {});
    r_element_property.childRole = "properties";
    r_element_property.rightElement = e_property;
    var r_element_method = e_element.addRelation("method", {});
    r_element_method.childRole = "methods";
    r_element_method.rightElement = e_method;
    var r_element_include = e_element.addRelation("include", {});
    r_element_include.childRole = "includes";
    r_element_include.rightElement = e_include;
    var r_element_comment = e_element.addRelation("comment", {});
    r_element_comment.childRole = "comments";
    r_element_comment.rightElement = e_comment;
    var r_attribute_restrict = e_attribute.addRelation("restrict", {});
    r_attribute_restrict.childRole = "restricts";
    r_attribute_restrict.rightElement = e_restrict;
    var r_attribute_comment = e_attribute.addRelation("comment", {});
    r_attribute_comment.childRole = "comments";
    r_attribute_comment.rightElement = e_comment;
    var r_restrict_facet = e_restrict.addRelation("facet", {});
    r_restrict_facet.childRole = "facets";
    r_restrict_facet.rightElement = e_facet;
    var r_restrict_comment = e_restrict.addRelation("comment", {});
    r_restrict_comment.childRole = "comments";
    r_restrict_comment.rightElement = e_comment;
    var r_enumFacet_comment = e_enumFacet.addRelation("comment", {});
    r_enumFacet_comment.childRole = "comments";
    r_enumFacet_comment.rightElement = e_comment;
    var r_maxLengthFacet_comment = e_maxLengthFacet.addRelation("comment", {});
    r_maxLengthFacet_comment.childRole = "comments";
    r_maxLengthFacet_comment.rightElement = e_comment;
    var r_minLengthFacet_comment = e_minLengthFacet.addRelation("comment", {});
    r_minLengthFacet_comment.childRole = "comments";
    r_minLengthFacet_comment.rightElement = e_comment;
    var r_relation_comment = e_relation.addRelation("comment", {});
    r_relation_comment.childRole = "comments";
    r_relation_comment.rightElement = e_comment;
    var r_property_statement = e_property.addRelation("statement", {});
    r_property_statement.childRole = "statements";
    r_property_statement.rightElement = e_statement;
    var r_property_comment = e_property.addRelation("comment", {});
    r_property_comment.childRole = "comments";
    r_property_comment.rightElement = e_comment;
    var r_method_param = e_method.addRelation("param", {});
    r_method_param.childRole = "params";
    r_method_param.rightElement = e_param;
    var r_method_require = e_method.addRelation("require", {});
    r_method_require.childRole = "requires";
    r_method_require.rightElement = e_require;
    var r_method_statement = e_method.addRelation("statement", {});
    r_method_statement.childRole = "statements";
    r_method_statement.rightElement = e_statement;
    var r_method_comment = e_method.addRelation("comment", {});
    r_method_comment.childRole = "comments";
    r_method_comment.rightElement = e_comment;
    var r_param_comment = e_param.addRelation("comment", {});
    r_param_comment.childRole = "comments";
    r_param_comment.rightElement = e_comment;
    var r_require_comment = e_require.addRelation("comment", {});
    r_require_comment.childRole = "comments";
    r_require_comment.rightElement = e_comment;
    var r_statement_statement = e_statement.addRelation("statement", {});
    r_statement_statement.childRole = "statements";
    r_statement_statement.rightElement = e_statement;
    var r_function_param = e_function.addRelation("param", {});
    r_function_param.childRole = "params";
    r_function_param.rightElement = e_param;
    var ctx = {
        error: function(msg, node) {
            throw new Error(msg + '\n' + util.inspect(node, { depth: 2}));
        }
     };
    wfschema.wzSetup(ctx);
    wfschema.wzVerify(ctx);
    wfschema.wzInitialize(ctx);
    return wfschema;
}
;
