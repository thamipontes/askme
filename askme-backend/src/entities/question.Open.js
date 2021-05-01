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

  /**
   * Retorna uma string correspondente ao tipo da questão
   * @return {string}
   */
  getQuestionTypeName() {
    return 'Open';
  }
}

module.exports = QuestionOpen;
