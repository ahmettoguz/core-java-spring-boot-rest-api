const UserService = require("../../service/UserService.ts");
const userService = new UserService();

const DomainService = require("../../service/DomainService.ts");
const domainService = new DomainService();

const UserDomainService = require("../../service/relational/UserDomainService.ts");
const userDomainService = new UserDomainService();

class UserDomainFacade {
  async associateUserAndDomain(jwt, userId = null, domainId = null) {
    // check data and prepare if not exist
    if (userId == null && domainId == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // create domain
      const domain = await domainService.create(jwt);
      domainId = domain.id;
    }

    // create relation between user and domain
    await userDomainService.associate(jwt, userId, domainId);

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check domain relation
    if (!readInstance.domainId == domainId)
      throw new Error("user and role relation cannot established");
  }

  async unassociateUserAndDomain(jwt, userId = null, domainId = null) {
    // check data and prepare if not exist
    if (userId == null && domainId == null) {
      // create user
      const user = await userService.create();
      userId = user.id;

      // create domain
      const domain = await domainService.create(jwt);
      domainId = domain.id;
    }

    // create relation between user and domain
    await this.associateUserAndDomain(jwt, userId, domainId);

    // remove relation between user and domain
    await userDomainService.unassociate(jwt, userId, domainId);

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check domain relation
    if (readInstance.domainId == domainId)
      throw new Error("user and role relation cannot removed");
  }
}

module.exports = UserDomainFacade;
