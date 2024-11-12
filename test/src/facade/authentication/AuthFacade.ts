import App from "src/app/App";
import AuthService from "src/service/authentication/AuthService";
import CommonUtil from "src/util/CommonUtil";

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

export default AuthFacade;
