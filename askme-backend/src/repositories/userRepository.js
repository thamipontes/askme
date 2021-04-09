const {User} = require('../entities/user');
const mongoose = require('mongoose');

class UserRepository {
    static mongoose = null;
    static schema = null;

    /**
     * @param {mongoose.Mongoose} mongooseInstance
     */
    static init(mongooseInstance) {
        this.mongoose = mongooseInstance;
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