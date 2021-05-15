const QuizService = require('./quizService');
const QuizRepository = require('../repositories/quizRepository');
const QuizCreateCommand = require('../models/quiz.createCommand');
const Quiz = require('../entities/quiz');
const ValidationException = require('./validationException');

jest.mock('../repositories/quizRepository');

const quizExampleData = {
  id: 'idQuiz',
  creatorId: 'userId',
  title: 'abcdef',
  isAnonymous: true,
};

const saveMock = jest.fn(async () => {
  const result = new Quiz(
      quizExampleData.creatorId,
      quizExampleData.title,
      quizExampleData.isAnonymous,
  );

  result.setId(quizExampleData.id);
  return result;
});

const getQuizByQueryMock = jest.fn();

const getQuizByIdMock = jest.fn(() => {
  const mockedQuiz = new Quiz(
      quizExampleData.creatorId,
      quizExampleData.title,
      quizExampleData.isAnonymous);

  mockedQuiz.setId(quizExampleData.id);

  return mockedQuiz;
});

beforeEach(() => {
  QuizRepository.mockReset();
  QuizRepository.save = saveMock;
});

test('createQuiz should call QuizRepository.save when command is valid',
    async () => {
      const command = new QuizCreateCommand(
          quizExampleData.creatorId,
          quizExampleData.title,
          quizExampleData.isAnonymous,
      );

      expect(command.isValid()).toBe(true);

      const result = await QuizService.createQuiz(command);
      expect(result.title).toBe(quizExampleData.title);
      expect(result.creatorId).toBe(quizExampleData.creatorId);
      expect(result.isAnonymous).toBe(quizExampleData.isAnonymous);

      expect(QuizRepository.save).toHaveBeenCalledWith(
          new Quiz(quizExampleData.creatorId,
              quizExampleData.title,
              quizExampleData.isAnonymous),
      );
    },
);

test('createQuiz should throw validation exception when command is invalid',
    async () => {
      const command = new QuizCreateCommand(
          null,
          quizExampleData.title,
          quizExampleData.isAnonymous,
      );

      expect(command.isValid()).toBe(false);

      try {
        await QuizService.createQuiz(command);
        fail('Exception expected');
      } catch (err) {
        expect(err instanceof ValidationException).toBe(true);
      }

      expect(QuizRepository.save).not.toHaveBeenCalled();
    },
);

test('getQuizById should call QuizRepository.getQuizById',
    async () => {
      QuizRepository.getQuizzesByCreatorId = getQuizByQueryMock;
      await QuizService.getQuizzesByCreatorId('creatorId', 5, 6);
      expect(QuizRepository.getQuizzesByCreatorId)
          .toHaveBeenCalledWith('creatorId', 5, 6);
    },
);

test('copyQuiz should copy quiz properly',
    // issue: I-37
    async () => {
      QuizRepository.getQuizById = getQuizByIdMock;
      const result = await QuizService.copyQuizById('quizId');

      expect(result.isAnonymous).toBe(quizExampleData.isAnonymous);
      expect(result.creatorId).toBe(quizExampleData.creatorId);
      expect(result.id).toBe(quizExampleData.id);

      expect(QuizRepository.getQuizById).toHaveBeenCalled();
      expect(QuizRepository.save).toHaveBeenCalled();
    },
);
