const TOKEN_STORAGE_KEY = 'token';
const LAST_SEARCH_RESULTS = 'last-search-results';

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

  setLastSearchResults(books: any[], searchTerm: string) {
    localStorage.setItem(
      LAST_SEARCH_RESULTS,
      JSON.stringify({
        books,
        searchTerm,
      })
    );
  },

  getLastSearchResults() {
    const b = localStorage.getItem(LAST_SEARCH_RESULTS);
    return b ? JSON.parse(b) : { books: [], searchTerm: '' };
  },

  removeLastSearchResults() {
    localStorage.removeItem(LAST_SEARCH_RESULTS);
  },
};
