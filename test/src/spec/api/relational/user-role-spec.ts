import addContext from "mochawesome/addContext";
import App from "src/app/App";
import UserRoleFacade from "src/facade/relational/UserRoleFacade";

const userRoleFacade = new UserRoleFacade();

before(async () => {});

describe("User Role Relational Tests [user-role.spec]", function () {
  it("[POST] /api/users/{userId}/roles/{roleId}", async function () {
    // add context information
    addContext(this, "Create relation between user and role.");

    // perform operation
    await userRoleFacade.associateUserAndRole(App.admin.jwt);
  });

  it("[DELETE] /api/users/{userId}/roles/{roleId}", async function () {
    // add context information
    addContext(this, "Remove relation between user and role.");

    // perform operation
    await userRoleFacade.unassociateUserAndRole(App.admin.jwt);
  });
});
