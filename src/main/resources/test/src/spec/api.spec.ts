const addContext = require("mochawesome/addContext");
const axios = require("axios");

// Use dynamic import for chai
let chai;
let expect;

before(async () => {
  const chaiModule = await import("chai");
  chai = chaiModule;
  expect = chai.expect;
});

// describe("error", () => {
//   it("error throwing", async () => {
//     throw new Error("hi there");

// const response = await axios.get("https://dogapi.dog/api/v2/breeds", {
//         timeout: 10000,
//       });
// expect(response.status).to.equal(200);

//     expect(true).to.equal(true);
//   });
// });
