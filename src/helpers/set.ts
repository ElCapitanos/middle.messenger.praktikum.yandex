type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  } else {
    if (typeof object != 'object') {
      return object
    } else {
        const pathList:string[] = path.split('.');
        const key:string | any = pathList.pop();
        const pointer = pathList.reduce((accumulator:object | any, currentVal:string) => {
        if (!accumulator[currentVal]) { 
            accumulator[currentVal] = {}; 
        }
        return accumulator[currentVal];}, object);
        pointer[key] = value;
        return object;
        }
  }
}

export default set;
