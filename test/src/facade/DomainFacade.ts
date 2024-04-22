const axios = require("axios");

const Constant = require("../constant/Constant.ts");

class DomainFacade {
  static async createDomain(data, adminJwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/domains`;
    const method = "post";
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: adminJwt,
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

  static async readDomainWithId(domainId, adminJwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/domains/${domainId}`;
    const method = "get";

    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: adminJwt,
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

  static async readAllDomains(adminJwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/domains`;
    const method = "get";

    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: adminJwt,
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

  static async readCount(adminJwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/domains/count`;
    const method = "get";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: adminJwt,
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
}

module.exports = DomainFacade;
