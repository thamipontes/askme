import API from './axiosBase';
import TokenService from './token.service';

const apiRoute = '/api/users';
/**
 * Serviço para requisições na API de usuários
 */
export default class UserService {
  /**
   * Realiza requisição para registrar um usuário
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  static async createUser(email, name, password, passwordConfirmation) {
    await API.post(`${apiRoute}`, {
      email: email,
      name: name,
      password: password,
      passwordConfirmation: passwordConfirmation,
    }).then(
        (res) => {
          return res;
        },
    );
  }

  /**
   * Envia uma requisição de login
   * @param {string} email
   * @param {string} password
   */
  static async login(email, password) {
    await API.post(`${apiRoute}/login`, {
      email: email,
      password: password,
    }).then(
        (res) => {
          const token = res.data.data.token;
          TokenService.setAuthToken(token);
          return res;
        },
    );
  }
}

