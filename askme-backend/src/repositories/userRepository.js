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
   * Atualiza um usuário no banco e retorna
   * uma instância de User como o resultado
   * @param {User} user
   * @return {User}
   */
  static async update(user) { // issue: I-30
    let result = null;
    try {
      console.log(user.id);
      const originalUser = await this.Model.findById(user.id);

      console.log(originalUser);

      Object.assign(originalUser, user.toObject());

      const userSaved = await originalUser.save();

      result = new User(
          userSaved.email,
          userSaved.name,
          userSaved.password,
      );

      result.isAdmin = userSaved.isAdmin;
      result.setId(userSaved._id);
    } catch (err) {
      throw new Error(`Falha ao atualizar usuário: ${err}`);
    }

    return result;
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
      result.isAdmin = userSaved.isAdmin;
      result.setId(userSaved._id);
    } catch (err) {
      throw new Error(`Falha ao salvar usuário: ${err}`);
    }

    return result;
  }

  /**
   * Obtem um usuário por meio de uma query
   * @param {object} query
   */
  static async getOneUserWithQuery(query) {
    let result = null;

    try {
      const queryResult = await this.Model.findOne(query);

      if (queryResult==null) {
        return null;
      }

      result = new User(
          queryResult.email,
          queryResult.name,
          queryResult.password,
      );
      result.isAdmin = queryResult.isAdmin? true : false;
      result.setId(queryResult._id);
    } catch (err) {
      throw new Error(`Falha ao obter usuário por query: ${err}`);
    }

    return result;
  }

  /**
   * Obtem um usuário pelo email
   * @param {string} email
   * @return {User}
   */
  static async getUserByEmail(email) { // issue: I-12
    return this.getOneUserWithQuery({email: email});
  }

  /**
   * Obtem um usuário pelo id
   * @param {string} id
   * @return {User}
   */
  static async getUserById(id) {
    return await this.getOneUserWithQuery({_id: id});
  }
}

UserRepository._mongooseInstance = null;
UserRepository.schema = null;
UserRepository.Model = null;

module.exports = UserRepository;
