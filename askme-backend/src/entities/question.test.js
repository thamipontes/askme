const Question = require('./question');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
};

test('constructor should set properties properly', () => {
  const question = new Question(exampleData.enunciation);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(0);
});
