const axios = require("axios");

const Constant = require("../constant/Constant.ts");
const App = require("../app/App.ts");
const RoleEnum = require("../enum/RoleEnum.ts");

class RoleFacade {
  static async addRoleToUser(role) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${App[role.name].id}/roles/${role.id}`;

    // make request
    const response = await axios.post(url);

    // check response
    if (response.status !== 200) throw new Error();
  }
}

module.exports = RoleFacade;
