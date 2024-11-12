const App = require("../../app/App.ts");
const RoleEnum = require("../../enum/RoleEnum.ts");
const Constant = require("../../constant/Constant.ts");
const UserService = require("../../service/UserService.ts");
const userService = new UserService();
const UserRoleFacade = require("../../facade/relational/UserRoleFacade.ts");
const userRoleFacade = new UserRoleFacade();
const AuthFacade = require("../../facade/authentication/AuthFacade.ts");
const authFacade = new AuthFacade();

class InitFacade {
  async initialCreation() {
    // perform operation
    App.admin = await userService.create();
  }

  async initialAdminRoleGrant() {
    // perform action
    await userRoleFacade.associateUserAndRole(
      Constant.admin.jwt,
      App.admin.id,
      [RoleEnum.ADMIN.id]
    );
  }

  async initialLoginAsAdmin() {
    // prepare request
    const data = {
      email: App.admin.email,
      password: App.admin.password,
    };

    // preform operation
    await authFacade.login(data, App.admin);
  }
}

module.exports = InitFacade;
