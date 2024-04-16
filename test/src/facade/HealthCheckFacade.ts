const axios = require("axios");

const Constant = require("../constant/Constant.ts");

class HealthCheckFacade {
  static async checkServerStatus() {
    // make request
    const response = await axios.get(`${Constant.baseUrl}/api/health-check`);

    // check status
    if (response.status !== 200) throw new Error();
  }

  static async checkAppInformation() {
    // make request
    const response = await axios.get(`${Constant.baseUrl}/api/health-check/info`);

    // check status
    if (response.status !== 200) throw new Error();

    // check data field
    if (
      response.data.data.description === undefined ||
      response.data.data.name === undefined
    )
      throw new Error();
  }
}

module.exports = HealthCheckFacade;
