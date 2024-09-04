/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\.wizzi-override\lib\artifacts\ts\module\gen\es6\class.js.ittf
    utc time: Wed, 04 Sep 2024 02:34:22 GMT
*/
var u = require('../utils/stm');
var statement = require('../statement');
var method = require('./method');
var handler = require('./handler');
var property = require('./property');
var xget = require('./get');
var xset = require('./set');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.class';
md.gen = function(model, ctx, callback) {
    var zclass = model.wzName,
        zsuper = model.super;
    // loog 'ts.es6.class', model
    u.writeComments(model, ctx);
    u.genTSDecorators(model, ctx, statement, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        classDecorators(model, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            u.genAccessorsAndExtra(model, ctx)
            ctx.write('class ' + zclass);
            u.genTSTypeParameters(model, ctx, statement, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                classSuper(model, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    classImplements(model, ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(' {');
                        ctx.indent();
                        classCTor(model, ctx, (err, notUsed) => {
                            if (err) {
                                return callback(err);
                            }
                            classMembers(model, ctx, (err, notUsed) => {
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
                    )
                }
                )
            }
            )
        }
        )
    }
    )
}
;
function classDecorators(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classDecorators');
    }
    var count = 0;
    var len_1 = model.statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.statements[index_1];
        if (item_1.wzElement == 'decoratorCall') {
            if (count > 0) {
                ctx.write(', ');
            }
            count++;
            statement.genItem(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.w();
                return process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
            }
            )
        }
        else {
            return process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
        }
    }
    repeater_1(0);
    function next_1() {
        return callback(null);
    }
}
function classImplements(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classImplements');
    }
    if (model.implements.length == 0) {
        return callback(null);
    }
    ctx.write( ' implements ' );
    var len_1 = model.implements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.implements[index_1];
        if (index_1 > 0) {
            ctx.write(', ');
        }
        ctx.write( item_1.wzName );
        return process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
    }
    repeater_1(0);
    function next_1() {
        return callback(null);
    }
}
function classSuper(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classSuper');
    }
    
    // loog 'classSuper', 'model.superType',
    if (model.super) {
        ctx.write(' extends ' + model.super);
        if (model.superType && model.superType.typeParameterInsts.length > 0) {
            ctx.write('<');
            var len_1 = model.superType.typeParameterInsts.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.superType.typeParameterInsts[index_1];
                if (index_1 > 0) {
                    ctx.write(', ');
                }
                if (item_1.statements.length == 0) {
                    ctx.write(item_1.wzName);
                    return process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                }
                else if (item_1.statements.length == 1) {
                    statement.genItem(item_1.statements[0], ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        return process.nextTick(function() {
                                repeater_1(index_1 + 1);
                            });
                    }
                    )
                }
                else {
                    ctx.write('x');
                    return process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                }
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
    else {
        return callback(null);
    }
}
function classCTor(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classCTor');
    }
    // loog 'classCTor'
    var zsuper = model.super,
        ctor = model.findCtor();
    if (ctor) {
        u.genAccessorsAndExtra(ctor, ctx)
        ctx.write('constructor');
        u.genTSTypeParameters(ctor, ctx, statement, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(ctor, ctx, statement, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                ctx.w(' {');
                ctx.indent();
                classCTor_end(model, ctx, callback)
            }
            )
        }
        )
    }
    else {
        return callback(null);
    }
}
function classCTor_end(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classCTor_end');
    }
    // loog 'classCTor_end'
    var zsuper = model.super,
        ctor = model.findCtor(),
        superArgs = ctor == null ? '' : (ctor.getBaseArgs() || '');
    if (zsuper && superArgs.length > 0) {
        ctx.w('super(' + superArgs + ');');
    }
    if (ctor) {
        statement.genMany(ctor.statements, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        }
        )
    }
    else if (zsuper) {
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    }
    else {
        return callback(null);
    }
}
function classMembers(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classMembers');
    }
    // loog 'classMembers'
    var len_1 = model.statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.statements[index_1];
        // loog 'ts.es6.class.classMembers', item_1.wzElement
        var generator = null;
        var done = false;
        
        // done already
        if (item_1.wzElement === 'ctor') {
            done = true;
        }
        
        // done already
        else if (item_1.wzElement === 'decoratorCall') {
            done = true;
        }
        else if (item_1.wzElement === 'method' || item_1.wzElement === 'typeMethod') {
            generator = method;
        }
        else if (item_1.wzElement === 'arrowfunction') {
            generator = handler;
        }
        else if (item_1.wzElement === 'property' || item_1.wzElement === 'p') {
            generator = property;
        }
        else if (item_1.wzElement === 'get') {
            generator = xget;
        }
        else if (item_1.wzElement === 'set') {
            generator = xset;
        }
        else {
            generator = null;
        }
        if (generator) {
            generator.gen(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                return process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
            }
            )
        }
        else {
            if (done == false) {
                statement.genItem(item_1, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    return process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                }
                )
            }
            else {
                return process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
            }
        }
    }
    repeater_1(0);
    function next_1() {
        // loog 'ts.es6.class.classMembers end'
        return callback(null);
    }
}
function generateReturnType(model, ctx) {
    var rtype = u.extractTS(model, 'typeReturn');
    if (rtype) {
        cnt.stm[rtype.wzElement](rtype, ctx, () => {});
    }
}
function generateParams(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
    return callback(null);
}