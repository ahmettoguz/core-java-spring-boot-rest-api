const addContext = require("mochawesome/addContext");

const App = require("../../app/App.ts");

const AuthFacade = require("../../facade/AuthFacade.ts");

before(async () => {});

describe("Authentication Operation Tests [auth.spec]", function () {
  it("/api/auth/login", async function () {
    // add context information
    addContext(this, "Checking login operation.");

    // prepare body
    const body = {
      email: App.admin.email,
      password: App.admin.password,
    };

    //perform action
    try {
      await AuthFacade.login(body);
    } catch (error) {
      throw error;
    }
  });

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
