const addContext = require("mochawesome/addContext");

const RoleEnum = require("../../enum/RoleEnum.ts");
const App = require("../../app/App.ts");
const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");

const UserFacade = require("../../facade/UserFacade.ts");
const RoleFacade = require("../../facade/RoleFacade.ts");
const AuthFacade = require("../../facade/AuthFacade.ts");

describe("Initialization Tests [init.spec]", function () {
  it("user creation", async function () {
    // context of the test
    addContext(this, "Creating admin.");

    // prepare data
    const data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    //perform action
    try {
      await UserFacade.create(data, App.admin);
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

    // prepare body
    const body = {
      email: App.admin.email,
      password: App.admin.password,
    };

    // perform action
    let token;
    try {
      // get token
      token = await AuthFacade.login(body, App.admin);
    } catch (error) {
      throw error;
    }
  });
});
