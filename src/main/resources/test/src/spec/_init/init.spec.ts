const addContext = require("mochawesome/addContext");
const axios = require("axios");

const Constant = require("../../constant/Constant.ts");
const App = require("../../app/App.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const RoleEnum = require("../../enum/RoleEnum.ts");

const UserFacade = require("../../facade/UserFacade.ts");
const RoleFacade = require("../../facade/RoleFacade.ts");
const AuthFacade = require("../../facade/AuthFacade.ts");

describe("Initializing Environment", function () {
  it("user creation", async function () {
    // context of the test
    addContext(this, "Creating user.");

    //perform action
    try {
      await UserFacade.createUser(RoleEnum.USER);
    } catch (error) {
      throw error;
    }
  });

  it("user role grant", async function () {
    // TODO add token to grant access request to admin token
    // context of the test
    addContext(this, "Granting user role to created user.");

    // perform action
    try {
      RoleFacade.addRoleToUser(RoleEnum.USER);
    } catch (error) {
      throw error;
    }
  });

  it("user login", async function () {
    // context of the test
    addContext(this, "Login as user.");

    // perform action
    try {
      await AuthFacade.login(RoleEnum.USER);
    } catch (error) {
      throw error;
    }
  });

  it("project manager creation", async function () {
    // context of the test
    addContext(this, "Creating project manager.");

    //perform action
    try {
      await UserFacade.createUser(RoleEnum.PROJECTMANAGER);
    } catch (error) {
      throw error;
    }
  });

  it("project manager role grant", async function () {
    // context of the test
    addContext(this, "Granting project manager role to created user.");

    // perform action
    try {
      RoleFacade.addRoleToUser(RoleEnum.PROJECTMANAGER);
    } catch (error) {
      throw error;
    }
  });

  it("project manager login", async function () {
    // context of the test
    addContext(this, "Login as project manager.");

    // perform action
    try {
      await AuthFacade.login(RoleEnum.PROJECTMANAGER);
    } catch (error) {
      throw error;
    }
  });

  it("admin creation", async function () {
    // context of the test
    addContext(this, "Creating admin.");

    //perform action
    try {
      await UserFacade.createUser(RoleEnum.ADMIN);
    } catch (error) {
      throw error;
    }
  });

  it("admin role grant", async function () {
    // context of the test
    addContext(this, "Granting admin role to created user.");

    // perform action
    try {
      RoleFacade.addRoleToUser(RoleEnum.ADMIN);
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
