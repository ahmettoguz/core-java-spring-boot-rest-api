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

describe("health-check", function () {
  it("/api/health-check", async function () {
    // add context information
    addContext(this, "Checking server status.");

    // make request
    const response = await axios.get("http://localhost:8080/api/health-check");

    // make assertion
    expect(response.status).to.equal(200);
  });

  it("/api/health-check/info", async function () {
    // add context information
    addContext(this, "Checking app informations.");

    // make request
    const response = await axios.get(
      "http://localhost:8080/api/health-check/info"
    );

    // check conditions
    let isValid = true;

    if (response.status != 200) isValid = false;

    if (
      response.data.data.description === undefined ||
      response.data.data.name === undefined
    )
      isValid = false;

    // make assertion
    expect(isValid).to.equal(true);
  });
});
