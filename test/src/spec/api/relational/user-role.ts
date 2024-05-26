const addContext = require("mochawesome/addContext");

const Constant = require("../../../constant/Constant.ts");
const CommonUtil = require("../../../util/CommonUtil.ts");
const App = require("../../../app/App.ts");

const Facade = require("../../../facade/relational/UserRoleFacade.ts");

before(async () => {});

describe("Project Tests [project.spec]", function () {
  // it("[POST] /api/projects", async function () {
  //   // add context information
  //   addContext(this, "Create project.");

  //   // prepare data
  //   const data = {
  //     title: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_newProjectTitle`,
  //     progress: CommonUtil.generateRandomNumber(0, 100),
  //     isActive: true,
  //     id: -1,
  //   };

  //   // create instance
  //   const instanceToCreate = await Facade.create(App.admin.jwt, data);

  //   // check created output
  //   if (instanceToCreate === null || instanceToCreate === undefined)
  //     throw new Error("instance cannot created");

  //   // check userId field (it shouldn't be added via post)
  //   if (instanceToCreate.id === -1) throw new Error("id should't be setted");

  //   // check progress
  //   if (data.progress !== instanceToCreate.progress)
  //     throw new Error("progress is not matching");
  // });

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
