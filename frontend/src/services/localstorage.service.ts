const TOKEN_STORAGE_KEY = 'token';

export default {

  getUserToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  setUserToken(token: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  removeUserToken() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

};
