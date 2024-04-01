const addContext = require("mochawesome/addContext");
const axios = require("axios");

const App = require("../../app/App.ts");

describe("Api Tests [health-check]", function () {
  it("/api/health-check", async function () {
    // add context information
    addContext(this, "Checking server status.");

    // make request
    const response = await axios.get(`${App.baseUrl}/api/health-check`);

    // check status
    if (response.status !== 200) throw new Error();
  });

  it("/api/health-check/info", async function () {
    // add context information
    addContext(this, "Checking app informations.");

    // make request
    const response = await axios.get(`${App.baseUrl}/api/health-check/info`);

    // check status
    if (response.status !== 200) throw new Error();

    // check data field
    if (
      response.data.data.description === undefined ||
      response.data.data.name === undefined
    )
      throw new Error();
  });
});
