const Question = require('./question');

/**
 * Representa uma questão aberta
 */
class QuestionOpen extends Question {
  /**
   * Construtor para QuestionOpen
   * @param {*} enunciation
   * @param {*} number
   */
  constructor(enunciation, number) {
    super(enunciation, number);
  }
}

module.exports = QuestionOpen;
