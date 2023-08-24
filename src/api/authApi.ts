import HTTPTransport from "../utils/HTTPTransport";

export class AuthAPI {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport("auth");
  }

  signUp(data:any): Promise<{ id: number }> {
    return this.httpTransport.post("signup", { data });
  }

  signIn(data:any): Promise<void> {
    return this.httpTransport.post("signin", { data });
  }

  getUser(): Promise<unknown> {
    return this.httpTransport.get("user", {});
  }

  logOut(): Promise<void> {
    return this.httpTransport.post("logout", {});
  }
}

export default new AuthAPI();
