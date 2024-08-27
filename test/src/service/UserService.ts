const { AxiosServiceBuilder } = require("../util/AxiosService.ts");
const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const BaseService = require("./base/BaseService.ts");
const entityName = "users";

class UserService extends BaseService {
  async create(data?) {
    // prepare request
    data = data ?? {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };

    // delegate to parent
    const instanceToCreate = await super.create(data);

    // set password
    instanceToCreate.password = data.password;

    return instanceToCreate;
  }

  async createMany(createInstanceCount = 2, instanceDatas = []) {
    if (instanceDatas.length === 0) {
      for (let i = 0; i < createInstanceCount; i++) {
        const data = {
          firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
          email: `${
            Constant.preKey
          }${CommonUtil.generateRandomWord()}@hotmail.com`,
          password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
          isActive: true,
        };
        instanceDatas.push(data);
      }
    }

    // delegate to parent
    return await super.createMany(instanceDatas);
  }

  static async searchByExactName(jwt, searchString) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/search/exact`;
    const method = "get";
    const data = {
      pageNumber: 0,
      pageSize: 5,
      isDescending: true,
      firstName: searchString,
    };

    // read paged and sorted
    let readInstances;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      readInstances = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.name}.searchByExactName:: Axios error with code: ${e.code}`
      );
    }

    return readInstances;
  }

  static async searchByPartialName(jwt, searchString) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/search/partial`;
    const method = "get";
    const data = {
      pageNumber: 0,
      pageSize: 5,
      isDescending: true,
      firstName: searchString,
    };

    // read paged and sorted
    let readInstances;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      readInstances = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.name}.searchByPartialName:: Axios error with code: ${e.code}`
      );
    }

    return readInstances;
  }

  async update(jwt, instanceId, data) {
    // prepare data
    data = data ?? {
      firstName: `${Constant.preKey}updatedFirstName`,
      email: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_updatedEmail@hotmail.com`,
      password: `${Constant.preKey}updatedPassword`,
    };

    // delegate to parent
    return await super.update(jwt, instanceId, data);
  }

  async updateUserPassword(jwt, instanceId, data) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}/password`;
    const method = "patch";

    // update instance
    let operationStatus; // todo check that operation status maybe another thing is return
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      operationStatus = response.data;
    } catch (e: any) {
      throw new Error(
        `${this.name}.updateUserPassword:: Axios error with code: ${e.code}`
      );
    }

    return operationStatus;
  }
}

module.exports = UserService;
