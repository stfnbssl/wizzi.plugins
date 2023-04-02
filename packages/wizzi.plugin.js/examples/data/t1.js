var a;
var b = 1;
var c1, c2 = null;
var d = new Baby(0, 9).type;
var e = create("alpha");
var f = function (a, b) { return null; };
/*
for (var i = 0; i < 9; i++) {
    console.log(i);
    // more statements
}
for (var i = 0; ; i++) {
    console.log(i);
    if (i > 3) break;
    // more statements
}
var i = 0;
for (; ;) {
    if (i > 3) break;
    console.log(i);
    i++;
}
for (xx in k.obj) { 
    spluga();
}
function* foo() {
    yield 1;
    yield 2;
}
for (let o of foo()) {
    console.log(o);
    // expected output: 1
    break; // closes iterator, triggers return
}
*/
function* foo() {
    yield 1;
    yield 2;
}
for (let o of foo()) {
    console.log(o);
    // expected output: 1
    break; // closes iterator, triggers return
}
/*
var x = true ? 0 : dido.pluto(32, 'x') ? x.p[5] : p[1].x[4];
var x = true ? 0 : dido.pluto(32, 'x') ? new obelix(x.p[5]) : p[1].x[4];
*/
/*
if (alpha.beta / 10 * a.k(2)) {
    go();
} else {
    stay();
}
*/
/*
class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    get area() {
        return this.calcArea()
    }
    calcArea() {
        return this.height * this.width;
    }
    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
class Lion extends Cat {
    speak() {
        super.speak();
        console.log(this.name + ' roars.');
    }
}
*/
/*
this.hello("stefi");
var obj = {
    ['alpha beta']: 0,
    a: 1,
    items: [
        'alpha',
        'beta',
        'gamma'
    ],
    b: function (a) {
        var i = 0;
    }
}
function alpha(a, b, c) {
    if (true) {
        go();
    } else {
        stay();
    }
    var a;
    try {
        a = 10 / 0;
    }
    catch (ex)
    {
        a = 10 / 1;
    }
    for (var i=0; i++; i<10) {

    }
}
while (true) {
    bau();
}
*/
