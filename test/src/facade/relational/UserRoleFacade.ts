const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const RoleEnum = require("../../enum/RoleEnum.ts");

const UserService = require("../../service/UserService.ts");
const Service = require("../../service/relational/UserRoleService.ts");

class UserRoleFacade {
    static async createRelation(targetRoleId, jwt) {
        // create user
        const user = await UserService.create();

        // create relation between user and role
        await Service.createRelation(user.id, RoleEnum.ADMIN.id, jwt);

        // read user
        const readInstance = await UserService.readWithId(jwt, user.id);

        // check role relation
        if (!readInstance.roleIds.includes(targetRoleId))
            throw new Error("user and role relation cannot established");
    }

    
    static async deleteRelation(targetRoleId, jwt) {
        // create user
        const user = await UserService.create();

        // create relation between user and role
        await Service.createRelation(user.id, targetRoleId, jwt);

        // read user
        let readInstance = await UserService.readWithId(jwt, user.id);

        // check role relation
        if (!readInstance.roleIds.includes(targetRoleId))
            throw new Error("user and role relation cannot established");

        // remove relation
        await Service.deleteRelation(user.id, targetRoleId, jwt);

        // read user
        readInstance = await UserService.readWithId(jwt, user.id);

        // check role relation
        if (readInstance.roleIds.includes(targetRoleId))
            throw new Error("user and role relation cannot removed");
    }
}

module.exports = UserRoleFacade;
