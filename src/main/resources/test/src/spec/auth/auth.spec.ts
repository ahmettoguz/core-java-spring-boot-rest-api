const addContext = require("mochawesome/addContext");

const App = require("../../app/App.ts");

const AuthFacade = require("../../facade/AuthFacade.ts");

before(async () => {});

describe("Authentication Tests [auth]", function () {
  it("/api/auth/validate", async function () {
    // add context information
    addContext(this, "Validating jwt token.");

    //perform action
    try {
      await AuthFacade.validate(App.admin.jwt);
    } catch (error) {
      throw error;
    }
  });
});
