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

  /**
   * Retorna o tipo da questão
   * @return {string}
   */
  getQuestionTypeName() {
    return 'TrueOrFalse';
  }
}

module.exports = QuestionTrueOrFalse;
