const QuestionWithItems = require('./question.WithItems');

/**
 * Representa uma questão com múltiplos itens V ou F
 */
class QuestionTrueOrFalse extends QuestionWithItems {
  /**
   * Construtor de QuestionTrueOrFalse
   * @param {string} enunciation Enunciado da questão
   */
  constructor(enunciation) {
    super(enunciation);
  }
}

module.exports = QuestionTrueOrFalse;
