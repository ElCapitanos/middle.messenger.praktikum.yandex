import ChatAPI from '../api/chatApi';
// import store from "../utils/Store";
// import Router from '../utils/Router';

// const router = new Router();
class ChatController {
  private api:any;

  constructor() {
    this.api = ChatAPI;
  }

  async getChatList(data:object) {
    try {
      await this.api.getChatList(data);
    } catch (e) {
      console.log('Error getChatList');
    }
  }

  async createChat(data:any) {
    try {
      await this.api.createChat(data);
    } catch (e) {
      console.log('Error createChat');
    }
  }

  async addUsersToChat() {
    try {
      await this.api.addUsersToChat();
    //   store.set("user", user);
    } catch (e) {
      console.log('Error addUsersToChat');
    }
  }

  async removeUsersFromChat() {
    try {
      await this.api.removeUsersFromChat();
    } catch (e) {
      console.log('Error removeUsersFromChat');
    }
  }
}

export default new ChatController();
