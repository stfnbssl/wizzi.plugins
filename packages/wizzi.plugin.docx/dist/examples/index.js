/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.plugin.docx\.wizzi\ittf\examples\index.js.ittf
    utc time: Sat, 27 Feb 2021 10:21:40 GMT
*/
'use strict';
const normal_JUSTIFIED = false;
const H2_Size = 28;
const Big_Size = 24;
const Normal_Size = 24;
const P_spacing_before = 20 * 72 * 0.05;
const P_spacing_before_h2 = 20 * 72 * 0.2;
const P_spacing_after = 20 * 72 * 0.025;
const P_spacing_after_h2 = 20 * 72 * 0.1;
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
// var wizziTools = require('wizzi-tools')
var wizziTools = require('../../../wizzi-tools/dist/index');
function executeExample() {
    executeGenerateModules([
        'Tutti a tavola', 
        'NpL-NpM', 
        'Famiglia', 
        'Bambino', 
        'Pediatra', 
        'Temi caldi', 
        'Giochi-Movimento'
    ], function(err, result) {
        if (err) {
            console.log('docx.examples.executeGenerateModules.err', err);
            console.log('docx.examples.executeGenerateModules.err.toString()', err.toString());
            if (err.inner) {
                console.log('docx.examples.executeGenerateModules.err.inner.toString()', err.inner.toString());
            }
        }
        else {
            // log 'docx.examples.executeGenerateModules.result', result
        }
    })
    function executeGenerateModules(modules, callback) {
        async.mapSeries(modules, (moduleFileName, callback) => {
            var context = file.readJSON(path.join(__dirname, 'ittf', 'extracted', moduleFileName + '.detail.json'));
            context.items.sort(sortItems);
            // log 'context', context
            transformContext(context, function(err, context) {
                if (err) {
                    return callback(err);
                }
                // log 'context', context
                var outputPath = path.join(__dirname, 'dist', 'beba', moduleFileName + '.docx.js');
                var outputPathJson = path.join(__dirname, 'dist', 'beba', 'test', moduleFileName + '.docx.json');
                var outputPathDebugTxt = path.join(__dirname, 'dist', 'beba', 'test', moduleFileName + '.docx.debug.txt');
                var outputPathBuildUpIttf = path.join(__dirname, 'dist', 'beba', 'test', moduleFileName + '.docx.buildup.ittf');
                file.write(outputPathJson, stringify(context, null, 4))
                var sb = [];
                buildBeginDocxIttf("beba", sb)
                buildHyperlinks(context, 1, sb)
                buildIttfLine('section', '', 1, sb)
                var i, i_items=context.items, i_len=context.items.length, article;
                for (i=0; i<i_len; i++) {
                    article = context.items[i];
                    if (article.NewsOrGuida == 'guida') {
                        buildItemDocxIttf(article, 2, sb)
                    }
                }
                var ittfText = sb.join('\n');
                file.write(outputPathBuildUpIttf, ittfText)
                loadModelAndGenerateArtifactFromText(ittfText, {
                    category: context.category
                }, 'docx/document', function(err, artifactText) {
                    if (err) {
                        return callback(err);
                    }
                    file.write(outputPath, artifactText)
                    console.log('Generated dcox script', outputPath);
                    return callback(null, artifactText);
                })
            })
        }, callback)
    }
    function sortItems(a, b) {
        if (a.sort < b.sort) {
            return -1;
        }
        else if (b.sort > a.sort) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function buildBeginDocxIttf(moduleFileName, sb) {
        var beginFromFile = file.read(path.join(__dirname, 'ittf', moduleFileName + '_begin.docx.ittf'));
        var i, i_items=beginFromFile.split('\n'), i_len=beginFromFile.split('\n').length, line;
        for (i=0; i<i_len; i++) {
            line = beginFromFile.split('\n')[i];
            sb.push(line);
        }
    }
    function buildItemDocxIttf(item, indent, sb) {
        buildIttfLine('h2', item.Titolo, indent, sb)
        buildAbstract('dalla ' + item.SettimanaDal + ' alla ' + item.SettimanaAl, item.Abstract, indent, sb)
        var ctx = {
            stack: [
                
            ]
        };
        preprocessTesto(item.TestoJson, ctx)
        buildTestoDocxIttf(item.TestoJson, indent - 1, sb, '', ctx)
        buildPara('', 'h2', indent, sb)
        buildIttfLine('link-ref', 'testo_' + item.NWS_ID, indent + 1, sb)
    }
    function buildTestoDocxIttf(item, indent, sb, prev, ctx) {
        if (item.deleted) {
            return ;
        }
        if (item.name == 'p') {
            if (item.alreadyIsParagraph) {
                var i, i_items=item.children, i_len=item.children.length, child;
                for (i=0; i<i_len; i++) {
                    child = item.children[i];
                    buildTestoDocxIttf(child, indent, sb, '', ctx)
                }
            }
            else {
                buildPara(item.value, 'normal', indent + 1, sb)
                var i, i_items=item.children, i_len=item.children.length, child;
                for (i=0; i<i_len; i++) {
                    child = item.children[i];
                    buildTestoDocxIttf(child, indent + 1, sb, '', ctx)
                }
            }
        }
        else if (item.name == 'h2' || item.name == 'ul' || item.name == 'ol') {
            // log 'is ', item.name, item.needsParagraph
            if (item.needsParagraph) {
                buildPara(item.value, item.name, indent + 1, sb)
                if (item.name == 'h2' && item.value && item.value.length > 0) {
                    buildIttfLine('+', item.value, indent + 2, sb)
                    buildInlineStyle('h2', indent + 3, sb)
                }
                else if ((item.name == 'ul' || item.name == 'ol') && item.value && item.value.length > 0) {
                    throw new Error('ul/ol with a line value not managed');
                }
                else {
                    // TODO exclude that can have a parent not == 'p'
                    var i, i_items=item.children, i_len=item.children.length, child;
                    for (i=0; i<i_len; i++) {
                        child = item.children[i];
                        buildTestoDocxIttf(child, (item.name == 'ul' || item.name == 'ol') ? indent + 1 : indent, sb, item.name == 'h2' ? item.name : prev, ctx)
                    }
                }
            }
            else {
                if ((item.name == 'ul' || item.name == 'ol') && item.value && item.value.length > 0) {
                    throw new Error('ul/ol with a line value not managed');
                }
                else if (item.value && item.value.length > 0) {
                    buildIttfLine('+', item.value, indent + 1, sb)
                    buildIttfLine('style', (prev && prev.length > 0 ? '_' : '') + 'h2', indent + 2, sb)
                    if (item.break) {
                        buildIttfLine('br', '', indent + 2, sb)
                    }
                }
                else {
                    var i, i_items=item.children, i_len=item.children.length, child;
                    for (i=0; i<i_len; i++) {
                        child = item.children[i];
                        buildTestoDocxIttf(child, (item.name == 'ul' || item.name == 'ol') ? indent + 1 : indent, sb, item.name == 'h2' ? item.name : null, ctx)
                    }
                }
            }
        }
        else if (['strong','big'].indexOf(item.name) > -1) {
            if (item.value && item.value.length > 0) {
                buildIttfLine('+', item.value, indent + 1, sb)
                buildInlineStyle((prev && prev.length > 0 ? prev + '_' : '') + item.name, indent + 2, sb)
                if (item.break) {
                    buildIttfLine('br', '', indent + 2, sb)
                }
                if (item.children.length > 0) {
                    ctx.flatten = true;
                    var i, i_items=item.children, i_len=item.children.length, child;
                    for (i=0; i<i_len; i++) {
                        child = item.children[i];
                        buildTestoDocxIttf(child, indent, sb, (prev && prev.length > 0 ? prev + '_' : '') + item.name, ctx)
                    }
                }
            }
            else {
                var i, i_items=item.children, i_len=item.children.length, child;
                for (i=0; i<i_len; i++) {
                    child = item.children[i];
                    buildTestoDocxIttf(child, indent, sb, (prev && prev.length > 0) ? prev + '_' + item.name : item.name, ctx)
                }
            }
        }
        else if (item.name == 'br') {
            // done
        }
        else if (item.name == 'li') {
            buildIttfLine('li', item.value, indent + 1, sb)
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                buildTestoDocxIttf(child, indent + 1, sb, prev, ctx)
            }
        }
        else if (item.name == 'a') {
            buildIttfLine('link-ref', item.linkId, indent + 1, sb)
        }
        else if (item.name == 'span') {
            if (item.value && item.value.length > 0) {
                buildIttfLine('+', item.value, indent + 1, sb)
            }
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                buildTestoDocxIttf(child, indent + 1, sb, (prev && prev.length > 0) ? prev + '_' + item.name : item.name, ctx)
            }
        }
        else if (item.name == '+') {
            buildIttfLine('+', item.value, indent + 1, sb)
            if (prev && prev.length > 0) {
                buildInlineStyle(prev, indent + 2, sb)
            }
            if (item.break) {
                buildIttfLine('br', '', indent + 2, sb)
            }
        }
        else {
            if (item.name != 'html') {
                console.log('+++++++++++++++++++++. Unknown', item.name);
                throw new Error(item.name + '/' + item.value);
            }
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                buildTestoDocxIttf(child, indent, sb, prev, ctx)
            }
        }
    }
    function buildAbstract(text1, text2, indent, sb) {
        buildPara('', 'h2', indent, sb)
        buildIttfLine('border', null, indent + 1, sb)
        buildBorder('top', 'single', 3, 2, null, indent + 2, sb)
        buildBorder('bottom', 'single', 3, 2, null, indent + 2, sb)
        buildIttfLine('+', 'Settimane', indent + 1, sb)
        buildIttfLine('bold', null, indent + 2, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
        buildIttfLine('+', ': ' + text1, indent + 1, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
        buildIttfLine('+', 'Abstract', indent + 1, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
        buildIttfLine('bold', null, indent + 2, sb)
        buildIttfLine('br', null, indent + 2, sb)
        buildIttfLine('+', ': ' + text2, indent + 1, sb)
        buildIttfLine('size', Normal_Size, indent + 2, sb)
    }
    function buildBorder(position, type, size, space, color, indent, sb) {
        buildIttfLine(position, null, indent, sb)
        buildIttfLine('size', size, indent + 1, sb)
        buildIttfLine('value', type, indent + 1, sb)
        buildIttfLine('space', space, indent + 1, sb)
        if (color) {
            buildIttfLine('color', color, indent + 1, sb)
        }
    }
    function buildPara(text, type, indent, sb) {
        buildIttfLine((type == 'ul' || type == 'ol') ? type : 'p', text, indent, sb)
        if (type == 'normal' && normal_JUSTIFIED) {
            buildIttfLine('alignment', 'JUSTIFIED', indent + 1, sb)
        }
        buildIttfLine('font', 'Garamond', indent + 1, sb)
        buildIttfLine('spacing', text, indent + 1, sb)
        buildIttfLine('before', type == 'h2' ? P_spacing_before_h2 : P_spacing_before, indent + 2, sb)
        buildIttfLine('after', type == 'h2' ? P_spacing_after_h2 : P_spacing_after, indent + 2, sb)
    }
    function buildInlineStyle(style, indent, sb) {
        buildIttfLine('style', style, indent, sb)
        if (style.indexOf('strong') > -1 || style.indexOf('h2') > -1) {
            buildIttfLine('bold', '', indent, sb)
        }
        if (style.indexOf('h2') > -1) {
            buildIttfLine('size', H2_Size, indent, sb)
        }
        else if (style.indexOf('big') > -1) {
            buildIttfLine('size', Big_Size, indent, sb)
        }
        else {
            buildIttfLine('size', Normal_Size, indent, sb)
        }
    }
    function buildIttfLine(tag, value, indent, sb) {
        sb.push(new Array(1 + indent).join('\t') + tag + (value ? ' ' + value : ''))
    }
    function buildHyperlinks(context, indent, sb) {
        buildIttfLine('hyperlinks', '', 1, sb)
        var i, i_items=context.items, i_len=context.items.length, article;
        for (i=0; i<i_len; i++) {
            article = context.items[i];
            if (article.NewsOrGuida == 'guida') {
                buildIttfLine('link-def', 'testo_' + article.NWS_ID, 2, sb)
                buildIttfLine('link', article.url, 3, sb)
                buildIttfLine('text', 'Edita sul backend', 3, sb)
                buildIttfLine('type', 'EXTERNAL', 3, sb)
            }
        }
        var linksCtx = {
            links: [
                
            ], 
            count: 0
        };
        var i, i_items=context.items, i_len=context.items.length, article;
        for (i=0; i<i_len; i++) {
            article = context.items[i];
            if (article.NewsOrGuida == 'guida') {
                preprocessLinks(article.TestoJson, linksCtx)
            }
        }
        var i, i_items=linksCtx.links, i_len=linksCtx.links.length, link;
        for (i=0; i<i_len; i++) {
            link = linksCtx.links[i];
            buildIttfLine('link-def', link.id, 2, sb)
            buildIttfLine('link', link.url, 3, sb)
            buildIttfLine('text', link.label, 3, sb)
            buildIttfLine('type', 'EXTERNAL', 3, sb)
        }
    }
    function preprocessLinks(item, ctx) {
        if (item.name == 'a') {
            var link = {
                id: 'in_article_' + (++ctx.count), 
                url: item.attribs['href']
            };
            ctx.links.push(link)
            item.linkId = link.id;
            link.label = item.value;
        }
        else {
            item.children.forEach((child) =>
                preprocessLinks(child, ctx))
        }
    }
    function preprocessTesto(item, ctx) {
        // log 'enter preprocessTesto', item.children.length
        if (item.name == 'p' && ctx.stack.indexOf('li') > -1) {
            item.alreadyIsParagraph = true;
        }
        if (item.name == 'h1' || item.name == 'h3') {
            item.name = 'h2';
        }
        if (item.name == 'em') {
            item.name = 'big';
        }
        if (item.name == '++') {
            item.name = '+';
            item.break = true;
        }
        if (item.name == 'span') {
            console.log('preprocessTesto.span', item.name, item.value, item.children.length);
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                console.log('preprocessTesto.span child', child.name, child.value, child.children.length);
            }
            for (var k in item.attribs) {
                console.log('preprocessTesto.span attribute', k, item.attribs[k]);
            }
        }
        if (item.name == 'h2' || item.name == 'ul' || item.name == 'ol') {
            // log 'is h2', 'stack', ctx.stack.join(',')
            if (ctx.stack.indexOf('p') < 0) {
                // log 'setting needsParagraph'
                item.needsParagraph = true;
            }
        }
        ctx.stack.push(item.name);
        item.children.forEach((child, index) => {
            child.parent = item;
            // log 'preprocessTesto', child.name, child.value
            // if (index < item.children.length-1) && item.children[index+1].name == "br"
            if (child.name == "br" && (index < item.children.length-1)) {
                // set child.break = true
                item.children[index+1].break = true;
                // set item.children[index+1].deleted = true
                child.deleted = true;
            }
            preprocessTesto(child, ctx)
        })
        ctx.stack.pop();
    }
    function transformContext(beba, callback) {
        async.mapSeries(beba.items, (item, callback) => {
            // BAX var itemTesto = setSpaces(item.Testo)
            var itemTesto = item.Testo;
            // log 'transformBeba.text', '|' + itemTesto + '|'
            wizziTools.wizzify_mtree_html(itemTesto, {}, function(err, mtree) {
                if (err) {
                    console.log('err', err);
                    if (err.toString()) {
                        console.log('err.toString()', err.toString());
                    }
                    if (err.inner) {
                        console.log('err.inner', err.inner);
                        if (err.inner.toString) {
                            console.log('err.inner.toString()', err.inner.toString());
                        }
                    }
                    throw new Error(err.message);
                }
                transformMTree(mtree)
                item.TestoJson = mtree;
                // log 'transformBeba.mtree.to json'
                return callback(null, mtree);
            })
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, beba);
        })
    }
    function setSpaces(Testo) {
        // _ console.log('Testo init', Testo)
        var splitted = [];
        var pos = 0;
        var ndx = Testo.indexOf('<a ');
        // _ console.log('ndx', ndx)
        var ctr = 0;
        while (ndx > -1 && ctr < 20) {
            ctr++;
            var txtRepl = replSpacesChecked(Testo.substring(0, ndx));
            // _ console.log('txtRepl', txtRepl)
            splitted.push(txtRepl);
            var a = "<a ";
            var i = ndx + 3;
            while (i < Testo.length) {
                if (Testo[i] == '/' && Testo[i + 1] == '>') {
                    a += '/>';
                    // _ console.log('a break', a)
                    break;
                }
                if (Testo[i] == '/' && Testo[i + 1] == 'a' && Testo[i + 2] == '>') {
                    a += '/a>';
                    // _ console.log('a break', a)
                    break;
                }
                a += Testo.substr(i, 1);
                i++;
            }
            // _ console.log('a', '|' + a + '|')
            splitted.push(a);
            pos = i + 3;
            Testo = Testo.substr(pos);
            // _ console.log('Testo remain', '|' + Testo + '|')
            ndx = Testo.indexOf('<a ');
            // _ console.log('ndx', ndx)
        }
        splitted.push(replSpacesChecked(Testo))
        var NewTesto = splitted.join('');
        // _ console.log('Testo fin', Testo)
        // _ console.log('NewTesto', NewTesto)
        return NewTesto;
    }
    function replSpacesChecked(Testo) {
        var txt = verify.replaceAll(Testo, ' />', '&endtag;');
        // TODOset txt = verify.replaceAll(cleanTetx(txt), ' ', '&nbsp;')
        txt = verify.replaceAll(txt, ' ', '&nbsp;');
        return verify.replaceAll(txt, '&endtag;', ' />');
    }
    function cleanTetx(Testo) {
        var ch;
        var len = Testo.length - 2;
        var buf = [];
        for (var i=0; i<len; i++) {
            ch = Testo[i];
            buf.push(ch);
            if (".,;!?:".indexOf(ch) > -1 && isWhitespace(Testo[i+1]) == false) {
                buf.push(' ');
            }
        }
        return buf.join('');
    }
    function cleanTetxNew(Testo) {
        var state = {
            tagOpen: false, 
            punct: false, 
            token: [
                
            ]
        };
        var ch;
        var len = Testo.length - 1;
        var buf = [];
        for (var i=0; i<len; i++) {
            ch = Testo[i];
            if (isWhitespace(ch)) {
                if (state.tagOpen) {
                    // a tag with content, state.token contains tag name
                }
                if (state.punct) {
                    // punct is ok
                }
            }
            if (ch == '>') {
                if (state.tagOpen) {
                    buf.push('<');
                    buf.push(state.token.join(''));
                    state.token.length = 0;
                    state.tagOpen = false;
                }
            }
            if (ch == '<') {
                state.tagOpen = true;
            }
            if (".,;!?:".indexOf(ch) > -1) {
                state.punct = true;
            }
            buf.push(ch);
            if (".,;!?:".indexOf(ch) > -1 && isWhitespace(Testo[i+1]) == false) {
                buf.push(' ');
            }
        }
        return buf.join('');
    }
    function transformMTree(node) {
        if (node.name && node.name.length > 0) {
            var buf = [];
            var ch;
            var len = node.name.length;
            for (var i=0; i<len; i++) {
                ch = node.name.substr(i,1);
                if (ch == ' ') {
                    buf.push('&nbsp;');
                }
                else if (i < len - 1 && ".,;".indexOf(ch) > -1 && isLetter(node.name[i+1])) {
                    buf.push(ch);
                    buf.push('&nbsp;');
                }
                else {
                    buf.push(ch);
                }
            }
            node.value = buf.join('');
        }
        else {
            node.value = node.name;
        }
        node.name = node.tag;
        node.tag = null;
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            transformMTree(child)
        }
    }
    function isWhitespace(ch) {
        return ch == ' ' || ch == '\t' || ch == '\r ' || ch == '\n';
    }
    function isLetter(str) {
        return str.match(/[a-zA-Z]/i);
    }
    function dumpIttfJson(node, indent) {
        if (node.tag) {
            console.log(new Array(1+indent||1).join(' ') + (node.tag), '|' + (node.name || '') +'|');
        }
        else {
            console.log(new Array(1+indent||1).join(' ') + (node.name), '|' + (node.value || '') +'|');
        }
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            dumpIttfJson(item, (indent||1) + 1)
        }
    }
}
function createWizziFactory(globalContext, callback) {
    if (wizzi == null) {
        var wizzi = require('../../../wizzi/dist/index');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsnoaclFactory({
        plugins: {
            items: [
                './wizzi.plugin.docx/dist/index.js', 
                './wizzi-core/dist/index.js'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..', '..')
        }, 
        globalContext: globalContext || {}
    }, callback)
}
function loadMTree(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTree(ittfDocumentUri, context, callback)
    })
}
function loadMTreeDebugInfo(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTreeDebugInfo(ittfDocumentUri, context, callback)
    })
}
function loadWizziModel(ittfDocumentUri, context, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModel(fi.schema, ittfDocumentUri, {
            mTreeBuildUpContext: context, 
            globalContext: {}
        }, callback)
    })
}
function loadWizziModelAndSaveToJson(ittfDocumentUri, context, outputFolder, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    loadWizziModel(ittfDocumentUri, context, function(err, model) {
        if (err) {
            return callback(err);
        }
        file.write(path.join(outputFolder, fi.basename + '.json'), stringify(model.toJson(), null, 4))
        return callback(null);
    })
}
function loadModelAndGenerateArtifact(ittfDocumentUri, context, artifactName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(ittfDocumentUri, {
            modelRequestContext: context, 
            artifactRequestContext: {}
        }, artifactName, callback)
    })
}
function loadModelAndGenerateArtifactFromText(ittfContent, context, artifactName, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifactFromText(ittfContent, {
            modelRequestContext: context, 
            artifactRequestContext: {}
        }, artifactName, callback)
    })
}
function loadModelAndTransform(ittfDocumentUri, context, transformName, callback) {
    var fi = fileInfoByPath(ittfDocumentUri);
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        loadWizziModel(ittfDocumentUri, context, function(err, model) {
            if (err) {
                return callback(err);
            }
            wf.transformModel(model, transformName, context, callback)
        })
    })
}
function executeWizziJob(ittfDocumentUri, context, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.executeJob({
            name: path.basename(ittfDocumentUri), 
            path: ittfDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
            }), 
            modelContext: context || {}, 
            jobContext: {}
        }, callback)
    })
}
function executeWizziJob_2(wfjobDocumentUri, options) {
    options = options || {};
    options.plugins = options.plugins || [];
    options.globalContext = options.globalContext || {};
    var jobPlugins = [
        'wizzi-core', 
        'wizzi-meta', 
        'wizzi-js', 
        'wizzi-web'
    ];
    var i, i_items=options.plugins, i_len=options.plugins.length, item;
    for (i=0; i<i_len; i++) {
        item = options.plugins[i];
        jobPlugins.push(item);
    }
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: 'c:/my/wizzi/v5', 
            plugins: jobPlugins
        }, 
        job: {
            name: 'example ' + wfjobDocumentUri, 
            ittfDocumentUri: wfjobDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
            }), 
            globalContext: options.globalContext
        }
    }, function(err) {
        if (err) {
            wizzi.printWizziJobError('docx', err);
        }
    })
}
function executeGenerateModelTypes(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback) {
    createWizziFactory({}, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.generateModelTypes(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, callback)
    })
}
function getIttfFilesBySchema(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        })
    ;
}
function fileInfoByPath(filePath, baseFolder) {
    if (typeof baseFolder === 'undefined') {
        baseFolder = path.dirname(filePath);
    }
    filePath = normalize(filePath);
    var basename = path.basename(filePath);
    var dirname = path.dirname(filePath);
    var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr();
    var ss = basename.split('.');
    if (ss[ss.length-1] === 'ittf') {
        var name = ss.slice(0, ss.length-2).join('.');
        var schema = ss[ss.length-2];
        var mime = DEFAULT_MIME[schema] || schema;
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: true, 
                isFragment: filePath.indexOf('/t/') > -1, 
                schema: schema, 
                mime: mime, 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: name + '.' + mime, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + name + '.' + mime : name + '.' + mime
            };
    }
    else {
        return {
                name: ss.slice(0, ss.length-1).join('.'), 
                basename: basename, 
                isIttfDocument: false, 
                schema: null, 
                mime: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: basename, 
                destRelPath: relFolder.length > 0 ? relFolder + '/' + basename : basename
            };
    }
}
var DEFAULT_MIME = {
    css: 'css', 
    graphql: 'graphql', 
    html: 'html', 
    ittf: 'ittf', 
    js: 'js', 
    json: 'json', 
    md: 'md', 
    scss: 'scss', 
    text: 'text', 
    ts: 'ts', 
    vtt: 'vtt', 
    vue: 'vue', 
    xml: 'xml', 
    yaml: 'yaml'
};
function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}
