const addContext = require("mochawesome/addContext");

// Use dynamic import for chai
let chai;
let expect;

before(async () => {
 const chaiModule = await import("chai");
 chai = chaiModule.default || chaiModule;
 expect = chai.expect;
});

after(async () => {
 // Your code to run after all tests have completed
 console.log("All tests have completed.");
});