const QuizModel = require('./quiz.quizModel');

/**
 * Modelo para quiz com questões inclusas
 */
class QuizFullModel extends QuizModel {
  /**
   * Construtor para QuizFullModel
   * @param {string} creatorId
   * @param {string} title
   * @param {boolean} isAnonymous
   * @param {*} questions
   */
  constructor(creatorId, title, isAnonymous, questions) {
    // issue: I-24
    super(creatorId, title, isAnonymous);
    this.questions = questions;
  }
}

module.exports = QuizFullModel;
