const axios = require("axios");

const Constant = require("../constant/Constant.ts");

class UserFacade {
  static async createUser(body, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users`;

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // set user
    Object.assign(user, response.data.data);
    user.password = body.password;
  }

  static async readUserWithId(id, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${id}`;

    const config = {
      headers: {
        Authorization: user.jwt,
      },
    };

    // make request
    const response = await axios.get(url, config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async readAllUsers(user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users`;

    const config = {
      headers: {
        Authorization: user.jwt,
      },
    };

    // make request
    const response = await axios.get(url, config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }
}

module.exports = UserFacade;
