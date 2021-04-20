const User = require('../entities/user');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

/**
 * Implementa padrão de repositórios para a entidade usuário
 */
class UserRepository {
  /**
   * Getter para a instância de mongoose
   */
  static get mongoose() {
    if (this._mongooseInstance==null) {
      throw new Error('UserRepository not inited');
    }

    return this._mongooseInstance;
  }

  /**
   * Gera schema e model do mongoose para a entidade User
   * @param {mongoose.Mongoose} mongooseInstance
   */
  static init(mongooseInstance) {
    this._mongooseInstance = mongooseInstance;
    this.schema = new mongooseInstance.Schema(User.getSchema());
    this.Model = this.mongoose.model('User', this.schema);
  }

  /**
   * Salva um usuário no banco e retorna uma instância de User como o resultado
   * @param {User} user
   * @return {User}
   */
  static async save(user) {
    const userInstance = new this.Model(user.toObject());

    let result = null;
    try {
      const userSaved = await userInstance.save();

      result = new User(
          userSaved.email,
          userSaved.name,
          userSaved.password,
      );
      result.setId(userSaved._id);
    } catch {
      throw new Error('Falha ao salvar usuário');
    }

    return result;
  }

  /**
   * Obtem um usuário pelo nome
   * @param {string} name
   * @return {User}
   */
  static async getUserByName(name) {
    let result = null;

    try {
      result = await this.Model.findOne({name: name});
    } catch {
      throw new Error('Falha ao obter usuário por nome');
    }

    return result;
  }

  /**
   * Obtem um usuário pelo email
   * @param {string} email
   * @return {User}
   */
  static async getUserByEmail(email) {
    let result = null;

    try {
      result = await this.Model.findOne({email: email});
    } catch {
      throw new Error('Falha ao obter usuário pelo email');
    }

    return result;
  }
}

UserRepository._mongooseInstance = null;
UserRepository.schema = null;
UserRepository.Model = null;

module.exports = UserRepository;
