const {mongooseProviderException} = require('./mongooseProvider');

test('mongooseProviderException should format exception properly', () => {
  try {
    throw mongooseProviderException('test');
  } catch (err) {
    expect(err instanceof mongooseProviderException).toBe(true);

    expect(err.name).toBe('MongooseProviderError');
    expect(err.message).toBe('test');
  }
});
