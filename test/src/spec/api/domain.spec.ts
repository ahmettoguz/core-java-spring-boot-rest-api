const addContext = require("mochawesome/addContext");
const App = require("../../app/App.ts");
const Facade = require("../../facade/DomainFacade.ts");

before(async () => {});

describe("Domain Tests [domain.spec]", function () {
  it("[POST] /api/domains", async function () {
    // add context information
    addContext(this, "Create domain.");

    // perform operation
    await Facade.create(App.admin.jwt);
  });

  it("[GET] /api/domains", async function () {
    // add context information
    addContext(this, "Reading all domains.");

    // perform operation
    await Facade.readAll(App.admin.jwt);
  });

  it("[GET] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    // perform operation
    await Facade.readWithId(App.admin.jwt);
  });

  it("[GET] /api/domains/paged", async function () {
    // add context information
    addContext(this, "Reading domains paged and sorted.");

    // perform operation
    await Facade.readPagedSorted(App.admin.jwt);
  });

  it("[GET] /api/domains/count", async function () {
    // add context information
    addContext(this, "Reading domains count.");

    // perform operation
    await Facade.count(App.admin.jwt);
  });

  it("[PUT] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Update domain.");

    // perform operation
    await Facade.update(App.admin.jwt);
  });

  it("[PATCH] /api/domains/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate domain.");

    // perform operation
    await Facade.deactivate(App.admin.jwt);
  });

  it("[PATCH] /api/domains/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate domain.");

    // perform operation
    await Facade.activate(App.admin.jwt);
  });

  it("[DELETE] /api/domains/${id}", async function () {
    // add context information
    addContext(this, "Delete domains.");

    // perform operation
    await Facade.delete(App.admin.jwt);
  });
});
