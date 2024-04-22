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

  it("[GET] /api/domains", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    const createdDomainIds: number[] = [];

    // create more than one domain first
    for (let i = 0; i < 2; i++) {
      // prepare data
      const data = {
        name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
        userId: 99,
      };

      // perform action
      let domainToCreate: any;
      try {
        domainToCreate = await DomainFacade.createDomain(data, App.admin.jwt);
      } catch (error) {
        throw error;
      }

      // save ids
      createdDomainIds.push(domainToCreate.id);
    }

    // read created domains
    let domainsRead;
    try {
      domainsRead = await DomainFacade.readAllDomains(App.admin.jwt);
    } catch (error) {
      throw error;
    }

    // check inserted ids
    for (let i = 0; i < createdDomainIds.length; i++) {
      if (!domainsRead.some((domain) => domain.id === createdDomainIds[i])) {
        throw new Error("desired number of domains couldn't read");
      }
    }
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
      let domainToCreate: any;
      try {
        domainToCreate = await DomainFacade.createDomain(data, App.admin.jwt);
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
      instancesOfFirstPage = await DomainFacade.readPagedSorted(
        App.admin.jwt,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

    // check page size
    if (instancesOfFirstPage.length !== 5) throw new Error();
    
    // check sorting
    let lastId = instancesOfFirstPage[0];
    for (let i = 0; i < pageSize; i++) {
      const tempInstance = instancesOfFirstPage[i];
      const currentId = tempInstance.id;

      if (currentId < lastId) throw new Error();

      lastId = currentId;
    }

    // read second page to check page number is working
    let instancesOfSecondPage;
    pageNumber = 1;
    pageSize = 5;
    isDescending = false;
    try {
      instancesOfSecondPage = await DomainFacade.readPagedSorted(
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
      throw new Error();

    // read third page to ensure page size and sorting is working
    let instancesOfThirdPage;
    pageNumber = 0;
    pageSize = 3;
    isDescending = true;
    try {
      instancesOfThirdPage = await DomainFacade.readPagedSorted(
        App.admin.jwt,
        pageNumber,
        pageSize,
        isDescending
      );
    } catch (error) {
      throw error;
    }

    // check page size
    if (instancesOfThirdPage.length !== pageSize) throw new Error();

    // check sorting
    lastId = instancesOfThirdPage[0];
    for (let i = 0; i < pageSize; i++) {
      const u = instancesOfThirdPage[i];
      const currentId = u.id;

      if (currentId > lastId) throw new Error();

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
      let domainToCreate: any;
      try {
        domainToCreate = await DomainFacade.createDomain(data, App.admin.jwt);
      } catch (error) {
        throw error;
      }
    }

    // read count
    let readInstanceCount;
    try {
      readInstanceCount = await DomainFacade.readCount(App.admin.jwt);
    } catch (error) {
      throw error;
    }

    // check user count
    if (readInstanceCount < instanceToCreate) throw new Error();
  });
});
