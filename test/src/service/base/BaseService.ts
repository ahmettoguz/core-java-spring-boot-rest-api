const { AxiosServiceBuilder } = require("../../util/AxiosService.ts");
const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");

class BaseService {
  private entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  async readAll(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.entityName}`;
    const method = "get";

    // read all instances
    let instancesToRead;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      instancesToRead = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.readAll:: Axios error with code: ${e.code}`
      );
    }

    return instancesToRead;
  }

  async readWithId(jwt, instanceId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.entityName}/${instanceId}`;
    const method = "get";

    // read instance
    let instanceToRead;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      instanceToRead = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.readWithId:: Axios error with code: ${e.code}`
      );
    }

    return instanceToRead;
  }

  //   static async readPagedSorted(jwt, data) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/paged`;
  //     const method = "get";
  //     data =
  //       data ??
  //       JSON.stringify({
  //         pageNumber: 1,
  //         pageSize: 5,
  //         isDescending: true,
  //       });

  //     // read paged and sorted
  //     let pagedInstances;
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setData(data)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       pagedInstances = response.data.data;
  //     } catch (e: any) {
  //       throw new Error(
  //         `${this.name}.readPagedSorted:: Axios error with code: ${e.code}`
  //       );
  //     }

  //     return pagedInstances;
  //   }

  //   static async count(jwt) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/count`;
  //     const method = "get";

  //     // read paged and sorted
  //     let count;
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       count = response.data.data;
  //     } catch (e: any) {
  //       throw new Error(`${this.name}.count:: Axios error with code: ${e.code}`);
  //     }

  //     return count;
  //   }

  //   static async searchByExactName(jwt, searchString) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/search/exact`;
  //     const method = "get";
  //     const data = {
  //       pageNumber: 0,
  //       pageSize: 5,
  //       isDescending: true,
  //       firstName: searchString,
  //     };

  //     // read paged and sorted
  //     let readInstances;
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setData(data)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       readInstances = response.data.data;
  //     } catch (e: any) {
  //       throw new Error(
  //         `${this.name}.searchByExactName:: Axios error with code: ${e.code}`
  //       );
  //     }

  //     return readInstances;
  //   }

  //   static async searchByPartialName(jwt, searchString) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/search/partial`;
  //     const method = "get";
  //     const data = {
  //       pageNumber: 0,
  //       pageSize: 5,
  //       isDescending: true,
  //       firstName: searchString,
  //     };

  //     // read paged and sorted
  //     let readInstances;
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setData(data)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       readInstances = response.data.data;
  //     } catch (e: any) {
  //       throw new Error(
  //         `${this.name}.searchByPartialName:: Axios error with code: ${e.code}`
  //       );
  //     }

  //     return readInstances;
  //   }

  //   static async update(jwt, instanceId, data) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
  //     const method = "put";
  //     data = data ?? {
  //       firstName: `${Constant.preKey}updatedFirstName`,
  //       email: `${
  //         Constant.preKey
  //       }${CommonUtil.generateRandomWord()}_updatedEmail@hotmail.com`,
  //       password: `${Constant.preKey}updatedPassword`,
  //     };

  //     // update instance
  //     let updatedInstance;
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setData(data)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       updatedInstance = response.data.data;
  //     } catch (e: any) {
  //       throw new Error(`${this.name}.update:: Axios error with code: ${e.code}`);
  //     }

  //     return updatedInstance;
  //   }

  //   static async updateUserPassword(jwt, instanceId, data) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}/password`;
  //     const method = "patch";

  //     // update instance
  //     let operationStatus; // todo check that operation status maybe another thing is return
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setData(data)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       operationStatus = response.data;
  //     } catch (e: any) {
  //       throw new Error(
  //         `${this.name}.updateUserPassword:: Axios error with code: ${e.code}`
  //       );
  //     }

  //     return operationStatus;
  //   }

  //   static async deactivate(jwt, instanceId) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}/deactivate`;
  //     const method = "patch";

  //     // update instance
  //     let operationStatus; // todo check that operation status maybe another thing is return
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       operationStatus = response.data;
  //     } catch (e: any) {
  //       throw new Error(
  //         `${this.name}.deactivate:: Axios error with code: ${e.code}`
  //       );
  //     }

  //     return operationStatus;
  //   }

  //   static async activate(jwt, instanceId) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}/activate`;
  //     const method = "patch";

  //     // update instance
  //     let operationStatus; // todo check that operation status maybe another thing is return
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       operationStatus = response.data;
  //     } catch (e: any) {
  //       throw new Error(
  //         `${this.name}.activate:: Axios error with code: ${e.code}`
  //       );
  //     }

  //     return operationStatus;
  //   }

  //   static async delete(jwt, instanceId) {
  //     // prepare request
  //     const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
  //     const method = "delete";

  //     // delete instance
  //     let operationStatus; // todo check that operation status maybe another thing is return
  //     try {
  //       const axiosService = new AxiosServiceBuilder()
  //         .setUrl(url)
  //         .setMethod(method)
  //         .setJwt(jwt)
  //         .build();
  //       const response = await axiosService.request();
  //       operationStatus = response.data;
  //     } catch (e: any) {
  //       throw new Error(`${this.name}.delete:: Axios error with code: ${e.code}`);
  //     }

  //     return operationStatus;
  //   }
}

module.exports = BaseService;