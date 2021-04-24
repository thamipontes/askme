const ValidationException = require('./validationException');

test('should generate serviceException correctly', () => {
  try {
    throw new ValidationException('test');
  } catch (err) {
    expect(err instanceof ValidationException).toBe(true);

    expect(err.message).toBe('test');
  }
});
