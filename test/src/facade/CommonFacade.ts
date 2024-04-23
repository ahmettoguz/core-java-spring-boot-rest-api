const axios = require("axios");

const Constant = require("../constant/Constant.ts");

class CommonFacade {
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
}

module.exports = CommonFacade;
