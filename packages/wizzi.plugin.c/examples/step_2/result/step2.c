#include <stdio.h>      // for printing to stdout.
int Sum(int a, int b) {
    return a + b;
}
int main() {
    int i = 1;
    int a, b, c;
    a = i;
    b = 2;
    c = Sum(a, b);
    printf("%d + %d = %d", a, b, c); printf("\n");
    goto STOP;
    STOP:
        return 0;
}
