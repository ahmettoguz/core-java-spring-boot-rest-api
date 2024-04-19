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

    const config = {
      headers: {
        Authorization: adminJwt,
      },
    };

    // make request
    const response = await axios.get(url, config);

    // check response
    if (response.status !== 200) throw new Error("response is not 200");
    if (response.data === undefined)
      throw new Error("response data is undefined");

    // return response data
    return response.data.data;
  }
}

module.exports = DomainFacade;
