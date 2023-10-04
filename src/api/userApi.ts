import HTTPTransport from '../utils/HTTPTransport';

class UserAPI {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport('user');
  }

  updateProfile(data:any): Promise<unknown> {
    return this.httpTransport.put('profile', { data });
  }

  updatePassword(data:any): Promise<unknown> {
    return this.httpTransport.put('password', { data });
  }

  updateAva(data:any): Promise<unknown> {
    return this.httpTransport.put('profile/avatar', {
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  searchUser(data:any): Promise<unknown> {
    return this.httpTransport.post('search', { data });
  }
}

export default new UserAPI();
