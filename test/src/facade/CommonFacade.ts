const axios = require("axios");

const Constant = require("../constant/Constant.ts");

class CommonFacade {
  static async create(jwt, data, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}`;
    const method = "post";
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error("response is not 200");
    if (response.data === undefined)
      throw new Error("response data is undefined");

    // return data
    return response.data.data;
  }

  static async readWithId(jwt, instanceId, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
    const method = "get";

    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error("response is not 200");
    if (response.data === undefined)
      throw new Error("response data is undefined");

    // return response data
    return response.data.data;
  }

  static async readAll(jwt, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}`;
    const method = "get";

    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error("response is not 200");
    if (response.data === undefined)
      throw new Error("response data is undefined");

    // return response data
    return response.data.data;
  }

  static async readPagedSorted(
    jwt,
    pageNumber,
    pageSize,
    isDescending,
    entityName
  ) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/paged`;
    const method = "get";

    let data = JSON.stringify({
      pageNumber: pageNumber,
      pageSize: pageSize,
      isDescending: isDescending,
    });

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async readCount(jwt, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/count`;
    const method = "get";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async update(jwt, data, instanceId, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
    const method = "put";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async deactivate(jwt, instanceId, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}/deactivate`;
    const method = "patch";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }

  static async activate(jwt, instanceId, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}/activate`;
    const method = "patch";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }

  static async delete(jwt, instanceId, entityName) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
    const method = "delete";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }
}

module.exports = CommonFacade;
