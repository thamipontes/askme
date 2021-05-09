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

  /**
   * Lê o header authorization
   * @param {Express.Request} req
   * @return {string} Token
   */
  static getRequiredTokenFromRequest(req) {
    if (req.headers.authorization) {
      return req.headers.authorization.replace('Bearer', '').trim();
    } else {
      throw new AuthorizationException('Token de autorização não encontrado');
    }
  }

  /**
   * Retorna o campo role do token
   * @param {string} token
   * @return {string} Role
   */
  static getRoleFromToken(token) {
    return this.decodeToken(token).role;
  }

  /**
   * Retorna o campo userId do token
   * @param {string} token
   * @return {string} UserId
   */
  static getUserIdFromToken(token) {
    return this.decodeToken(token).userId;
  }

  /**
   * Lança uma exceção caso o token não seja de administrador
   * @param {string} token
   * @return {void}
   */
  static requireTokenToBeAdmin(token) {
    if (this.getRoleFromToken(token) === 'admin') {
      return;
    }

    throw new AuthorizationException('Autorização insuficiente');
  }
}

module.exports = TokenService;
