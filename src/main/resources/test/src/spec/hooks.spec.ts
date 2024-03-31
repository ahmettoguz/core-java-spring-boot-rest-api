const addContext = require("mochawesome/addContext");

// Use dynamic import for chai
let chai;
let expect;

before(async () => {
  const chaiModule = await import("chai");
  chai = chaiModule;
  expect = chai.expect;
});

after(async () => {
  console.log("All tests have completed.");
});
