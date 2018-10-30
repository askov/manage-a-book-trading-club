import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

export default axios.create({
  baseURL: baseUrl,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   'X-Requested-With': 'XMLHttpRequest'
  // }
});
