const UserCreateCommand = require('./user.createCommand');

test('isValid should return true when command is valid', () => {
  const command = new UserCreateCommand('email',
      'test', '123456789', '123456789');

  expect(command.isValid()).toBe(true);
});

test('isValid should return false when command has any properties null', () => {
  let command = new UserCreateCommand(null,
      'test', '123456789', '123456789');

  expect(command.isValid()).toBe(false);

  command = new UserCreateCommand('email',
      null, '123456789', '123456789');

  expect(command.isValid()).toBe(false);

  command = new UserCreateCommand('email',
      'test', null, '123456789');

  expect(command.isValid()).toBe(false);

  command = new UserCreateCommand('email',
      'test', '123456789', null);

  expect(command.isValid()).toBe(false);
});

test('isValid should return false when command has too big name', () => {
  const command = new UserCreateCommand('email',
      'testaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      '123456789', '123456789');

  expect(command.isValid()).toBe(false);
});

test('isValid should return false when command has too big password', () => {
  const command = new UserCreateCommand('email',
      'test', '123456789aaaaaaaaaaaaaaaaaaaaaaaa',
      '123456789aaaaaaaaaaaaaaaaaaaaaaaa');

  expect(command.isValid()).toBe(false);
});

test(`isValid should return false when command has \
password confirmation different than password`, () => {
  const command = new UserCreateCommand('email',
      'test',
      '123456789', '123456789a');

  expect(command.isValid()).toBe(false);
});
