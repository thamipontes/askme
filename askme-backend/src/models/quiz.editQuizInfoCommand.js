const Quiz = require('../entities/quiz');

/**
 * Comando para editar as informações de um quiz
 */
class EditQuizInfoCommand {
  /**
   * Construtor para EditQuizInfoCommand
   * @param {string} title
   */
  constructor(title) {
    this.title = title;
  }

  /**
   * Valida o comando e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    if (!this.title) {
      return false;
    }

    if (this.title.length > Quiz.titleMaxLength ||
      this.title.length < Quiz.titleMinLength) {
      return false;
    }

    return true;
  }
}

module.exports = EditQuizInfoCommand;
