
// eslint-disable-next-line no-unused-vars
const UserCreateCommand = require('../models/user.createCommand');
// eslint-disable-next-line no-unused-vars
const User = require('../entities/user');
const UserRepository = require('../repositories/userRepository');
const ValidationException = require('./validationException');
const ServiceException = require('./serviceException');
// eslint-disable-next-line no-unused-vars
const UserLoginCommand = require('../models/user.loginCommand');
const TokenService = require('./tokenService');
const AuthorizationException = require('./authorizationException');

/**
 * Service for operations with users;
 */
class UserService {
  /**
   * Creates a user based on a userCreateCommand
   * @param {UserCreateCommand} userCreateCommand
   * @return {User}
   */
  static async createUser(userCreateCommand) { // issue: I-12
    if (!userCreateCommand.isValid()) {
      throw new ValidationException();
    }

    const existingUser = await UserRepository.getUserByEmail(
        userCreateCommand.email);

    if (existingUser) {
      throw new ServiceException('Usuário com este email já cadastrado');
    }

    const result = await UserRepository.save(
        new User(
            userCreateCommand.email,
            userCreateCommand.name,
            userCreateCommand.password,
        ),
    );

    return result;
  }

  /**
   * Realiza login de usuário e retorna um token caso o login seja bem sucedido
   * @param {UserLoginCommand} loginUserCommand
   * @return {string} Token
   */
  static async loginUser(loginUserCommand) { // issue: I-16
    const existingUser = await UserRepository.getUserByEmail(
        loginUserCommand.email);

    if (existingUser && loginUserCommand.password === existingUser.password) {
      return TokenService.generateToken(existingUser.id, false);
    } else {
      throw new AuthorizationException(
          'Usuário ou senha incorretos', {email: loginUserCommand.email});
    }
  }

  /**
   * Realiza login de usuário admin
   * e retorna um token caso o login seja bem sucedido
   * @param {UserLoginCommand} loginUserCommand
   * @return {string} Token
   */
  static async loginAdmin(loginUserCommand) { // issue: I-32
    const existingUser = await UserRepository.getUserByEmail(
        loginUserCommand.email);

    if (existingUser && !existingUser.isAdmin) {
      throw new AuthorizationException(
          'Este usuário não é administrador', {email: loginUserCommand.email});
    }

    if (existingUser && loginUserCommand.password === existingUser.password) {
      return TokenService.generateToken(existingUser.id, true);
    } else {
      throw new AuthorizationException(
          'Email ou senha incorretos', {email: loginUserCommand.email});
    }
  }

  /**
   * Atualiza um usuário para administrador
   * @param {string} userId
   * @return {User}
   */
  static async upgrageToAdmin(userId) {
    // issue: I-30
    const user = await UserRepository.getUserById(userId);

    if (!user) {
      throw new ServiceException('Usuário não encontrado');
    }

    user.isAdmin = true;
    console.log(user.id);

    return await UserRepository.update(user);
  }

  /**
   * Obtem um usuário pelo Id
   * @param {string} id
   */
  static async getUserById(id) {
    const existingUser = await UserRepository.getUserById(id);

    if (!existingUser) {
      throw new ServiceException('Usuário não encontrado', {id: id});
    }

    return existingUser;
  }

  /**
   * Lista os usuários
   * @param {number} offset
   * @param {number} limit
   * @return {User[]}
   */
  static async listUsers(offset, limit) {
    if (limit < 0 || offset < 0) {
      return [];
    }

    return await UserRepository.getUsersByQuery({}, offset, limit);
  }
}

module.exports = UserService;
