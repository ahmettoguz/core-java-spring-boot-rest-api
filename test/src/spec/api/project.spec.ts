import addContext from "mochawesome/addContext";
import App from "src/app/App";
import ProjectFacade from "src/facade/ProjectFacade";

const projectFacade = new ProjectFacade();

before(async () => {});

describe("Project Tests [project.spec]", function () {
  it("[POST] /api/projects", async function () {
    // add context information
    addContext(this, "Create project.");

    // perform operation
    await projectFacade.create(App.admin.jwt);
  });

  it("[GET] /api/projects", async function () {
    // add context information
    addContext(this, "Reading all projects.");

    // perform operation
    await projectFacade.readAll(App.admin.jwt);
  });

  it("[GET] /api/projects/{id}", async function () {
    // add context information
    addContext(this, "Reading project with id.");

    // perform operation
    await projectFacade.readWithId(App.admin.jwt);
  });

  it("[GET] /api/projects/paged", async function () {
    // add context information
    addContext(this, "Reading projects paged and sorted.");

    // perform operation
    await projectFacade.readPagedSorted(App.admin.jwt);
  });

  it("[GET] /api/projects/count", async function () {
    // add context information
    addContext(this, "Reading projects count.");

    // perform operation
    await projectFacade.count(App.admin.jwt);
  });

  it("[PUT] /api/projects/{id}", async function () {
    // add context information
    addContext(this, "Update project.");

    // perform operation
    await projectFacade.update(App.admin.jwt);
  });

  it("[PATCH] /api/projects/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate project.");

    // perform operation
    await projectFacade.deactivate(App.admin.jwt);
  });

  it("[PATCH] /api/projects/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate project.");

    // perform operation
    await projectFacade.activate(App.admin.jwt);
  });

  it("[DELETE] /api/projects/${id}", async function () {
    // add context information
    addContext(this, "Delete projects.");

    // perform operation
    await projectFacade.delete(App.admin.jwt);
  });
});
