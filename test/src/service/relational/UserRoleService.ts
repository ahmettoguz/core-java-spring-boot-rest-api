const Constant = require("../../constant/Constant.ts");
const App = require("../../app/App.ts");

const {AxiosServiceBuilder} = require("../../service/tool/AxiosService.ts");

class UserRoleService {
    static async createRelation(userIdToGetRole, targetRoleId, jwt) {
        // prepare request
        const url = `${Constant.baseUrl}/api/users/${userIdToGetRole}/roles/${targetRoleId}`;
        const method = "post";

        // bind created user to existing role
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setJwt(jwt)
                .build();
            await axiosService.request();
        } catch (e: any) {
            throw new Error(`Axios error with code: ${e.code}`);
        }
    }

    static async deleteRelation(userIdToDropRole, targetRoleId, jwt) {
        // prepare request
        const url = `${Constant.baseUrl}/api/users/${userIdToDropRole}/roles/${targetRoleId}`;
        const method = "delete";

        // remove relation between created user with its role
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setJwt(jwt)
                .build();
            await axiosService.request();
        } catch (e: any) {
            throw new Error(`Axios error with code: ${e.code}`);
        }
    }
}

module.exports = UserRoleService;
