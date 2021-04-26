const Quiz = require('../entities/quiz');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

// Quantidade máxima de objetos lidos de uma vez permitida
const maxLimit = 20;

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

  /**
   * Obtem os Quizzes por meio de uma query (paginado)
   * @param {object} query
   * @param {number} offset
   * @param {number} limit
   * @return {Quiz[]}
   */
  static async getQuizzesByQuery(query, offset, limit) {
    // issue: I-23
    if (limit < 0) {
      return null;
    }

    let result = null;

    try {
      const queryResult = await this.Model.find(query, null,
          {
            skip: offset,
            limit: limit>maxLimit? maxLimit:limit,
          },
      ).exec();

      if (queryResult==null) {
        return null;
      }

      result = queryResult.map((quizModel) => {
        const quiz = new Quiz(
            quizModel.creatorId,
            quizModel.title,
            quizModel.isAnonymous,
        );

        quiz.setId(quizModel._id);

        return quiz;
      });
    } catch (err) {
      throw new Error(`Falha ao obter questionários por query: ${err}`);
    }

    return result;
  }

  /**
   * Obtem questionários pelo Id do criador (paginado)
   * @param {string} creatorId
   * @param {number} offset
   * @param {number} limit
   * @return {Quiz[]}
   */
  static async getQuizzesByCreatorId(creatorId, offset, limit) {
    // issue: I-14
    return await this.getQuizzesByQuery({creatorId: creatorId}, offset, limit);
  }
}

QuizRepository._mongooseInstance = null;
QuizRepository.schema = null;
QuizRepository.Model = null;

module.exports = QuizRepository;
