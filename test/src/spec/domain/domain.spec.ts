const addContext = require("mochawesome/addContext");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const DomainFacade = require("../../facade/DomainFacade.ts");

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
    let domainToCreate;
    try {
      domainToCreate = await DomainFacade.createDomain(data, App.admin.jwt);
    } catch (error) {
      throw error;
    }

    // check created output
    if (domainToCreate === null || domainToCreate === undefined)
      throw new Error("domain cannot created");

    console.log(domainToCreate);

    // // read created user
    // let userRead;
    // try {
    //   userRead = await UserFacade.readUserWithId(userToCreate.id, App.admin);
    // } catch (error) {
    //   throw error;
    // }

    // // compare users
    // if (
    //   userToCreate.id != userRead.id ||
    //   userToCreate.firstName != userRead.firstName
    // )
    //   throw new Error();

    // check userId field (it shouldn't be added via post)
    // todo change it to domain read
    if (domainToCreate.userId !== null)
      throw new Error("user id should't be setted");
  });
});
