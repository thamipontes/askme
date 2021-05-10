const QuestionAnswer = require('./questionAnswer');
const Question = require('./question');

const question1 = new Question(
    'Qual a cor do cavalo branco de Napoleão?',
    'ChooseOne',
);
question1.addItem('O cavalo branco de napoleão é branco');
question1.addItem('O cavalo branco de napoleão é vermelho');
question1.addItem('O cavalo branco de napoleão é azul', 10);

const question2 = new Question(
    'Qual a cor do cavalo branco de Napoleão?',
    'TrueOrFalse',
);
question2.addItem('O cavalo branco de napoleão é branco?');
question2.addItem('O cavalo branco de napoleão é vermelho?');
question2.addItem('O cavalo branco de napoleão é azul?', 10);

const question3 = new Question(
    'Qual a cor do cavalo branco de Napoleão?',
    'Open',
);

test(
    'constructor should initialize the answer with the right structure',
    () => {
      // (ChooseOne)
      let questionAnswer = new QuestionAnswer(question1.type, question1.items);
      expect(questionAnswer.type).toBe(question1.type);
      question1.items.forEach(
          (item, i) => expect(questionAnswer.answer[item.number]).toBe(false));

      // (TrueOrFalse)
      questionAnswer = new QuestionAnswer(question2.type, question2.items);
      expect(questionAnswer.type).toBe(question2.type);
      question2.items.forEach(
          (item, i) => expect(questionAnswer.answer[item.number]).toBe(null));

      // (Open)
      questionAnswer = new QuestionAnswer(question3.type, question3.items);
      expect(questionAnswer.type).toBe(question3.type);
      expect(questionAnswer.answer.text).toBe('');
    },
);
