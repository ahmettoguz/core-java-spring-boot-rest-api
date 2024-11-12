import addContext from "mochawesome/addContext";

import App from "src/app/App";
import UserProjectFacade from "src/facade/relational/UserProjectFacade";

const userProjectFacade = new UserProjectFacade();

before(async () => {});

describe("User Project Relational Tests [user-project.spec]", function () {
  it("[POST] /api/users/{userId}/projects/{projectId}", async function () {
    // add context information
    addContext(this, "Create relation between user and project.");

    // perform operation
    await userProjectFacade.associateUserAndProject(App.admin.jwt);
  });

  it("[DELETE] /api/users/{userId}/projects/{projectId}", async function () {
    // add context information
    addContext(this, "Remove relation between user and project.");

    // perform operation
    await userProjectFacade.unassociateUserAndProject(App.admin.jwt);
  });
});
