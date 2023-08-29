import HTTPTransport from '../utils/HTTPTransport';

class ChatAPI {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport('chats');
  }

  getChatList(data:any): Promise<unknown> {
    return this.httpTransport.get('', { data });
  }

  createChat(title:string): Promise<unknown> {
    return this.httpTransport.post('', { data: { title } });
  }

  addUsersToChat(data: { users: number[]; chatId: number }): Promise<unknown> {
    return this.httpTransport.put('users', { data });
  }

  removeUsersFromChat(data: { users: number[]; chatId: number }): Promise<unknown> {
    return this.httpTransport.delete('users', { data });
  }
}

export default new ChatAPI();
