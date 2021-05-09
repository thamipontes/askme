
// eslint-disable-next-line no-unused-vars
const QuizCreateCommand = require('../models/quiz.createCommand');
// eslint-disable-next-line no-unused-vars
const Quiz = require('../entities/quiz');
const QuizRepository = require('../repositories/quizRepository');
const ValidationException = require('./validationException');
const QuizModel = require('../models/quiz.quizModel');
// eslint-disable-next-line no-unused-vars
const EditQuizQuestionsCommand =
  require('../models/quiz.editQuizQuestionsCommand');
const ServiceException = require('./serviceException');
const AuthorizationException = require('./authorizationException');
// eslint-disable-next-line no-unused-vars
const QuizFullModel = require('../models/quiz.quizFullModel');
const QuestionModel = require('../models/question.questionModel');
const QuestionItemModel = require('../models/question.questionItemModel');
const Question = require('../entities/question');

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
   * @return {QuizModel[]}
   */
  static async getQuizzesByCreatorId(creatorId, offset = 0, limit = 10) {
    // issue: I-14
    const quizzes = await QuizRepository.getQuizzesByCreatorId(
        creatorId, offset, limit);

    if (!quizzes) {
      return [];
    }

    return quizzes.map((quiz) => {
      return new QuizModel(
          quiz.id,
          quiz.creatorId,
          quiz.title,
          quiz.isAnonymous,
      );
    });
  }

  /**
   * Edita as informações de um questionário
   * @param {string} operatorId Id de quem solicita a ação
   * @param {string} quizId
   * @param {EditQuizInfoCommand} editQuizInfoCommand
   * @return {QuizFullModel}
   */
  static async editQuizInformation(operatorId, quizId, editQuizInfoCommand) {
    if (!editQuizInfoCommand.isValid() || !quizId) {
      throw new ValidationException('Informações inválidas');
    }

    const quiz = await QuizRepository.getQuizById(quizId);

    if (!quiz) {
      throw new ServiceException('Não foi possível encontrar o quiz '+quizId);
    }

    if (quiz.creatorId != operatorId) {
      throw new AuthorizationException(
          'Permissão insuficiente para realizar esta ação');
    }

    quiz.title = editQuizInfoCommand.title;
    const result = await QuizRepository.updateQuiz(quiz);

    return new QuizModel(
        result.id,
        result.creatorId,
        result.title,
        result.isAnonymous,
    );
  }

  /**
   * Edita as informações de um questionário
   * @param {string} operatorId Id de quem solicita a ação
   * @param {string} quizId
   * @param {EditQuizQuestionsCommand} command
   * @return {QuizFullModel}
   */
  static async editQuizQuestions(operatorId, quizId, command) {
    if (!quizId || !command.isValid()) {
      throw new ValidationException('Informações inválidas');
    }

    const quiz = await QuizRepository.getQuizById(quizId);

    if (!quiz) {
      throw new ServiceException('Não foi possível encontrar o quiz '+quizId);
    }

    if (quiz.creatorId != operatorId) {
      throw new AuthorizationException(
          'Permissão insuficiente para realizar esta ação');
    }

    quiz.questions = command.questions.map((q) => {
      const question = new Question(
          q.enunciation, q.type,
      );

      question.number = q.number;
      q.items.map((i) => {
        question.addItem(i.enunciation, i.number);
      });
      return question;
    });
    const result = await QuizRepository.updateQuiz(quiz);

    return new QuizFullModel(
        result.id,
        result.creatorId,
        result.title,
        result.isAnonymous,
        result.questions.map((q) => {
          return new QuestionModel(
              q.number, q.enunciation, q.type, q.items.map((i) => {
                return new QuestionItemModel(i.number, i.enunciation);
              }),
          );
        }));
  }

  /**
   * Obtem um quiz pelo id
   * @param {string} id
   * @return {Quiz}
   */
  static async getQuizById(id) {
    const quiz = await QuizRepository.getQuizById(id);

    if (!quiz) {
      throw new ServiceException('Não foi possível encontrar o quiz '+quizId);
    }

    return quiz;
  }
}

module.exports = QuizService;
