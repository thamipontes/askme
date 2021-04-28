const QuestionChooseOne = require('./question.ChooseOne');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
  number: 5,
};

test('constructor should set properties properly', () => {
  const question = new QuestionChooseOne(
      exampleData.enunciation, exampleData.number);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(exampleData.number);
  expect(question.items).toStrictEqual([]);
});
