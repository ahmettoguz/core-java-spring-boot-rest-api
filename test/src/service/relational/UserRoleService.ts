const CoreEntityRelationService = require("../core/CoreEntityRelationService.ts");

class UserRoleService extends CoreEntityRelationService {
  constructor() {
    super("users", "roles");
  }
}

module.exports = UserRoleService;
