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
});
