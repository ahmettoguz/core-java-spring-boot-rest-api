import addContext from "mochawesome/addContext";
import App from "src/app/App";
import UserFacade from "src/facade/UserFacade";

const facade = new UserFacade();

before(async () => {});

describe("User Tests [user.spec]", function () {
  it("[POST] /api/users", async function () {
    // add context information
    addContext(this, "Create user.");

    // perform operation
    await facade.create(App.admin.jwt);
  });

  it("[GET] /api/users", async function () {
    // add context information
    addContext(this, "Reading all users.");

    // perform operation
    await facade.readAll(App.admin.jwt);
  });

  it("[GET] /api/users/{id}", async function () {
    // add context information
    addContext(this, "Reading user with id.");

    // perform operation
    await facade.readWithId(App.admin.jwt);
  });

  it("[GET] /api/users/paged", async function () {
    // add context information
    addContext(this, "Reading users paged and sorted.");

    // perform operation
    await facade.readPagedSorted(App.admin.jwt);
  });

  it("[GET] /api/users/count", async function () {
    // add context information
    addContext(this, "Reading users count.");

    // perform operation
    await facade.count(App.admin.jwt);
  });

  it("[GET] /api/users/search/exact", async function () {
    // add context information
    addContext(this, "Searching user by exact first name.");

    // perform operation
    await facade.searchByExactName(App.admin.jwt);
  });

  it("[GET] /api/users/search/partial", async function () {
    // add context information
    addContext(this, "Searching user by partial first name.");

    // perform operation
    await facade.searchByPartialName(App.admin.jwt);
  });

  it("[PUT] /api/users/{id}", async function () {
    // add context information
    addContext(this, "Update user.");

    // perform operation
    await facade.update(App.admin.jwt);
  });

  it("[PATCH] /api/users/${id}/password", async function () {
    // add context information
    addContext(this, "User password update.");

    // perform operation
    await facade.updateUserPassword(App.admin.jwt);
  });

  it("[PATCH] /api/users/${id}/deactivate", async function () {
    // add context information
    addContext(this, "Deactivate user.");

    // perform operation
    await facade.deactivate(App.admin.jwt);
  });

  it("[PATCH] /api/users/${id}/activate", async function () {
    // add context information
    addContext(this, "Activate user.");

    // perform operation
    await facade.activate(App.admin.jwt);
  });

  it("[DELETE] /api/users/${id}", async function () {
    // add context information
    addContext(this, "Delete user.");

    // perform operation
    await facade.delete(App.admin.jwt);
  });
});
