const addContext = require("mochawesome/addContext");
const axios = require("axios");

const App = require("../../app/App.ts");
const CommonUtil = require("../../util/CommonUtil.ts");

describe("Initializing Environment", function () {
  it("user creation", async function () {
    addContext(this, "Creating user.");

    const body = {
      firstName: "apiTestName",
      email: `${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: "apiTestPassword",
      isActive: true,
    };

    // make request
    const response = await axios.post("http://localhost:8080/api/users", body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    App.user = response.data.data;
    App.user.password = "apiTestPassword";
  });

  it("user login", async function () {
    addContext(this, "Login as user.");

    const url = "http://localhost:8080/api/auth/login";
    const body = {
      email: App.user.email,
      password: App.user.password,
    };

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // get token
    const token = CommonUtil.extractJwtToken(response);
    App.user.jwt = token;
  });

  it("project manager creation", async function () {
    addContext(this, "Creating project manager.");

    const body = {
      firstName: "apiTestName",
      email: `${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: "apiTestPassword",
      isActive: true,
    };

    // make request
    const response = await axios.post("http://localhost:8080/api/users", body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    App.projectManager = response.data.data;
    App.projectManager.password = "apiTestPassword";
  });

  it("project manager login", async function () {
    addContext(this, "Login as project manager.");

    const url = "http://localhost:8080/api/auth/login";
    const body = {
      email: App.projectManager.email,
      password: App.projectManager.password,
    };

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // get token
    const token = CommonUtil.extractJwtToken(response);
    App.projectManager.jwt = token;
  });

  it("admin creation", async function () {
    addContext(this, "Creating admin.");

    const body = {
      firstName: "apiTestName",
      email: `${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: "apiTestPassword",
      isActive: true,
    };

    // make request
    const response = await axios.post("http://localhost:8080/api/users", body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    App.admin = response.data.data;
    App.admin.password = "apiTestPassword";
  });

  it("admin login", async function () {
    addContext(this, "Login as admin.");

    const url = "http://localhost:8080/api/auth/login";
    const body = {
      email: App.admin.email,
      password: App.admin.password,
    };

    // make request
    const response = await axios.post(url, body);

    // check response
    if (response.status !== 200) throw new Error();
    if (response.data === undefined) throw new Error();

    // get token
    const token = CommonUtil.extractJwtToken(response);
    App.admin.jwt = token;
  });
});
