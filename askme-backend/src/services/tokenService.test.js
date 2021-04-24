const AuthorizationException = require('./authorizationException');
const TokenService = require('./tokenService');

test('Should generate common token correctly', () => {
  const token = TokenService.generateToken('userId', false);

  const decoded = TokenService.decodeToken(token);

  expect(decoded.userId).toBe('userId');
  expect(decoded.role).toBe('common');
});

test('Should generate admin token correctly', () => {
  const token = TokenService.generateToken('userIdAdmin', true);

  const decoded = TokenService.decodeToken(token);

  expect(decoded.userId).toBe('userIdAdmin');
  expect(decoded.role).toBe('admin');
});

test('Should throw exception when token is invalid', () => {
  const token = TokenService.generateToken('userIdAdmin', true);

  try {
    TokenService.decodeToken(token.replace('a', 'd'));
    fail('exception expected');
  } catch (err) {
    expect(err instanceof AuthorizationException).toBe(true);
  }
});
