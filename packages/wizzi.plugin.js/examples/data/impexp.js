/*
export { myFunction1, myFunction1a, myFunction1b }; // esporta una funzione dichiarata in precedenza
export { myFunction2 as yourFunction }; // esporta una funzione dichiarata in precedenza
export const foo1 = Math.sqrt(2); // esporta una costante

export default function myFunction3() {}
import { cube1, foo2 } from 'my-module';
import cube2 from 'my-module';
import * as foo from 'mod.js';
*/
export * from "FAIL";
export { foo } from 'mod';
/*

// export default function () { } // or 'export default class {}'
// Non ci va il punto e virgola qui

// modulo "my-module.js"
function cube1(x) {
    return x * x * x;
}
const foo2 = Math.PI + Math.SQRT2;
export { cube1, foo2 };
import { cube1, foo2 } from 'my-module';

// modulo "my-module.js"
export default function cube2(x) {
    return x * x * x;
}
import cube2 from 'my-module';

*/