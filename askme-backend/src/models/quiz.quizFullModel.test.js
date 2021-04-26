const QuizFullModel = require('./quiz.quizFullModel');

test('QuizFullModel constructor should set properties properly', () => {
  const model = new QuizFullModel('userId', 'titleexample', true, []);

  expect(model.creatorId).toBe('userId');
  expect(model.title).toBe('titleexample');
  expect(model.isAnonymous).toBe(true);
  expect(model.questions).toStrictEqual([]);
});
