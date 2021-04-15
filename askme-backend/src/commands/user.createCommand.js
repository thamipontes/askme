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
    if (!this.name || !this.password || !this.passwordConfirmation) {
      console.log('null');
      console.log(this.name);
      console.log(this.password);
      console.log(this.passwordConfirmation);
      return false;
    }

    if (this.name.length > User.nameMaxLength ||
      this.name.length < User.nameMinLength) {
      console.log('name');
      return false;
    }

    if (this.password.length > User.passwordMaxLength ||
        this.password.length < User.passwordMinLength) {
      console.log('name');console.log('pswd');
      return false;
    }

    return true;
  }
}

module.exports = UserCreateCommand;
