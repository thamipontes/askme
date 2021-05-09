// eslint-disable-next-line no-unused-vars
const Quiz = require('../entities/quiz');
const QuizFullModel = require('./quiz.quizFullModel');
const QuestionModel = require('./question.questionModel');
const QuestionItemModel = require('./question.questionItemModel');

/**
 * Converte a entidade Quiz para um model
 */
class QuizModelConverter {
  /**
   * Converte um Quiz para um QuizFullModel
   * @param {Quiz} quiz
   * @return {QuizFullModel}
   */
  static toFullModel(quiz) {
    return new QuizFullModel(
        quiz.id,
        quiz.creatorId,
        quiz.title,
        quiz.isAnonymous,
        quiz.questions.map((q) => new QuestionModel(
            q.number, q.enunciation, q.type, q.items.map(
                (i) => new QuestionItemModel(i.number, i.enunciation)))));
  }
}

module.exports = QuizModelConverter;
