const User = require('./user');
// issue: I-12

test('isValid should return true when user is valid', () => {
  const user = new User('email', 'test', '123456789');
  expect(user.isValid()).toBe(true);
});

test('isValid should return false when user has any properties not set', () => {
  let user = new User(null, 'test', '123456789');
  expect(user.isValid()).toBe(false);
  user = new User('email', null, '123456789');
  expect(user.isValid()).toBe(false);
  user = new User('email', 'test', null);
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too little name', () => {
  const user = new User('email', 't', '123456789');
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too big name', () => {
  const user = new User('email',
      'taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '123456789');
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too little password', () => {
  const user = new User('email', 'test', '12345');
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too big password', () => {
  const user = new User('email', 'test',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  expect(user.isValid()).toBe(false);
});

test('toObject should return object with properties correctly set', () => {
  const user = new User('email', 'test', 'password');
  user.setId('1234');
  expect(user.toObject()).toStrictEqual({
    id: '1234',
    email: 'email',
    name: 'test',
    password: 'password',
  });
});

test('getSchema sould return the schema correctly according to the expected',
    () => {
      expect(User.getSchema()).toStrictEqual({
        email: String,
        name: String,
        password: String,
      });
    },
);
