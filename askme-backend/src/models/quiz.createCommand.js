const Quiz = require('../entities/quiz');

/**
 * Comando para criação de um questionário
 */
class QuizCreateCommand {
  /**
   * Construtor para o comando
   * @param {string} creatorId
   * @param {string} title
   * @param {string} isAnonymous
   */
  constructor(creatorId, title, isAnonymous) {
    this.creatorId = creatorId;
    this.title = title;
    this.isAnonymous = isAnonymous;
  }

  /**
   * Valida o comando e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    const quiz = new Quiz(this.creatorId, this.title, this.isAnonymous);

    return quiz.isValid();
  }
}

module.exports = QuizCreateCommand;
