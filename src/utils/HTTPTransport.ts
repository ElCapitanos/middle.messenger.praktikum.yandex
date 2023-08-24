import { Options, HTTPMethod } from '../helpers/constTypes';
import queryString from './queryString';
import API_URL from '../helpers/constAPI';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
class HTTPTransport {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get: HTTPMethod = (url, options = {}) => (
    this.request(
      this.getUrl(url),
      {
        ...options,
        method: METHODS.GET
      },
      options.timeout
    )
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(
      this.getUrl(url),
      {
        ...options,
        method: METHODS.POST
      },
      options.timeout
    )
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(
      this.getUrl(url),
      {
        ...options,
        method: METHODS.PUT,
      },
      options.timeout,
    )
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(
      this.getUrl(url),
      {
        ...options,
        method: METHODS.DELETE
      },
      options.timeout
    )
  );

  request = (
    url: string,
    options: Options,
    timeout = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
    //   xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryString(data)}`
          : url
      );
      Object.keys(headers).length ? Object.keys(headers).forEach((key) => {xhr.setRequestHeader(key, headers[key])}) : xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };

  private getUrl(url: string): string {
    if (!url) return `${API_URL}/${this.endpoint}`;
    return `${API_URL}/${this.endpoint}/${url}`;
  }
}

export default HTTPTransport;
