const addContext = require("mochawesome/addContext");
const axios = require("axios");

const App = require("../../app/App.ts");

describe("Authentication Tests [auth]", function () {
  it("/api/auth/validate", async function () {
    // add context information
    addContext(this, "Checking server status.");

    // make request
    const response = await axios.get(`${App.baseUrl}/api/auth/validate`);

    // check status
    if (response.status !== 200) throw new Error();
  });
});
