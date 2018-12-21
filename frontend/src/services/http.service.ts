import axios from 'axios';
import lsService from '@/services/localstorage.service';

const baseURL = 'http://127.0.0.1:8000';
const AUTH_TYPE = 'Bearer';

const axiosInstance = axios.create({
  baseURL,
});

const setAuthorizationHeaders = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `${AUTH_TYPE} ${token}`;
};

const clearAuthorizationHeaders = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

// TODO
const savedToken = lsService.getUserToken();

if (savedToken) {
  setAuthorizationHeaders(savedToken);
}

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (err) => {
  if (err.response.status === 401) {
    lsService.removeUserToken();
    clearAuthorizationHeaders();
  }
  return Promise.reject(err.response.data);
});

export default {
  http: axiosInstance,
  setAuthorizationHeaders,
  clearAuthorizationHeaders,
};
