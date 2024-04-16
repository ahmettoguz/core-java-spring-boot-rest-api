const addContext = require("mochawesome/addContext");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const UserFacade = require("../../facade/UserFacade.ts");
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
    let userToCreate: any = {};
    try {
      await UserFacade.createUser(data, userToCreate);
    } catch (error) {
      throw error;
    }

    // read created user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(userToCreate.id, App.admin);
    } catch (error) {
      throw error;
    }

    // compare users
    if (
      userToCreate.id != userRead.id ||
      userToCreate.firstName != userRead.firstName
    )
      throw new Error();
  });

  it("[GET] /api/users", async function () {
    // add context information
    addContext(this, "Reading all users.");

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
      let userToCreate: any = {};
      try {
        await UserFacade.createUser(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // read created user
    let usersRead;
    try {
      usersRead = await UserFacade.readAllUsers(App.admin);
    } catch (error) {
      throw error;
    }

    // check that there are at least 2 users
    if (usersRead.length < 2) throw new Error();
  });

  it("[GET] /api/users/{id}", async function () {
    // add context information
    addContext(this, "Reading user with id.");

    // create user first
    // prepare data
    const data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let userToCreate: any = {};
    try {
      await UserFacade.createUser(data, userToCreate);
    } catch (error) {
      throw error;
    }

    // read created user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(userToCreate.id, App.admin);
    } catch (error) {
      throw error;
    }

    // compare users
    if (
      userToCreate.id != userRead.id ||
      userToCreate.firstName != userRead.firstName
    )
      throw new Error();
  });

  it("[GET] /api/users/paged", async function () {
    // add context information
    addContext(this, "Reading users paged and sorted.");

    // create 15 user
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
        await UserFacade.createUser(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // read first page to ensure page size and sorting
    let usersReadFirstPage;
    let pageNumber = 0;
    let pageSize = 5;
    let isDescending = false;
    try {
      usersReadFirstPage = await UserFacade.readPagedSorted(
        App.admin,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

    // check page size
    if (usersReadFirstPage.length !== 5) throw new Error();

    // check sorting
    let lastId = -1;
    for (let i = 0; i < pageSize; i++) {
      const u = usersReadFirstPage[i];
      const currentId = u.id;

      if (currentId < lastId) throw new Error();

      lastId = currentId;
    }

    // read second page to check page number is working
    let usersReadSecondPage;
    pageNumber = 1;
    pageSize = 5;
    isDescending = false;
    try {
      usersReadSecondPage = await UserFacade.readPagedSorted(
        App.admin,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

    // compare objects that ensure page is different
    if (usersReadFirstPage[0].id === usersReadFirstPage[1].id)
      throw new Error();

    // read third page to ensure page size and sorting is working
    let usersReadThirdPage;
    pageNumber = 0;
    pageSize = 3;
    isDescending = true;
    try {
      usersReadThirdPage = await UserFacade.readPagedSorted(
        App.admin,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

    // check page size
    if (usersReadThirdPage.length !== pageSize) throw new Error();

    // check sorting
    lastId = 99999999;
    for (let i = 0; i < pageSize; i++) {
      const u = usersReadThirdPage[i];
      const currentId = u.id;

      if (currentId > lastId) throw new Error();

      lastId = currentId;
    }
  });

  it("[GET] /api/users/count", async function () {
    // add context information
    addContext(this, "Reading users count.");

    // create users
    const usersCountToCreate = 2;

    for (let i = 0; i < usersCountToCreate; i++) {
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
        await UserFacade.createUser(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // read count
    let usersCount;
    try {
      usersCount = await UserFacade.readCount(App.admin);
    } catch (error) {
      throw error;
    }

    // check user count
    if (usersCount < usersCountToCreate) throw new Error();
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
        await UserFacade.createUser(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // search for user
    let foundUsers;
    try {
      foundUsers = await UserFacade.searchByExactName(
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
      foundUsers = await UserFacade.searchByExactName(
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
        await UserFacade.createUser(data, userToCreate);
      } catch (error) {
        throw error;
      }
    }

    // search for user
    let foundUsers;
    try {
      foundUsers = await UserFacade.searchByPartialName(
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

    // create user
    // prepare data
    let data;
    data = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}oldPassword`,
      isActive: true,
    };
    // perform action
    let userToCreate: any = {};
    try {
      await UserFacade.createUser(data, userToCreate);
    } catch (error) {
      throw error;
    }

    // read created user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(userToCreate.id, App.admin);
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
      userRead = await UserFacade.updateUser(data, userRead, App.admin);
    } catch (error) {
      throw error;
    }

    // check its updated in 2 mins
    const currentTime = Date.now();
    const twoMinutesInMs = 2 * 60 * 1000;
    const elapsedTime = currentTime - new Date(userRead.updatedAt).getTime();
    if (elapsedTime > twoMinutesInMs) throw new Error();

    // check updated fields
    if (userRead.firstName != data.firstName || userRead.email != data.email)
      throw new Error();

    // check password update (trying old password) by login operation
    data = {
      email: userRead.email,
      password: `${Constant.preKey}oldPassword`,
    };
    try {
      await AuthFacade.login(data, userRead);
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
      await UserFacade.createUser(data, userToCreate);
    } catch (error) {
      throw error;
    }

    // read created user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(userToCreate.id, App.admin);
    } catch (error) {
      throw error;
    }

    // prepare data
    data = {
      newPassword: `${Constant.preKey}newPassword`,
    };

    // perform update
    try {
      await UserFacade.updateUserPassword(data, userRead, App.admin);
    } catch (error) {
      throw error;
    }

    // check password update (trying new password) by login operation
    data = {
      email: userRead.email,
      password: `${Constant.preKey}newPassword`,
    };
    try {
      await AuthFacade.login(data, userRead);
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
      await UserFacade.createUser(data, createdUser);
    } catch (error) {
      throw error;
    }

    // deactivate user
    try {
      await UserFacade.deactivateUser(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // read deactivated user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // check activation of the user
    if (userRead.isActive !== false) throw new Error();
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
      await UserFacade.createUser(data, createdUser);
    } catch (error) {
      throw error;
    }

    // deactivate user
    try {
      await UserFacade.activateUser(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // read activated user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(createdUser.id, App.admin);
    } catch (error) {
      throw error;
    }

    // check deactivation of the user
    if (userRead.isActive !== true) throw new Error();
  });
});
