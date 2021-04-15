
// eslint-disable-next-line no-unused-vars
const UserCreateCommand = require('../commands/user.createCommand');
// eslint-disable-next-line no-unused-vars
const User = require('../entities/user');
const UserRepository = require('../repositories/userRepository');

/**
 * Service for operations with users;
 */
class UserService {
  /**
   * Creates a user based on a userCreateCommand
   * @param {UserCreateCommand} userCreateCommand
   * @return {User}
   */
  static async createUser(userCreateCommand) {
    if (!userCreateCommand.isValid() ||
      userCreateCommand.passwordConfirmation != userCreateCommand.password) {
      return null;
    }

    const existingUser = await UserRepository.getUserByName(user.name);

    if (existingUser != null) {
      return null;
    }

    const result = await UserRepository.save(user);

    return result;
  }
}

module.exports = UserService;
