const User = require('../entities/user');
const UserRepository = require('../repositories/userRepository');

class UserService {
    /**
     * Validates and creates a user
     * @param {User} user 
     * @returns {User}
     */
    static async createUser(user) {
        if(!user.isValid()) {
            return null;
        }

        var existingUser = await UserRepository.getUserByName(user.name);

        if(existingUser != null) {
            return null;
        }

        var result = await UserRepository.save(user);

        return result;
    }
}

module.exports = UserService;