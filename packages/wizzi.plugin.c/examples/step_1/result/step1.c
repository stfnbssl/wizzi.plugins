#include <stdio.h>      // for printing to stdout.
void heading(char* text) {
    printf ("\n\n%s\n", text);
    printf ("========================================\n");
}
void heading2(char* text) {
    printf ("\n\n    %s\n", text);
    printf ("    ------------------------------------\n");
}
void sample_for() {
    heading ("Esempio For");
    int fahr;
    printf ("Celsius \n");
    for (fahr = 0; fahr <= 300; fahr = fahr + 20) {
        printf ("%7d %9.1f\n", fahr, (5.0/9.0) * (fahr- 32));
    }
    heading2 ("Inverse");
    for (fahr = 300; fahr >= 0; fahr = fahr - 20) {
        printf ("%7d %9.1f\n", fahr, (5.0/9.0) * (fahr- 32));
    }
    heading2 ("Using #define");
    #define LOWER 0
    #define UPPER 300
    #define STEP 20
    for (fahr = LOWER; fahr <= UPPER; fahr = fahr + STEP) {
        printf ("%7d %9.1f\n", fahr, (5.0/9.0) * (fahr- 32));
    }
}
void sample_get_put_char() {
    heading ("Esempio getchar, putchar");
    int c;
    printf ("Enter string, terminate with Ctrl-z\n");
    // EOF = Ctrl+z
    while ((c = getchar()) != EOF) {
        putchar (c);
    }
    heading2 ("Count chars");
    printf ("Enter string, terminate with Ctrl-z\n");
    long nc;
    nc = 0;
    while ((c = getchar()) != EOF) {
        ++nc; 
    }
    printf ("Num chars: %ld\n", nc);
    for (nc = 0; getchar() != EOF; nc++) {
        ; 
    }
    printf ("Num chars: %ld\n", nc);
}
void sample_vector() {
    heading ("Esempio vettori");
    int a[5];
    int *pa;
    for (int i = 0; i<5; i++) {
        a[i] = i*10;
    }
    pa = &a[3];
    printf ("L'elemento %d ha valore: %d, e indirizzo: %p", 3, *pa, pa);
    printf ("L'elemento %d+1 ha valore: %d, e indirizzo: %p", 3, *(pa+1), pa+1);
    printf ("La differenza tra gli indirizzi di %d e %d+1 è: %d", 3, 3, (pa+1) - (pa));
}
void sample_switch(int a, float b, float c) {
    heading ("Esempio switch");
    switch ((a)) {
        case 1:
            b = b+c;
            printf ("Il risultato dell'addizione e': %f",b);
            break; 
        case 2:
            b = b-c;
            printf ("Il risultato della sottrazione e': %f",b);
            break; 
        case 3:
            b = b*c;
            printf ("Il risultato della moltiplicazione e': %f",b);
            break; 
        case 4:
            b = b/c;
            printf ("Il risultato della moltiplicazione e': %f",b);
            break; 
        default: {
            printf ("Scelta sbagliata");
            break; 
        }
    }
}
void main() {
    printf ("Hello world\n");
    sample_for ();
    sample_get_put_char ();
    sample_switch (2, 5, 2);
    sample_vector ();
    heading ("Esempio puntatore");
    int mem_a = 5;
    int *mem_p = &mem_a; // & è l’operatore di indirizzo e viene utilizzato per assegnare ad un puntatore l’indirizzo di una variabile;
    printf ("Indirizzo memoria di mem_a: %p", mem_p);
    heading ("Esempio Array");
    int vettore[5];
    for (int i = 0; i<5; i++) {
        vettore[i] = i+1;
    }
    for (int i = 0; i<5; i++) {
        printf ("%d \n",vettore[i]);
    }
    heading ("Esempio lettura file");
    FILE *pf;
    int a;
    pf = fopen ( "numeri.txt" , "r" );
    if (pf) {
        while (!feof(pf)) {
            fscanf ( pf, "%d\n" , &a );
            printf ( "%d\n" , a );
        }
        fclose ( pf );
    }
    else {
        printf ( " errore durante l’apertura del file. " );
    }
}
