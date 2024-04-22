const addContext = require("mochawesome/addContext");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const Facade = require("../../facade/DomainFacade.ts");

before(async () => {});

describe("Domain Tests [domain.spec]", function () {
  it("[POST] /api/domains", async function () {
    // add context information
    addContext(this, "Create domain.");

    // prepare data
    let data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
      userId: 99,
    };

    // perform action
    let instanceToCreate;
    try {
      instanceToCreate = await Facade.create(App.admin.jwt, data);
    } catch (error) {
      throw error;
    }

    // check created output
    if (instanceToCreate === null || instanceToCreate === undefined)
      throw new Error("instance cannot created");

    // read instance
    let readInstance;
    try {
      readInstance = await Facade.readWithId(
        App.admin.jwt,
        instanceToCreate.id
      );
    } catch (error) {
      throw error;
    }

    // check userId field (it shouldn't be added via post)
    if (instanceToCreate.userId !== null)
      throw new Error("user id should't be setted");
  });

  it("[GET] /api/domains", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    const createdInstanceIds: number[] = [];

    // create more than one instance first
    for (let i = 0; i < 2; i++) {
      // prepare data
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
        userId: 99,
      };

      // perform action
      let instanceToCreate: any;
      try {
        instanceToCreate = await Facade.create(App.admin.jwt, data);
      } catch (error) {
        throw error;
      }

      // save ids
      createdInstanceIds.push(instanceToCreate.id);
    }

    // read created instances
    let instancesRead;
    try {
      instancesRead = await Facade.readAll(App.admin.jwt);
    } catch (error) {
      throw error;
    }

    // check inserted ids
    for (let i = 0; i < createdInstanceIds.length; i++) {
      if (
        !instancesRead.some((instance) => instance.id === createdInstanceIds[i])
      ) {
        throw new Error("desired number of intances couldn't read");
      }
    }
  });

  it("[GET] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    // create instance first
    // prepare data
    let data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let instanceToCreate;
    try {
      instanceToCreate = await Facade.create(App.admin.jwt, data);
    } catch (error) {
      throw error;
    }

    // read instance
    let readInstance;
    try {
      readInstance = await Facade.readWithId(
        App.admin.jwt,
        instanceToCreate.id
      );
    } catch (error) {
      throw error;
    }

    // compare instances
    if (
      instanceToCreate.id !== readInstance.id ||
      instanceToCreate.name !== readInstance.name
    )
      throw new Error(
        "created instance name is not same with the name which is read"
      );
  });

  it("[GET] /api/domains/paged", async function () {
    // add context information
    addContext(this, "Reading domains paged and sorted.");

    // create 15 instance
    for (let i = 0; i < 15; i++) {
      // prepare data
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };

      // perform action
      let instanceToCreate: any;
      try {
        instanceToCreate = await Facade.create(App.admin.jwt, data);
      } catch (error) {
        throw error;
      }
    }

    // read first page to ensure page size and sorting
    let instancesOfFirstPage;
    let pageNumber = 0;
    let pageSize = 5;
    let isDescending = false;
    try {
      instancesOfFirstPage = await Facade.readPagedSorted(
        App.admin.jwt,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

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
    let instancesOfSecondPage;
    pageNumber = 1;
    pageSize = 5;
    isDescending = false;
    try {
      instancesOfSecondPage = await Facade.readPagedSorted(
        App.admin.jwt,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

    // compare objects that ensure page is different
    if (instancesOfFirstPage[0].id === instancesOfSecondPage[0].id)
      throw new Error("same object in different page");

    // read third page to ensure page size and sorting is working
    let instancesOfThirdPage;
    pageNumber = 0;
    pageSize = 3;
    isDescending = true;
    try {
      instancesOfThirdPage = await Facade.readPagedSorted(
        App.admin.jwt,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

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

  it("[GET] /api/domains/count", async function () {
    // add context information
    addContext(this, "Reading domains count.");

    // create instances
    const instanceToCreate = 2;

    for (let i = 0; i < instanceToCreate; i++) {
      // prepare data
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };

      // perform action
      let instanceToCreate: any;
      try {
        instanceToCreate = await Facade.create(App.admin.jwt, data);
      } catch (error) {
        throw error;
      }
    }

    // read count
    let readInstanceCount;
    try {
      readInstanceCount = await Facade.readCount(App.admin.jwt);
    } catch (error) {
      throw error;
    }

    // check count
    if (readInstanceCount < instanceToCreate) throw new Error("count invalid");
  });

  it("[PUT] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Update domain.");

    // create instance
    // prepare data
    let data;
    data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
      userId: 99,
    };

    // perform action
    let instanceToCreate: any;
    try {
      instanceToCreate = await Facade.create(App.admin.jwt, data);
    } catch (error) {
      throw error;
    }

    // read created instance
    let readInstance;
    try {
      readInstance = await Facade.readWithId(
        App.admin.jwt,
        instanceToCreate.id
      );
    } catch (error) {
      throw error;
    }

    // prepare data for update
    data = {
      name: `${Constant.preKey}updatedDomainName`,
    };

    // perform update
    try {
      readInstance = await Facade.update(App.admin.jwt, data, readInstance.id);
    } catch (error) {
      throw error;
    }

    // check its updated in 2 mins
    const currentTime = Date.now();
    const twoMinutesInMs = 2 * 60 * 1000;
    const elapsedTime =
      currentTime - new Date(readInstance.updatedAt).getTime();
    if (elapsedTime > twoMinutesInMs) throw new Error("update time invalid");

    // check updated fields
    if (readInstance.name !== data.name)
      throw new Error("field is not updated");
  });
});
