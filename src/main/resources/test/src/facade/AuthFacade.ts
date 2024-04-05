const axios = require("axios");

const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const App = require("../app/App.ts");

class AuthFacade {
  static async login(role) {
    // prepare request
    const url = `${Constant.baseUrl}/api/auth/login`;
    const body = {
      email: App[role.name].email,
      password: App[role.name].password,
    };

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // get token
    const token = CommonUtil.extractJwtToken(response);

    // set initialized value
    App[role.name].jwt = token;
  }
}

module.exports = AuthFacade;
