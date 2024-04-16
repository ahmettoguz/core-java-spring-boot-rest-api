const axios = require("axios");

const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");

class AuthFacade {
  static async login(body, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/auth/login`;

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // get jwt
    const jwt = CommonUtil.extractJwtToken(response);

    // set jwt
    user.jwt = `Bearer ${jwt}`;
  }

  static async validate(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/auth/validate`;
    const config = {
      headers: {
        Authorization: jwt,
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
