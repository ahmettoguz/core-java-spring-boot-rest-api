import addContext from "mochawesome/addContext";
import App from "src/app/App";
import UserIssueFacade from "src/facade/relational/UserIssueFacade";

const userIssueFacade = new UserIssueFacade();

before(async () => {});

describe("User Issue Relational Tests [user-issue.spec]", function () {
  it("[POST] /api/users/{userId}/issues/{issueId}", async function () {
    // add context information
    addContext(this, "Create relation between user and issue.");

    // perform operation
    await userIssueFacade.associateUserAndIssue(App.admin.jwt);
  });

  it("[DELETE] /api/users/{userId}/issues/{issueId}", async function () {
    // add context information
    addContext(this, "Remove relation between user and issue.");

    // perform operation
    await userIssueFacade.unassociateUserAndIssue(App.admin.jwt);
  });
});
