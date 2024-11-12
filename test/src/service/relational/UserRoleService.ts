import CoreEntityRelationService from "../core/CoreEntityRelationService";

class UserRoleService extends CoreEntityRelationService {
  constructor() {
    super("users", "roles");
  }
}

export default UserRoleService;
