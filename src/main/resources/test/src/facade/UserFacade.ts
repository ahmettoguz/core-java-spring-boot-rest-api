const axios = require("axios");

const Constant = require("../constant/Constant.ts");
const App = require("../app/App.ts");
const CommonUtil = require("../util/CommonUtil.ts");

class UserFacade {
  static async createUser(role) {
    const url = `${Constant.baseUrl}/api/users`;

    // prepare request
    const body = {
      firstName: `${Constant.preKey}${role.name}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}Password`,
      isActive: true,
    };

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // set initialized values
    App[role.name] = response.data.data;
    App[role.name].password = Constant.password;

    console.log(App[role.name]);
  }
}

module.exports = UserFacade;
