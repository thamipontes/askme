// eslint-disable-next-line no-unused-vars
const Question = require('../entities/question');
// eslint-disable-next-line no-unused-vars
const QuestionItemModel = require('./question.questionItemModel');
const QuestionTypes = require('../entities/questionTypes');

/**
 * Modelo para questão
 */
class QuestionModel {
  /**
   * Construtor para QuestionModel
   * @param {number} number
   * @param {string} enunciation
   * @param {string} type
   * @param {QuestionItemModel[]} items
   */
  constructor(number, enunciation, type, items) {
    this.number = number,
    this.enunciation = enunciation,
    this.type = type,
    this.items = items;
  }

  /**
   * Valida o modelo e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    if (!this.number || !this.enunciation ||
      !this.type || !this.items) {
      return false;
    }

    if (!(this.type in QuestionTypes)) {
      return false;
    }

    if (!(this.items instanceof Array)) {
      return false;
    }

    if (this.items.some((i) => !i.isValid())) {
      return false;
    }

    return true;
  }

  /**
   * Converte o modelo para objeto
   * @return {object}
   */
  toObject() {
    return {
      number: this.number,
      type: this.type,
      enunciation: this.enunciation,
      items: this.items?.map((i) => {
        return i?.toObject();
      }),
    };
  }
}

module.exports = QuestionModel;
