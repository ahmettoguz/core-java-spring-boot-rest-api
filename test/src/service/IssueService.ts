import Constant from "src/constant/Constant";
import CommonUtil from "src/util/CommonUtil";
import CoreEntityService from "./core/CoreEntityService";

class IssueService extends CoreEntityService {
  constructor() {
    super("issues");
  }

  async getDefaultCreateData() {
    return {
      title: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_newIssueTitle`,
      description: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_newIssueDescription`,
      isActive: true,
    };
  }
}

export default IssueService;
