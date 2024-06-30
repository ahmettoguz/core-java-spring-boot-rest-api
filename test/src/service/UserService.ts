const {AxiosServiceBuilder} = require("../service/tool/AxiosService.ts");

const Constant = require("../constant/Constant.ts");
const CommonUtil = require("../util/CommonUtil.ts");
const axios = require("axios");

const entityName = "users";

class UserService {
    static async create(data?) {
        // prepare request
        const url = `${Constant.baseUrl}/api/${entityName}`;
        const method = "post";
        data = data ?? {
            firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
            email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
            password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
            isActive: true,
        };

        // create instance
        let instanceToCreate;
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setData(data)
                .build();
            const response = await axiosService.request();
            instanceToCreate = response.data.data;
        } catch (e: any) {
            throw new Error(`Axios error with code: ${e.code}`);
        }

        // set password
        instanceToCreate.password = data.password;

        return instanceToCreate;
    }

}

module.exports = UserService;
