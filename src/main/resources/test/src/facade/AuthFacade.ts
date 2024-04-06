const axios = require("axios");

const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");

class AuthFacade {
  static async login(body) {
    // prepare request
    const url = `${Constant.baseUrl}/api/auth/login`;

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // get token
    const token = CommonUtil.extractJwtToken(response);

    // return token
    // App[role.name].jwt = token;
    return token;
  }

  static async validate(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/auth/validate`;
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    // make request
    const response = await axios.post(url, null, config);

    // check status
    if (response.status !== 200) throw new Error();

    // check expiration time
    if (response.data.exp <= new Date()) {
      throw new Error();
    }

    // check body
    if (response.data.body === undefined && response.data.body === null) {
      throw new Error();
    }
  }
}

module.exports = AuthFacade;
