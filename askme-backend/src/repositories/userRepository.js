const User = require('../entities/user');
const mongoose = require('mongoose');

class UserRepository {
    static _mongooseInstance = null;
    static get mongoose() {
        if(this._mongooseInstance==null) {
            throw new Error("UserRepository not inited");
        }

        return this._mongooseInstance;
    }

    static schema = null;
    static model = null;

    /**
     * Gera schema e model do mongoose para a entidade User
     * @param {mongoose.Mongoose} mongooseInstance
     */
    static init(mongooseInstance) {
        this._mongooseInstance = mongooseInstance;
        this.schema = new mongooseInstance.Schema(User.getSchema());
        this.model = this.mongoose.model('User', this.schema);
    }

    /**
     * Salva um usuário no banco e retorna uma instância de User como o resultado
     * @param {User} user 
     * @returns {User}
     */
    static async save(user) {
        var userInstance = new this.model(user.toObject());

        var result = null;
        try {
            var userSaved = await userInstance.save();
            
            result = new User(userSaved.name, userSaved.password);
            result.setId(userSaved._id);
        } catch {
            throw new Error("Failed to save user");
        }

        return result;
    }

    /**
     * Obtem um usuário pelo nome
     * @param {string} name 
     * @returns {User}
     */
    static async getUserByName(name) {
        try{
            var result = await this.model.findOne({name: name});
        } catch {
            throw new Error("Failed to get user by name");
        }

        return result;
    }
}

module.exports = UserRepository;