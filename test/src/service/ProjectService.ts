const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const CoreEntityService = require("./core/CoreEntityService.ts");

class ProjectService extends CoreEntityService {
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
