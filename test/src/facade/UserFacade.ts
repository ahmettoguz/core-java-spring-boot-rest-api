const axios = require("axios");

const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const App = require("../app/App.ts");
const {AxiosServiceBuilder} = require("../service/tool/AxiosService.ts");

const Service = require("../service/UserService.ts");

const AuthFacade = require("../facade/AuthFacade.ts");

class UserFacade {
    static async create() {
        // create instance
        const instanceToCreate = await Service.create();

        // read created instance
        const readInstance = await Service.readWithId(App.admin.jwt, instanceToCreate.id);

        // compare instances
        if (
            instanceToCreate.id != readInstance.id ||
            instanceToCreate.firstName != readInstance.firstName
        )
            throw new Error("created instance id is not match");
    }

    static async readAll(jwt) {
        // create instances
        const createdInstanceIds = await Service.createMany();

        // read created instances
        const readInstances = await Service.readAll(jwt);

        // check inserted ids
        for (let i = 0; i < createdInstanceIds.length; i++) {
            if (!readInstances.some((instance) => instance.id === createdInstanceIds[i])) {
                throw new Error("desired number of instances couldn't read");
            }
        }
    }
    
    static async readWithId(jwt) {
        // create instance
        const instanceToCreate = await Service.create();

        // read created instance
        const readInstance = await Service.readWithId(jwt, instanceToCreate.id);

        // compare instances
        if (
            instanceToCreate.id != readInstance.id ||
            instanceToCreate.firstName != readInstance.firstName
        )
            throw new Error("created instance id is not match");
    }
}

module.exports = UserFacade;