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

describe("git", () => {
  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });

  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });

  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });
});

describe("gel", () => {
  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });

  it("should return a 200 status code", async () => {
    const response = await axios.get("https://dogapi.dog/api/v2/breeds");
    expect(response.status).to.equal(200);
  });
});
