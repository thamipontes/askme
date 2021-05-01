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

    if (this.toXML == undefined) {
      throw new Error(
          'Cannot instantiate Question: toXMLInternal should be implemented');
    }

    if (this.getQuestionTypeName == undefined) {
      throw new Error(
          `Cannot instantiate Question: getQuestionTypeName \
            should be implemented`,
      );
    }
  }

  /**
   * Converte a questão para XML
   * @return {string} XML
   */
  toXML() {
    const xml =
      `<question type="${this.getQuestionTypeName()}" number="${this.number}">`+
      `<enunciation>${this.enunciation}</enunciation>`+
      this.toXMLInternal()+`</question>`;

    return xml;
  }
}

module.exports = Question;
