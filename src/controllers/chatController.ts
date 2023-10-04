import ChatAPI from '../api/chatApi';
import { ChatCreateDataType } from '../helpers/constTypes';
import chatList from '../data/chats';
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
      await this.api.getChatList(data).then((result:any) => {
        if (chatList.length === 0) {
          JSON.parse(result.response).forEach((item:any) => {
            chatList.push(item);
          });
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

  async addUsersToChat() {
    try {
      await this.api.addUsersToChat();
    //   store.set("user", user);
    } catch (e) {
      console.log('Error addUsersToChat', e);
    }
  }

  async removeUsersFromChat() {
    try {
      await this.api.removeUsersFromChat();
    } catch (e) {
      console.log('Error removeUsersFromChat', e);
    }
  }
}

export default new ChatController();
