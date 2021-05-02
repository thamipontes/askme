const xml2js = require('xml2js');

/**
 * Representa uma questão em um questionário
 */
class Question {
  /**
   * Construtor para Question
   * @param {string} enunciation Enunciado da questão
   * @param {string} type Tipo de questão
   */
  constructor(enunciation, type) {
    this.enunciation = enunciation;
    this.number = 0;
    this.type = type;
    this.items = [];
  }

  /**
   * Adiciona um item à questão
   * @param {string} itemEnunciation
   * @param {number} number
   */
  addItem(itemEnunciation, number = null) {
    this.items.push({
      number: number? number : this.items.length + 1,
      enunciation: itemEnunciation,
    });
  }

  /**
   * Converte uma questão para XML
   * @return {string} XML
   */
  toXML() {
    const builder = new xml2js.Builder();

    return builder.buildObject({
      Question: {
        $: {
          type: this.type,
          number: this.number,
        },
        Enunciation: this.enunciation,
        Items: {
          QuestionItem: this.items.map((i) => {
            return {
              $: {
                number: i.number.toString(),
              },
              Enunciation: i.enunciation,
            };
          }),
        },
      },
    });
  }

  /**
   * Converte XML para questão
   * @param {string} xml
   * @return {Question}
   */
  static async fromXMLAsync(xml) {
    const question = new Question();

    const result = await xml2js.parseStringPromise(xml, {
      trim: true,
    });
    question.number = parseInt(result.Question.$.number);
    question.type = result.Question.$.type;
    question.enunciation = result.Question.Enunciation[0];

    result.Question.Items[0].QuestionItem.map((qi) => {
      question.addItem(qi.Enunciation[0], parseInt(qi.$.number));
    });

    return question;
  }
}

module.exports = Question;
