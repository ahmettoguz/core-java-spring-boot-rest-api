const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const BaseService = require("./base/BaseService.ts");

class ProjectService extends BaseService {
  constructor() {
    super("projects");
  }

  async getDefaultCreateData() {
    return {
      title: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_newProjectTitle`,
      progress: CommonUtil.generateRandomNumber(0, 100),
      isActive: true,
    };
  }
}

module.exports = ProjectService;
