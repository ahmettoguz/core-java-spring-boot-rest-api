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

    // read domain
    let domainRead;
    try {
      domainRead = await DomainFacade.readDomainWithId(
        domainToCreate.id,
        App.admin.jwt
      );
    } catch (error) {
      throw error;
    }

    // check userId field (it shouldn't be added via post)
    // todo change it to domain read
    if (domainToCreate.userId !== null)
      throw new Error("user id should't be setted");
  });

  it("[GET] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    // create domain first
    // prepare data
    let data = {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // perform action
    let domainToCreate;
    try {
      domainToCreate = await DomainFacade.createDomain(data, App.admin.jwt);
    } catch (error) {
      throw error;
    }

    // read domain
    let domainRead;
    try {
      domainRead = await DomainFacade.readDomainWithId(
        domainToCreate.id,
        App.admin.jwt
      );
    } catch (error) {
      throw error;
    }

    // compare domains
    if (
      domainToCreate.id !== domainRead.id ||
      domainToCreate.name !== domainRead.name
    )
      throw new Error(
        "created domain name is not same with the name which is read"
      );
  });
});
