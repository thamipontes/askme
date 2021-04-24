const UserLoginCommand = require('./user.loginCommand');

test('Should generate command properly', () => {
  const command = new UserLoginCommand('test@email.com', '123456789');

  expect(command.email).toBe('test@email.com');
  expect(command.password).toBe('123456789');
});
