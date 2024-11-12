const RoleEnum = require("../../enum/RoleEnum.ts");

const UserService = require("../../service/UserService.ts");
const userService = new UserService();

const UserRoleService = require("../../service/relational/UserRoleService.ts");
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

module.exports = UserRoleFacade;
