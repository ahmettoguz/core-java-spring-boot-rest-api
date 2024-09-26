const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const BaseService = require("./base/BaseService.ts");

class IssueService extends BaseService {
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

module.exports = IssueService;
