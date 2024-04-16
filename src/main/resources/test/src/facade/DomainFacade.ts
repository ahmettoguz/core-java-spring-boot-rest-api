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
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return data
    return response.data.data;
  }
}

module.exports = DomainFacade;
