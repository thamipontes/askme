import axios from 'axios';
import TokenService from './token.service';

const API = axios.create({
  baseURL: `http://localhost:4000/`,
});

/**
 * Atualiza o token utilizado nas requisições
 */
export function refreshToken() {
  API.defaults.headers.common['Authorization'] = TokenService.getAuthToken();
}

export default API;
