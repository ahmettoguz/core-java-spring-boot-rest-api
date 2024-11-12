const CoreEntityRelationService = require("../core/CoreEntityRelationService.ts");

class UserIssueService extends CoreEntityRelationService {
  constructor() {
    super("users", "projects");
  }
}

module.exports = UserIssueService;
