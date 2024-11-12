import CoreEntityRelationService from "../core/CoreEntityRelationService";

class UserProjectService extends CoreEntityRelationService {
  constructor() {
    super("users", "projects");
  }
}

export default UserProjectService;
