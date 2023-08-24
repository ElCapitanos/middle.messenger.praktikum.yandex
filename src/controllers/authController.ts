import AuthAPI from '../api/authApi';
// import store from "../utils/Store";
import Router from '../utils/Router';

const router = new Router();
class AuthController {
  private api:any;

  constructor() {
    this.api = AuthAPI;
  }

  async signIn(data:object) {
    try {
      await this.api.signIn(data);
      router.go('/messenger');
    } catch (e) {
      console.log('Error signIn');
    }
  }

  async signUp(data:any) {
    try {
      await this.api.signUp(data);
      await this.getUser();
      router.go('/');
    } catch (e) {
      console.log('Error signUp');
    }
  }

  async getUser() {
    try {
      const user = await this.api.getUser();
      console.log('Записываем юзера в стор', user);
    //   store.set("user", user);
      return user;
    } catch (e) {
      console.log('Error getUser');
    }
  }

  async logOut() {
    try {
      await this.api.logOut();
      router.go('/');
    } catch (e) {
      console.log('Error logOut');
    }
  }
}

export default new AuthController();
