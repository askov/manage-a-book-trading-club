import { snakeCase } from 'lodash';

export default {
  convertObjectToSnakeCase(obj: { [propName: string]: string | number }): object {
    const keys = Object.keys(obj);
    let tmp: { [propName: string]: string | number } = {};
    keys.forEach((key) => {
      tmp[snakeCase(key)] = obj[key];
    });
    return tmp;
  }
}