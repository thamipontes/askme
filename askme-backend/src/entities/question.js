/**
 * Representa uma questão em um questionário
 */
class Question {
  /**
   * Construtor para Question
   * @param {string} enunciation Enunciado da questão
   * @param {number} number Posição em que a questão deve ser exibida
   */
  constructor(enunciation, number) {
    this.enunciation = enunciation;
    this.number = number;
  }
}

module.exports = Question;
