const CoreEntityRelationService = require("../core/CoreEntityRelationService.ts");

class UserIssueService extends CoreEntityRelationService {
  constructor() {
    super("users", "issues");
  }
}

module.exports = UserIssueService;
