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

test('getRoleFromToken should return correct role', () => {
  const token = TokenService.generateToken('userIdAdmin', true);

  expect(TokenService.getRoleFromToken(token)).toBe('admin');
});

test('requireTokenToBeAdmin should throw when role is not admin', () => {
  const token = TokenService.generateToken('userIdAdmin', false);

  try {
    TokenService.requireTokenToBeAdmin(token);
    fail('Exception expected');
  } catch (err) {
    expect(err instanceof AuthorizationException).toBe(true);
  }
});
