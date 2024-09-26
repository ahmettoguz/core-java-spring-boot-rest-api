const HealthCheckService = require("../service/HealthCheckService.ts");
const healthCheckService = new HealthCheckService();

class HealthCheckFacade {
  async checkServerStatus() {
    // perform operation
    const response = await healthCheckService.checkServerStatus();

    // check status
    if (response.status !== 200)
      throw new Error(`response code is: ${response.status}`);
  }

  async checkAppInformation() {
    // perform operation
    const response = await healthCheckService.checkAppInformation();

    // check status
    if (response.status !== 200)
      throw new Error(`response code is: ${response.status}`);

    // todo check backend tarafında data.data yerine direkt olarak datayı dönmem lazım
    // check data field
    if (
      response.data.data.description === undefined ||
      response.data.data.name === undefined
    )
      throw new Error(`app informations invalid`);
  }
}

module.exports = HealthCheckFacade;
