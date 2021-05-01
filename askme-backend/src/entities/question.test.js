const Question = require('./question');
const QuestionChooseOne = require('./question.ChooseOne');

test('constructor should throw', () => {
  try {
    new Question('Qual é a cor do cavalo branco de Napoleão?');

    fail('Exception expected');
  } catch {}
});

test('toXMLInternal should return xml correctly', () => {
  // using a subtype here because the class itself is "abstract"
  const question = new QuestionChooseOne('e0');

  question.addItem('e1');
  question.addItem('e2');

  expect(question.toXML()).toBe(
      `<question type="ChooseOne" number="0">\
<enunciation>e0</enunciation>\
<items>\
<item number="1"><enunciation>e1</enunciation></item>\
<item number="2"><enunciation>e2</enunciation></item>\
</items>\
</question>`,
  );
});
