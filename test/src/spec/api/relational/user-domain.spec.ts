const addContext = require("mochawesome/addContext");
const App = require("../../../app/App.ts");
const UserDomainFacade = require("../../../facade/relational/UserDomainFacade.ts");
const userDomainFacade = new UserDomainFacade();

before(async () => {});

describe("User Domain Relational Tests [user-domain.spec]", function () {
  it("[POST] /api/users/{userId}/domains/{domainId}", async function () {
    // add context information
    addContext(this, "Create relation between user and domain.");

    // perform operation
    await userDomainFacade.associateUserAndDomain(App.admin.jwt);
  });

  it("[DELETE] /api/users/{userId}/domains/{domainId}", async function () {
    // add context information
    addContext(this, "Remove relation between user and domain.");

    // perform operation
    await userDomainFacade.unassociateUserAndDomain(App.admin.jwt);
  });
});
