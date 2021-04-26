const QuizModel = require('./quiz.quizModel');

test('QuizModel constructor should set properties properly', () => {
  const model = new QuizModel('userId', 'titleexample', true);

  expect(model.creatorId).toBe('userId');
  expect(model.title).toBe('titleexample');
  expect(model.isAnonymous).toBe(true);
});
