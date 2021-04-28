const QuestionChooseOne = require('./question.ChooseOne');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
};

test('constructor should set properties properly', () => {
  const question = new QuestionChooseOne(
      exampleData.enunciation);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(0);
  expect(question.items).toStrictEqual([]);
});
