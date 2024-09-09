const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const UserService = require("../service/UserService.ts");
const userService = new UserService();
const AuthFacade = require("../facade/AuthFacade.ts");

class UserFacade {
  static async create(jwt) {
    // create instance
    const instanceToCreate = await userService.create();

    // read created instance
    const readInstance = await userService.readWithId(jwt, instanceToCreate.id);

    // compare instances
    if (instanceToCreate.id != readInstance.id)
      throw new Error("created instance id is not match");
  }

  static async readAll(jwt) {
    // create instances
    const createdInstanceIds = await userService.createMany();

    // read created instances
    const readInstances = await userService.readAll(jwt);

    // check inserted ids
    for (let i = 0; i < createdInstanceIds.length; i++) {
      if (
        !readInstances.some((instance) => instance.id === createdInstanceIds[i])
      ) {
        throw new Error("desired number of instances couldn't read");
      }
    }
  }

  static async readWithId(jwt) {
    // create instance
    const instanceToCreate = await userService.create();

    // read created instance
    const readInstance = await userService.readWithId(jwt, instanceToCreate.id);

    // compare instances
    if (instanceToCreate.id != readInstance.id)
      throw new Error("created instance id is not match");
  }

  static async readPagedSorted(jwt) {
    // create instances
    const createInstanceCount = 15;
    await userService.createMany(createInstanceCount);

    // read first page
    const firstPageData = {
      pageNumber: 0,
      pageSize: 5,
      isDescending: true,
    };
    const firstPage = await userService.readPagedSorted(jwt, firstPageData);

    // read second page
    const secondPageData = {
      pageNumber: 1,
      pageSize: 5,
      isDescending: true,
    };
    const secondPage = await userService.readPagedSorted(jwt, secondPageData);

    // read third page
    const thirdPageData = {
      pageNumber: 0,
      pageSize: 3,
      isDescending: false,
    };
    const thirdPage = await userService.readPagedSorted(jwt, thirdPageData);

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

  static async count(jwt) {
    // create instances
    const createInstanceCount = 2;
    await userService.createMany(createInstanceCount);

    // read instance count
    const readInstanceCount = await userService.count(jwt);

    // check count
    if (readInstanceCount < createInstanceCount)
      throw new Error("count invalid");
  }

  static async searchByExactName(jwt) {
    // create instances
    const instanceDatas = [
      {
        firstName: `specific`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      },
      {
        firstName: `specificName`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      },
      {
        firstName: `specificName`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      },
    ];
    await userService.createMany(instanceDatas.length, instanceDatas);

    // search instance with exact name
    const foundInstancesWrong = await userService.searchByExactName(jwt, "sp");
    const foundInstancesTrue = await userService.searchByExactName(
      jwt,
      "specificName"
    );

    // check data, there shouldn't be any data because exact search string is not provided
    if (foundInstancesWrong.length !== 0)
      throw new Error("exact string search invalid");

    // check found instances it should found and give it as paged
    if (foundInstancesTrue.length < 2)
      throw new Error("count of the found instances is invalid");
  }

  static async searchByPartialName(jwt) {
    // create instances
    const instanceDatas = [
      {
        firstName: `partialName`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      },
      {
        firstName: `partial`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      },
      {
        firstName: `${Constant.preKey}_partialNameToSearch`,
        email: `${
          Constant.preKey
        }${CommonUtil.generateRandomWord()}@hotmail.com`,
        password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
        isActive: true,
      },
    ];
    await userService.createMany(instanceDatas.length, instanceDatas);

    // search for instance
    const foundInstances = await userService.searchByPartialName(jwt, "part");

    // check found instances it should found and give it as paged
    if (foundInstances.length < instanceDatas.length)
      throw new Error("count of the found instances is invalid");
  }

  static async update(jwt) {
    // create instance
    const createData = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}oldPassword`,
      isActive: true,
    };
    const instanceToCreate = await userService.create(createData);

    // perform update
    const updateData = {
      firstName: `${Constant.preKey}updatedFirstName`,
      email: `${
        Constant.preKey
      }${CommonUtil.generateRandomWord()}_updatedEmail@hotmail.com`,
      password: `${Constant.preKey}updatedPassword`,
    };
    const updatedInstance = await userService.update(
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
    if (
      updatedInstance.firstName != updateData.firstName ||
      updatedInstance.email != updateData.email
    )
      throw new Error("field is not updated");

    // check password update (trying old password) by login operation
    const loginData = {
      email: updatedInstance.email,
      password: createData.password,
    };

    // todo change that auth facade and service
    try {
      await AuthFacade.login(loginData, updatedInstance);
    } catch (error) {
      throw error;
    }
  }

  static async updateUserPassword(jwt) {
    // create instance
    const instanceToCreate = await userService.create();

    // prepare data
    const updateData = {
      newPassword: `${Constant.preKey}newPassword`,
    };

    // update password
    const operationStatus = await userService.updateUserPassword(
      jwt,
      instanceToCreate.id,
      updateData
    );

    // check password update (trying new password) by login operation
    const loginData = {
      email: instanceToCreate.email,
      password: updateData.newPassword,
    };

    // todo change that auth facade and service
    try {
      await AuthFacade.login(loginData, instanceToCreate);
    } catch (error) {
      throw error;
    }
  }

  static async deactivate(jwt) {
    // create instance
    const createData = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}oldPassword`,
      isActive: true,
    };
    const instanceToCreate = await userService.create(createData);

    // deactivate
    await userService.deactivate(jwt, instanceToCreate.id);

    // read deactivated instance
    const readInstance = await userService.readWithId(jwt, instanceToCreate.id);

    // check activation of the instance
    if (readInstance.isActive !== false)
      throw new Error("instance cannot deactivated");
  }

  static async activate(jwt) {
    // create instance
    const createData = {
      firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
      password: `${Constant.preKey}oldPassword`,
      isActive: false,
    };
    const instanceToCreate = await userService.create(createData);

    // activate
    await userService.activate(jwt, instanceToCreate.id);

    // read activated instance
    const readInstance = await userService.readWithId(jwt, instanceToCreate.id);

    // check activation of the instance
    if (readInstance.isActive !== true)
      throw new Error("instance cannot activated");
  }

  static async delete(jwt) {
    // create instance
    const instanceToCreate = await userService.create();

    // delete instance
    await userService.delete(jwt, instanceToCreate.id);

    // try to read deleted instance
    let isInstanceExist;
    try {
      await userService.readWithId(jwt, instanceToCreate.id);
      isInstanceExist = true;
    } catch (error) {
      isInstanceExist = false;
    }

    if (isInstanceExist) throw new Error("deleted instance is exist");
  }
}

module.exports = UserFacade;
