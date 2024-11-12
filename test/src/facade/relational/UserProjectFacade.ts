const UserService = require("../../service/UserService.ts");
const userService = new UserService();

const ProjectService = require("../../service/ProjectService.ts");
const projectService = new ProjectService();

const UserProjectService = require("../../service/relational/UserProjectService.ts");
const userProjectService = new UserProjectService();

class UserProjectFacade {
  // many to many relation

  async associateUserAndProject(jwt, userId = null, projectIds = null) {
    // check data and prepare if not exist
    if (userId == null && projectIds == null) {
      // create user
      const user = await userService.create(jwt);
      userId = user.id;

      // create projects
      projectIds = [];
      for (let i = 0; i < 4; i++) {
        const project = await projectService.create(jwt);
        projectIds.push(project.id);
      }
    }

    // create relation between user and projects
    for (const id of projectIds) {
      await userProjectService.associate(jwt, userId, id);
    }

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check relation
    if (projectIds.some((id) => !readInstance.projectIds.includes(id))) {
      throw new Error("user and project relation cannot established");
    }
  }

  async unassociateUserAndProject(jwt, userId = null, projectIds = null) {
    // check data and prepare if not exist
    if (userId == null && projectIds == null) {
      // create user
      const user = await userService.create(jwt);
      userId = user.id;

      // create projects
      projectIds = [];
      for (let i = 0; i < 4; i++) {
        const project = await projectService.create(jwt);
        projectIds.push(project.id);
      }
    }

    // create relation between user and projects
    for (const id of projectIds) {
      await userProjectService.associate(jwt, userId, id);
    }

    // remove relation between user and projects
    for (const id of projectIds) {
      await userProjectService.unassociate(jwt, userId, id);
    }

    // read user
    const readInstance = await userService.readWithId(jwt, userId);

    // check relation
    if (projectIds.some((id) => readInstance.projectIds.includes(id))) {
      throw new Error("user and project relation cannot established");
    }
  }
}

module.exports = UserProjectFacade;
