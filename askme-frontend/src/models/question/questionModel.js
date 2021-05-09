// eslint-disable-next-line no-unused-vars
import QuestionItem from './questionItem';
// eslint-disable-next-line no-unused-vars
import QuestionTypes from './questionType';

/**
 * Representa uma questão
 */
export default class QuestionModel {
  /**
   * Construtor para QuestionModel
   * @param {string} enunciation
   * @param {QuestionTypes} type
   * @param {number} number
   * @param {QuestionItem[]} items
   */
  constructor(enunciation, type, number, items) {
    this.enunciation = enunciation;
    this.items = items;
    this.type = type;
    this.number = number;
  }
};
