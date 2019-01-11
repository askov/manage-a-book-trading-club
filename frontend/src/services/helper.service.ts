import { snakeCase } from 'lodash';

export default {
  convertObjectToSnakeCase(obj: any): object {
    const keys = Object.keys(obj);
    const tmp: { [propName: string]: string | number } = {};
    keys.forEach((key) => {
      tmp[snakeCase(key)] = obj[key];
    });
    return tmp;
  },
};
