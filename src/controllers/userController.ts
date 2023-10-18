import UserAPI from '../api/userApi';
import Router from '../utils/Router';
import userList from '../data/userList';
import { URL_FOR_AVA } from '../helpers/constAPI';

const router = new Router();
class UserController {
  private api:any;
  public avaSrc:string = '';

  constructor() {
    this.api = UserAPI;
  }

  async updatePassword(data:object) {
    try {
      await this.api.updatePassword(data).then((result:any) => {
        if (result.response === 'OK') {
          router.go('/messenger');
          alert('Пароль успешно изменен');
        } else { alert('Что-то пошло не так'); }
      });
    } catch (e) {
      console.log('Error updatePassword ', e);
    }
  }

  async updateProfile(data:object) {
    try {
      await this.api.updateProfile(data);
      router.go('/messenger');
      alert('Данные пользователя успешно изменены');
    } catch (e) {
      console.log('Error updateProfile', e);
    }
  }

  async searchUser(data:object) {
    try {
      await this.api.searchUser(data).then((result:any) => {
        userList.length = 0;
        JSON.parse(result.response).forEach((item:any) => {
          userList.push(item);
        });
      });
    } catch (e) {
      console.log('Error updateProfile', e);
    }
  }

  async updateAva(data:any) {
    try {
      await this.api.updateAva(data).then((result:any) => {
        this.avaSrc = URL_FOR_AVA + JSON.parse(result.response).avatar;
      });
    } catch (e) {
      console.log('Error updateAva');
    }
  }
}

export default new UserController();
