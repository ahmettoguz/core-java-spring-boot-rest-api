const axios = require("axios");

const Constant = require("../constant/Constant.ts");

class RoleFacade {
  static async addRoleToUser(userThatGetRole, userThatAddRole, roleToAdd) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${userThatGetRole.id}/roles/${roleToAdd.id}`;
    const config = {
      headers: {
        Authorization: userThatAddRole.jwt,
      },
    };

    // make request
    const response = await axios.post(url, null, config);

    // check response
    if (response.status !== 200) throw new Error();
  }
}

module.exports = RoleFacade;
