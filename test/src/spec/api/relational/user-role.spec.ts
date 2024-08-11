const addContext = require("mochawesome/addContext");
const RoleEnum = require("../../../enum/RoleEnum.ts");

const Constant = require("../../../constant/Constant.ts");
const CommonUtil = require("../../../util/CommonUtil.ts");
const App = require("../../../app/App.ts");

const Facade = require("../../../facade/relational/UserRoleFacade.ts");

before(async () => {
});

describe("User Role Relational Tests [user-role.spec]", function () {
    it("[POST] /api/users/{userId}/roles/{roleId}", async function () {
        // add context information
        addContext(this, "Create relation between user and role.");

        try {
            await Facade.createRelation(RoleEnum.ADMIN.id, App.admin.jwt);
        } catch (e: any) {
            throw new Error(`cannot create relation between user and role: ${e.message}`);
        }
    });

    it("[DELETE] /api/users/{userId}/roles/{roleId}", async function () {
        // add context information
        addContext(this, "Remove relation between user and role.");

        try {
            await Facade.deleteRelation(RoleEnum.PROJECTMANAGER.id, App.admin.jwt);
        } catch (e: any) {
            throw new Error(`cannot remove relation between user and role: ${e.message}`);
        }
    });
});
