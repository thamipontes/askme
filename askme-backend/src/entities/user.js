/**
 * Representa um usuário no sistema
 */
class User { // issue: I-12
  /**
   * Retorna um objeto indicando os tipos de
   * cada campo de usuário para uso na persistência
   * @return {object}
   */
  static getSchema() {
    return {
      email: String,
      name: String,
      password: String,
      isAdmin: Boolean,
    };
  }

  /**
   * Construtor para usuário
   * @param {string} email
   * @param {string} name
   * @param {string} password
   */
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.isAdmin = false;
  }

  /**
   * Setter para Id
   * @param {string} id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Converte as propriedades de usuário para um objeto
   * @return {Object}
   */
  toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
      isAdmin: this.isAdmin,
    };
  }

  /**
   * Valida as propriedades do usuário e retorna um booleano
   * @return {boolean}
   */
  isValid() {
    if (!this.name || !this.password ||
      !this.email) {
      return false;
    }

    if (this.name.length > User.nameMaxLength ||
      this.name.length < User.nameMinLength) {
      return false;
    }

    if (this.password.length > User.passwordMaxLength ||
      this.password.length < User.passwordMinLength) {
      return false;
    }

    return true;
  }
}

User.nameMinLength = 3;
User.nameMaxLength = 20;
User.passwordMinLength = 8;
User.passwordMaxLength = 20;

module.exports = User;
