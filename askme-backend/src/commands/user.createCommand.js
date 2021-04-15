const User = require('../entities/user');

/**
 * Command for creating a user. Should be passed as argument to UserService.
 */
class UserCreateCommand {
  /**
   * Constructor for user command
   * @param {string} name
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  constructor(name, password, passwordConfirmation) {
    this.name = name;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
  }

  /**
   * Validates the userCommand's properties and returns the result
   * @return {boolean} True if user is valid
   */
  isValid() {
    if (this.name.length > User.nameMaxLength ||
      this.name.length < User.nameMinLength) {
      return false;
    }

    if (this.password.length > User.passwordMaxLength ||
        this.password.length < User.passwordMinLength) {
      return false;
    }

    if (this.passwordConfirmation.length > User.passwordMaxLength ||
      this.passwordConfirmation.length < User.passwordMinLength) {
      return false;
    }


    return true;
  }
}

module.exports = UserCreateCommand;
