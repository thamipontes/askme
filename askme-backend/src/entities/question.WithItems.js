const Question = require('./question');

/**
 * Representa uma questão que tem itens
 */
class QuestionWithItems extends Question {
  /**
   * Construtor para QuestionWithItems
   * @param {*} enunciation
   * @param {*} number
   */
  constructor(enunciation, number) {
    super(enunciation, number);
    this.items = [];
  }

  /**
   * Adiciona um item à questão
   * @param {string} itemEnunciation
   */
  addItem(itemEnunciation) {
    this.items.push({
      number: this.items.length() + 1,
      enunciation: itemEnunciation,
    });
  }
}

module.exports = QuestionWithItems;
