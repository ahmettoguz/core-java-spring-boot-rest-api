import App from "src/app/App";
import Constant from "src/constant/Constant";
import RoleEnum from "src/enum/RoleEnum";
import UserService from "src/service/UserService";
import AuthFacade from "../authentication/AuthFacade";
import UserRoleFacade from "../relational/UserRoleFacade";

const userRoleFacade = new UserRoleFacade();
const userService = new UserService();
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

export default InitFacade;
