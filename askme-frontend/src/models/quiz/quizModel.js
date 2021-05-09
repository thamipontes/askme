// eslint-disable-next-line no-unused-vars
import QuestionModel from '../question/questionModel';

/**
 * Representa um questionário
 */
export default class QuizFullModel {
  /**
   * Construtor para QuizModel
   * @param {string} id
   * @param {string} title
   * @param {QuestionModel[]} questions
   */
  constructor(id, title, questions) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
};
