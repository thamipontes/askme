const UserRepository = require('./userRepository');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

/**
 * Inits all repositories, passing the given mongoose instance
 * @param {mongoose} mongoose
 */
function initAllRepositories(mongoose) {
  console.log('Initing UserRepository...');
  UserRepository.init(mongoose);
  console.log('UserRepository inited successfully!');
}

module.exports = initAllRepositories;
