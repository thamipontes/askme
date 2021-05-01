const Question = require('./question');

/**
 * Representa uma questão que tem itens
 */
class QuestionWithItems extends Question {
  /**
   * Construtor para QuestionWithItems
   * @param {*} enunciation
   */
  constructor(enunciation) {
    super(enunciation);
    this.items = [];
  }

  /**
   * Adiciona um item à questão
   * @param {string} itemEnunciation
   */
  addItem(itemEnunciation) {
    this.items.push({
      number: this.items.length + 1,
      enunciation: itemEnunciation,
    });
  }

  /**
   * Converte os itens para XML
   * @return {string} XML
   */
  toXMLInternal() {
    const xml = `<items>` + this.items.map((i) => {
      return `<item number="${i.number}">`+
      `<enunciation>${i.enunciation}</enunciation>`+
      `</item>`;
    }).join('') + `</items>`;

    return xml;
  }
}

module.exports = QuestionWithItems;
