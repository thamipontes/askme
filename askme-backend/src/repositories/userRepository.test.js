const UserRepository = require('./userRepository');
const User = require('../entities/user');

const mongooseMock = jest.fn();
const schemaMockInstance = jest.fn();
const schemaMock = jest.fn(() => schemaMockInstance);

const modelMock = jest.fn(() => userModelMock);

const userModelMock = jest.fn(() => userModelMockInstance);
const userModelMockExceptions = jest.fn(() => userModelMockInstanceExceptions);

const userModelMockInstance = jest.fn();
const userModelMockInstanceExceptions = jest.fn();

const userExampleData = {
  email: 'email',
  name: 'test',
  password: '123456789',
};

beforeAll(() => {
  mongooseMock.Schema = schemaMock;
  mongooseMock.model = modelMock;

  const saveResult = Object.assign(userExampleData, {_id: 'idUserExample'});
  userModelMockInstance.save = jest.fn(() => saveResult);

  const findOneResult = saveResult;
  findOneResult.save = jest.fn(() => userExampleData);
  userModelMock.findOne = jest.fn(() => findOneResult);
  userModelMock.findById = jest.fn(() => findOneResult);

  userModelMockInstanceExceptions.save = jest.fn(() => {
    throw new Error();
  });

  userModelMockExceptions.findOne = jest.fn(() => {
    throw new Error();
  });
});

beforeEach(() => {
  mongooseMock.mockClear();
});

test(`should throw \
exception on mongoose read when not inited`, () => {
  expect(() => {
    UserRepository.mongoose;
  }).toThrow(Error);
});

test('init should create schema and model', () => {
  UserRepository.init(mongooseMock);
  expect(schemaMock).toHaveBeenCalledWith(User.getSchema());
  expect(modelMock).toHaveBeenCalledWith('User', schemaMockInstance);
});

test('save should call model save and return the result', async () => {
  UserRepository.model = userModelMock;

  const user = new User(userExampleData.email,
      userExampleData.name, userExampleData.password);

  const result = await UserRepository.save(user);
  expect(result.id).toBe('idUserExample');
  expect(result.email).toBe(userExampleData.email);
  expect(result.name).toBe(userExampleData.name);
  expect(result.password).toBe(userExampleData.password);

  expect(userModelMock).toHaveBeenCalledWith(user.toObject());
  expect(userModelMockInstance.save).toHaveBeenCalledTimes(1);
});

test('getUserByEmail should return user correctly', async () => {
  UserRepository.model = userModelMock;

  const result = await UserRepository.getUserByEmail(userExampleData.email);

  expect(result.id).toBe('idUserExample');
  expect(result.email).toBe(userExampleData.email);
  expect(result.name).toBe(userExampleData.name);
  expect(result.password).toBe(userExampleData.password);

  expect(userModelMock.findOne).toHaveBeenCalledWith({
    email: userExampleData.email});
});

test('update should call model findById, save and return the result',
    async () => {
      UserRepository.model = userModelMock;

      const user = new User(userExampleData.email,
          userExampleData.name, userExampleData.password);
      user.setId('ok');

      const result = await UserRepository.update(user);
      expect(result.id).toBe('idUserExample');
      expect(result.email).toBe(userExampleData.email);
      expect(result.name).toBe(userExampleData.name);
      expect(result.password).toBe(userExampleData.password);

      expect(userModelMock.findById).toHaveBeenCalledWith(user.id);
      expect(userModelMock.findById).toHaveBeenCalledTimes(1);
    },
);
