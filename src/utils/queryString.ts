type StringIndexed = Record<string, any>;

function queryString(data: StringIndexed): string | never {
    if (typeof data === 'object') {
      const getQueryArray = (data:StringIndexed, path:Array<unknown> = [], result:Array<unknown> = []) =>
        Object.entries(data).reduce((acc, [k, v ]) => {
        path.push(k);
        if (typeof v === 'object') {
            getQueryArray(v, path, acc);
        } else {
            acc.push(`${path.map((n, i) => i ? `[${n}]` : n).join('')}=${v}`);
          }
         path.pop();
         return acc;
      }, result);
      return getQueryArray(data).join('&');
    } else {
      throw new Error('input must be an object')
    }
}

export default queryString
