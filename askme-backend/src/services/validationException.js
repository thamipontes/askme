/**
 * Representa uma ocorrência de exceção de validação
 */
class ValidationException extends Error {
  /**
   * Construtor para exceção de validação
   * @param {string} message
   */
  constructor(message = '') {
    super(message);
  }
}

module.exports = ValidationException;
