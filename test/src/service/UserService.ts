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
            throw new Error(`${this.name}.create:: Axios error with code: ${e.code}`);
        }

        // set password
        instanceToCreate.password = data.password;

        return instanceToCreate;
    }

    static async createMany(createInstanceCount = 2, instanceDatas = []) {
        const createdInstanceIds: number[] = [];

        if (instanceDatas.length === 0) {
            for (let i = 0; i < createInstanceCount; i++) {

                const data = {
                    firstName: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                    email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                    password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                    isActive: true,
                };
                instanceDatas.push(data);
            }
        }

        // create instances
        for (let i = 0; i < createInstanceCount; i++) {
            const instanceToCreate = await this.create(instanceDatas[i]);

            // save ids
            createdInstanceIds.push(instanceToCreate.id);
        }

        return createdInstanceIds;
    }

    static async readAll(jwt) {
        // prepare request
        const url = `${Constant.baseUrl}/api/${entityName}`;
        const method = "get";

        // read all instances
        let instancesToRead;
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setJwt(jwt)
                .build();
            const response = await axiosService.request();
            instancesToRead = response.data.data;
        } catch (e: any) {
            throw new Error(`${this.name}.readAll:: Axios error with code: ${e.code}`);
        }

        return instancesToRead;
    }

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
            throw new Error(`${this.name}.readWithId:: Axios error with code: ${e.code}`);
        }

        return instanceToRead;
    }

    static async readPagedSorted(jwt, data) {
        // prepare request
        const url = `${Constant.baseUrl}/api/${entityName}/paged`;
        const method = "get";
        data = data ?? JSON.stringify({
            pageNumber: 1,
            pageSize: 5,
            isDescending: true,
        });

        // read paged and sorted
        let pagedInstances;
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setData(data)
                .setJwt(jwt)
                .build();
            const response = await axiosService.request();
            pagedInstances = response.data.data;
        } catch (e: any) {
            throw new Error(`${this.name}.readPagedSorted:: Axios error with code: ${e.code}`);
        }

        return pagedInstances;
    }
    
    static async count(jwt) {
        // prepare request
        const url = `${Constant.baseUrl}/api/${entityName}/count`;
        const method = "get";

        // read paged and sorted
        let count;
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setJwt(jwt)
                .build();
            const response = await axiosService.request();
            count = response.data.data;
        } catch (e: any) {
            throw new Error(`${this.name}.count:: Axios error with code: ${e.code}`);
        }

        return count;
    }
    
    static async searchByExactName(jwt, searchString) {
        // prepare request
        const url = `${Constant.baseUrl}/api/${entityName}/search/exact`;
        const method = "get";
        const data = {
            pageNumber: 0,
            pageSize: 5,
            isDescending: true,
            firstName: searchString,
        };

        // read paged and sorted
        let readInstances;
        try {
            const axiosService = new AxiosServiceBuilder()
                .setUrl(url)
                .setMethod(method)
                .setData(data)
                .setJwt(jwt)
                .build();
            const response = await axiosService.request();
            readInstances = response.data.data;
        } catch (e: any) {
            throw new Error(`${this.name}.searchByExactName:: Axios error with code: ${e.code}`);
        }

        return readInstances;
    }
}

module.exports = UserService;
