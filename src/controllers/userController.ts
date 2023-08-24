import UserAPI from '../api/userApi';
// import store from "../utils/Store";
// import Router from '../utils/Router';

// const router = new Router();
class UserController {
  private api:any;

  constructor() {
    this.api = UserAPI;
  }

  async updatePassword(data:object) {
    try {
      await this.api.updatePassword(data);
      alert('Пароль обновлён');
    } catch (e) {
      console.log('Error updatePassword');
    }
  }

  async updateProfile(data:any) {
    try {
      await this.api.updateProfile(data);
      alert('Профиль обновлён');
    } catch (e) {
      console.log('Error updateProfile');
    }
  }

  async updateAva(data:any) {
    try {
      await this.api.updateAva(data);
      alert('Аватар обновлён');
    } catch (e) {
      console.log('Error updateAva');
    }
  }
}

export default new UserController();
