const axios = require("axios");

const Constant = require("../constant/Constant.ts");

const entityName = "users";

class UserFacade {
  static async create(data, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}`;
    const method = "post";
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error("response is not 200");
    if (response.data === undefined)
      throw new Error("response data is undefined");

    // set user
    Object.assign(user, response.data.data);
    user.password = data.password;
  }

  static async readAll(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}`;
    const method = "get";

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

    // return response data
    return response.data.data;
  }

  // static async readCount(jwt) {
  //   // prepare request
  //   const url = `${Constant.baseUrl}/api/${entityName}/count`;
  //   const method = "get";

  //   let config = {
  //     method: method,
  //     url: url,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: jwt,
  //     },
  //   };

  //   // make request
  //   const response = await axios.request(config);

  //   // check response
  //   if (response.status !== 200) throw new Error();
  //   if (response.data === undefined) throw new Error();

  //   // return response data
  //   return response.data.data;
  // }

  // static async update(jwt, data, domainId) {
  //   // prepare request
  //   const url = `${Constant.baseUrl}/api/${entityName}/${domainId}`;
  //   const method = "put";

  //   let config = {
  //     method: method,
  //     url: url,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: jwt,
  //     },
  //     data: data,
  //   };

  //   // make request
  //   const response = await axios.request(config);

  //   // check response
  //   if (response.status !== 200) throw new Error();
  //   if (response.data === undefined) throw new Error();

  //   // return response data
  //   return response.data.data;
  // }

  static async readWithId(jwt, instanceId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
    const method = "get";

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

    // return response data
    return response.data.data;
  }

  static async readPagedSorted(jwt, pageNumber, pageSize, isDescending) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/paged`;
    const method = "get";

    let data = JSON.stringify({
      pageNumber: pageNumber,
      pageSize: pageSize,
      isDescending: isDescending,
    });

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async readCount(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/count`;
    const method = "get";

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

    // return response data
    return response.data.data;
  }

  static async searchByExactName(user, serachString) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/search/exact`;
    const method = "get";

    let data = JSON.stringify({
      pageNumber: 0,
      pageSize: 5,
      isDescending: false,
      firstName: serachString,
    });

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async searchByPartialName(user, serachString) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/search/partial`;
    const method = "get";

    let data = JSON.stringify({
      pageNumber: 0,
      pageSize: 5,
      isDescending: false,
      firstName: serachString,
    });

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async update(jwt, data, instanceId) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
    const method = "put";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // return response data
    return response.data.data;
  }

  static async updateUserPassword(data, userToUpdate, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${userToUpdate.id}/password`;
    const method = "patch";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.jwt,
      },
      data: data,
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }

  static async deactivateUser(userId, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${userId}/deactivate`;
    const method = "patch";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }

  static async activateUser(userId, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${userId}/activate`;
    const method = "patch";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }

  static async deleteUser(userId, user) {
    // prepare request
    const url = `${Constant.baseUrl}/api/users/${userId}`;
    const method = "delete";

    let config = {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: user.jwt,
      },
    };

    // make request
    const response = await axios.request(config);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();
  }
}

module.exports = UserFacade;
