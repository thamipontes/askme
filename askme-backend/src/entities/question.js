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
   * Converte uma questão para Modelo de XML
   * @return {object}
   */
  toXMLModel() {
    return {
      Question: {
        $: {
          type: this.type,
          number: this.number.toString(),
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
    };
  }

  /**
   * Converte XML para questão
   * @param {object} xmlModel
   * @return {Question}
   */
  static fromXMLModel(xmlModel) {
    const question = new Question();

    let questionModel = null;
    if (xmlModel.Question instanceof Array) {
      questionModel = xmlModel.Question[0];
    } else {
      questionModel = xmlModel.Question;
    }

    question.number = parseInt(questionModel.$.number);
    question.type = questionModel.$.type;
    question.enunciation = questionModel.Enunciation[0];

    const items = questionModel.Items[0]?.QuestionItem;

    if (items) {
      items.map((qi) => {
        question.addItem(qi.Enunciation[0], parseInt(qi.$.number));
      });
    }

    return question;
  }
}

module.exports = Question;
