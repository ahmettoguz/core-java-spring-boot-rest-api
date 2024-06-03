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
        addContext(this, "Bind user with role.");

        const targetRoleId = 1;
        try {
            await Facade.createRelation(targetRoleId);
        } catch (e) {
            throw e;
        }
    });

    // it("[DELETE] /api/projects/${id}", async function () {
    //   // add context information
    //   addContext(this, "Delete project.");

    //   // prepare data
    //   const data = {
    //     title: `${
    //       Constant.preKey
    //     }${CommonUtil.generateRandomWord()}_newProjectTitle`,
    //     progress: CommonUtil.generateRandomNumber(0, 100),
    //     isActive: false,
    //   };

    //   // create instance
    //   const instanceToCreate = await Facade.create(App.admin.jwt, data);

    //   // delete instance
    //   await Facade.delete(App.admin.jwt, instanceToCreate.id);

    //   // try to read deleted instance
    //   let isInstanceExist;
    //   try {
    //     await Facade.readWithId(App.admin.jwt, instanceToCreate.id);
    //     isInstanceExist = true;
    //   } catch (error) {
    //     isInstanceExist = false;
    //   }

    //   if (isInstanceExist) throw new Error("deleted instance is exist");
    // });
});
