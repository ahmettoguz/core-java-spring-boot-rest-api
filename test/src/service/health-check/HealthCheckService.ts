import Constant from "src/constant/Constant";
import { AxiosServiceBuilder } from "src/util/AxiosService";

class HealthCheckService {
  private prefix: string;
  constructor() {
    this.prefix = "health-check";
  }

  async checkServerStatus() {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}`;
    const method = "get";

    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .build();
      await axiosService.request();
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.checkServerStatus:: Axios error with code: ${e.code}`
      );
    }
  }
  async checkAppInformation() {
    // prepare request
    const url = `${Constant.baseUrl}/api/${this.prefix}/info`;
    const method = "get";

    try {
      const axiosService = new AxiosServiceBuilder()
        .setUrl(url)
        .setMethod(method)
        .build();
      const response = await axiosService.request();
      return response;
    } catch (e: any) {
      throw new Error(
        `${this.constructor.name}.checkAppInformation:: Axios error with code: ${e.code}`
      );
    }
  }
}

export default HealthCheckService;
