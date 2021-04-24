
// eslint-disable-next-line no-unused-vars
const UserCreateCommand = require('../models/user.createCommand');
// eslint-disable-next-line no-unused-vars
const User = require('../entities/user');
const UserRepository = require('../repositories/userRepository');
const ValidationException = require('./validationException');
const ServiceException = require('./serviceException');

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

    if (existingUser != null) {
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
}

module.exports = UserService;
