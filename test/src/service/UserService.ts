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

    
    // static async readAll(jwt) {
    //     // prepare request
    //     const url = `${Constant.baseUrl}/api/${entityName}`;
    //     const method = "get";
    //
    //     const config = {
    //         method,
    //         url,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: jwt,
    //         },
    //     };
    //
    //     // make request
    //     const response = await axios.request(config);
    //
    //     // check response
    //     if (response.status !== 200) throw new Error("response is not 200");
    //     if (response.data === undefined)
    //         throw new Error("response data is undefined");
    //
    //     // return response data
    //     return response.data.data;
    // }

    static async readWithId(jwt, instanceId) {
        // prepare request
        const url = `${Constant.baseUrl}/api/${entityName}/${instanceId}`;
        const method = "get";

        // read instance
        let instanceToRead;
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setJwt(jwt)
                .build();
            const response = await axiosService.request();
            instanceToRead = response.data.data;
        } catch (e: any) {
            throw new Error(`Axios error with code: ${e.code}`);
        }

        return instanceToRead;
    }

}

module.exports = UserService;
