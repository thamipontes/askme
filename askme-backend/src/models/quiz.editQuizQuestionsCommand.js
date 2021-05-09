// eslint-disable-next-line no-unused-vars
const QuestionModel = require('./question.questionModel');

/**
 * Comando para editar questões de um questionário
 */
class EditQuizQuestionsCommand {
  /**
   * Construtor para EditQuizQuestionsCommand
   * @param {QuestionModel} questions
   */
  constructor(questions) {
    this.questions = questions;
  }

  /**
   * Valida o comando e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    if (!this.questions || !(this.questions instanceof Array)) {
      return false;
    }

    if (this.questions.some(
        (q) => !(q instanceof QuestionModel) || !q.isValid())) {
      return false;
    }

    return true;
  }
}

module.exports = EditQuizQuestionsCommand;
