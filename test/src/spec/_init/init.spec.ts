const addContext = require("mochawesome/addContext");

const RoleEnum = require("../../enum/RoleEnum.ts");
const App = require("../../app/App.ts");
const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");

const AuthFacade = require("../../facade/authentication/AuthFacade.ts");
const authFacade = new AuthFacade();

const UserService = require("../../service/UserService.ts");
const userService = new UserService("users");

const UserRoleService = require("../../service/relational/UserRoleService.ts");

describe("Initialization Tests [init.spec]", function () {
  it("initial user creation", async function () {
    // add context information
    addContext(this, "Creating user for admin authorization.");

    // perform operation
    App.admin = await userService.create();
  });

  it("admin role grant to initial user", async function () {
    // context of the test
    addContext(this, "Granting admin role to created user.");

    // perform action
    await UserRoleService.createRelation(
      App.admin.id,
      RoleEnum.ADMIN.id,
      Constant.admin.jwt
    );
  });

  it("initial user login as admin", async function () {
    // context of the test
    addContext(this, "Login as admin.");

    // prepare body
    const body = {
      email: App.admin.email,
      password: App.admin.password,
    };

    // perform action
    let token;
    try {
      // get token
      token = await authFacade.login(body, App.admin);
    } catch (e: any) {
      throw new Error(`user login failed: ${e.message}`);
    }
  });
});
