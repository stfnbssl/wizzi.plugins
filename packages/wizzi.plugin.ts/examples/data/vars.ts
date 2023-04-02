"use strict";

/* Boolean */

let isDone: boolean = false;

/* Number */

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

/* String */

let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence1: string = `Hello, my name is ${fullName}`;
let sentence2: string = "Hello, my name is " + fullName + ".\n\n" + "I'll be " + (age + 1) + " years old next month.";

/* Array  */
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

/* Tuple*/

// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

x[3] = "world"; // OK, 'string' can be assigned to 'string | number'

console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'

x[6] = true; // Error, 'boolean' isn't 'string | number'

/* Union types are an advanced topic that we’ll cover in a later chapter.*/

/* Enum*/

enum Color { Red, Green, Blue }
let c: Color = Color.Green;
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green;
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green;
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2];
console.log(colorName); // Displays 'Green' as its value is 2 above

/* Any*/
let notSure1: any = 4;
notSure1 = "maybe a string instead";
notSure1 = false; // okay, definitely a boolean
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
let list: any[] = [1, true, "free"];
list[1] = 100;

/* Void*/
function warnUser(): void {
    console.log("This is my warning message");
}
let unusable: void = undefined;

/* Null and Undefined*/
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

/* Never*/
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
/*
    Object
*/
declare function create(o: object | null): void;

/*
    Type assertions have two forms
    not parsed by babel
    let strLength: number = (<string>someValue).length;
*/
let strLength: number = (someValue as string).length;

