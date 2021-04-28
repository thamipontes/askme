const QuestionWithItems = require('./question.WithItems');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão?',
};

test('constructor should set properties properly', () => {
  const question = new QuestionWithItems(
      exampleData.enunciation);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.number).toBe(0);
  expect(question.items).toStrictEqual([]);
});

test('addItem should add item properly', () => {
  const question = new QuestionWithItems(
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
