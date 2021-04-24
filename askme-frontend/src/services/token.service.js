/**
 * Serviço para armazenamento de tokens
 */
export default class TokenService {
  /**
   * Salva um token de autenticação no localStorage do browser
   * @param {string} token
   */
  static setAuthToken(token) {
    localStorage.setItem('askmeAuth', token);
  }

  /**
   * Lê um token de autenticação no localStorage do browser
   * @return {string} Token
   */
  static getAuthToken() {
    return localStorage.getItem('askmeAuth');
  }
}

