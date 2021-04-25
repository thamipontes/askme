const QuizRepository = require('./quizRepository');
const Quiz = require('../entities/quiz');

const mongooseMock = jest.fn();
const schemaMockInstance = jest.fn();
const schemaMock = jest.fn(() => schemaMockInstance);

const modelMock = jest.fn(() => quizModelMock);

const quizModelMock = jest.fn(() => quizModelMockInstance);
const quizModelMockExceptions = jest.fn(() => quizModelMockInstanceExceptions);

const quizModelMockInstance = jest.fn();
const quizModelMockInstanceExceptions = jest.fn();

const quizExampleData = {
  creatorId: 'userId',
  title: 'abcdef',
  isAnonymous: false,
};

beforeAll(() => {
  mongooseMock.Schema = schemaMock;
  mongooseMock.model = modelMock;

  const saveResult = Object.assign(quizExampleData, {_id: 'idQuizExample'});
  quizModelMockInstance.save = jest.fn(() => saveResult);

  const findOneResult = saveResult;
  quizModelMock.findOne = jest.fn(() => findOneResult);

  quizModelMockInstanceExceptions.save = jest.fn(() => {
    throw new Error();
  });

  quizModelMockExceptions.findOne = jest.fn(() => {
    throw new Error();
  });
});

beforeEach(() => {
  mongooseMock.mockClear();
});

test(`should throw \
exception on mongoose read when not inited`, () => {
  expect(() => {
    QuizRepository.mongoose;
  }).toThrow(Error);
});

test('init should create schema and model', () => {
  QuizRepository.init(mongooseMock);
  expect(schemaMock).toHaveBeenCalledWith(Quiz.getSchema());
  expect(modelMock).toHaveBeenCalledWith('Quiz', schemaMockInstance);
});

test('save should call model save and return the result', async () => {
  QuizRepository.model = quizModelMock;

  const quiz = new Quiz(
      quizExampleData.creatorId,
      quizExampleData.title,
      quizExampleData.isAnonymous,
  );

  const result = await QuizRepository.save(quiz);
  expect(result.id).toBe('idQuizExample');
  expect(result.creatorId).toBe(quizExampleData.creatorId);
  expect(result.title).toBe(quizExampleData.title);
  expect(result.isAnonymous).toBe(quizExampleData.isAnonymous);

  expect(quizModelMock).toHaveBeenCalledWith(quiz.toObject());
  expect(quizModelMockInstance.save).toHaveBeenCalledTimes(1);
});
