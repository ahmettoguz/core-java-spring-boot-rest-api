const CommonFacade = require("./CommonFacade.ts");

const entityName = "domains";

class DomainFacade {
  static async create(jwt, data) {
    return await CommonFacade.create(jwt, data, entityName);
  }

  static async readWithId(jwt, instanceId) {
    return await CommonFacade.readWithId(jwt, instanceId, entityName);
  }

  static async readAll(jwt) {
    return await CommonFacade.readAll(jwt, entityName);
  }

  static async readPagedSorted(jwt, pageNumber, pageSize, isDescending) {
    return await CommonFacade.readPagedSorted(
      jwt,
      pageNumber,
      pageSize,
      isDescending,
      entityName
    );
  }

  static async readCount(jwt) {
    return await CommonFacade.readCount(jwt, entityName);
  }

  static async update(jwt, data, instanceId) {
    return await CommonFacade.update(jwt, data, instanceId, entityName);
  }

  static async deactivate(jwt, instanceId) {
    await CommonFacade.deactivate(jwt, instanceId, entityName);
  }

  static async activate(jwt, instanceId) {
    await CommonFacade.activate(jwt, instanceId, entityName);
  }

  static async delete(jwt, instanceId) {
    await CommonFacade.delete(jwt, instanceId, entityName);
  }
}

module.exports = DomainFacade;
