
// eslint-disable-next-line no-unused-vars
const QuizCreateCommand = require('../models/quiz.createCommand');
// eslint-disable-next-line no-unused-vars
const Quiz = require('../entities/quiz');
const QuizRepository = require('../repositories/quizRepository');
const ValidationException = require('./validationException');

/**
 * Serviço para operações com questionários
 */
class QuizService {
  /**
   * Cria um questionário baseado em um comando
   * @param {QuizCreateCommand} quizCreateCommand
   * @return {Quiz}
   */
  static async createQuiz(quizCreateCommand) {
    // issue: I-23
    if (!quizCreateCommand.isValid()) {
      throw new ValidationException();
    }

    const result = await QuizRepository.save(
        new Quiz(
            quizCreateCommand.creatorId,
            quizCreateCommand.title,
            quizCreateCommand.isAnonymous,
        ),
    );

    return result;
  }

  /**
   * Obtem os questionários por Id de criador (paginado)
   * @param {string} creatorId
   * @param {number} offset
   * @param {number} limit
   */
  static async getQuizzesByCreatorId(creatorId, offset = 0, limit = 10) {
    // issue: 14
    return await QuizRepository.getQuizzesByCreatorId(creatorId, offset, limit);
  }
}

module.exports = QuizService;
