/**
 * Modelo de API para quiz
 */
class QuizModel {
  /**
   * Construtor para o modelo de Quiz
   * @param {string} creatorId
   * @param {string} title
   * @param {string} isAnonymous
   */
  constructor(creatorId, title, isAnonymous) {
    this.creatorId = creatorId,
    this.title = title,
    this.isAnonymous = isAnonymous;
  }
}

module.exports = QuizModel;
