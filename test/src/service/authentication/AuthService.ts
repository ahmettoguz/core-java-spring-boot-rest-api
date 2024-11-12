import Constant from "src/constant/Constant";
import { AxiosServiceBuilder } from "src/util/AxiosService";

class AuthService {
  private prefix: string;
  constructor() {
    this.prefix = "auth";
  }

  async login(data) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/login`;
    const method = "post";

    // send  request
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setData(data)
        .build();
      const response = await axiosService.request();
      return response;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.login:: Axios error with code: ${e.code}`
      );
    }
  }

  async validateJwt(jwt) {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/validate`;
    const method = "post";

    // send  request
    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .setJwt(jwt)
        .build();
      await axiosService.request();
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.validateJwt:: Axios error with code: ${e.code}`
      );
    }
  }
}

export default AuthService;
