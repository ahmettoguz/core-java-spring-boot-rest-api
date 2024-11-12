import UserService from "src/service/UserService";
import UserRoleService from "src/service/relational/UserRoleService";
import RoleEnum from "src/enum/RoleEnum";

const userService = new UserService();
const userRoleService = new UserRoleService();

class UserRoleFacade {
  // many to many relation

  async associateUserAndRole(jwt, userId = null, roleIds = null) {
    // check data and prepare if not exist
    if (userId == null && roleIds == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // assumed roles
      roleIds = [RoleEnum.ADMIN.id, RoleEnum.PROJECTMANAGER.id];
    }

    // create relation between user and roles
    for (const id of roleIds) {
      await userRoleService.associate(jwt, userId, id);
    }

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check relation
    if (roleIds.some((id) => !readInstance.roleIds.includes(id))) {
      throw new Error("user and role relation cannot established");
    }
  }

  async unassociateUserAndRole(jwt, userId = null, roleIds = null) {
    // check data and prepare if not exist
    if (userId == null && roleIds == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // assumed roles
      roleIds = [RoleEnum.ADMIN.id, RoleEnum.PROJECTMANAGER.id];
    }

    // create relation between user and roles
    for (const id of roleIds) {
      await userRoleService.associate(jwt, userId, id);
    }

    // remove relation between user and roles
    for (const id of roleIds) {
      await userRoleService.unassociate(jwt, userId, id);
    }

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check role relations
    if (roleIds.some((id) => readInstance.roleIds.includes(id))) {
      throw new Error("user and role relation cannot removed");
    }
  }
}

export default UserRoleFacade;
