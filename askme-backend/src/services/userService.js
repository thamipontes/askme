
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
  static async loginUser(loginUserCommand) {
    const existingUser = await UserRepository.getUserByEmail(
        loginUserCommand.email);

    if (existingUser && loginUserCommand.password === existingUser.password) {
      return TokenService.generateToken(existingUser.id, false);
    } else {
      throw new AuthorizationException(
          'Usuário ou senha incorretos', {email: loginUserCommand.email});
    }
  }
}

module.exports = UserService;
