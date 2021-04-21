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
  static async save(user) { // issue: I-12
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
    } catch (err) {
      throw new Error(`Falha ao salvar usuário: ${err}`);
    }

    return result;
  }

  /**
   * Obtem um usuário pelo email
   * @param {string} email
   * @return {User}
   */
  static async getUserByEmail(email) { // issue: I-12
    let result = null;

    try {
      const queryResult = await this.Model.findOne({email: email});

      if (queryResult==null) {
        return null;
      }

      result = new User(
          queryResult.email,
          queryResult.name,
          queryResult.password,
      );
      result.setId(queryResult._id);
    } catch (err) {
      throw new Error(`Falha ao obter usuário pelo email: ${err}`);
    }

    return result;
  }
}

UserRepository._mongooseInstance = null;
UserRepository.schema = null;
UserRepository.Model = null;

module.exports = UserRepository;
