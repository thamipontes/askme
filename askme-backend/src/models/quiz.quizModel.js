/**
 * Modelo de API para quiz
 */
class QuizModel {
  /**
   * Construtor para o modelo de Quiz
   * @param {string} id
   * @param {string} creatorId
   * @param {string} title
   * @param {boolean} isAnonymous
   */
  constructor(id, creatorId, title, isAnonymous) {
    this.id = id;
    this.creatorId = creatorId,
    this.title = title,
    this.isAnonymous = isAnonymous;
  }

  /**
   * Converte o modelo para um objeto
   * @return {object}
   */
  toObject() {
    return {
      id: this.id,
      creatorId: this.creatorId,
      title: this.title,
      isAnonymous: this.isAnonymous,
    };
  }
}

module.exports = QuizModel;
