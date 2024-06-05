const axios = require("axios");

const Constant = require("../../constant/Constant.ts");
const CommonUtil = require("../../util/CommonUtil.ts");
const App = require("../../app/App.ts");

const UserFacade = require("../UserFacade.ts");

const {
    AxiosService,
    AxiosServiceBuilder,
} = require("../../service/AxiosService.ts");

class UserRoleFacade {
    static async createRelation(targetRoleId) {
        // create user
        // prepare data
        const data = {
            firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
            email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
            password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
            isActive: true,
        };

        // perform action
        let instanceToCreate: any = {};
        try {
            await UserFacade.create(data, instanceToCreate);
        } catch (error) {
            throw error;
        }

        // prepare request
        const url = `${Constant.baseUrl}/api/users/${instanceToCreate.id}/roles/${targetRoleId}`;
        const method = "post";
        const jwt = App.admin.jwt;

        // bind created user to existing role
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setJwt(jwt)
                .setMethod(method)
                .build();
            await axiosService.request();
        } catch (e: any) {
            throw new Error(`Axios error with code: ${e.code}`);
        }

        // read user and check its role
        // read instance
        let readInstance;
        try {
            readInstance = await UserFacade.readWithId(
                App.admin.jwt,
                instanceToCreate.id
            );
        } catch (error) {
            throw error;
        }

        if (!readInstance.roleIds.includes(targetRoleId))
            throw new Error("user and role relation cannot established");
    }

    // static async delete(jwt, instanceId) {
    //   await CommonFacade.delete(jwt, instanceId, entityName);
    // }
}

module.exports = UserRoleFacade;
