const ServiceException = require('./serviceException');

test('should generate serviceException correctly', () => {
  try {
    throw new ServiceException('test', {v: 2});
  } catch (err) {
    expect(err instanceof ServiceException).toBe(true);

    expect(err.data).toStrictEqual({v: 2});
    expect(err.message).toBe('test');
  }
});
