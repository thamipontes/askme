const Quiz = require('./quiz');
const Question = require('./question');

test('getSchema should return correct schema', () => {
  expect(Quiz.getSchema()).toStrictEqual({
    creatorId: String,
    title: String,
    isAnonymous: Boolean,
    xml: String,
  });
});

test('toObject should convert properties properly', () => {
  const quiz = new Quiz('userId', 'abcdef', true);
  expect(quiz.toObject()).toStrictEqual({
    creatorId: 'userId',
    title: 'abcdef',
    isAnonymous: true,
    xml: '<quiz></quiz>',
  });
});

test('setId should set id properly', () => {
  const quiz = new Quiz('userId', 'abcdef', true);
  quiz.setId('quizId');

  expect(quiz.id).toBe('quizId');
});

test('isValid should return true when properties are valid', () => {
  const quiz = new Quiz('userId', 'abcdef', true);
  expect(quiz.isValid()).toBe(true);
});

test(
    'isValid should return false when any properties are null or undefined',
    () => {
      let quiz = new Quiz(null, 'abcdef', true);
      expect(quiz.isValid()).toBe(false);

      quiz = new Quiz('userId', null, true);
      expect(quiz.isValid()).toBe(false);

      quiz = new Quiz('userId', 'abcdef', null);
      expect(quiz.isValid()).toBe(false);
    },
);

test('isValid should return false when quiz has too little title', () => {
  const quiz = new Quiz('userId', 'abcd', true);
  expect(quiz.isValid()).toBe(false);
});

test('isValid should return false when quiz has too big title', () => {
  const quiz = new Quiz('userId', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', true);
  expect(quiz.isValid()).toBe(false);
});

test('addQuestion should addQuestion properly and set its number', () => {
  const quiz = new Quiz('userId', 'abcdef', true);

  const question1 = new Question('abcde', 'Open');
  const question2 = new Question('abcde2', 'Open');
  quiz.addQuestion(question1);
  quiz.addQuestion(question2);

  expect(question1.number).toBe(1);
  expect(question2.number).toBe(2);

  expect(quiz.questions).toStrictEqual([question1, question2]);
});
