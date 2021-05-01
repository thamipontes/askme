const QuestionChooseOne = require('./question.ChooseOne');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
};

test('addItem should add item properly', () => {
  // using a subtype here because the class itself is "abstract"
  const question = new QuestionChooseOne(
      exampleData.enunciation);

  question.addItem('O cavalo branco de napoleão é branco');
  question.addItem('O cavalo branco de napoleão é vermelho');

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(0);
  expect(question.items).toStrictEqual([{
    number: 1,
    enunciation: 'O cavalo branco de napoleão é branco',
  }, {
    number: 2,
    enunciation: 'O cavalo branco de napoleão é vermelho',
  }]);
});
