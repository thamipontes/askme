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

  /**
   * Retorna uma string correspondente ao tipo da questão
   * @return {string}
   */
  getQuestionTypeName() {
    return 'ChooseOne';
  }
}

module.exports = QuestionChooseOne;
