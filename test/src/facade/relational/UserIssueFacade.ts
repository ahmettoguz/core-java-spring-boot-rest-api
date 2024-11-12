import UserService from "src/service/UserService";
import IssueService from "src/service/IssueService";
import UserIssueService from "src/service/relational/UserIssueService";

const userService = new UserService();
const issueService = new IssueService();
const userIssueService = new UserIssueService();

class UserIssueFacade {
  // one to many relation

  async associateUserAndIssue(jwt, userId = null, issueIds = null) {
    // check data and prepare if not exist
    if (userId == null && issueIds == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // create issues
      issueIds = [];
      for (let i = 0; i < 4; i++) {
        const issue = await issueService.create(jwt);
        issueIds.push(issue.id);
      }
    }

    // create relation between user and issues
    for (const id of issueIds) {
      await userIssueService.associate(jwt, userId, id);
    }

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check relation
    if (issueIds.some((id) => !readInstance.issueIds.includes(id))) {
      throw new Error("user and issue relation cannot established");
    }
  }

  async unassociateUserAndIssue(jwt, userId = null, issueIds = null) {
    // check data and prepare if not exist
    if (userId == null && issueIds == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // create issues
      issueIds = [];
      for (let i = 0; i < 4; i++) {
        const issue = await issueService.create(jwt);
        issueIds.push(issue.id);
      }
    }

    // remove relation between user and issues
    for (const id of issueIds) {
      await userIssueService.associate(jwt, userId, id);
    }

    // remove relation between user and issues
    for (const id of issueIds) {
      await userIssueService.unassociate(jwt, userId, id);
    }

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check issue relations
    if (issueIds.some((id) => readInstance.issueIds.includes(id))) {
      throw new Error("user and issue relation cannot removed");
    }
  }
}

export default UserIssueFacade;
