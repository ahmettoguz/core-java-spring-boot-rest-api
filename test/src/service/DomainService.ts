const { AxiosServiceBuilder } = require("../util/AxiosService.ts");
const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const BaseService = require("./base/BaseService.ts");

class DomainService extends BaseService {
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
