import HTTPTransport from '../utils/HTTPTransport';
import { ChatCreateDataType } from '../helpers/constTypes';

class ChatAPI {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport('chats');
  }

  getChatList(data:any): Promise<unknown> {
    return this.httpTransport.get('', { data });
  }

  createChat(data:ChatCreateDataType): Promise<unknown> {
    return this.httpTransport.post('', { data });
  }

  addUsersToChat(data: { users: number[]; chatId: number }): Promise<unknown> {
    return this.httpTransport.put('users', { data });
  }

  removeUsersFromChat(data: { users: number[]; chatId: number }): Promise<unknown> {
    return this.httpTransport.delete('users', { data });
  }
}

export default new ChatAPI();
