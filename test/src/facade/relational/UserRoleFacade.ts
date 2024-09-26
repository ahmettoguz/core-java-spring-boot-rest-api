const RoleEnum = require("../../enum/RoleEnum.ts");

const UserService = require("../../service/UserService.ts");
const userService = new UserService();

const UserRoleService = require("../../service/relational/UserRoleService.ts");
const userRoleService = new UserRoleService();

class UserRoleFacade {
  async associateUserAndRole(jwt, userId = null, roleId = null) {
    // check data and prepare if not exist
    if (userId == null && roleId == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // assumed role is admin
      roleId = RoleEnum.ADMIN.id;
    }

    // create relation between user and role
    await userRoleService.associate(jwt, userId, roleId);

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check role relation
    if (!readInstance.roleIds.includes(roleId))
      throw new Error("user and role relation cannot established");
  }

  async unassociateUserAndRole(jwt, userId = null, roleId = null) {
    // check data and prepare if not exist
    if (userId == null && roleId == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // assumed role is admin
      roleId = RoleEnum.ADMIN.id;
    }

    // create relation between user and role
    await this.associateUserAndRole(jwt, userId, roleId);

    // remove relation between user and role
    await userRoleService.unassociate(jwt, userId, roleId);

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check role relation
    if (readInstance.roleIds.includes(roleId))
      throw new Error("user and role relation cannot established");
  }
}

module.exports = UserRoleFacade;
