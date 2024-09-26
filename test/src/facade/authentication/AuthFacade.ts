const App = require("../../app/App.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const AuthService = require("../../service/authentication/AuthService.ts");
const authService = new AuthService();

class AuthFacade {
  async login(data = null, user = null) {
    // prepare request
    data = data ?? {
      email: App.admin.email,
      password: App.admin.password,
    };

    //perform action
    const response = await authService.login(data);

    // get jwt
    const jwt = CommonUtil.extractJwtToken(response);

    // set jwt
    if (user) user.jwt = `Bearer ${jwt}`;
  }

  async validateJwt() {
    //perform action
    await authService.validateJwt(App.admin.jwt);
  }
}

module.exports = AuthFacade;
