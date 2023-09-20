import AuthAPI from '../api/authApi';
import store from '../utils/store';
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
      console.log('Error signIn', e);
    }
  }

  async signUp(data:any) {
    try {
      await this.api.signUp(data);
      await this.getUser();
      router.go('/messenger');
    } catch (e) {
      console.log('Error signUp', e);
    }
  }

  async getUser() {
    try {
      const user = await this.api.getUser();
      store.set('user', user);
      console.log('/*/*/*/*/*/', user);
      console.log('/----------/', store);
    //   return user;
    } catch (e) {
      console.log('Error getUser', e);
    }
  }

  async logOut() {
    try {
      await this.api.logOut();
      router.go('/');
    } catch (e) {
      console.log('Error logOut', e);
    }
  }
}

export default new AuthController();
