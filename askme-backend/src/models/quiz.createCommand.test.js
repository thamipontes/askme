const QuizCreateCommand = require('./quiz.createCommand');

test('isValid should return true when properties are valid', () => {
  const quizcreatecommand = new QuizCreateCommand('userId', 'abcdef', true);
  expect(quizcreatecommand.isValid()).toBe(true);
});

test(
    'isValid should return false when any properties are null or undefined',
    () => {
      let quizcreatecommand = new QuizCreateCommand(null, 'abcdef', true);
      expect(quizcreatecommand.isValid()).toBe(false);

      quizcreatecommand = new QuizCreateCommand('userId', null, true);
      expect(quizcreatecommand.isValid()).toBe(false);

      quizcreatecommand = new QuizCreateCommand('userId', 'abcdef', null);
      expect(quizcreatecommand.isValid()).toBe(false);
    },
);

test(`isValid should return false when quizcreatecommand has too \
little title`, () => {
  const quizcreatecommand = new QuizCreateCommand('userId', 'abcd', true);
  expect(quizcreatecommand.isValid()).toBe(false);
});

test(`isValid should return false when quizcreatecommand has too\ 
big title`, () => {
  const quizcreatecommand = new QuizCreateCommand('userId',
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', true);
  expect(quizcreatecommand.isValid()).toBe(false);
});
