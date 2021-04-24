import axios from 'axios';
import TokenService from './token.service';

axios.interceptors.request.use(function(config) {
  const token = TokenService.getAuthToken();
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

const API = axios.create({
  baseURL: `http://localhost:4000/`,
});

export default API;
