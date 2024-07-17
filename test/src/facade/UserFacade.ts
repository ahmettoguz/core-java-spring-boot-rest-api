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

    static async readPagedSorted(jwt) {
        // create instances
        const createInstanceCount = 15;
        await Service.createMany(createInstanceCount);

        // read first page
        const firstPageData = {
            pageNumber: 0,
            pageSize: 5,
            isDescending: true,
        };
        const firstPage = await Service.readPagedSorted(jwt, firstPageData);

        // read second page
        const secondPageData = {
            pageNumber: 1,
            pageSize: 5,
            isDescending: true
        };
        const secondPage = await Service.readPagedSorted(jwt, secondPageData);

        // read third page
        const thirdPageData = {
            pageNumber: 0,
            pageSize: 3,
            isDescending: false,
        };
        const thirdPage = await Service.readPagedSorted(jwt, thirdPageData);


        // first page validations
        // check page size
        if (firstPage.length !== firstPageData.pageSize) throw new Error("page size invalid");

        // check sorting
        let lastId = firstPage[0];
        for (let i = 0; i < firstPageData.pageSize; i++) {
            const tempInstance = firstPage[i];
            const currentId = tempInstance.id;

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
            const tempInstance = thirdPage[i];
            const currentId = tempInstance.id;

            if (currentId < lastId) throw new Error("ascending sort invalid");

            lastId = currentId;
        }
    }
    
    static async count(jwt) {
        // create instances
        const createInstanceCount = 2;
        await Service.createMany(createInstanceCount);

        // read instance count
        const readInstanceCount = await Service.count(jwt);

        // check count
        if (readInstanceCount < createInstanceCount) throw new Error("count invalid");
    }
    
    static async searchByExactName(jwt) {
        // create instances
        const instanceDatas = [
            {
                firstName: `specific`,
                email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                isActive: true,
            },
            {
                firstName: `specificName`,
                email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                isActive: true,
            }, {
                firstName: `specificName`,
                email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                isActive: true,
            },
        ];
        await Service.createMany(instanceDatas.length, instanceDatas);


        // search instance with exact name
        const foundInstancesWrong = await Service.searchByExactName(jwt, "sp");
        const foundInstancesTrue = await Service.searchByExactName(jwt, "specificName");


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
                email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                isActive: true,
            },
            {
                firstName: `partial`,
                email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                isActive: true,
            }, {
                firstName: `${Constant.preKey}_partialNameToSearch`,
                email: `${Constant.preKey}${CommonUtil.generateRandomWord()}@hotmail.com`,
                password: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
                isActive: true,
            },
        ];
        await Service.createMany(instanceDatas.length, instanceDatas);

        // search for instance
        const foundInstances = await Service.searchByPartialName(jwt, "part");

        // check found instances it should found and give it as paged
        if (foundInstances.length < instanceDatas.length) throw new Error("count of the found instances is invalid");
    }
}

module.exports = UserFacade;