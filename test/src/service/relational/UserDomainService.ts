const CoreEntityRelationService = require("../core/CoreEntityRelationService.ts");

class UserDomainService extends CoreEntityRelationService {
  constructor() {
    super("users", "domains");
  }
}

module.exports = UserDomainService;
