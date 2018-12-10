import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

const AUTH_TYPE = 'Bearer';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const setAuthorizationHeaders = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `${AUTH_TYPE} ${token}`;
};

// TODO
const savedToken = localStorage.getItem('token');

if (savedToken) {
  setAuthorizationHeaders(savedToken);
}

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (err) => {
  return Promise.reject(err.response.data);
});

export default {
  http: axiosInstance,
  setAuthorizationHeaders,
};
