const addContext = require("mochawesome/addContext");

const Constant = require("../../../constant/Constant.ts");
const CommonUtil = require("../../../util/CommonUtil.ts");
const App = require("../../../app/App.ts");

const Facade = require("../../../facade/relational/UserRoleFacade.ts");
const UserFacade = require("../../../facade/UserFacade.ts");

before(async () => {
});

describe("User Role Relational Tests [user-role.spec]", function () {
    it("[POST] /api/users/{userId}/roles/{roleId}", async function () {
        // add context information
        addContext(this, "Create relation between user and role.");

        const targetRoleId = 1;
        try {
            await Facade.createRelation(targetRoleId);
        } catch (e: any) {
            throw new Error(`cannot create relation between user and role: ${e.message}`);
        }
    });

    it("[DELETE] /api/users/{userId}/roles/{roleId}", async function () {
        // add context information
        addContext(this, "Remove relation between user and role.");

        const targetRoleId = 1;
        try {
            await Facade.deleteRelation(targetRoleId);
        } catch (e: any) {
            throw new Error(`cannot remove relation between user and role: ${e.message}`);
        }
    });
});
