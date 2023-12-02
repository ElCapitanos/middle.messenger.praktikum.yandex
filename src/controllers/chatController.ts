import ChatAPI from '../api/chatApi';
import { ChatCreateDataType } from '../helpers/constTypes';
// import chatList from '../data/chats';
// import Router from '../utils/Router';
import store from '../utils/store';

// const router = new Router();
class ChatController {
  private api:any;

  constructor() {
    this.api = ChatAPI;
  }

  async getChatList(data:object) {
    try {
      await this.api.getChatList(data).then((result:any) => {
        const chatList:Array<any> = [];
        chatList.length = 0;
        if (Array.isArray(JSON.parse(result.response))) {
        JSON.parse(result.response).forEach((item:any) => {
          chatList.push(item);
        });
        store.set('chats', chatList);
      }
      });
    } catch (e) {
      console.log('Error getChatList', e);
    }
  }

  async createChat(data:ChatCreateDataType) {
    try {
      await this.api.createChat(data);
    } catch (e) {
      console.log('Error createChat', e);
    }
  }

  async addUsersToChat(data:object) {
    try {
      await this.api.addUsersToChat(data);
    } catch (e) {
      console.log('Error addUsersToChat', e);
    }
  }

  async removeUsersFromChat(data:object) {
    try {
      await this.api.removeUsersFromChat(data);
    } catch (e) {
      console.log('Error removeUsersFromChat', e);
    }
  }
}

export default new ChatController();
