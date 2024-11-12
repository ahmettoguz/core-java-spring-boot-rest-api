import addContext from "mochawesome/addContext";
import App from "src/app/App";
import DomainFacade from "src/facade/DomainFacade";

const domainFacade = new DomainFacade();

before(async () => {});

describe("Domain Tests [domain.spec]", function () {
  it("[POST] /api/domains", async function () {
    // add context information
    addContext(this, "Create domain.");

    // perform operation
    await domainFacade.create(App.admin.jwt);
  });

  it("[GET] /api/domains", async function () {
    // add context information
    addContext(this, "Reading all domains.");

    // perform operation
    await domainFacade.readAll(App.admin.jwt);
  });

  it("[GET] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Reading domain with id.");

    // perform operation
    await domainFacade.readWithId(App.admin.jwt);
  });

  it("[GET] /api/domains/paged", async function () {
    // add context information
    addContext(this, "Reading domains paged and sorted.");

    // perform operation
    await domainFacade.readPagedSorted(App.admin.jwt);
  });

  it("[GET] /api/domains/count", async function () {
    // add context information
    addContext(this, "Reading domains count.");

    // perform operation
    await domainFacade.count(App.admin.jwt);
  });

  it("[PUT] /api/domains/{id}", async function () {
    // add context information
    addContext(this, "Update domain.");

    // perform operation
    await domainFacade.update(App.admin.jwt);
  });

  it("[PATCH] /api/domains/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate domain.");

    // perform operation
    await domainFacade.deactivate(App.admin.jwt);
  });

  it("[PATCH] /api/domains/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate domain.");

    // perform operation
    await domainFacade.activate(App.admin.jwt);
  });

  it("[DELETE] /api/domains/${id}", async function () {
    // add context information
    addContext(this, "Delete domains.");

    // perform operation
    await domainFacade.delete(App.admin.jwt);
  });
});
