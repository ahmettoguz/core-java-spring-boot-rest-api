const axios = require("axios");
const addContext = require("mochawesome/addContext");

// Use dynamic import for chai
let chai;
let expect;

before(async () => {
  const chaiModule = await import("chai");
  chai = chaiModule.default || chaiModule;
  expect = chai.expect;
});

describe("health-check", function () {
  it("should return a 200 status code", async function () {
    addContext(this, "simple string");
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });
});

describe("h2", () => {
  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });

  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });
});