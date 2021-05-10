/**
 * Representa a resposta de uma questão
 * Ex:
 * type = 'Open'        => answer = {text:'texto da resposta aqui'}
 * type = 'ChooseOne'   => answer = {1:true, 2:false, 10:false}
 * type = 'TrueOrFalse' => answer = {1:true, 2:false, 10:null}
 */
class QuestionAnswer {
  /**
   * Construtor para QuestionAnswer
   * @param {string} type Tipo de questão
   * @param {Array} items Itens da questão
   */
  constructor(type, items = null) {
    this.type = type;
    this.answer = {};

    switch (this.type) {
      case 'Open':
        this.answer['text'] = '';
        break;
      case 'ChooseOne':
        items.forEach((item, i) => this.answer[item.number] = false);
        break;
      case 'TrueOrFalse':
        items.forEach((item, i) => this.answer[item.number] = null);
        break;
    }
  }
}

module.exports = QuestionAnswer;
