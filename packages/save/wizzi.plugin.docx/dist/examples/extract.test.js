/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.docx\.wizzi\examples\extract.test.js.ittf
    utc time: Fri, 01 Jul 2022 14:55:46 GMT
*/
'use strict';
var path = require('path');
var fs = require('fs');
var async = require('async');
var wizzi = null;
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
var errors = wizziUtils.exampleErrors;
var stringify = require('json-stringify-safe');
var ctx = {
    sequences: {
        
     }, 
    htmls: {
        
     }, 
    source: {
        
     }
 };
executeExtract([
    'Tutti a tavola', 
    'NpL-NpM', 
    'Famiglia', 
    'Bambino', 
    'Pediatra', 
    'Temi caldi', 
    'Giochi-Movimento'
], ctx)
var i, i_items=Object.keys(ctx.sequences), i_len=Object.keys(ctx.sequences).length, sequence;
for (i=0; i<i_len; i++) {
    sequence = Object.keys(ctx.sequences)[i];
    console.log(sequence, ctx.htmls[sequence]);
}
var json = buildTestJson(ctx);
file.write(path.join(__dirname, 'ittf', 'extracted', 'Test.detail.json'), stringify(json, null, 4))
function executeExtract(categories, ctx) {
    var i, i_items=categories, i_len=categories.length, cat;
    for (i=0; i<i_len; i++) {
        cat = categories[i];
        var context = file.readJSON(path.join(__dirname, 'dist', 'beba', 'test', cat + '.docx.json'));
        var j, j_items=context.items, j_len=context.items.length, item;
        for (j=0; j<j_len; j++) {
            item = context.items[j];
            var k, k_items=item.TestoJson.children, k_len=item.TestoJson.children.length, child;
            for (k=0; k<k_len; k++) {
                child = item.TestoJson.children[k];
                var itemctx = {
                    spath: [
                        
                    ], 
                    shtml: [
                        
                    ], 
                    counter: 0
                 };
                extractDeep(child, itemctx)
                ctx.sequences[itemctx.spath.join('_')] = true;
                ctx.htmls[itemctx.spath.join('_')] = itemctx.shtml.join('');
                ctx.source[itemctx.spath.join('_')] = item.Categoria + ' / ' + item.Titolo + ' / ' + item.url;
            }
        }
    }
}
function extractDeep(node, ctx) {
    if (node.name == '+' || node.name == '++') {
        return ;
    }
    ctx.spath.push(node.name);
    if (node.name == 'br') {
        ctx.shtml.push('<br />');
    }
    else {
        ctx.shtml.push('<' + node.name + '>');
    }
    if (node.value && node.value.length > 0) {
        ctx.counter++;
        ctx.spath.push('(value' + ctx.counter + ')');
        ctx.shtml.push('value ' + ctx.counter);
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        extractDeep(child, ctx)
    }
    if (node.name != 'br') {
        ctx.shtml.push('</' + node.name + '>');
    }
}
function buildTestJson(ctx) {
    var ret = {};
    ret.category = "Test";
    var items = [];
    ret.items = items;
    var i = 1;
    var i, i_items=Object.keys(ctx.sequences), i_len=Object.keys(ctx.sequences).length, sequence;
    for (i=0; i<i_len; i++) {
        sequence = Object.keys(ctx.sequences)[i];
        var Testo = ctx.htmls[sequence];
        var Abstract = ctx.htmls[sequence] + ' in ' + ctx.source[sequence];
        var newItem = {
            NWS_ID: 433, 
            NWS_FK_TNW_ID: 4, 
            NWS_FK_TCL_ID: 1, 
            NWS_FK_TPN_ID: 2, 
            SettimanaDal: "X", 
            SettimanaAl: "X", 
            Testo: Testo, 
            Abstract: Abstract, 
            Titolo: "X mesi", 
            sort: i++, 
            Categoria: "Test", 
            url: "https://cosie.lepida.it/backoffice/news/gestione/433", 
            User: "Bax", 
            NewsOrGuida: "guida"
         };
        ret.items.push(newItem)
    }
    return ret;
}
