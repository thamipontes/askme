/**
 * Representa uma questão em um questionário
 */
class Question {
  /**
   * Construtor para Question
   * @param {string} enunciation Enunciado da questão
   * @param {number} order Posição em que a questão deve ser exibida
   * @param {Question.types} type
   */
  constructor(enunciation, order, type) {
    this.enunciation = enunciation;
    this.order = order;
    this.type = type;
    this.items = [];
  }

  /**
   * Adiciona um item à questão
   * @param {QuestionItem} item
   */
  addItem(item) {
    if (!item.isValid()) {
      throw new Error('Invalid item');
    }

    this.items.push(item);
  }
}

Question.types = {
  TrueOrFalse,
  MultipleChoice,
  OpenQuestion,
};

/**
 * Representa um item de questão V ou F ou múltipla escolha
 */
class QuestionItem {
  /**
   * Construtor para QuestionItem
   * @param {string} enunciation Enunciado do item
   * @param {boolean?} isCorrect Indica se o item é verdadeiro ou não.
   * @param {number} order Indica a ordem em que a questão deve aparecer
   */
  constructor(enunciation, isCorrect, order) {
    this.enunciation = enunciation;
    this.isCorrect = isCorrect;
    this.order = order;
  }

  /**
   * Valida o item e retorna o resultado
   * @return {boolean}
   */
  isValid() {
    if (!this.order || !this.enunciation) {
      return false;
    }

    return true;
  }
}


module.exports = {Question, QuestionItem};
