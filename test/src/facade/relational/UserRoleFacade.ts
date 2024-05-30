const axios = require("axios");

const Constant = require("../../constant/Constant.ts");

class UserRoleFacade {
  static async createRelation(jwt, userId, roleId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${userId}/roles/${roleId}`;
    const method = "post";
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error("response is not 200");
    if (response.data === undefined)
      throw new Error("response data is undefined");

    // return data
    return response.data;
  }

  // static async delete(jwt, instanceId) {
  //   await CommonFacade.delete(jwt, instanceId, entityName);
  // }
}

module.exports = UserRoleFacade;
