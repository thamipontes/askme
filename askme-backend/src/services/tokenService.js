const jwt = require('jsonwebtoken');
const AuthorizationException = require('./authorizationException');

const jwtSecret = 's3cr3t_';

/**
 * Serviço para gerar e verificar tokens JWT
 */
class TokenService {
  /**
   * Gera um token para administrador ou usuário comum
   * @param {string} userId User Id
   * @param {boolean} isAdmin
   * @return {string} token
   */
  static generateToken(userId, isAdmin = false) {
    return jwt.sign({
      role: isAdmin? 'admin' : 'common',
      userId: userId,
    }, jwtSecret);
  }

  /**
   * Valida e decodifica um token
   * @param {string} token
   * @return {object} Token decodificado
   */
  static decodeToken(token) {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (err) {
      throw new AuthorizationException('Token inválido', null);
    }
  }
}

module.exports = TokenService;
