/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.rdbms\.wizzi-override\lib\artifacts\rdbms\extended\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;

var md = module.exports = {};
var myname = 'wizzi.plugin.rdbms.rdbms..trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'rdbms') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "rdbms". Received: ' + model.wzElement, model))
    }
    
    try {
        transformedModel = {};
        var i, i_items=model.items, i_len=model.items.length, item;
        for (i=0; i<i_len; i++) {
            item = model.items[i];
            doitem(item, transformedModel)
        }
    } 
    catch (ex) {
        return callback(ex);
    } 
    callback(null, transformedModel);
}
;

//
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi.plugin.rdbms/lib/artifacts/rdbms/extended/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
         });
}
function doitem(parent, resultObj) {
    var f = functors[parent.wzElement];
    if (f) {
        f(parent, resultObj)
    }
}
var functors = {};
functors.namespace = function(parent, resultObj) {
    resultObj.ns = parent.wzName;
    console.log('functors.namespace', __filename);
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "author") {
            resultObj.ns_author = child.wzName;
        }
        else {
            doitem(child, resultObj)
        }
    }
    resultObj.ns = 'global';
    resultObj.ns_author = 'global';
}
;
functors.getQualified = function(ns, name) {
    return name.indexOf('.') > -1 ? name : (ns || 'global') + '.' + name;
}
;
functors.comment = function(parent, resultObj) {
    var commentObj = {
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (!fillContents(child, commentObj, resultObj)) {
        }
    }
    return commentObj;
}
;
functors.contents = function(node, parentObj, resultObj) {
    var i, i_items=node.items, i_len=node.items.length, child;
    for (i=0; i<i_len; i++) {
        child = node.items[i];
        
        // functors.contents is called when contents only are expected
        if (!fillContents(child, parentObj, resultObj)) {
        }
    }
}
;
function fillContents(node, currentObj, resultObj) {
    if (!currentObj.contents) {
        console.log('fillContents.currentObj.contents is null, kind, id', currentObj.kind, currentObj.id, __filename);
        return ;
    }
    if (node.wzElement == "text") {
        currentObj.contents.push({
            line: node.wzName
         })
    }
    else if (node.wzElement == 'img') {
        currentObj.contents.push({
            img: node.wzName
         })
    }
    else if (node.wzElement == 'quote') {
        currentObj.contents.push({
            quote: fillQuote(node, currentObj, resultObj)
         })
    }
    else if (node.wzElement == 'comment') {
        currentObj.contents.push({
            comment: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'bax') {
        currentObj.contents.push({
            bax: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'example') {
        currentObj.contents.push({
            example: functors.comment(node, resultObj)
         })
    }
    else if (node.wzElement == 'concept' && currentObj.kind == 'concept') {
        var savens = resultObj.ns;
        resultObj.ns = currentObj.id;
        functors.concept(node, resultObj)
        resultObj.ns = savens;
        currentObj.contents.push({
            concept: currentObj.id + '.' + node.wzName
         })
    }
    else if (node.wzElement == 'relatedconcept') {
        var rconceptObj = {
            kind: 'rconcept', 
            id: functors.getQualified(resultObj.ns, node.wzName), 
            contents: [
                
            ]
         };
        var i, i_items=node.items, i_len=node.items.length, child;
        for (i=0; i<i_len; i++) {
            child = node.items[i];
            if (!fillContents(child, rconceptObj, resultObj)) {
            }
            else {
            }
        }
        currentObj.contents.push(rconceptObj)
        resultObj.relations.push({
            kind: 'rconcept', 
            from: currentObj.id, 
            to: functors.getQualified(resultObj.ns, node.wzName)
         })
    }
    else if (node.wzElement == 'relatedarticle') {
        var rarticleObj = {
            kind: 'rarticle', 
            id: node.wzName, 
            contents: [
                
            ]
         };
        var i, i_items=node.items, i_len=node.items.length, child;
        for (i=0; i<i_len; i++) {
            child = node.items[i];
            if (!fillContents(child, rarticleObj, resultObj)) {
            }
            else {
            }
        }
        currentObj.contents.push(rarticleObj)
        resultObj.relations.push({
            kind: 'rarticle', 
            from: currentObj.id, 
            to: node.wzName
         })
    }
    else {
        return true;
    }
}
function fillQuote(node, currentObj, resultObj) {
    var quoteObj = {
        author: (resultObj.ns_author || 'global'), 
        lines: [
            
        ]
     };
    var i, i_items=node.items, i_len=node.items.length, child;
    for (i=0; i<i_len; i++) {
        child = node.items[i];
        if (functors.contentFields(child, quoteObj)) {
        }
        else if (child.wzElement == 'text') {
            quoteObj.lines.push(child.wzName)
        }
        else if (child.wzElement == 'img') {
            quoteObj.lines.push({
                img: child.wzName
             })
        }
        else if (child.wzElement == 'author') {
            quoteObj.author = child.wzName;
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (item.wzElement == 'text') {
                    quoteObj.lines.push(item.wzName)
                }
            }
        }
        else if (child.wzElement == 'book') {
            quoteObj.book = functors.getQualified(resultObj.ns, child.wzName);
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (functors.contentFields(item, quoteObj)) {
                }
            }
        }
        else if (child.wzElement == 'article') {
            quoteObj.article = functors.getQualified(resultObj.ns, child.wzName);
            var j, j_items=child.items, j_len=child.items.length, item;
            for (j=0; j<j_len; j++) {
                item = child.items[j];
                if (functors.contentFields(item, quoteObj)) {
                }
            }
        }
        else if (child.wzElement == 'comment') {
            quoteObj.lines.push({
                comment: functors.comment(child, resultObj)
             })
        }
        else if (child.wzElement == 'quote') {
            quoteObj.lines.push({
                quote: fillQuote(child, currentObj, resultObj)
             })
        }
        else if (child.wzElement == 'bax') {
            quoteObj.lines.push({
                bax: functors.comment(child, resultObj)
             })
        }
        else {
            quoteObj.unknown = child.wzElement + '/' + child.wzName;
        }
    }
    return quoteObj;
}
functors.period = function(field, parentObj, resultObj) {
    var periodObj = {
        title: field.wzName, 
        contents: [
            
        ]
     };
    functors.contents(field, periodObj, resultObj)
}
;
functors.contentFields = function(field, parentObj) {
    if (field.wzElement == 'page') {
        parentObj.page = field.wzName;
        return true;
    }
    else if (field.wzElement == 'eloc') {
        parentObj.eloc = field.wzName;
        return true;
    }
    else if (field.wzElement == 'epage') {
        parentObj.epage = field.wzName;
        return true;
    }
    else {
        return false;
    }
}
;
functors.book = function(parent, resultObj) {
    var bookObj = {
        id: (resultObj.ns || 'global') + '.' + parent.wzName, 
        title: null, 
        authors: [
            
        ], 
        editions: [
            
        ], 
        translations: [
            
        ], 
        reviews: [
            
        ], 
        buys: [
            
        ], 
        contents: [
            
        ]
     };
    if (resultObj.ns_author) {
        bookObj.authors.push(resultObj.ns_author)
    }
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (functors.writingfields(child, bookObj)) {
        }
        else if (child.wzElement == "datepub") {
            bookObj.datepub = child.wzName;
        }
        else if (child.wzElement == "written") {
            bookObj.written = child.wzName;
        }
        else if (child.wzElement == "index") {
            bookObj.index = [];
            var j, j_items=child.items, j_len=child.items.length, c2;
            for (j=0; j<j_len; j++) {
                c2 = child.items[j];
                if (c2.wzElement == "text") {
                    bookObj.index.push(c2.wzName)
                }
            }
        }
        else if (child.wzElement == "backcover") {
            var backcoverObj = {
                contents: [
                    
                ]
             };
            var j, j_items=child.items, j_len=child.items.length, c2;
            for (j=0; j<j_len; j++) {
                c2 = child.items[j];
                fillContents(c2, backcoverObj, resultObj);
            }
            bookObj.backcover = backcoverObj;
        }
        else if (child.wzElement == "source") {
            functors.source(child, bookObj)
        }
        else if (child.wzElement == "textabstract") {
            functors.abstract(child, bookObj, resultObj)
        }
        else if (child.wzElement == "ereader") {
            bookObj.ereader = child.wzName;
        }
        else if (child.wzElement == "buy") {
            bookObj.buys.push({
                seller: child.seller, 
                url: child.url
             })
        }
        else if (!fillContents(child, bookObj, resultObj)) {
        }
        else {
            newitems.push(child)
        }
    }
    functors.clearWritings(bookObj)
    resultObj.books.push(bookObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
    return bookObj;
}
;
functors.article = function(parent, resultObj) {
    var articleObj = {
        id: (resultObj.ns || 'global') + '.' + parent.wzName, 
        title: null, 
        authors: [
            
        ], 
        editions: [
            
        ], 
        translations: [
            
        ], 
        reviews: [
            
        ], 
        contents: [
            
        ]
     };
    if (resultObj.ns_author) {
        articleObj.authors.push(resultObj.ns_author)
    }
    var newitems = [];
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (functors.writingfields(child, articleObj)) {
        }
        else if (child.wzElement == "datepub") {
            articleObj.datepub = child.wzName;
        }
        else if (child.wzElement == "url") {
            articleObj.url = child.wzName;
        }
        else if (child.wzElement == "book") {
            articleObj.book = child.wzName;
        }
        else if (child.wzElement == "source") {
            functors.source(child, bookObj)
        }
        else if (child.wzElement == "textabstract") {
            functors.abstract(child, articleObj, resultObj)
        }
        else if (!fillContents(child, articleObj, resultObj)) {
        }
        else {
            newitems.push(child)
        }
    }
    resultObj.articles.push(articleObj)
    var i, i_items=newitems, i_len=newitems.length, child;
    for (i=0; i<i_len; i++) {
        child = newitems[i];
        doitem(child, resultObj)
    }
    functors.clearWritings(articleObj)
    return articleObj;
}
;
functors.abstract = function(field, parentObj, resultObj) {
    var abstractObj = {
        contents: [
            
        ]
     };
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        if (child.wzElement == "epage") {
            abstractObj.epage = child.wzName;
        }
        else if (child.wzElement == "eloc") {
            abstractObj.eloc = child.wzName;
        }
        else if (!fillContents(child, abstractObj, resultObj)) {
        }
        else {
        }
    }
    parentObj.abstract = abstractObj;
}
;
functors.source = function(parent, resultObj) {
    var sourceObj = {
        id: parent.wzName, 
        contents: [
            
        ]
     };
    var i, i_items=parent.items, i_len=parent.items.length, child;
    for (i=0; i<i_len; i++) {
        child = parent.items[i];
        if (child.wzElement == "title") {
            sourceObj.title = child.wzName;
        }
        else if (child.wzElement == "url") {
            sourceObj.url = child.wzName;
        }
    }
    resultObj.source = sourceObj;
}
;
functors.title = function(field, parentObj) {
    var titleObj = {
        text: null, 
        langs: [
            
        ]
     };
    titleObj.text = field.wzName;
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        functors.language(child, titleObj)
    }
    if (titleObj.langs.length == 0) {
        delete titleObj.langs
    }
    parentObj.title = titleObj;
}
;
functors.alias = function(field, parentObj) {
    if (!parentObj || !parentObj.aliases) {
        console.log('wrong alias position', field.wzName, __filename);
        return ;
    }
    var aliasObj = {
        text: null, 
        langs: [
            
        ]
     };
    aliasObj.text = field.wzName;
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        functors.language(child, aliasObj)
    }
    if (aliasObj.langs.length == 0) {
        delete aliasObj.langs
    }
    parentObj.aliases.push(aliasObj)
}
;
functors.language = function(field, parentObj) {
    if (['en','de','fr','sp'].indexOf(field.wzElement) > -1) {
        var langObj = {
            lang: field.wzElement, 
            text: field.wzName
         };
        var i, i_items=field.items, i_len=field.items.length, child;
        for (i=0; i<i_len; i++) {
            child = field.items[i];
            if (child.wzElement == 'it') {
                langObj.it = child.wzName;
            }
        }
        parentObj.langs.push(langObj)
    }
}
;
functors.edition = function(field, parentObj) {
    var edition = {
        name: field.wzName
     };
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        if (functors.writingfields(child, edition)) {
        }
    }
    return edition;
}
;
functors.translation = function(field, parentObj) {
    var translation = {
        language: field.wzName, 
        editions: [
            
        ]
     };
    var i, i_items=field.items, i_len=field.items.length, child;
    for (i=0; i<i_len; i++) {
        child = field.items[i];
        if (functors.writingfields(child, translation)) {
        }
    }
    return translation;
}
;
functors.writingfields = function(field, parentObj) {
    if (field.wzElement == 'date') {
        parentObj.date = field.wzName;
        return true;
    }
    else if (field.wzElement == 'prefator') {
        parentObj.prefator = field.wzName;
        return true;
    }
    else if (field.wzElement == 'curator') {
        parentObj.curator = field.wzName;
        return true;
    }
    else if (field.wzElement == 'page') {
        parentObj.page = field.wzName;
        return true;
    }
    else if (field.wzElement == 'e-page') {
        parentObj.epage = field.wzName;
        return true;
    }
    else if (field.wzElement == 'e-loc') {
        parentObj.eloc = field.wzName;
        return true;
    }
    else if (field.wzElement == 'in') {
        parentObj.in = field.wzName;
        return true;
    }
    else if (field.wzElement == "author") {
        parentObj.authors.push(field.wzName);
        return true;
    }
    else if (field.wzElement == "title") {
        functors.title(field, parentObj)
        return true;
    }
    else if (field.wzElement == 'edition') {
        parentObj.editions.push(functors.edition(field, parentObj))
    }
    else if (field.wzElement == 'translation') {
        parentObj.translations.push(functors.translation(field, parentObj))
    }
    else {
        return false;
    }
}
;
functors.clearWritings = function(parentObj) {
    if (parentObj.reviews && parentObj.reviews.length == 0) {
        delete parentObj.reviews
    }
    if (parentObj.contents && parentObj.contents.length == 0) {
        delete parentObj.contents
    }
    if (parentObj.buys && parentObj.buys.length == 0) {
        delete parentObj.buys
    }
    if (parentObj.editions && parentObj.editions.length == 0) {
        delete parentObj.editions
    }
    if (parentObj.translations && parentObj.translations.length == 0) {
        delete parentObj.translations
    }
}
;
