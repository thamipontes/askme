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
   * Converte as questões do questionário em um XML
   * @return {string}
   */
  convertQuestionsToXML() {
    // TODO: improve this method
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
      xml: this.convertQuestionsToXML(),
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
}

Quiz.titleMinLength = 5;
Quiz.titleMaxLength = 30;

module.exports = Quiz;
