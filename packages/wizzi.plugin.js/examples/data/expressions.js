var a = 1 + 2;
var b = 2 - 1;
var c = 2 * 1;
var d = 3 / 2;
var e = 3 * 2 + 1 / 2
var e = 3 * (2 + 1) / 2
var e = 3 * (2 + a(1, function () {
})) / 2;

var a = 10 + b++;
var a2 = 10 + --b2;
var c = 10 + b(1, function () { }).c++;
var c2 = 10 + --b2(1, function () { }).c;
a++;
if (typeof Error === 'undefined') {}
var x = typeof Error;