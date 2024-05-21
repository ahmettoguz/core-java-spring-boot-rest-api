const addContext = require("mochawesome/addContext");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const Facade = require("../../facade/ProjectFacade.ts");

before(async () => {});

describe("Project Tests [project.spec]", function () {
  it("[POST] /api/projects", async function () {
    // add context information
    addContext(this, "Create project.");

    // prepare data
    const data = {
      title: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_newProjectTitle`,
      progress: CommonUtil.generateRandomNumber(0, 100),
      isActive: true,
      id: -1,
    };

    // create instance
    const instanceToCreate = await Facade.create(App.admin.jwt, data);

    // check created output
    if (instanceToCreate === null || instanceToCreate === undefined)
      throw new Error("instance cannot created");

    // check userId field (it shouldn't be added via post)
    if (instanceToCreate.id === -1) throw new Error("id should't be setted");

    // check progress
    if (data.progress !== instanceToCreate.progress)
      throw new Error("progress is not matching");
  });

  it("[GET] /api/projects", async function () {
    // add context information
    addContext(this, "Reading all projects.");

    const createdInstanceIds: number[] = [];

    // create instances
    for (let i = 0; i < 2; i++) {
      // prepare data
      const data = {
        title: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}_newProjectTitle`,
        progress: CommonUtil.generateRandomNumber(0, 100),
        isActive: true,
      };
      const instanceToCreate = await Facade.create(App.admin.jwt, data);

      // save ids
      createdInstanceIds.push(instanceToCreate.id);
    }

    // read created instances
    const instancesRead = await Facade.readAll(App.admin.jwt);

    // check inserted ids
    for (let i = 0; i < createdInstanceIds.length; i++) {
      if (
        !instancesRead.some((instance) => instance.id === createdInstanceIds[i])
      ) {
        throw new Error("desired number of intances couldn't read");
      }
    }
  });

  it("[GET] /api/projects/{id}", async function () {
    // add context information
    addContext(this, "Reading project with id.");

    // prepare data
    const data = {
      title: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_newProjectTitle`,
      progress: CommonUtil.generateRandomNumber(0, 100),
      isActive: true,
    };

    // create instance
    const instanceToCreate = await Facade.create(App.admin.jwt, data);

    // read instance
    const readInstance = await Facade.readWithId(
      App.admin.jwt,
      instanceToCreate.id
    );

    // compare instances
    if (
      instanceToCreate.id !== readInstance.id ||
      instanceToCreate.title !== readInstance.title
    )
      throw new Error(
        "created instance name is not same with the name which is read"
      );
  });

  it("[GET] /api/projects/paged", async function () {
    // add context information
    addContext(this, "Reading projects paged and sorted.");

    // create instances
    for (let i = 0; i < 15; i++) {
      // prepare data
      const data = {
        title: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}_newProjectTitle`,
        progress: CommonUtil.generateRandomNumber(0, 100),
        isActive: true,
      };
      await Facade.create(App.admin.jwt, data);
    }

    // read first page to ensure page size and sorting
    let pageNumber = 0;
    let pageSize = 5;
    let isDescending = false;
    const instancesOfFirstPage = await Facade.readPagedSorted(
      App.admin.jwt,
      pageNumber,
      pageSize,
      isDescending
    );

    // check page size
    if (instancesOfFirstPage.length !== 5) throw new Error("page size invalid");

    // check sorting
    let lastId = instancesOfFirstPage[0];
    for (let i = 0; i < pageSize; i++) {
      const tempInstance = instancesOfFirstPage[i];
      const currentId = tempInstance.id;

      if (currentId < lastId) throw new Error("sort invalid");

      lastId = currentId;
    }

    // read second page to check page number is working
    pageNumber = 1;
    pageSize = 5;
    isDescending = false;
    const instancesOfSecondPage = await Facade.readPagedSorted(
      App.admin.jwt,
      pageNumber,
      pageSize,
      isDescending
    );

    // compare objects that ensure page is different
    if (instancesOfFirstPage[0].id === instancesOfSecondPage[0].id)
      throw new Error("same object in different page");

    // read third page to ensure page size and sorting is working
    pageNumber = 0;
    pageSize = 3;
    isDescending = true;
    const instancesOfThirdPage = await Facade.readPagedSorted(
      App.admin.jwt,
      pageNumber,
      pageSize,
      isDescending
    );

    // check page size
    if (instancesOfThirdPage.length !== pageSize)
      throw new Error("page size invalid");

    // check sorting
    lastId = instancesOfThirdPage[0];
    for (let i = 0; i < pageSize; i++) {
      const u = instancesOfThirdPage[i];
      const currentId = u.id;

      if (currentId > lastId) throw new Error("sort invalid");

      lastId = currentId;
    }
  });

  it("[GET] /api/projects/count", async function () {
    // add context information
    addContext(this, "Reading issues count.");

    // create instances
    const instanceToCreate = 2;
    for (let i = 0; i < instanceToCreate; i++) {
      // prepare data
      const data = {
        title: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}_newProjectTitle`,
        progress: CommonUtil.generateRandomNumber(0, 100),
        isActive: true,
      };

      await Facade.create(App.admin.jwt, data);
    }

    // read count
    const readInstanceCount = await Facade.readCount(App.admin.jwt);

    // check count
    if (readInstanceCount < instanceToCreate) throw new Error("count invalid");
  });

  // it("[PUT] /api/projects/{id}", async function () {
  //   // add context information
  //   addContext(this, "Update issue.");

  //   // prepare data
  //   const data = {
  //     title: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_newIssueTitle`,
  //     description: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_newIssueDescription`,
  //     isActive: true,
  //   };

  //   // create instance
  //   const instanceToCreate = await Facade.create(App.admin.jwt, data);

  //   // read instance
  //   const readInstance = await Facade.readWithId(
  //     App.admin.jwt,
  //     instanceToCreate.id
  //   );

  //   // prepare data
  //   const dataUpdate = {
  //     title: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_updatedIssueTitle`,
  //     description: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_updatedIssueDescription`,
  //     isActive: false,
  //   };

  //   // update instance
  //   const updatedInstance = await Facade.update(
  //     App.admin.jwt,
  //     dataUpdate,
  //     readInstance.id
  //   );

  //   // check its updated in 2 mins
  //   const currentTime = Date.now();
  //   const twoMinutesInMs = 2 * 60 * 1000;
  //   const elapsedTime =
  //     currentTime - new Date(updatedInstance.updatedAt).getTime();
  //   if (elapsedTime > twoMinutesInMs) throw new Error("update time invalid");

  //   // check updated fields
  //   if (updatedInstance.title !== dataUpdate.title)
  //     throw new Error("field is not updated");

  //   if (updatedInstance.isActive === false)
  //     throw new Error("field shouldn't updated");
  // });

  // it("[PATCH] /api/projects/${id}/deactivate", async function () {
  //   // add context information
  //   addContext(this, "Deactivate issue.");

  //   // prepare data
  //   const data = {
  //     title: `${Constant.preKey}${CommonUtil.generateRandomWord()}_title`,
  //     description: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_description`,
  //     isActive: true,
  //   };

  //   // create instance
  //   const instanceToCreate = await Facade.create(App.admin.jwt, data);

  //   // deactivate instance
  //   await Facade.deactivate(App.admin.jwt, instanceToCreate.id);

  //   // read instance
  //   const readInstance = await Facade.readWithId(
  //     App.admin.jwt,
  //     instanceToCreate.id
  //   );

  //   // check activation of the instance
  //   if (readInstance.isActive !== false)
  //     throw new Error("instance cannot deactivated");
  // });

  // it("[PATCH] /api/projects/${id}/activate", async function () {
  //   // add context information
  //   addContext(this, "Activate issue.");

  //   // prepare data
  //   const data = {
  //     title: `${Constant.preKey}${CommonUtil.generateRandomWord()}_title`,
  //     description: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_description`,
  //     isActive: false,
  //   };

  //   // create instance
  //   const instanceToCreate = await Facade.create(App.admin.jwt, data);

  //   // activate instance
  //   await Facade.activate(App.admin.jwt, instanceToCreate.id);

  //   // read activated instance
  //   const readInstance = await Facade.readWithId(
  //     App.admin.jwt,
  //     instanceToCreate.id
  //   );

  //   // check deactivation of the instance
  //   if (readInstance.isActive !== true)
  //     throw new Error("instance cannot activated");
  // });

  // it("[DELETE] /api/projects/${id}", async function () {
  //   // add context information
  //   addContext(this, "Delete issue.");

  //   // prepare data
  //   const data = {
  //     title: `${Constant.preKey}${CommonUtil.generateRandomWord()}_title`,
  //     description: `${
  //       Constant.preKey
  //     }${CommonUtil.generateRandomWord()}_description`,
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
