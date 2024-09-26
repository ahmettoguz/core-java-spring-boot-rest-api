const addContext = require("mochawesome/addContext");
const AuthFacade = require("../../facade/AuthFacade.ts");
const authFacade = new AuthFacade();

before(async () => {});

describe("Authentication Operation Tests [auth.spec]", function () {
  it("[POST] /api/auth/login", async function () {
    // add context information
    addContext(this, "Checking login operation.");

    // perform operation
    await authFacade.login();
  });

  it("[POST] /api/auth/validate", async function () {
    // add context information
    addContext(this, "Validating jwt token.");

    // perform operation
    await authFacade.validateJwt();
  });
});
