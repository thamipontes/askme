const QuizModel = require('./quiz.quizModel');

test('QuizModel constructor should set properties properly', () => {
  const model = new QuizModel('quizId', 'userId', 'titleexample', true);

  expect(model.id).toBe('quizId');
  expect(model.creatorId).toBe('userId');
  expect(model.title).toBe('titleexample');
  expect(model.isAnonymous).toBe(true);
});
