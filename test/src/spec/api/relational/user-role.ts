const addContext = require("mochawesome/addContext");

const Constant = require("../../../constant/Constant.ts");
const CommonUtil = require("../../../util/CommonUtil.ts");
const App = require("../../../app/App.ts");

const Facade = require("../../../facade/relational/UserRoleFacade.ts");
const UserFacade = require("../../../facade/UserFacade.ts");

before(async () => {});

describe("User Role Relational Tests [user-role.spec]", function () {
  it("[POST] /api/users/{userId}/roles/{roleId}", async function () {
    // add context information
    addContext(this, "Bind user with role.");

    const targetRoleId = 1;

    // create user
    // prepare data
    const data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let instanceToCreate: any = {};
    try {
      await UserFacade.create(data, instanceToCreate);
    } catch (error) {
      throw error;
    }

    // bind created user to existing role
    let result;
    try {
      result = await Facade.createRelation(
        App.admin.jwt,
        instanceToCreate.id,
        targetRoleId
      );
    } catch (error) {
      throw error;
    }

    // read user and check its role
    // read instance
    let readInstance;
    try {
      readInstance = await UserFacade.readWithId(
        App.admin.jwt,
        instanceToCreate.id
      );
    } catch (error) {
      throw error;
    }

    if (!readInstance.roleIds.includes(targetRoleId))
      throw new Error("user and role relation cannot established");
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
