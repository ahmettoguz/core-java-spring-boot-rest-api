import ProjectService from "src/service/ProjectService";

const projectService = new ProjectService();

class ProjectFacade {
  async create(jwt) {
    // create instance
    const instanceToCreate = await projectService.create(jwt);

    // read created instance
    const readInstance = await projectService.readWithId(
      jwt,
      instanceToCreate.id
    );

    // compare instances
    if (instanceToCreate.id != readInstance.id)
      throw new Error("created instance id is not match");
  }

  async readAll(jwt) {
    // create instances
    const createdInstanceIds = await projectService.createMany(jwt);

    // read created instances
    const readInstances = await projectService.readAll(jwt);

    // check inserted ids
    for (let i = 0; i < createdInstanceIds.length; i++) {
      if (
        !readInstances.some((instance) => instance.id === createdInstanceIds[i])
      ) {
        throw new Error("desired number of instances couldn't read");
      }
    }
  }

  async readWithId(jwt) {
    // create instance
    const instanceToCreate = await projectService.create(jwt);

    // read created instance
    const readInstance = await projectService.readWithId(
      jwt,
      instanceToCreate.id
    );

    // compare instances
    if (instanceToCreate.id != readInstance.id)
      throw new Error("created instance id is not match");
  }

  async readPagedSorted(jwt) {
    // create instances
    const createInstanceCount = 15;
    await projectService.createMany(jwt, createInstanceCount);

    // read first page
    const firstPageData = {
      pageNumber: 0,
      pageSize: 5,
      isDescending: true,
    };
    const firstPage = await projectService.readPagedSorted(jwt, firstPageData);

    // read second page
    const secondPageData = {
      pageNumber: 1,
      pageSize: 5,
      isDescending: true,
    };
    const secondPage = await projectService.readPagedSorted(
      jwt,
      secondPageData
    );

    // read third page
    const thirdPageData = {
      pageNumber: 0,
      pageSize: 3,
      isDescending: false,
    };
    const thirdPage = await projectService.readPagedSorted(jwt, thirdPageData);

    // first page validations
    // check page size
    if (firstPage.length !== firstPageData.pageSize)
      throw new Error("page size invalid");

    // check sorting
    let lastId = firstPage[0];
    for (let i = 0; i < firstPageData.pageSize; i++) {
      const currentId = firstPage[i].id;

      if (currentId > lastId) throw new Error("descending sort invalid");

      lastId = currentId;
    }

    // second page validations
    // compare objects that ensure page is different
    if (firstPage[0].id === secondPage[0].id)
      throw new Error("same object in different page");

    // third page validations
    // check page size
    if (thirdPage.length !== thirdPageData.pageSize)
      throw new Error("page size invalid");

    // check sorting
    lastId = thirdPageData[0];
    for (let i = 0; i < thirdPageData.pageSize; i++) {
      const currentId = thirdPage[i].id;

      if (currentId < lastId) throw new Error("ascending sort invalid");

      lastId = currentId;
    }
  }

  async count(jwt) {
    // create instances
    const createInstanceCount = 2;
    await projectService.createMany(jwt, createInstanceCount);

    // read instance count
    const readInstanceCount = await projectService.count(jwt);

    // check count
    if (readInstanceCount < createInstanceCount)
      throw new Error("count invalid");
  }

  async update(jwt) {
    // create instance
    const createData = await projectService.getDefaultCreateData();
    const instanceToCreate = await projectService.create(jwt, createData);

    // perform update
    const updateData = await projectService.getDefaultCreateData();
    const updatedInstance = await projectService.update(
      jwt,
      instanceToCreate.id,
      updateData
    );

    // check update time assume as 2 mins
    const currentTime = Date.now();
    const twoMinutesInMs = 2 * 60 * 1000;
    const elapsedTime =
      currentTime - new Date(updatedInstance.updatedAt).getTime();
    if (elapsedTime > twoMinutesInMs) throw new Error("update time invalid");

    // check updated fields
    if (!updatedInstance.title && updatedInstance.title != updateData.title)
      throw new Error("field is not updated");
  }

  async deactivate(jwt) {
    // create instance
    const createData = await projectService.getDefaultCreateData();
    createData.isActive = true;
    const instanceToCreate = await projectService.create(jwt, createData);

    // deactivate
    await projectService.deactivate(jwt, instanceToCreate.id);

    // read deactivated instance
    const readInstance = await projectService.readWithId(
      jwt,
      instanceToCreate.id
    );

    // check activation of the instance
    if (readInstance.isActive !== false)
      throw new Error("instance cannot deactivated");
  }

  async activate(jwt) {
    // create instance
    const createData = await projectService.getDefaultCreateData();
    createData.isActive = false;
    const instanceToCreate = await projectService.create(jwt, createData);

    // activate
    await projectService.activate(jwt, instanceToCreate.id);

    // read activated instance
    const readInstance = await projectService.readWithId(
      jwt,
      instanceToCreate.id
    );

    // check activation of the instance
    if (readInstance.isActive !== true)
      throw new Error("instance cannot activated");
  }

  async delete(jwt) {
    // create instance
    const instanceToCreate = await projectService.create(jwt);

    // delete instance
    await projectService.delete(jwt, instanceToCreate.id);

    // try to read deleted instance
    let isInstanceExist;
    try {
      await projectService.readWithId(jwt, instanceToCreate.id);
      isInstanceExist = true;
    } catch (error) {
      isInstanceExist = false;
    }

    if (isInstanceExist) throw new Error("deleted instance is exist");
  }
}

export default ProjectFacade;
