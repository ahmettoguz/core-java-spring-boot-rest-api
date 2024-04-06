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
    let userToCreate = { id: null };
    try {
      await UserFacade.createUser(body, userToCreate);
    } catch (error) {
      throw error;
    }

    console.log(App.admin);

    // read created user
    let userRead;
    try {
      userRead = await UserFacade.readUserWithId(userToCreate.id, App.admin);
    } catch (error) {
      throw error;
    }

    console.log(userRead);
  });

  // it("[GET] /api/users/{id}", async function () {
  //   // add context information
  //   addContext(this, "Reading user with id.");

  //   // create user first
  //   // prepare body
  //   const body = {
  //     firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
  //     email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
  //     password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
  //     isActive: true,
  //   };

  //   //perform action
  //   let user;
  //   try {
  //     user = await UserFacade.createUser(body);
  //   } catch (error) {
  //     throw error;
  //   }

  // });
});
