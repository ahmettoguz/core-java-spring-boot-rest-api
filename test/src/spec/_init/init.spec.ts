const addContext = require("mochawesome/addContext");
const InitFacade = require("../../facade/init/InitFacade.ts");
const initFacade = new InitFacade();

describe("Initialization Tests [init.spec]", function () {
  it("initial user creation", async function () {
    // add context information
    addContext(this, "Creating user for admin authorization.");

    // perform operation
    await initFacade.initialCreation();
  });

  it("admin role grant to initial user", async function () {
    // add context information
    addContext(this, "Granting admin role to created user.");

    // perform operation
    await initFacade.initialAdminRoleGrant();
  });

  it("initial user login as admin", async function () {
    // add context information
    addContext(this, "Login as admin.");

    // perform operation
    await initFacade.initialLoginAsAdmin();
  });
});
