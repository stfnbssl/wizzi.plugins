/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\.wizzi-override\lib\artifacts\js\module\gen\statements\expressions.js.ittf
    utc time: Sat, 03 Aug 2024 03:24:07 GMT
*/
var util = require('util');
var verify = require('@wizzi/utils').verify;
var node = require('@wizzi/utils').node;
var errors = require('@wizzi/utils').errors;
var u = require('../utils/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.statements.expressions';
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
    // void, !, or, and, iif, ==, !=, ===, !==, ||, &&, |, &,
    // -, +, *, /, ^, %,	<, <=, >, >=
    cnt.stm.identifier = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.identifier');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.identifier. Got: ' + callback);
        }
        ctx.write( model.wzName );
        if (model.statements.length > 0) {
            cnt.genItems(model.statements, ctx, callback)
        }
        else {
            return callback(null);
        }
    }
    ;
    cnt.stm.expressionMember = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.expressionMember');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.expressionMember. Got: ' + callback);
        }
        ctx.write( model.wzName || '');
        cnt.genItems(model.statements, ctx, callback)
    }
    ;
    cnt.stm.xvoid = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xvoid');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xvoid. Got: ' + callback);
        }
        ctx.write('void ');
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null);
        }
        else if (model.statements.length == 1) {
            cnt.genItem(model.statements[0], ctx, callback)
        }
        else {
            return callback(ctx.error('void statement element requires zero or one child elements', model));
        }
    }
    ;
    cnt.stm.not = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.not');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.not. Got: ' + callback);
        }
        model = writeComments(model, ctx);
        ctx.write('!');
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null);
        }
        else if (model.statements.length == 1) {
            var saveParenRequired = ctx.parenRequired;
            ctx.parenRequired = true;
            cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.parenRequired = saveParenRequired;
                return callback(null);
            }
            )
        }
        else {
            return callback(ctx.error('not/! statement element requires zero or one child elements', model));
        }
    }
    ;
    cnt.stm.notnot = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.notnot');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.notnot. Got: ' + callback);
        }
        model = writeComments(model, ctx);
        ctx.write('!!(');
        if (model.statements.length == 0) {
            ctx.write(model.wzName + ')');
            return callback(null);
        }
        else if (model.statements.length == 1) {
            var saveParenRequired = ctx.parenRequired;
            ctx.parenRequired = true;
            cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                ctx.parenRequired = saveParenRequired;
                return callback(null);
            }
            )
        }
        else {
            return callback(ctx.error('not/! statement element requires zero or one child elements', model));
        }
    }
    ;
    cnt.stm.or = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.or');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.or. Got: ' + callback);
        }
        model = writeComments(model, ctx);
        if (model.__templateChild) {
            ctx.write('${' + (model.wzName || ''));
        }
        if (model.statements.length != 2) {
            if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
                ctx.write(' || ' + (model.wzName || ''));
                if (model.__templateChild) {
                    ctx.write('}');
                }
                return callback(null);
            }
            else {
                return callback(ctx.error('or/|| statement element requires two child element', model));
            }
        }
        var saveParenRequired = ctx.parenRequired;
        ctx.parenRequired = true;
        cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(' || ');
            cnt.genItem(model.statements[1], ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.parenRequired = saveParenRequired;
                if (model.__templateChild) {
                    ctx.write('}');
                }
                return callback(null);
            }
            )
        }
        )
    }
    ;
    cnt.stm.and = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.and');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.and. Got: ' + callback);
        }
        model = writeComments(model, ctx);
        if (model.__templateChild) {
            ctx.write('${' + (model.wzName || ''));
        }
        if (model.statements.length != 2) {
            if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
                ctx.write(' && ' + (model.wzName || ''));
                if (model.__templateChild) {
                    ctx.write('}');
                }
                return callback(null);
            }
            else {
                return callback(ctx.error('and/&& statement element requires two child element', model));
            }
        }
        var saveParenRequired = ctx.parenRequired;
        ctx.parenRequired = true;
        cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(' && ');
            if (model.statements[1].wzElement == 'htmlelement') {
                ctx.indent();
            }
            cnt.genItem(model.statements[1], ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                if (model.statements[1].wzElement == 'htmlelement') {
                    ctx.deindent();
                }
                ctx.parenRequired = saveParenRequired;
                if (model.__templateChild) {
                    ctx.write('}');
                }
                return callback(null);
            }
            )
        }
        )
    }
    ;
    cnt.stm.iif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.iif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.iif. Got: ' + callback);
        }
        model = writeComments(model, ctx);
        if (model.statements.length < 2) {
            return callback(ctx.error('iif statement element requires at least two child elements', model));
        }
        if (model.wzParent.wzElement == 'template') {
            ctx.w('${');
        }
        if (model.wzParent.wzElement == 'htmlelement') {
            ctx.w('{');
        }
        var paren = ctx.parenRequired || model.statements.length > 2;
        if (paren) {
            ctx.write('(');
        }
        var m_test, m_then, m_else;
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            if (item.wzElement == 'test') {
                m_test = item;
            }
            else if (item.wzElement == 'then') {
                m_then = item;
            }
            else if (item.wzElement == 'xelse') {
                m_else = item;
            }
            // TODO error
            else {
            }
        }
        function doTest(callback) {
            if (m_test) {
                cnt.genItem(m_test, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    if (model.wzParent.wzElement == 'template') {
                        ctx.w();
                    }
                    ctx.write(' ? ');
                    return callback(null);
                }
                )
            }
            else {
                if (model.wzParent.wzElement == 'template') {
                    ctx.w(model.wzName);
                    ctx.write(' ? ');
                }
                else {
                    ctx.write(model.wzName + ' ? ');
                }
                return callback(null);
            }
        }
        function doThen(callback) {
            
            // loog 'doThen', Object.keys(ctx), 'forceInLine', ctx.forceInLine, '__inside_expr', ctx.__inside_expr, '__inside_html', ctx.__inside_html
            if (m_then) {
                cnt.genItem(m_then, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    if (model.wzParent.wzElement == 'template') {
                        ctx.w();
                    }
                    ctx.write(' : ');
                    return callback(null);
                }
                )
            }
            // TODO error
            else {
                return callback(null);
            }
        }
        function doElse(callback) {
            if (m_else) {
                cnt.genItem(m_else, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                }
                )
            }
            // TODO error
            else {
                return callback(null);
            }
        }
        doTest((err, notUsed) => {
            if (err) {
                return callback(err);
            }
            doThen((err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                doElse((err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    iif_end(model, ctx, callback)
                }
                )
            }
            )
        }
        )
    }
    ;
    function iif_end(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.iif_end');
        }
        // loog 'iif_end', u.isTopStatement(model, ctx)
        var paren = ctx.parenRequired || model.statements.length > 2;
        if (paren) {
            ctx.write(')');
        }
        if (model.wzParent.wzElement == 'template' || model.wzParent.wzElement == 'htmlelement') {
            ctx.w('}');
        }
        
        // 21/3/21 (waiting for damage) _ ctx.w(';')
        if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
            console.log('iif', model.wzParent.wzElement, model.wzParent.wzParent ? model.wzParent.wzParent.wzElement : '')
        }
        return callback(null);
    }
    cnt.stm.test = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.test');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.test. Got: ' + callback);
        }
        ctx.write('(');
        cnt.genItems(model.statements, ctx, {
            indent: false
         }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            return callback(null);
        }
        )
    }
    ;
    cnt.stm.then = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.then');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.then. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        if (hasStatements(xmodel) == false) {
            ctx.write(xmodel.wzName)
            return callback(null);
        }
        cnt.genItems(xmodel.statements, ctx, {
            indent: true
         }, callback)
    }
    ;
    cnt.stm.op_typeof = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_typeof');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_typeof. Got: ' + callback);
        }
        var xmodel = writeComments(model, ctx);
        if (xmodel.statements.length > 0) {
            ctx.write('typeof(')
            cnt.genItems(xmodel.statements, ctx, {
                indent: true
             }, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(')')
                return callback(null);
            }
            )
        }
        else {
            ctx.write('typeof(' + model.wzName + ')')
            return callback(null);
        }
    }
    ;
    cnt.stm.op_nullish = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_nullish');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_nullish. Got: ' + callback);
        }
        emitOperators(cnt, '??', model, ctx, callback);
    }
    ;
    cnt.stm.op_eq = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_eq');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_eq. Got: ' + callback);
        }
        emitOperators(cnt, '==', model, ctx, callback);
    }
    ;
    cnt.stm.op_noteq = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_noteq');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_noteq. Got: ' + callback);
        }
        emitOperators(cnt, '!=', model, ctx, callback);
    }
    ;
    cnt.stm.op_eq_strict = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_eq_strict');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_eq_strict. Got: ' + callback);
        }
        emitOperators(cnt, '===', model, ctx, callback);
    }
    ;
    cnt.stm.op_noteq_strict = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_noteq_strict');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_noteq_strict. Got: ' + callback);
        }
        emitOperators(cnt, '!==', model, ctx, callback);
    }
    ;
    cnt.stm.op_xor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_xor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_xor. Got: ' + callback);
        }
        emitOperators(cnt, '|', model, ctx, callback);
    }
    ;
    cnt.stm.op_xand = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_xand');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_xand. Got: ' + callback);
        }
        emitOperators(cnt, '&', model, ctx, callback);
    }
    ;
    cnt.stm.op_minus = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_minus');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_minus. Got: ' + callback);
        }
        if (model.statements.length == 2) {
            emitOperators(cnt, '-', model, ctx, callback);
        }
        else if (model.statements.length == 1) {
            ctx.write('-');
            cnt.genItem(model.statements[0], ctx, callback)
        }
        else if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
            ctx.write(' ' + op + ' ' + (model.wzName || ''));
            return callback(null);
        }
        else {
            return callback(ctx.artifactGenerationError("Invalid model. One or two child statements are required. Model: " + util.inspect(model, {depth: 2}), "wizzi-codegen/lib/js/statements/expressions/op_minus", model));
        }
    }
    ;
    cnt.stm.op_plus = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_plus');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_plus. Got: ' + callback);
        }
        emitOperators(cnt, '+', model, ctx, callback);
    }
    ;
    cnt.stm.op_times = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_times');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_times. Got: ' + callback);
        }
        emitOperators(cnt, '*', model, ctx, callback);
    }
    ;
    cnt.stm.op_div = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_div');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_div. Got: ' + callback);
        }
        emitOperators(cnt, '/', model, ctx, callback);
    }
    ;
    cnt.stm.op_power = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_power');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_power. Got: ' + callback);
        }
        emitOperators(cnt, '^', model, ctx, callback);
    }
    ;
    cnt.stm.op_mod = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_mod');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_mod. Got: ' + callback);
        }
        emitOperators(cnt, '%', model, ctx, callback);
    }
    ;
    cnt.stm.op_lt = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_lt');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_lt. Got: ' + callback);
        }
        emitOperators(cnt, '<', model, ctx, callback);
    }
    ;
    cnt.stm.op_le = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_le');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_le. Got: ' + callback);
        }
        emitOperators(cnt, '<=', model, ctx, callback);
    }
    ;
    cnt.stm.op_gt = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_gt');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_gt. Got: ' + callback);
        }
        emitOperators(cnt, '>', model, ctx, callback);
    }
    ;
    cnt.stm.op_ge = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_ge');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_ge. Got: ' + callback);
        }
        emitOperators(cnt, '>=', model, ctx, callback);
    }
    ;
    cnt.stm.bit_not = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.bit_not');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.bit_not. Got: ' + callback);
        }
        emitOperators(cnt, '~', model, ctx, callback);
    }
    ;
    cnt.stm.bit_left_shift = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.bit_left_shift');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.bit_left_shift. Got: ' + callback);
        }
        emitOperators(cnt, '<<', model, ctx, callback);
    }
    ;
    cnt.stm.bit_right_shift = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.bit_right_shift');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.bit_right_shift. Got: ' + callback);
        }
        emitOperators(cnt, '>>', model, ctx, callback);
    }
    ;
    cnt.stm.zero_fill_right_shift = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.zero_fill_right_shift');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.zero_fill_right_shift. Got: ' + callback);
        }
        emitOperators(cnt, '>>>', model, ctx, callback);
    }
    ;
    function emitOperators(cnt, op, model, ctx, callback) {
        // loog 'emitOperators', op
        model = writeComments(model, ctx);
        if (model.wzParent.wzElement == 'template') {
            ctx.write('${');
        }
        if (model.statements[0] && model.statements[1]) {
            var requireParen1 = model.statements.length > 2;
            var requireParena1 = model.statements[0].statements.length > 0;
            var requireParena2 = model.statements[1].statements.length > 0;
            if (requireParen1) {
                ctx.write('(');
            }
            if (requireParena1) {
                ctx.write('(');
            }
            cnt.genItem(model.statements[0], ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                if (requireParena1) {
                    ctx.write(')');
                }
                ctx.write(' ' + op + ' ');
                if (requireParena2) {
                    ctx.write('(');
                }
                cnt.genItem(model.statements[1], ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    if (requireParena2) {
                        ctx.write(')');
                    }
                    if (requireParen1) {
                        ctx.write(')');
                    }
                    if (model.statements[2]) {
                        cnt.genItem(model.statements[2], ctx, (err, notUsed) => {
                            if (err) {
                                return callback(err);
                            }
                            if (u.isTopStatement(model, ctx) && (u.isDescendentOf(model, 'iif') == false)) {
                                ctx.w(';');
                            }
                            if (model.wzParent.wzElement == 'template') {
                                ctx.write('}');
                            }
                            return callback(null);
                        }
                        )
                    }
                    else {
                        if (u.isTopStatement(model, ctx) && (u.isDescendentOf(model, 'iif') == false)) {
                            ctx.w(';');
                        }
                        if (model.wzParent.wzElement == 'template') {
                            ctx.write('}');
                        }
                        return callback(null);
                    }
                }
                )
            }
            )
        }
        else {
            if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
                ctx.write(' ' + op + ' ' + (model.wzName || ''));
                if (model.wzParent.wzElement == 'template') {
                    ctx.write('}');
                }
                return callback(null);
            }
            else {
                return callback(ctx.artifactGenerationError("Invalid model. Two child statements are required. Model: " + util.inspect(model, {depth: 2}), "wizzi-codegen/lib/js/statements/expressions/emitOperators", model));
            }
        }
    }
}
;