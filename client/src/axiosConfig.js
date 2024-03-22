import axios from 'axios';
import  {API_DJANGO}  from './api/config'

const instance = axios.create({
//  baseURL: 'http://127.0.0.1:8000/api/'
  baseURL: `${API_DJANGO}`
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;