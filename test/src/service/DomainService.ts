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

  async create(jwt, data?) {
    // prepare request
    data = data ?? (await this.getDefaultCreateData());

    // delegate to parent
    const instanceToCreate = await super.create(jwt, data);

    return instanceToCreate;
  }

  async createMany(jwt, createInstanceCount = 2, instanceDatas = []) {
    if (instanceDatas.length === 0) {
      for (let i = 0; i < createInstanceCount; i++) {
        const data = await this.getDefaultCreateData();
        instanceDatas.push(data);
      }
    }

    // delegate to parent
    return await super.createMany(jwt, instanceDatas);
  }
}

module.exports = DomainService;
