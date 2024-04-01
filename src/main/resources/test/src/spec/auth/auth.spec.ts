const addContext = require("mochawesome/addContext");
const axios = require("axios");

const App = require("../../app/App.ts");

before(async () => {
  
});

describe("Authentication Tests [auth]", function () {
  it("/api/auth/validate", async function () {
    // add context information
    addContext(this, "Checking server status.");

    const token = "mytoken";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make request
    const response = await axios.post(
      `${App.baseUrl}/api/auth/validate`,
      null,
      config
    );

    // check status
    if (response.status !== 200) throw new Error();
  });
});
