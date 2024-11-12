import axios from "axios";

class AxiosService {
  private url?: string;
  private method?: string;
  private data?: object;
  private jwt?: string;
  private config?: object;

  constructor(builder: AxiosServiceBuilder) {
    this.url = builder.url;
    this.method = builder.method;
    this.data = builder.data;
    this.jwt = builder.jwt;
    this.configureRequest();
  }

  private configureRequest() {
    this.config = {
      url: this.url,
      method: this.method,
      data: this.data,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.jwt,
      },
    };
  }

  public displayProperties(): void {
    console.log("Axios Properties:");
    console.log(this.config);
  }

  public async request() {
    return await axios.request(this.config);
  }
}

class AxiosServiceBuilder {
  public url?: string;
  public method?: string;
  public data?: object;
  public jwt?: string;

  constructor() {}

  public setUrl(url: string): AxiosServiceBuilder {
    this.url = url;
    return this;
  }

  public setMethod(method: string): AxiosServiceBuilder {
    this.method = method;
    return this;
  }

  public setData(data: object): AxiosServiceBuilder {
    this.data = data;
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

export { AxiosService, AxiosServiceBuilder };
