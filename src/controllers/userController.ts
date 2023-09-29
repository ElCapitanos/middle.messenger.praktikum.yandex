import UserAPI from '../api/userApi';
import Router from '../utils/Router';

const router = new Router();
class UserController {
  private api:any;

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
    //   alert('Пароль обновлён');
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

  async updateAva(data:any) {
    try {
      await this.api.updateAva(data).then((result:any) => {
        console.log(result.response);
      });
    //   alert('Аватар обновлён');
    } catch (e) {
      console.log('Error updateAva');
    }
  }
}

export default new UserController();
