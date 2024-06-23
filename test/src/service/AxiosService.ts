const axios = require("axios");

class AxiosService {
    private url?: string;
    private method?: string;
    private jwt?: string;
    private config?: object;

    constructor(builder: AxiosServiceBuilder) {
        this.url = builder.url;
        this.method = builder.method;
        this.jwt = builder.jwt;
        this.configureRequest();
    }

    private configureRequest() {
        this.config = {
            method: this.method,
            url: this.url,
            headers: {
                "Content-Type": "application/json",
                Authorization: this.jwt,
            },
        };
    }

    public displayProperties(): void {
        console.log(this);
    }

    public async request() {
        return await axios.request(this.config);
    }
}

class AxiosServiceBuilder {
    public url?: string;
    public method?: string;
    public jwt?: string;

    constructor() {
    }

    public setUrl(url: string): AxiosServiceBuilder {
        this.url = url;
        return this;
    }

    public setMethod(method: string): AxiosServiceBuilder {
        this.method = method;
        return this;
    }

    public setJwt(jwt: string): AxiosServiceBuilder {
        this.jwt = jwt;
        return this;
    }

    public build(): AxiosService {
        return new AxiosService(this);
    }
}

module.exports = {AxiosService, AxiosServiceBuilder};

// example usage
// let response;
// try {
//   const axiosService = new AxiosServiceBuilder()
//     .setUrl(url)
//     .setJwt(jwt)
//     .setMethod(method)
//     .build();
//   response = await axiosService.request();
// } catch (e: any) {
//   throw new Error(`Axios error with code: ${e.code}`);
// }

// example usage
// try {
//     const axiosService = new AxiosServiceBuilder()
//         .setUrl(url)
//         .setJwt(jwt)
//         .setMethod(method)
//         .build();
//     await axiosService.request();
// } catch (e: any) {
//     throw new Error(`Axios error with code: ${e.code}`);
// }
