const QuestionTrueOrFalse = require('./question.TrueOrFalse');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
  number: 5,
};

test('constructor should set properties properly', () => {
  const question = new QuestionTrueOrFalse(
      exampleData.enunciation, exampleData.number);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(exampleData.number);
  expect(question.items).toStrictEqual([]);
});
