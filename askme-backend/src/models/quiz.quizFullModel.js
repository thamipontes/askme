const QuizModel = require('./quiz.quizModel');

/**
 * Modelo para quiz com questões inclusas
 */
class QuizFullModel extends QuizModel {
  /**
   * Construtor para QuizFullModel
   * @param {string} id
   * @param {string} creatorId
   * @param {string} title
   * @param {boolean} isAnonymous
   * @param {*} questions
   */
  constructor(id, creatorId, title, isAnonymous, questions) {
    // issue: I-24
    super(id, creatorId, title, isAnonymous);
    this.questions = questions;
  }

  /**
   * Converte o modelo para um objeto
   * @return {object}
   */
  toObject() {
    return {
      id: this.id,
      creatorId: this.creatorId,
      title: this.title,
      isAnonymous: this.isAnonymous,
      questions: this.questions,
    };
  }
}

module.exports = QuizFullModel;
