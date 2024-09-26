const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const CoreEntityService = require("./base/CoreEntityService.ts");

class DomainService extends CoreEntityService {
  constructor() {
    super("domains");
  }

  async getDefaultCreateData() {
    return {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };
  }
}

module.exports = DomainService;
