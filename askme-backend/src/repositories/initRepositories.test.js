const initAllRepositories = require('./initRepositories');

const UserRepository = require('./userRepository');
jest.mock('./userRepository');

const mongoose = require('mongoose');
jest.mock('mongoose');

test('initAllRepositories should call init of all repositories', () => {
  initAllRepositories(mongoose);

  expect(UserRepository.init).toHaveBeenCalledWith(mongoose);
});
