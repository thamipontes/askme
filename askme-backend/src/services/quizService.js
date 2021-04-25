
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
}

module.exports = QuizService;
