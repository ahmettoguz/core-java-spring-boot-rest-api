import CoreEntityRelationService from "../core/CoreEntityRelationService";

class UserDomainService extends CoreEntityRelationService {
  constructor() {
    super("users", "domains");
  }
}

export default UserDomainService;
