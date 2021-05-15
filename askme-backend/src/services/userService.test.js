const UserService = require('./userService');
const UserRepository = require('../repositories/userRepository');
const UserCreateCommand = require('../models/user.createCommand');
const User = require('../entities/user');
const ValidationException = require('./validationException');
const ServiceException = require('./serviceException');
const UserLoginCommand = require('../models/user.loginCommand');
const TokenService = require('./tokenService');
const AuthorizationException = require('./authorizationException');

jest.mock('../repositories/userRepository');

const userExampleData = {
  id: 'idUser',
  email: 'email',
  name: 'test',
  password: '123456789',
  isAdmin: true,
};

const saveMock = jest.fn(async () => {
  const result = new User(
      userExampleData.email,
      userExampleData.name,
      userExampleData.password,
  );

  result.isAdmin = userExampleData.isAdmin;
  result.setId(userExampleData.id);
  return result;
});

const getUserByQueryMock = jest.fn(async () => {
  const result = new User(
      userExampleData.email,
      userExampleData.name,
      userExampleData.password,
  );

  result.isAdmin = userExampleData.isAdmin;
  result.setId(userExampleData.id);
  return result;
});

const getUserNotAdminByQueryMock = jest.fn(async () => {
  const result = new User(
      userExampleData.email,
      userExampleData.name,
      userExampleData.password,
  );

  result.isAdmin = false;
  result.setId(userExampleData.id);
  return result;
});

beforeEach(() => {
  UserRepository.mockReset();
  UserRepository.save = saveMock;
});

test('createUser should call UserRepository.save when command is valid',
    async () => {
      const command = new UserCreateCommand(
          userExampleData.email, userExampleData.name, userExampleData.password,
          userExampleData.password,
      );

      expect(command.isValid()).toBe(true);

      await UserService.createUser(command);
      expect(UserRepository.getUserByEmail).toHaveBeenCalledWith(
          userExampleData.email);
      expect(UserRepository.save).toHaveBeenCalledWith(
          new User(userExampleData.email,
              userExampleData.name, userExampleData.password),
      );
    },
);

test('createUser should throw validation exception when command is invalid',
    async () => {
      const command = new UserCreateCommand(
          userExampleData.email, userExampleData.name, userExampleData.password,
          userExampleData.password + '2',
      );

      expect(command.isValid()).toBe(false);

      try {
        await UserService.createUser(command);
        fail('Exception expected');
      } catch (err) {
        expect(err instanceof ValidationException).toBe(true);
      }

      expect(UserRepository.save).not.toHaveBeenCalled();
      expect(UserRepository.getUserByEmail).not.toHaveBeenCalled();
    },
);

test('createUser should throw ServiceException when user already exists',
    async () => {
      const command = new UserCreateCommand(
          userExampleData.email, userExampleData.name, userExampleData.password,
          userExampleData.password,
      );

      expect(command.isValid()).toBe(true);

      UserRepository.getUserByEmail = getUserByQueryMock;

      try {
        await UserService.createUser(command);
        fail('Exception expected');
      } catch (err) {
        expect(err instanceof ServiceException).toBe(true);
      }

      expect(UserRepository.getUserByEmail).toHaveBeenCalledWith(
          userExampleData.email);
      expect(UserRepository.save).not.toHaveBeenCalled();
    },
);

test('getUserById should call UserRepository.getUserById',
    async () => {
      UserRepository.getUserById = getUserByQueryMock;
      const result = await UserService.getUserById('userId');
      expect(UserRepository.getUserById).toHaveBeenCalledWith('userId');
      expect(result.toObject()).toStrictEqual({
        id: userExampleData.id,
        email: userExampleData.email,
        name: userExampleData.name,
        password: userExampleData.password,
        isAdmin: userExampleData.isAdmin,
      });
    },
);

test('loginAdmin should generate valid admin token', async () => {
  // issue: I-32
  const result = await UserService.loginAdmin(
      new UserLoginCommand(userExampleData.email, userExampleData.password));

  const decoded = TokenService.decodeToken(result);
  expect(decoded.role).toBe('admin');
});

test('loginAdmin should throw when user is not admin', async () => {
  // issue: I-32
  UserRepository.getUserByEmail = getUserNotAdminByQueryMock;

  try {
    await UserService.loginAdmin(
        new UserLoginCommand(userExampleData.email, userExampleData.password));
    fail('Exception expected');
  } catch (err) {
    expect(err instanceof AuthorizationException).toBe(true);
  }
});

test('upgradeToAdmin should upgrade user correctly', async () => {
  await UserService.upgrageToAdmin(userExampleData.id);
  expect(UserRepository.update).toHaveBeenCalled();
});
