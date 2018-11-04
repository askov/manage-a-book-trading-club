import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error.response);
});

export default axiosInstance;
