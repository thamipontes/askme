const User = require('./user');

test('isValid should return false when user has too little name', () => {
  const user = new User('t', '123456789');
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too big name', () => {
  const user = new User('taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '123456789');
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too little password', () => {
  const user = new User('test', '12345');
  expect(user.isValid()).toBe(false);
});

test('isValid should return false when user has too big password', () => {
  const user = new User('test',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  expect(user.isValid()).toBe(false);
});

test('toObject should return object with properties correctly set', () => {
  const user = new User('test', 'password');
  user.setId('1234');
  expect(user.toObject()).toStrictEqual({
    id: '1234',
    name: 'test',
    password: 'password',
  });
});
