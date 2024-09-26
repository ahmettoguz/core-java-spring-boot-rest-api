const addContext = require("mochawesome/addContext");
const HealthCheckFacade = require("../../facade/HealthCheckFacade.ts");
const healthCheckFacade = new HealthCheckFacade();

describe("Health Check Tests [health-check.spec]", function () {
  it("[GET] /api/health-check", async function () {
    // add context information
    addContext(this, "Checking server status.");

    // perform operation
    await healthCheckFacade.checkServerStatus();
  });

  it("[GET] /api/health-check/info", async function () {
    // add context information
    addContext(this, "Checking app informations.");

    // perform operation
    await healthCheckFacade.checkAppInformation();
  });
});
