/**
 * Comando para fazer login de usuário
 */
class UserLoginCommand { // issue: I-16
  /**
   * Constructor for user command
   * @param {string} email
   * @param {string} password
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

module.exports = UserLoginCommand;
