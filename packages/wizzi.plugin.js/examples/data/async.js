async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

(async function (x) { // async function expression used as an IIFE
    var p_a = resolveAfter2Seconds(20);
    var p_b = resolveAfter2Seconds(30);
    return x + await p_a + await p_b;
})(10).then(v => {
    console.log(v);  // prints 60 after 2 seconds.
});