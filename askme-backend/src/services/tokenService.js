const jwt = require('jsonwebtoken');

const jwtSecret = 's3cr3t_';

/**
 * Serviço para gerar e verificar tokens JWT
 */
class TokenService {
  /**
   * Gera um token para administrador ou usuário comum
   * @param {boolean} isAdmin
   * @return {string} token
   */
  static generateToken(isAdmin = false) {
    return jwt.sign({
      role: isAdmin? 'admin' : 'common',
    }, jwtSecret);
  }

  /**
   * Valida e decodifica um token
   * @param {string} token
   * @return {object} Token decodificado
   */
  static decodeToken(token) {
    return jwt.verify(token, jwtSecret);
  }
}

module.exports = TokenService;
