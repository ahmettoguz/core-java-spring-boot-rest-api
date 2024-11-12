import CoreEntityRelationService from "../core/CoreEntityRelationService";

class UserIssueService extends CoreEntityRelationService {
  constructor() {
    super("users", "issues");
  }
}

export default UserIssueService;
