import axios from 'axios';
import TokenService from './token.service';


const API = axios.create({
  baseURL: `http://localhost:4000/`,
});

API.interceptors.request.use(function(config) {
  const token = TokenService.getAuthToken();
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

export default API;
