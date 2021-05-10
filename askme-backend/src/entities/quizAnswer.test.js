const QuizAnswer = require('./quizAnswer');
const QuestionAnswer = require('./questionAnswer');
const Quiz = require('./quiz');
const Question = require('./question');

test('getSchema should return correct schema', () => {
  expect(QuizAnswer.getSchema()).toStrictEqual({
    userId: String,
    submitted: Boolean,
    quizLength: Number,
    xml: String,
  });
});