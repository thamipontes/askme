const QuestionWithItems = require('./question.WithItems');

/**
 * Representa uma questão de múltipla escolha com apenas uma resposta possível
 */
class QuestionChooseOne extends QuestionWithItems {
  /**
   * Construtor de QuestionChooseOne
   * @param {string} enunciation
   */
  constructor(enunciation) {
    super(enunciation);
  }
}

module.exports = QuestionChooseOne;
