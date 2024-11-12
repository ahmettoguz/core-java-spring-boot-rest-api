import Constant from "src/constant/Constant";
import { AxiosServiceBuilder } from "src/util/AxiosService";

abstract class CoreEntityService {
  public prefix: string;
  protected abstract getDefaultCreateData(): any;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  async create(jwt = null, data = null) {
    // prepare request
    data = data ?? (await this.getDefaultCreateData());
    const url = `${Constant.baseUrl}/api/${this.prefix}`;
    const method = "post";

    // create instance
    let instanceToCreate;
    try {
      const axiosServiceBuilder = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data);
      // add jwt if required
      if (jwt) axiosServiceBuilder.setJwt(jwt);
      const axiosService = axiosServiceBuilder.build();

      const response = await axiosService.request();
      instanceToCreate = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.create:: Axios error with code: ${e.code}`
      );
    }

    return instanceToCreate;
  }

  async createMany(jwt = null, createInstanceCount = 2, instanceDatas = []) {
    const createdInstanceIds: number[] = [];

    if (instanceDatas.length === 0)
      for (let i = 0; i < createInstanceCount; i++)
        instanceDatas.push(await this.getDefaultCreateData());

    // create instances
    for (let i = 0; i < instanceDatas.length; i++) {
      const instanceToCreate = await this.create(jwt, instanceDatas[i]);

      // save ids
      createdInstanceIds.push(instanceToCreate.id);
    }

    return createdInstanceIds;
  }

  async readAll(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}`;
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
    const url = `${Constant.baseUrl}/api/${this.prefix}/${instanceId}`;
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

  async readPagedSorted(jwt, data) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/paged`;
    const method = "get";
    data =
      data ??
      JSON.stringify({
        pageNumber: 1,
        pageSize: 5,
        isDescending: true,
      });

    // read paged and sorted
    let pagedInstances;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      pagedInstances = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.readPagedSorted:: Axios error with code: ${e.code}`
      );
    }

    return pagedInstances;
  }

  async count(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/count`;
    const method = "get";

    // read count
    let count;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      count = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.count:: Axios error with code: ${e.code}`
      );
    }

    return count;
  }

  async update(jwt, instanceId, data) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/${instanceId}`;
    const method = "put";

    // update instance
    let updatedInstance;
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      updatedInstance = response.data.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.update:: Axios error with code: ${e.code}`
      );
    }

    return updatedInstance;
  }

  async deactivate(jwt, instanceId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/${instanceId}/deactivate`;
    const method = "patch";

    // update instance
    let operationStatus; // todo check that operation status maybe another thing is return
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      operationStatus = response.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.deactivate:: Axios error with code: ${e.code}`
      );
    }

    return operationStatus;
  }

  async activate(jwt, instanceId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/${instanceId}/activate`;
    const method = "patch";

    // update instance
    let operationStatus; // todo check that operation status maybe another thing is return
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      operationStatus = response.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.activate:: Axios error with code: ${e.code}`
      );
    }

    return operationStatus;
  }

  async delete(jwt, instanceId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/${instanceId}`;
    const method = "delete";

    // delete instance
    let operationStatus; // todo check that operation status maybe another thing is return
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      const response = await axiosService.request();
      operationStatus = response.data;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.delete:: Axios error with code: ${e.code}`
      );
    }

    return operationStatus;
  }
}

export default CoreEntityService;
