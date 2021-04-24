/**
 * Representa uma ocorrência de exceção de serviço
 */
class ServiceException extends Error {
  /**
   * Construtor para exceção de serviço
   * @param {string} message
   * @param {object} data
   */
  constructor(message, data) {
    super(message);
    this.data = data;
  }
}

module.exports = ServiceException;
