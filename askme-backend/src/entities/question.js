/**
 * Representa uma questão em um questionário
 */
class Question {
  /**
   * Construtor para Question
   * @param {string} enunciation Enunciado da questão
   */
  constructor(enunciation) {
    this.enunciation = enunciation;
    this.number = 0;
  }
}

module.exports = Question;
