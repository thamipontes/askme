const {User} = require('../entities/user');
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

    /**
     * @param {mongoose.Mongoose} mongooseInstance
     */
    static init(mongooseInstance) {
        this._mongooseInstance = mongooseInstance;
        this.schema = new mongooseInstance.Schema(User.getSchema());
    }

    /**
     * @param {User} user 
     */
    static save(user) {
        var userModel = this.mongoose.model('User', this.schema);
        var userInstance = new userModel(user.toObject());

        userInstance.save((err, user) => {
            if(err);
        });
    }
}

module.exports = {
    UserRepository
};