const Question = require('./question');
const xml2js = require('xml2js');

const exampleData = {
  enunciation: 'Qual a cor do cavalo branco de Napoleão',
  type: 'Open',
};

test('addItem should add item properly', () => {
  const question = new Question(exampleData.enunciation, exampleData.type);

  question.addItem('O cavalo branco de napoleão é branco');
  question.addItem('O cavalo branco de napoleão é vermelho');
  question.addItem('O cavalo branco de napoleão é azul', 10);

  expect(question.enunciation).toBe(exampleData.enunciation);
  expect(question.type).toBe(exampleData.type);
  expect(question.number).toBe(0);

  expect(question.items).toStrictEqual([{
    number: 1,
    enunciation: 'O cavalo branco de napoleão é branco',
  }, {
    number: 2,
    enunciation: 'O cavalo branco de napoleão é vermelho',
  }, {
    number: 10,
    enunciation: 'O cavalo branco de napoleão é azul',
  }]);
});

test('toXML and fromXML should return handle question properly', async () => {
  const question = new Question(
      exampleData.enunciation, exampleData.type);

  question.addItem('O cavalo branco de napoleão é branco');
  question.addItem('O cavalo branco de napoleão é vermelho');

  const builder = new xml2js.Builder();
  const xml = builder.buildObject(question.toXMLModel());
  const parsed = await xml2js.parseStringPromise(xml, {trim: true});
  const questionParsed = Question.fromXMLModel(parsed);

  expect(question.enunciation).toBe(questionParsed.enunciation);
  expect(question.number).toBe(questionParsed.number);
  expect(question.type).toBe(questionParsed.type);

  expect(question.items).toStrictEqual(questionParsed.items);
});
