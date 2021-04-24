/**
 * Representa uma ocorrência de exceção de autorização
 */
class AuthorizationException extends Error {
  /**
   * Construtor para exceção de autorização
   * @param {string} message
   * @param {object} data
   */
  constructor(message = 'Unauthorized', data = null) {
    super(message);
    this.data = data;
  }
}

module.exports = AuthorizationException;
