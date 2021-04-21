import API from './axiosBase';

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
}

