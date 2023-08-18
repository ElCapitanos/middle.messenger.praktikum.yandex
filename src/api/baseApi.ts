import Router from '../utils/Router';

const router = new Router;

export default class BaseAPI {
  create() { throw new Error('Not implemented "create"'); }
  request() { throw new Error('Not implemented "request"'); }
  update() { throw new Error('Not implemented "update"'); }
  delete() { throw new Error('Not implemented "delete"'); }

  routeForResponse(response:any):any | void {
    if (response.status === 200 || response.status === 400) {
      router.go('/messenger');
      return response;
    }
    if (response.status === 401) {
      router.go('/');
    }
    if (response.status === 404) {
      router.go('/404');
    } 
    if (response.status >= 500) {
      router.go('/500');
    }
  }
}
