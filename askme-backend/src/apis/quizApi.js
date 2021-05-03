const express = require('express');
const QuestionItemModel = require('../models/question.questionItemModel');
const QuestionModel = require('../models/question.questionModel');
const QuizCreateCommand = require('../models/quiz.createCommand');
const EditQuizInfoCommand = require('../models/quiz.editQuizInfoCommand');
// eslint-disable-next-line max-len
const EditQuizQuestionsCommand = require('../models/quiz.editQuizQuestionsCommand');
const QuizService = require('../services/quizService');
const TokenService = require('../services/tokenService');
const UserService = require('../services/userService');
const apiResponse = require('./apiResponse');

// eslint-disable-next-line new-cap
const quizRouter = express.Router();

quizRouter.get('', async (req, res, next) => {
  // issue: I-14
  let quizzes = [];
  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const creatorId = TokenService.getUserIdFromToken(token);

    // Check user existance
    await UserService.getUserById(creatorId);

    quizzes = await QuizService.getQuizzesByCreatorId(
        creatorId,
        parseInt(req.query.offset),
        parseInt(req.query.limit),
    );

    if (!quizzes) {
      quizzes = [];
    }
  } catch (err) {
    next(err);
    return;
  }

  res.status(200);
  res.send(apiResponse(true, 'Questionários listados com sucesso!', quizzes));
});

quizRouter.post('', async (req, res, next) => {
  // issue: I-23
  let result = null;
  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const creatorId = TokenService.getUserIdFromToken(token);

    // Check user existance
    await UserService.getUserById(creatorId);

    result = await QuizService.createQuiz(new QuizCreateCommand(
        creatorId, req.body.title, req.body.isAnonymous==='true',
    ));

    if (!result) {
      throw new Error('Received null as result');
    }
  } catch (err) {
    next(err);
    return;
  }

  res.status(200);
  res.send(apiResponse(true,
      'Questionário criado com sucesso!', result.toObject()));
});

quizRouter.put('/:id', async (req, res, next) => {
  let result = null;

  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const operatorId = TokenService.getUserIdFromToken(token);

    result = await QuizService.editQuizInformation(operatorId, req.params.id,
        new EditQuizInfoCommand(
            req.body.title,
        ));
  } catch (err) {
    next(err);
    return;
  }

  res.send(apiResponse(
      true, 'Questionário atualizado com sucesso!', result.toObject()));
});

quizRouter.put('/:id/questions', async (req, res, next) => {
  let result = null;

  try {
    const token = TokenService.getRequiredTokenFromRequest(req);
    const operatorId = TokenService.getUserIdFromToken(token);

    result = await QuizService.editQuizQuestions(operatorId, req.params.id,
        new EditQuizQuestionsCommand(
            req.body.questions.map((q) => {
              return new QuestionModel(q.number,
                  q.enunciation,
                  q.type,
                  q.items.map((i) => {
                    return new QuestionItemModel(i.number, i.enunciation);
                  }),
              );
            }),
        ));
  } catch (err) {
    next(err);
    return;
  }

  res.send(apiResponse(
      true, 'Questionário atualizado com sucesso!', result.toObject()));
});

module.exports = quizRouter;
