const Quiz = require('../entities/quiz');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

/**
 * Implementa padrão de repositórios para a entidade questionário
 */
class QuizRepository {
  /**
   * Getter para a instância de mongoose
   */
  static get mongoose() {
    if (this._mongooseInstance==null) {
      throw new Error('UserRepository not inited');
    }

    return this._mongooseInstance;
  }

  /**
   * Gera schema e model do mongoose para a entidade Quiz
   * @param {mongoose.Mongoose} mongooseInstance
   */
  static init(mongooseInstance) {
    this._mongooseInstance = mongooseInstance;
    this.schema = new mongooseInstance.Schema(Quiz.getSchema());
    this.Model = this.mongoose.model('Quiz', this.schema);
  }

  /**
   * Salva um questionário no banco e retorna uma
   * instância de Quiz como o resultado
   * @param {Quiz} quiz
   * @return {Quiz}
   */
  static async save(quiz) {
    const quizInstance = new this.Model(quiz.toObject());

    let result = null;
    try {
      const quizSaved = await quizInstance.save();

      result = new Quiz(
          quizSaved.creatorId,
          quizSaved.title,
          quizSaved.isAnonymous,
      );
      result.setId(quizSaved._id);
    } catch (err) {
      throw new Error(`Falha ao salvar questionário: ${err}`);
    }

    return result;
  }
}

QuizRepository._mongooseInstance = null;
QuizRepository.schema = null;
QuizRepository.Model = null;

module.exports = QuizRepository;
