const QuestionWithItems = require('./question.WithItems');

/**
 * Representa uma questão com múltiplos itens V ou F
 */
class QuestionTrueOrFalse extends QuestionWithItems {
  /**
   * Construtor de QuestionTrueOrFalse
   * @param {string} enunciation Enunciado da questão
   * @param {number} number Representa o número da questão
   */
  constructor(enunciation, number) {
    super(enunciation, number);
  }
}

module.exports = QuestionTrueOrFalse;
