/*
a();
b(2, '3', 4);
b(5);
c(2, '3', function () { return 10; });
*/
b.c();
a().b().c();
a(1).b(2, 3).c(3, 4, 5);
a(1).b(2, d('a')).c(3, 4, 5);
a().b(2, d(function () { return 0; }));
a(1).b(2, d(function () { return 0; })).c(3, 4, 5);
a(1).b(2, d(function () { return 0; })).c(3, 4, 5)[3].hello();
a(1).b(2, d(function () { return 0; })).c("3", k(), 5)[3].hello();
a(1).b(2, d(function () { return 0; })).c("3", k(12, function () { }), 5)[3].hello();
a.b.c.d.e(2, d(function () { return 0; })).c("3", k(12, function () { }), 5)[3].hello();
/*
// b.c().d()[2].f();

b(5).c();
*/