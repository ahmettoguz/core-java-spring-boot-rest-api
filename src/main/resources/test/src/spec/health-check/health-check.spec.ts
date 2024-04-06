const addContext = require("mochawesome/addContext");

const HealthCheckFacade = require("../../facade/HealthCheckFacade.ts");

describe("Health Check Tests [health-check.spec]", function () {
  it("/api/health-check", async function () {
    // add context information
    addContext(this, "Checking server status.");

    // perform action
    try {
      await HealthCheckFacade.checkServerStatus();
    } catch (error) {
      throw error;
    }
  });

  it("/api/health-check/info", async function () {
    // add context information
    addContext(this, "Checking app informations.");

    // perform action
    try {
      await HealthCheckFacade.checkAppInformation();
    } catch (error) {
      throw error;
    }
  });
});
