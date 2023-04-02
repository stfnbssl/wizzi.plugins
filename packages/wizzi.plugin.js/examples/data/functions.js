/*
  The default value make messy the param
*/

function alpha ({a = 1}) {
}


/*

function alpha (a = 1, b) {
}


var x = ([a, b]) => 1;

function a() {
}

function b(x) {
}

function c(x, y, z) {
}

var d = function e() {
};

function* f() {
    yield 1;
    yield 2;
}

gs.map(g => g.length);

var h = () => { var i = 0; }

// Parenthesize the body of function to return an object literal expression:
var i = params => ({ foo: bar });

// Rest parameters and default parameters are supported
var l = (param1, param2, ...rest) => { var i = 0; }
var m = (param1 = defaultValue1, param2, paramN = defaultValueN) => {
    var i = 0;
}

// Destructuring within the parameter list is also supported
var f = ([a, b] = [1, 2], { x: c } = { x: a + b }) => a + b + c;
f(); 

function Foo() {
    if (!new.target) throw 'Foo() must be called with new';
}

*/