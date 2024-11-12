import DomainService from "src/service/DomainService";
import UserDomainService from "src/service/relational/UserDomainService";
import UserService from "src/service/UserService";

const userService = new UserService();
const domainService = new DomainService();
const userDomainService = new UserDomainService();

class UserDomainFacade {
  // one to one relation

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
      throw new Error("user and domain relation cannot established");
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

    // remove relation between user and domain
    await this.associateUserAndDomain(jwt, userId, domainId);

    // remove relation between user and domain
    await userDomainService.unassociate(jwt, userId, domainId);

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check domain relation
    if (readInstance.domainId == domainId)
      throw new Error("user and domain relation cannot removed");
  }
}

export default UserDomainFacade;
