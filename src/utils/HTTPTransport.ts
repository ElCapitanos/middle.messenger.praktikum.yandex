import { Options } from '../helpers/constTypes';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

function queryStringify(data: Record<string, string | number>) {
  if (typeof data !== 'object') {
    throw new Error('data error');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  get = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: Options = {}, timeout: number = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('error');
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        method === METHODS.GET && !!data
          ? `${url}${queryStringify(data)}`
          : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
