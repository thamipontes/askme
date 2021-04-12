const UserRepository = require('./userRepository');

function initAllRepositories(mongoose) {
    console.log("Initing UserRepository...");
    UserRepository.init(mongoose);
    console.log("UserRepository inited successfully!");
}

module.exports = initAllRepositories;