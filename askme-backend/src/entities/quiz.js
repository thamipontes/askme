// eslint-disable-next-line no-unused-vars
const Question = require('./question');

/**
 * Representa um questionário
 */
class Quiz {
  /**
   * Obtem o schema com as propriedades para salvar no banco
   * @return {object}
   */
  static getSchema() {
    return {
      creatorId: String,
      title: String,
      isAnonymous: Boolean,
      xml: String,
    };
  }

  /**
   * Construtor para Quiz
   * @param {string} creatorId Id do usuário criador
   * @param {string} title
   * @param {boolean} isAnonymous
   */
  constructor(creatorId, title, isAnonymous) {
    this.creatorId = creatorId;
    this.title = title;
    this.isAnonymous = isAnonymous;
    this.questions = [];
  }

  /**
   * Setter para id
   * @param {string} id
   */
  setId(id) {
    this.id = id;
  }

  /**
   * Converte o questionário em um XML
   * @return {string}
   */
  toXML() {
    // TODO: implement this method
    return '';
  }

  /**
   * Converte as propriedades da classe para um objeto
   * @return {object}
   */
  toObject() {
    return {
      creatorId: this.creatorId,
      title: this.title,
      isAnonymous: this.isAnonymous,
      xml: this.toXML(),
    };
  }

  /**
   * Valida as propriedades do questionário e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    if (!this.title || !this.creatorId ||
      this.isAnonymous == null || this.isAnonymous == undefined) {
      return false;
    }

    if (this.title.length < Quiz.titleMinLength ||
        this.title.length > Quiz.titleMaxLength) {
      return false;
    }

    return true;
  }

  /**
   * Adiciona uma questão ao questionário
   * @param {Question} question
   */
  addQuestion(question) {
    question.number = this.questions.length + 1;
    this.questions.push(question);
  }
}

Quiz.titleMinLength = 5;
Quiz.titleMaxLength = 30;

module.exports = Quiz;
