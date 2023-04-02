var a = b ? c : d;
var a = b.x(1, 3) ? c : d(function () { return 0; });
if (true) {
    go();
} else {
    stay();
}
var y = 2;
if (typeof Error === 'undefined') {
    var x = typeof Error;
} else {
    delete x.y;
}
switch (expr) {
    case "Arance":
        console.log("Le arance costano €1,0 al chilo.");
        break;
    case "Mele":
        console.log("Le mele costano €0.64 al chilo.");
        break;
    case "Banane":
        console.log("Le banane costano €0.92 al chilo.");
        break;
    case "Ciliege":
        console.log("Le ciliegie costano €2.59 al chilo.");
        break;
    case "Manghi":
    case "Papaye":
        console.log("I manghi e le papaye costano €1.79 al chilo.");
        break;
    default:
        console.log("Spiacenti, non abbiamo " + expr + ".");
}

var stop = false, age = 23;

age > 18 ? (
    alert("OK, you can go."),
    location.assign("continue.html")
) : (
        stop = true,
        alert("Sorry, you are much too young!")
    );

var age = 16;

var url = age > 18 ? (
    alert("OK, you can go."),
    // alert returns "undefined", but it will be ignored because
    // isn't the last comma-separated value of the parenthesis
    "continue.html" // the value to be assigned if age > 18
) : (
        alert("You are much too young!"),
        alert("Sorry :-("),
        // etc. etc.
        "stop.html" // the value to be assigned if !(age > 18)
    );

location.assign(url); // "stop.html"