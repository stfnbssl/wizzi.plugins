/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\statements\statements.js.ittf
    utc time: Tue, 06 Aug 2024 14:55:17 GMT
*/
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');
var lineParser = require('../utils/lineParser');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.statements';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment' && item.wzElement != 'commentmultiline' && item.wzElement != 'decorator') {
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
function writeDecorators(model, ctx) {
    var temp = [];
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement == 'decorator') {
            __writeDecorator(item, ctx)
        }
        else {
            temp.push(item);
        }
    }
    model.statements = temp;
    return model;
}
function __writeDecorator(model, ctx) {
    var name = (model.__name || '');
    ctx.write('@' + name);
    if (model.statements && model.statements.length > 0) {
        ctx.write('(');
        u.checkInlineEnter(model, ctx);
        cnt.genItems(model.statements, ctx, {}, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            u.checkInlineExit(model, ctx);
            ctx.w(')');
            return callback(null);
        }
        )
    }
    else {
        return callback(null);
    }
}
md.load = function(cnt) {
    cnt.stm.directive = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.directive');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.directive. Got: ' + callback);
        }
        ctx.w("'" + model.wzName + "'");
        return callback(null);
    }
    ;
    cnt.stm.literal = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.literal');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.literal. Got: ' + callback);
        }
        ctx.write(model.wzName)
        return callback(null);
    }
    ;
    cnt.stm.statement = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statement');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statement. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        // loog 'wizzi-js.module.statements.statement', model.wzParent.wzElement, u.isTopStatement(model, ctx), "'" + model.wzName + "'", model.__templateChild, ctx.__inside_html
        var text = model.wzName;
        if (model.__templateChild || ctx.__inside_html) {
            text = verify.replaceAll(verify.replaceAll(text, '&nbsp;', ' '), '&lf;', '\n')
            ;
        }
        if (model.__templateChild) {
            ctx.write(text)
            return callback(null);
        }
        else {
            
            // 4/2/19 _ ctx.write(model.wzName)
            
            // 22/3/21 _ ctx.w(model.wzName)
            if (u.isTopStatement(model, ctx)) {
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
        u.writeComments(model, ctx);
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
        u.writeComments(model, ctx);
        // loog 'ximport.model.statements.length', model.statements.length, model.statements[0] && model.statements[0].wzElement
        var ptype = u.extractTSSimpleType(model);
        // loog 'ximport.ptype', ptype
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
                if (item.wzElement == 'typeTypeAlias') {
                    ctx.write('type ' + item.wzName);
                }
                else {
                    ctx.write(item.wzName);
                }
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
        u.writeComments(model, ctx);
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
        u.writeComments(model, ctx);
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
    cnt.stm.satisfies = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.satisfies');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.satisfies. Got: ' + callback);
        }
        var ptype = u.extractTSSimpleType(model);
        cnt.genItems(model.statements, ctx, {
            indent: true
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(' satisfies');
            
            // loog 'property', ptype.wzElement
            if (ptype) {
                ctx.write(' ');
                cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                }
                )
            }
            else {
                return callback(null);
            }
        }
        )
    }
    ;
    cnt.stm.xexport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xexport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xexport. Got: ' + callback);
        }
        u.writeComments(model, ctx);
        var typekey = model.__isType ? 'type ' : '';
        // loog 'js.module.xexport', hasStatements(model), model.from, model.specifiers.length
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
            
            // loog 'model.statements[0]', model.statements[0]
            if (model.statements.length == 1) {
                if (model.statements[0].wzElement == 'typeTypeAlias') {
                    ctx.write('type ');
                }
                else {
                    throw new Error('js.module.xexport. from clause and statements not managed');
                }
            }
            exportSpecifiers(model, ctx, name, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(' from ' + model.from);
                ctx.w(u.semicolon(name));
                return callback(null);
            }
            )
        }
        else {
            
            // loog 'model.statements[0]', model.statements[0].wzElement, model.statements[0].wzName
            if (model.statements.length > 0) {
                ctx.write(name.length > 0 ? (model.__isType ? ' = ' : ' ') : '');
                var indented = false;
                ctx.__inside_expr = true;
                cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    if (model.statements.length < 2) {
                        if (ctx.__needs_comma) {
                            ctx.write(',');
                        }
                        if (ctx.__needs_crlf) {
                            ctx.w();
                        }
                        ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
                        return callback(null);
                    }
                    var len_1 = model.statements.length;
                    function repeater_1(index_1) {
                        if (index_1 === len_1) {
                            return next_1();
                        }
                        var item_1 = model.statements[index_1];
                        // loog 3, item_1.wzElement
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
                            return process.nextTick(function() {
                                    repeater_1(index_1 + 1);
                                });
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
                exportSpecifiers(model, ctx, name, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(u.semicolon(name));
                    return callback(null);
                }
                )
            }
        }
    }
    ;
    function exportSpecifiers(model, ctx, name, callback) {
        u.writeComments(model, ctx);
        // loog '---------------->  model.specifiers.length', model.specifiers.length, model.specifiers.length == 1 && model.specifiers[0].wzElement
        
        // loog 'exportSpecifiers.11'
        if (model.specifiers.length == 1 && model.specifiers[0].wzElement == 'typeTypeAlias') {
            var item = model.specifiers[0];
            cnt.genItem(item, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                if (item.xas) {
                    ctx.write(' as ' + item.xas);
                }
                return callback(null);
            }
            )
        }
        
        // loog 'exportSpecifiers.12'
        else if (model.specifiers.length > 0) {
            if (name.length > 0) {
                ctx.write(', ');
            }
            ctx.write('{');
            var len_1 = model.specifiers.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.specifiers[index_1];
                // loog 'item_1.wzName', item_1.wzName
                if (index_1 > 0) {
                    ctx.write(', ');
                }
                
                // loog 15, item_1.wzName
                if (item_1.wzElement == 'typeTypeAlias') {
                    ctx.write('type ' + item_1.wzName);
                    if (item_1.statements.length > 0) {
                        return cnt.genItem(item_1.statements[0], ctx, (err, notUsed) => {
                                if (err) {
                                    return callback(err);
                                }
                                if (item_1.xas) {
                                    ctx.write(' as ' + item_1.xas);
                                }
                                return process.nextTick(function() {
                                        repeater_1(index_1 + 1);
                                    });
                            }
                            );
                    }
                    else {
                        return process.nextTick(function() {
                                repeater_1(index_1 + 1);
                            });
                    }
                }
                else {
                    ctx.write(item_1.wzName);
                }
                if (item_1.xas) {
                    ctx.write(' as ' + item_1.xas);
                }
                return process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
            }
            repeater_1(0);
            function next_1() {
                ctx.write('}');
                return callback(null);
            }
        }
        else {
            return callback(null);
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
        u.writeComments(model, ctx);
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
        if (hasStatements(model) == false) {
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
        if (model.wzName.length > 0) {
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
    cnt.stm.commentForReference = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.commentForReference');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.commentForReference. Got: ' + callback);
        }
        ctx.w('/// ' + model.wzName);
        return callback(null);
    }
    ;
    cnt.stm.inlineMultilineComment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.inlineMultilineComment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.inlineMultilineComment. Got: ' + callback);
        }
        ctx.w('/** ' + model.wzName + ' */');
        return callback(null);
    }
    ;
    cnt.stm.jsDocComment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.jsDocComment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.jsDocComment. Got: ' + callback);
        }
        ctx.w('/**');
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            ctx.w(' * ' + item.wzName);
        }
        ctx.w(' */');
        return callback(null);
    }
    ;
    cnt.stm.xdelete = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdelete');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdelete. Got: ' + callback);
        }
        u.writeComments(model, ctx);
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