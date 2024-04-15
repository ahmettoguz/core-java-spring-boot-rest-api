const addContext = require("mochawesome/addContext");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const UserFacade = require("../../facade/UserFacade.ts");

before(async () => {});

describe("User Tests [user.spec]", function () {
  it("[POST] /api/users", async function () {
    // add context information
    addContext(this, "Create user.");

    // prepare body
    const body = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let userToCreate: any = {};
    try {
      await UserFacade.createUser(body, userToCreate);
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
      // prepare body
      const body = {
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
        await UserFacade.createUser(body, userToCreate);
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
    // prepare body
    const body = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let userToCreate: any = {};
    try {
      await UserFacade.createUser(body, userToCreate);
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
      // prepare body
      const body = {
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
        await UserFacade.createUser(body, userToCreate);
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
      // prepare body
      const body = {
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
        await UserFacade.createUser(body, userToCreate);
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
});
