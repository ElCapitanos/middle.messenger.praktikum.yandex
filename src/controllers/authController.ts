import AuthAPI from '../api/authApi';
import Router from '../utils/Router';
import store from '../utils/store';

const router = new Router();
class AuthController {
  private api:any;

  constructor() {
    this.api = AuthAPI;
  }

  async signIn(data:object) {
    try {
      await this.api.signIn(data).then((result:any) => {
        result.response === 'OK' ? router.go('/messenger') : alert('Что-то пошло не так' + result.response);
      });
    } catch (e) {
      console.log('Error signIn', e);
    }
  }

  async signUp(data:any) {
    try {
      await this.api.signUp(data).then((result:any) => {
        result.response.includes("id") ? router.go('/messenger') : alert('Что-то пошло не так' + result.response);
      });
    } catch (e) {
      console.log('Error signUp', e);
    }
  }

  async getUser() {
    try {
      await this.api.getUser().then((result:any) => {
        store.set('currentUser', JSON.parse(result.response));
        // console.log(JSON.parse(result.response));
      });
    } catch (e) {
      console.log('Error getUser', e);
    }
  }

  async logOut() {
    try {
      this.api.logOut().then((result:any) => {
        result.response === 'OK' ? router.go('/') : alert('Что-то пошло не так');
      });
    } catch (e) {
      console.log('Error logOut', e);
    }
  }
}

export default new AuthController();
