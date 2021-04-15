
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
    if (!userCreateCommand.isValid()) {
      console.log('Invalid');
      return null;
    }

    const existingUser = await UserRepository.getUserByName(
        userCreateCommand.name);

    if (existingUser != null) {
      return null;
    }

    const result = await UserRepository.save(
        new User(userCreateCommand.name, userCreateCommand.password));

    return result;
  }
}

module.exports = UserService;
