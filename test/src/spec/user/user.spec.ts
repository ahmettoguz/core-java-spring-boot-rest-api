const addContext = require("mochawesome/addContext");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const Facade = require("../../facade/UserFacade.ts");
const AuthFacade = require("../../facade/AuthFacade.ts");

before(async () => {});

describe("User Tests [user.spec]", function () {
  it("[POST] /api/users", async function () {
    // add context information
    addContext(this, "Create user.");

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
      await Facade.create(data, instanceToCreate);
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

    // compare users
    if (
      instanceToCreate.id != readInstance.id ||
      instanceToCreate.firstName != readInstance.firstName
    )
      throw new Error();
  });

  it("[GET] /api/users", async function () {
    // add context information
    addContext(this, "Reading all users.");

    const createdInstanceIds: number[] = [];

    // create more than one user first
    for (let i = 0; i < 2; i++) {
      // prepare data
      const data = {
        firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };

      // perform action
      let instanceToCreate: any = {};
      try {
        await Facade.create(data, instanceToCreate);
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
        throw new Error("desired number of instances couldn't read");
      }
    }
  });

  it("[GET] /api/users/{id}", async function () {
    // add context information
    addContext(this, "Reading user with id.");

    // create instance first   // prepare data
    const data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let instanceToCreate: any = {};
    try {
      await Facade.create(data, instanceToCreate);
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
      instanceToCreate.firstName !== readInstance.firstName
    )
      throw new Error(
        "created instance name is not same with the name which is read"
      );
  });

  it("[GET] /api/users/paged", async function () {
    // add context information
    addContext(this, "Reading users paged and sorted.");

    // create 15 instance
    for (let i = 0; i < 15; i++) {
      // prepare data
      const data = {
        firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };

      // perform action
      let userToCreate: any = {};
      try {
        await Facade.create(data, userToCreate);
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

  it("[GET] /api/users/count", async function () {
    // add context information
    addContext(this, "Reading users count.");

    // create instances
    const instanceToCreate = 2;

    for (let i = 0; i < instanceToCreate; i++) {
      // prepare data
      const data = {
        firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };

      // perform action
      let userToCreate: any = {};
      try {
        await Facade.create(data, userToCreate);
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

  it("[GET] /api/users/search/exact", async function () {
    // add context information
    addContext(this, "Searching user by exact first name.");

    // create users
    let usersCountToCreate = 3;
    const firstNames = ["specific", "specificName", "specificName"];
    for (let i = 0; i < usersCountToCreate; i++) {
      // prepare data
      const data = {
        firstName: "",
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };
      data.firstName = `${Constant.preKey}${firstNames[i]}`;
      // perform action
      let userToCreate: any = {};
      try {
        await Facade.create(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // search for user
    let foundUsers;
    try {
      foundUsers = await Facade.searchByExactName(
        App.admin,
        `${Constant.preKey}speci`
      );
    } catch (error) {
      throw error;
    }

    // check data, there shouldn't be any data because exact search string is not provided
    if (foundUsers.length !== 0) throw new Error();

    // search for user
    try {
      foundUsers = await Facade.searchByExactName(
        App.admin,
        `${Constant.preKey}specificName`
      );
    } catch (error) {
      throw error;
    }

    // check found users it should found and give it as paged
    if (foundUsers.length < 2) throw new Error();
  });

  it("[GET] /api/users/search/partial", async function () {
    // add context information
    addContext(this, "Searching user by partial first name.");

    // create users
    let usersCountToCreate = 3;
    const firstNames = ["specific", "specificName", "specificName"];
    for (let i = 0; i < usersCountToCreate; i++) {
      // prepare data
      const data = {
        firstName: "",
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      };
      data.firstName = `${Constant.preKey}${firstNames[i]}`;
      // perform action
      let userToCreate: any = {};
      try {
        await Facade.create(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // search for user
    let foundUsers;
    try {
      foundUsers = await Facade.searchByPartialName(
        App.admin,
        `${Constant.preKey}spe`
      );
    } catch (error) {
      throw error;
    }

    // check found users it should found and give it as paged
    if (foundUsers.length < usersCountToCreate) throw new Error();
  });

  it("[PUT] /api/users/{id}", async function () {
    // add context information
    addContext(this, "Update user.");

    // create instance
    // prepare data
    let data;
    data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}oldPassword`,
      isActive: true,
    };
    // perform action
    let instanceToCreate: any = {};
    try {
      await Facade.create(data, instanceToCreate);
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

    // prepare data
    data = {
      firstName: `${Constant.preKey}updatedFirstName`,
      email: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_updatedEmail@hotmail.com`,
      password: `${Constant.preKey}updatedPassword`,
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
    if (
      readInstance.firstName != data.firstName ||
      readInstance.email != data.email
    )
      throw new Error("field is not updated");

    // check password update (trying old password) by login operation
    data = {
      email: readInstance.email,
      password: `${Constant.preKey}oldPassword`,
    };
    try {
      await AuthFacade.login(data, readInstance);
    } catch (error) {
      throw error;
    }
  });

  it("[PATCH] /api/users/${id}/password", async function () {
    // add context information
    addContext(this, "User password update.");

    // create user
    // prepare data
    let data;
    data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };
    // perform action
    let userToCreate: any = {};
    try {
      await Facade.create(data, userToCreate);
    } catch (error) {
      throw error;
    }

    // read created user
    let readInstance;
    try {
      readInstance = await Facade.readWithId(App.admin.jwt, userToCreate.id);
    } catch (error) {
      throw error;
    }

    // prepare data
    data = {
      newPassword: `${Constant.preKey}newPassword`,
    };

    // perform update
    try {
      await Facade.updateUserPassword(data, readInstance, App.admin);
    } catch (error) {
      throw error;
    }

    // check password update (trying new password) by login operation
    data = {
      email: readInstance.email,
      password: `${Constant.preKey}newPassword`,
    };
    try {
      await AuthFacade.login(data, readInstance);
    } catch (error) {
      throw error;
    }
  });

  it("[PATCH] /api/users/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate user.");

    // create user
    // prepare data
    let data;
    data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };
    // perform action
    let createdUser: any = {};
    try {
      await Facade.create(data, createdUser);
    } catch (error) {
      throw error;
    }

    // deactivate user
    try {
      await Facade.deactivateUser(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // read deactivated user
    let readInstance;
    try {
      readInstance = await Facade.readWithId(App.admin.jwt, createdUser.id);
    } catch (error) {
      throw error;
    }

    // check activation of the user
    if (readInstance.isActive !== false) throw new Error();
  });

  it("[PATCH] /api/users/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate user.");

    // create user
    // prepare data
    let data;
    data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: false,
    };
    // perform action
    let createdUser: any = {};
    try {
      await Facade.create(data, createdUser);
    } catch (error) {
      throw error;
    }

    // deactivate user
    try {
      await Facade.activateUser(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // read activated user
    let readInstance;
    try {
      readInstance = await Facade.readWithId(App.admin.jwt, createdUser.id);
    } catch (error) {
      throw error;
    }

    // check deactivation of the user
    if (readInstance.isActive !== true) throw new Error();
  });

  it("[DELETE] /api/users/${id}", async function () {
    // add context information
    addContext(this, "Delete user.");

    // create user
    // prepare data
    let data;
    data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };
    // perform action
    let createdUser: any = {};
    try {
      await Facade.create(data, createdUser);
    } catch (error) {
      throw error;
    }

    // delete user
    try {
      await Facade.deleteUser(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // try to read deleted user
    let isUserExist;
    try {
      await Facade.readWithId(App.admin.jwt, createdUser.id);
      isUserExist = true;
    } catch (error) {
      isUserExist = false;
    }

    if (isUserExist) throw new Error();
  });
});
