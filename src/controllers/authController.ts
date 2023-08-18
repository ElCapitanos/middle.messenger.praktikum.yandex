import AuthAPI from '../api/authApi';
// import store from "../utils/Store";
import Router from "../utils/Router";

const router = new Router;
export class AuthController {
  private api:any;

  constructor() {
    this.api = AuthAPI;
  }

  async signIn(data:object) {
    try {
      await this.api.signIn(data);
      router.go("/settings");
    } catch (e) {
      console.log('Error signIn');
    }
  }

  async signUp(data:any) {
    try {
      await this.api.signUp(data);
      await this.fetchUser();
      router.go("/settings");
    } catch (e) {
        console.log('Error signUp');
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.getUser();
      console.log('Записываем юзера в стор', user);
    //   store.set("user", user);
      return user;
    } catch (e) {
        console.log('Error fetchUser');
    }
  }

  async logOut() {
    try {
      await this.api.logOut();

      router.go("/500");
    } catch (e) {
        console.log('Error logOut');
    }
  }
}

export default new AuthController();
