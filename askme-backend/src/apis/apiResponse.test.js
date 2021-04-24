const apiResponse = require('./apiResponse');

test('should generate api response correctly', () => {
  expect(apiResponse(true, 'test', {v: 2})).toStrictEqual({
    success: true,
    message: 'test',
    data: {v: 2},
  });
});
