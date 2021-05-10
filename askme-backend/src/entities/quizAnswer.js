const QuestionAnswer = require('./questionAnswer');

/**
 * Representa as respostas de um questionário
 */
class QuizAnswer {
  /**
   * Obtém o schema com as propriedades para salvar no banco
   * @return {object}
   */
  static getSchema() {
    return {
      userId: String,
      submitted: Boolean,
      quizLength: Number,
      xml: String,
    };
  }

  /**
   * Construtor para QuizAnswer
   * @param {string} userId Id do usuário respondente
   * @param {QuestionModel[]} quizQuestions Questões do questionário
   */
  constructor(userId, quizQuestions) {
    this.userId = userId;
    this.submitted = false;
    this.quizLength = quizQuestions.length;

    this.answers = Array(quizLength);
    for (let i = 0; i < quizLength; i++) {
      answers[i] = new QuestionAnswer(quizQuestions[i].type);
    }
  }

  /**
   * Setter para id
   * @param {string} id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Setter para as respostas
   * @param {string} questionNumber Id da questão
   * @param {object} answer Resposta
   */
  setAnswer(questionNumber, answer) {
    this.answers[questionNumber].answer = answer;
  }

  /**
   * Getter para as respostas
   * @param {string} questionNumber Id da questão
   * @return {object}
   */
  getAnswer(questionNumber) {
    return this.answers[questionNumber].answer;
  }
}

module.exports = QuizAnswer;
