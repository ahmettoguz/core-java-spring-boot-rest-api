class AxiosService {
    private url: string | null | undefined;
    private method: string | null | undefined;
    private jwt: string | null | undefined;

    constructor(builder: AxiosServiceBuilder) {
        this.url = builder.url;
        this.method = builder.method;
        this.jwt = builder.jwt;
    }

    public displayInfo(): void {
        console.log(this);
    }
}

class AxiosServiceBuilder {
    public url: string | null | undefined;
    public method: string | null | undefined;
    public jwt: string | null | undefined;

    constructor() {
        // Default values
        // this.url = "";
        // this.method = "";
        // this.jwt = "";
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


// const axiosService = new AxiosServiceBuilder()
//     .setUrl("url")
//     .setJwt("jwt")
//     .setMethod("method")
//     .build();
//
// axiosService.displayInfo();