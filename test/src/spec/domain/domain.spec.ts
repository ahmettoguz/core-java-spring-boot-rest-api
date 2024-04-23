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
      userId: -1,
    };

    // create instance
    const instanceToCreate = await Facade.create(App.admin.jwt, data);

    // check created output
    if (instanceToCreate === null || instanceToCreate === undefined)
      throw new Error("instance cannot created");

    // check userId field (it shouldn't be added via post)
    if (instanceToCreate.userId === -1)
      throw new Error("user id should't be setted");
  });

  it("[GET] /api/domains", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    const createdInstanceIds: number[] = [];

    // create instances
    for (let i = 0; i < 2; i++) {
      // prepare data
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
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

  it("[GET] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    // prepare data
    let data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
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
      instanceToCreate.name !== readInstance.name
    )
      throw new Error(
        "created instance name is not same with the name which is read"
      );
  });

  it("[GET] /api/domains/paged", async function () {
    // add context information
    addContext(this, "Reading domains paged and sorted.");

    // create instances
    for (let i = 0; i < 15; i++) {
      // prepare data
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
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

  it("[GET] /api/domains/count", async function () {
    // add context information
    addContext(this, "Reading domains count.");

    // create instances
    const instanceToCreate = 2;
    for (let i = 0; i < instanceToCreate; i++) {
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };
      await Facade.create(App.admin.jwt, data);
    }

    // read count
    const readInstanceCount = await Facade.readCount(App.admin.jwt);

    // check count
    if (readInstanceCount < instanceToCreate) throw new Error("count invalid");
  });

  it("[PUT] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Update domain.");

    // prepare data
    let data;
    data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // create instance
    const instanceToCreate = await Facade.create(App.admin.jwt, data);

    // read instance
    const readInstance = await Facade.readWithId(
      App.admin.jwt,
      instanceToCreate.id
    );

    // prepare data
    data = {
      name: `${Constant.preKey}updatedDomainName`,
    };

    // update instance
    const updatedInstance = await Facade.update(
      App.admin.jwt,
      data,
      readInstance.id
    );

    // check its updated in 2 mins
    const currentTime = Date.now();
    const twoMinutesInMs = 2 * 60 * 1000;
    const elapsedTime =
      currentTime - new Date(updatedInstance.updatedAt).getTime();
    if (elapsedTime > twoMinutesInMs) throw new Error("update time invalid");

    // check updated fields
    if (updatedInstance.name !== data.name)
      throw new Error("field is not updated");
  });

  it("[PATCH] /api/domains/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate domain.");

    // prepare data
    let data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // create instance
    const instanceToCreate = await Facade.create(App.admin.jwt, data);

    // deactivate instance
    await Facade.deactivate(App.admin.jwt, instanceToCreate.id);

    // read instance
    const readInstance = await Facade.readWithId(
      App.admin.jwt,
      instanceToCreate.id
    );

    // check activation of the instance
    if (readInstance.isActive !== false)
      throw new Error("instance cannot deactivated");
  });

  it("[PATCH] /api/domains/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate domain.");

    // prepare data
    let data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: false,
    };

    // create instance
    const instanceToCreate = await Facade.create(App.admin.jwt, data);

    // activate instance
    await Facade.activate(App.admin.jwt, instanceToCreate.id);

    // read activated instance
    const readInstance = await Facade.readWithId(
      App.admin.jwt,
      instanceToCreate.id
    );

    // check deactivation of the instance
    if (readInstance.isActive !== true)
      throw new Error("instance cannot activated");
  });
});
