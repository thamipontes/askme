const UserRepository = require('./userRepository');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const QuizRepository = require('./quizRepository');

/**
 * Inits all repositories, passing the given mongoose instance
 * @param {mongoose} mongoose
 */
function initAllRepositories(mongoose) {
  console.log('Initing UserRepository...');
  UserRepository.init(mongoose);
  console.log('Initing QuizRepository...');
  QuizRepository.init(mongoose);

  console.log('Repositories inited successfully');
}

module.exports = initAllRepositories;
