// eslint-disable-next-line no-unused-vars
import QuestionModel from '../question/questionModel';

/**
 * Representa um questionário
 */
export default class QuizModel {
  /**
   * Construtor para QuizModel
   * @param {string} title
   * @param {QuestionModel[]} questions
   */
  constructor(title, questions) {
    this.title = title;
    this.questions = questions;
  }
};
