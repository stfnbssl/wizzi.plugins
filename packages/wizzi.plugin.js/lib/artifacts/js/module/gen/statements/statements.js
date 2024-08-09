/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\statements\statements.js.ittf
    utc time: Sat, 03 Aug 2024 03:24:07 GMT
*/
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.statements';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment' && item.wzElement != 'commentmultiline') {
            count++;
        }
    }
    return count;
}
function hasComments(model) {
    return countComments(model) > 0;
}
function countComments(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment') {
            count++;
        }
    }
    return count;
}
function writeComments(model, ctx) {
    var temp = [];
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'comment') {
            __writeComments(item, ctx, false)
        }
        else if (item.wzElement == 'commentmultiline') {
            __writeComments(item, ctx, true)
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return model;
}
function __writeComments(model, ctx, multi) {
    // loog '__writeComments-model', model
    if (multi || model.statements.length > 0) {
        ctx.w('/**');
        ctx.indent();
        if (verify.isNotEmpty(model.wzName)) {
            ctx.w(model.wzName);
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
        ctx.w('*/');
    }
}
function __writeCommentLine(model, ctx) {
    ctx.w('// ' + model.wzName);
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
md.load = function(cnt) {
    cnt.stm.statement = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statement');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statement. Got: ' + callback);
        }
        // loog 'wizzi-js.module.statements.statement', model.wzParent.wzElement, u.isTopStatement(model, ctx), model.wzName, model.__templateChild
        var text = model.wzName;
        if (model.__templateChild || ctx.__inside_html) {
            text = verify.replaceAll(verify.replaceAll(text, '&nbsp;', ' '), '&lf;', '\n')
            ;
        }
        if (model.__templateChild) {
            ctx.write(text)
            return callback(null);
        }
        else if (ctx.__inside_html == true && ctx.__jskind !== 'react') {
            var text = text.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push(" + ip.join() + ");");
        }
        else {
            
            // 4/2/19 _ ctx.write(model.wzName)
            
            // 22/3/21 _ ctx.w(model.wzName)
            if (u.isTopStatement(model, ctx) || ctx.__inside_html == true) {
                ctx.w(text);
            }
            // 22/3/21 _ ctx.write(text)
            else {
                ctx.write(text);
            }
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, callback)
    }
    ;
    cnt.stm.statementmultiline = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statementmultiline');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statementmultiline. Got: ' + callback);
        }
        if (ctx.__inside_html == true) {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push('\\n' + " + ip.join() + ");");
        }
        else {
            ctx.w(model.wzName)
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, callback)
    }
    ;
    cnt.stm.require = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.require');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.require. Got: ' + callback);
        }
        var items = model.wzName.split(' ');
        var seenwizzi = false;
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            if (item === 'wizzi') {
                seenwizzi = true;
                ctx.w("var wizzi = require('wizzi');");
            }
            else if (item === 'log') {
                if (seenwizzi) {
                    ctx.w("var log = wizzi.log(module);");
                }
                else {
                    ctx.w("var log = require('wizzi').log(module);");
                }
            }
            else {
                ctx.w("var " + item + " = require('" + item + "');");
            }
        }
        return callback(null);
    }
    ;
    cnt.stm.ximport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.ximport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.ximport. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            var nv = lineParser.parseNameValueRaw(model.wzName, model);
            if (nv.value()) {
                var nv2 = lineParser.parseNameValueRaw(nv.value());
                ctx.w("var " + nv.name() + " = require(" + nv2.value() + ");");
            }
            else {
                ctx.w("var " + nv.name() + " = require('" + nv.name() + "');");
            }
        }
        else {
            var name = model.wzName || '';
            if (model.xas) {
                if (name.length > 0) {
                    name += ', ';
                }
                name += '* as ' + model.xas;
            }
            ctx.write("import " + name);
            if (model.specifiers.length > 0) {
                if (name.length > 0) {
                    ctx.write(', ');
                }
                ctx.write('{');
                var i, i_items=model.specifiers, i_len=model.specifiers.length, item;
                for (i=0; i<i_len; i++) {
                    item = model.specifiers[i];
                    if (i > 0) {
                        ctx.write(', ');
                    }
                    ctx.write(item.wzName);
                    if (item.xas) {
                        ctx.write(' as ' + item.xas);
                    }
                }
                ctx.write('}');
                ctx.write(' from ' + model.from);
            }
            else {
                if (model.from && model.from.length > 0) {
                    if (name.trim().length > 0) {
                        ctx.write(' from');
                    }
                    ctx.write(' ' + model.from);
                }
            }
            ctx.w(u.semicolon(name));
        }
        return callback(null);
    }
    ;
    cnt.stm.typeRequire = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeRequire');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeRequire. Got: ' + callback);
        }
        ctx.write('require ' + model.wzName);
        cnt.genItems(model.statements, ctx, callback)
    }
    ;
    cnt.stm.exportDefault = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.exportDefault');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.exportDefault. Got: ' + callback);
        }
        
        // loog 'wizzi-codegen.js2.statements.ecma,jskind', ctx.__ecma, ctx.__jskind
        if (ctx.__ecma === 'es5') {
            ctx.artifactGenerationError('export statement invalid in ecma 5', 'js/module', model);
            return callback(null);
        }
        if (hasStatements(model) == false) {
            ctx.w("export default " + model.wzName + u.semicolon(model.wzName));
            return callback(null);
        }
        else {
            ctx.write('export default ');
            return cnt.genItems(model.statements, ctx, {
                    indent: true
                 }, callback);
        }
        if (model.__function) {
            cnt.stm.exportfunction(model, ctx, callback);
            return callback(null);
        }
        return callback(null);
    }
    ;
    cnt.stm.xexport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xexport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xexport. Got: ' + callback);
        }
        var typekey = model.__isType ? 'type ' : '';
        
        // loog 'wizzi-codegen.js2.statements.ecma,jskind', ctx.__ecma, ctx.__jskind
        if (ctx.__ecma === 'es5') {
            ctx.artifactGenerationError('export statement invalid in ecma 5', 'js/module', model);
            return callback(null);
        }
        if (hasStatements(model) == false && !!model.from == false && model.specifiers.length == 0) {
            ctx.w("export " + typekey + model.wzName + u.semicolon(model.wzName));
            return callback(null);
        }
        if (model.__function) {
            cnt.stm.exportfunction(model, ctx, callback);
            return callback(null);
        }
        var name = model.wzName || '';
        ctx.write('export ' + typekey + name);
        // loog 'js.module.xexport', 'model.__isType', model.__isType, name, model.from, model.statements.length, model.specifiers.length
        if (model.from) {
            if (model.statements.length == 1) {
                if (model.statements[0].wzElement == 'typeTypeAlias') {
                    ctx.write('type ');
                }
                else {
                    throw new Error('js.module.xexport. from clause and statements not managed');
                }
            }
            exportSpecifiers(model, ctx, name)
            ctx.write(' from ' + model.from);
            ctx.w(u.semicolon(name));
            return callback(null);
        }
        else {
            if (model.statements.length > 0) {
                ctx.write(name.length > 0 ? ' ' : '');
                var indented = false;
                ctx.__inside_expr = true;
                cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    if (model.statements.length < 2) {
                        return callback(null);
                    }
                    var len_1 = model.statements.length;
                    function repeater_1(index_1) {
                        if (index_1 === len_1) {
                            return next_1();
                        }
                        var item_1 = model.statements[index_1];
                        if (ctx.__needs_comma) {
                            ctx.write(',');
                            ctx.__needs_comma = false;
                        }
                        if (ctx.__needs_crlf) {
                            ctx.w();
                            ctx.__needs_crlf = false;
                        }
                        if (index_1 == 1) {
                            ctx.indent();
                            indented = true;
                        }
                        cnt.genItem(item_1, ctx, (err, notUsed) => {
                            if (err) {
                                return callback(err);
                            }
                            process.nextTick(function() {
                                repeater_1(index_1 + 1);
                            })
                        }
                        )
                    }
                    repeater_1(1);
                    function next_1() {
                        // _ ctx.w(';') // 11/1/19
                        // 28/3/19
                        ctx.w();
                        if (indented) {
                            ctx.deindent();
                        }
                        ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
                        return callback(null);
                    }
                }
                )
            }
            else {
                exportSpecifiers(model, ctx, name)
                ctx.w(u.semicolon(name));
                return callback(null);
            }
        }
    }
    ;
    function exportSpecifiers(model, ctx, name) {
        if (model.specifiers.length > 0) {
            if (name.length > 0) {
                ctx.write(', ');
            }
            ctx.write('{');
            var i, i_items=model.specifiers, i_len=model.specifiers.length, item;
            for (i=0; i<i_len; i++) {
                item = model.specifiers[i];
                if (i > 0) {
                    ctx.write(', ');
                }
                ctx.write(item.wzName);
                if (item.xas) {
                    ctx.write(' as ' + item.xas);
                }
            }
            ctx.write('}');
        }
    }
    cnt.stm.typeExport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeExport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExport. Got: ' + callback);
        }
        model.__isType = true;
        cnt.stm.xexport(model, ctx, callback)
    }
    ;
    cnt.stm.typeExportNamespace = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeExportNamespace');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExportNamespace. Got: ' + callback);
        }
        ctx.w('export as namespace ');
        ctx.w(u.semicolon(model.wzName));
        return callback(null);
    }
    ;
    cnt.stm.comment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.comment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.comment. Got: ' + callback);
        }
        if (hasComments(model) == false) {
            if (ctx.__inside_comment) {
                ctx.w(model.wzName ? (' ' + model.wzName) : '');
            }
            else {
                ctx.w('//' + (model.wzName ? (' ' + model.wzName) : ''));
                
                // loog '§§§ statements.comment', model.wzName
                if (model.wzName.indexOf('@ts-ignore') > -1) {
                    ctx.__inlineNext = true;
                }
            }
            ctx.__needs_crlf = false;
            return callback(null);
        }
        // loog 'ctx.__inside_comment', ctx.__inside_comment
        var enter_inside_comment = ctx.__inside_comment;
        if (!ctx.__inside_comment) {
            ctx.w('/**');
        }
        ctx.indent();
        // 10/1/24 write blank lines except on first comment line
        if (model.wzName.length > 0 || ctx.__inside_comment) {
            ctx.w(model.wzName)
        }
        ctx.__inside_comment = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.__inside_comment = enter_inside_comment;
            ctx.deindent();
            if (!enter_inside_comment) {
                ctx.w('*/');
            }
            ctx.__needs_crlf = false;
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.commentmultiline = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.commentmultiline');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.commentmultiline. Got: ' + callback);
        }
        ctx.w('/**');
        if (verify.isNotEmpty(model.wzName)) {
            ctx.w(('    ' + model.wzName));
        }
        ctx.__inside_comment = true;
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w('*/');
            ctx.__inside_comment = false;
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.xdelete = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdelete');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdelete. Got: ' + callback);
        }
        ctx.w('delete ' + model.wzName);
        return callback(null);
    }
    ;
    cnt.stm.set = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.set');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.set. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        u.checkInlineEnter(model, ctx);
        var text;
        // loog 'set,wzParent,wzName', model.wzParent.wzElement, model.wzName, '|'
        // FIXME this hack require refactoring
        if (model.wzName === 'work.textSep = "__TS__"') {
            text = model.wzName;
        }
        else {
            text = node.inlinedTextToTextLines(model.wzName, {
                singleLine: true
             })
            ;
        }
        if (hasStatements(model) == false) {
            if (u.isDeclare(model)) {
                ctx.write(text)
            }
            else {
                ctx.write(text)
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(u.semicolon(text))
                }
            }
            u.checkInlineExit(model, ctx);
            return callback(null);
        }
        if (model.statements[0].wzEntity === 'function') {
            ctx.w('');
        }
        // loog 'set,model.statements.length', model.wzName, model.statements.length
        if (model.statements.length == 2) {
            if (model.statements[0].wzElement == 'comment') {
                ctx.w(model.wzName + ' ')
                cnt.genItems(model.statements, ctx, {}, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    if (u.isTopStatement(model, ctx)) {
                        ctx.w(';');
                    }
                    u.checkInlineExit(model, ctx);
                    return callback(null);
                }
                )
            }
            else {
                cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' ' + model.wzName + ' ')
                    cnt.genItem(model.statements[1], ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        if (u.isTopStatement(model, ctx)) {
                            ctx.w(';');
                        }
                        u.checkInlineExit(model, ctx);
                        return callback(null);
                    }
                    )
                }
                )
            }
        }
        else {
            ctx.write(u.setOperator(text, model.statements))
            cnt.genItems(model.statements, ctx, {
                indent: false
             }, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(';');
                }
                u.checkInlineExit(model, ctx);
                return callback(null);
            }
            )
        }
    }
    ;
    cnt.stm.block = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.block');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.block. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, callback);
    }
    ;
    cnt.stm.sequence = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.sequence');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.sequence. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, { sep: ',' }, callback);
    }
    ;
}
;