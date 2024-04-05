const addContext = require("mochawesome/addContext");

const RoleEnum = require("../../enum/RoleEnum.ts");
const App = require("../../app/App.ts");
const Constant = require("../../constant/Constant.ts");

const UserFacade = require("../../facade/UserFacade.ts");
const RoleFacade = require("../../facade/RoleFacade.ts");
const AuthFacade = require("../../facade/AuthFacade.ts");

describe("Initializing Environment [init]", function () {
  it("user creation", async function () {
    // context of the test
    addContext(this, "Creating admin.");

    //perform action
    try {
      await UserFacade.createUser(RoleEnum.ADMIN);
    } catch (error) {
      throw error;
    }
  });

  it("admin role grant to user", async function () {
    // context of the test
    addContext(this, "Granting admin role to created user.");

    // perform action
    try {
      await RoleFacade.addRoleToUser(App.admin, Constant.admin, RoleEnum.ADMIN);
    } catch (error) {
      throw error;
    }
  });

  it("admin login", async function () {
    // context of the test
    addContext(this, "Login as admin.");

    // perform action
    try {
      await AuthFacade.login(RoleEnum.ADMIN);
    } catch (error) {
      throw error;
    }
  });
});
