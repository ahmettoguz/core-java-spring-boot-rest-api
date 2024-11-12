import addContext from "mochawesome/addContext";
import App from "src/app/App";
import IssueFacade from "src/facade/IssueFacade";

const issueFacade = new IssueFacade();

before(async () => {});

describe("Issue Tests [issue.spec]", function () {
  it("[POST] /api/issues", async function () {
    // add context information
    addContext(this, "Create issue.");

    // perform operation
    await issueFacade.create(App.admin.jwt);
  });

  it("[GET] /api/issues", async function () {
    // add context information
    addContext(this, "Reading all issues.");

    // perform operation
    await issueFacade.readAll(App.admin.jwt);
  });

  it("[GET] /api/issues/{id}", async function () {
    // add context information
    addContext(this, "Reading issue with id.");

    // perform operation
    await issueFacade.readWithId(App.admin.jwt);
  });

  it("[GET] /api/issues/paged", async function () {
    // add context information
    addContext(this, "Reading issues paged and sorted.");

    // perform operation
    await issueFacade.readPagedSorted(App.admin.jwt);
  });

  it("[GET] /api/issues/count", async function () {
    // add context information
    addContext(this, "Reading issues count.");

    // perform operation
    await issueFacade.count(App.admin.jwt);
  });

  it("[PUT] /api/issues/{id}", async function () {
    // add context information
    addContext(this, "Update issue.");

    // perform operation
    await issueFacade.update(App.admin.jwt);
  });

  it("[PATCH] /api/issues/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate issue.");

    // perform operation
    await issueFacade.deactivate(App.admin.jwt);
  });

  it("[PATCH] /api/issues/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate issue.");

    // perform operation
    await issueFacade.activate(App.admin.jwt);
  });

  it("[DELETE] /api/issues/${id}", async function () {
    // add context information
    addContext(this, "Delete issues.");

    // perform operation
    await issueFacade.delete(App.admin.jwt);
  });
});
