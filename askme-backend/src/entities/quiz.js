// eslint-disable-next-line no-unused-vars
const Question = require('./question');
const xml2js = require('xml2js');

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
  toXMLModel() {
    return {
      Quiz: {
        Questions: this.questions.map((q) => q.toXMLModel()),
      },
    };
  }

  /**
   * Obtem as questões do questionário de um XML
   * @param {string} xml
   */
  async getQuestionsFromXML(xml) {
    this.questions = [];
    const result = await xml2js.parseStringPromise(xml, {trim: true});

    console.log(result.Quiz.Questions[0].Question[0].$);
    result.Quiz.Questions.map(async (q) => {
      console.log(q);
      const question = Question.fromXMLModel(q);
      this.addQuestion(question, question.number);
    });
  }

  /**
   * Converte as propriedades da classe para um objeto
   * @return {object}
   */
  toObject() {
    const builder = new xml2js.Builder();

    return {
      creatorId: this.creatorId,
      title: this.title,
      isAnonymous: this.isAnonymous,
      xml: builder.buildObject(this.toXMLModel()),
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
   * @param {number} number
   */
  addQuestion(question, number = null) {
    question.number = number? parseInt(number) : this.questions.length + 1;
    this.questions.push(question);
  }
}

Quiz.titleMinLength = 5;
Quiz.titleMaxLength = 30;

module.exports = Quiz;
