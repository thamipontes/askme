const Question = require('./question');

/**
 * Representa uma questão aberta
 */
class QuestionOpen extends Question {
  /**
   * Construtor para QuestionOpen
   * @param {string} enunciation
   */
  constructor(enunciation) {
    super(enunciation);
  }
}

module.exports = QuestionOpen;
