const QuestionOpen = require('./question.Open');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
};

test('constructor should set properties properly', () => {
  const question = new QuestionOpen(
      exampleData.enunciation);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(0);
});

test('getQuestionTypeName should return the question type correctly', () => {
  const question = new QuestionOpen(exampleData.enunciation);

  expect(question.getQuestionTypeName()).toBe('Open');
});

