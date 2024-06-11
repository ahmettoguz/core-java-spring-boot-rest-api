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
        // todo seperate create user
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

        return readInstance;
    }

    static async deleteRelation(targetRoleId) {

        // todo
        // create user

        // create relation
        let userWithRole;
        try {
            userWithRole = await this.createRelation(targetRoleId);
        } catch (e) {
            throw new Error("create relation failed");
        }

        // get user id
        const userId = userWithRole.id;

        // prepare request
        const url = `${Constant.baseUrl}/api/users/${userId}/roles/${targetRoleId}`;
        const method = "delete";
        const jwt = App.admin.jwt;

        // remove relation between created user with its role
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

        // read instance
        let readInstance;
        try {
            readInstance = await UserFacade.readWithId(
                App.admin.jwt,
                userId
            );
        } catch (error) {
            throw error;
        }

        // read user and check its role
        if (readInstance.roleIds.includes(targetRoleId))
            throw new Error("user and role relation cannot removed");

        return readInstance;
    }
}

module.exports = UserRoleFacade;
