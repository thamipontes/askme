/**
 * Modelo para itens de questões com itens
 */
class QuestionItemModel {
  /**
   * Construtor para QuestionItemModel
   * @param {number} number
   * @param {strings} enunciation
   */
  constructor(number, enunciation) {
    this.number = number;
    this.enunciation = enunciation;
  }

  /**
   * Valida o modelo e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    if (!this.number || !this.enunciation) {
      return false;
    }

    return true;
  }

  /**
   * Converte o modelo para objeto
   * @return {object}
   */
  toObject() {
    console.log(this);
    return {
      number: this.number,
      enunciation: this.enunciation,
    };
  }
}

module.exports = QuestionItemModel;
