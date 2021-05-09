import {Typography, makeStyles, CircularProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import QuestionModel from '../../../../models/question/questionModel';
// eslint-disable-next-line max-len
import QuestionCreationComponent from '../../../question/questionCreation/questionCreation';
import QuizFullModel from '../../../../models/quiz/quizModel';
import QuestionEditionComponent from '../../../question/questionEdition';
import FixedAddButton from '../../../utils/fixedAddButton';
import QuizService from '../../../../services/quiz.service';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
  },
  questionsContainer: {
    width: '80%',
    marginTop: 20,
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rootLoading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const EditQuizPage = (props) => {
  const classes = useStyles();
  const [model, setModel] = useState(null);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const {id} = useParams();

  useEffect(async () => {
    const result = (await QuizService.getQuizById(id)).data.data;
    console.log(result);

    setModel(new QuizFullModel(id, result.title, result.questions));
    console.log(model);
  }, []);

  const update = async (modelOrig) => {
    const model = modelOrig;

    model.questions = model.questions.map((q) => {
      const qNew = q;
      qNew.items = q.items.map((i, idx) => {
        return {
          number: idx + 1,
          enunciation: i,
        };
      });

      return qNew;
    });
    await QuizService.updateQuizQuestions(model.id, model.questions);

    const result = (await QuizService.getQuizById(id)).data.data;
    console.log(result);

    setModel(new QuizFullModel(id, result.title, result.questions));
    console.log(model);
  };

  const handleQuestionChanges = (index, enunciation, items) => {
    const modelTemp = model;
    modelTemp.questions[index].enunciation = enunciation;
    modelTemp.questions[index].items = items;
    setModel(modelTemp);
    update(model);
  };

  const handleQuestionDelete = (index) => {
    console.log('delet');
    const questionsTemp = model.questions;
    questionsTemp.splice(index, 1);
    const modelTemp = model;
    modelTemp.questions = questionsTemp;
    setModel(modelTemp);
    console.log(model);
    update(model);
  };

  const handleAddQuestion = (type) => {
    const questionsTemp = model.questions;
    questionsTemp.push(
        new QuestionModel('', type, questionsTemp.length + 1, []));
    const modelTemp = model;
    modelTemp.questions = questionsTemp;
    setModel(modelTemp);
    setAddingQuestion(false);
    update(model);
  };

  return (
    model?
    <div className={classes.root}>
      <div className={classes.questionsContainer}>
        <div onClick={() => setAddingQuestion(true)}>
          <FixedAddButton />
        </div>
        <Typography color="textSecondary">
          Edição de questões</Typography>
        <Typography variant="h3">{model.title}</Typography>
        {
          model.questions.map((question, idx) => {
            return (
              <QuestionEditionComponent
                key={question.number}
                type={question.type}
                number={question.number} enunciation={question.enunciation}
                items={question.items.map((i) => i.enunciation)}
                onChanges={(enunciation, items) =>
                  handleQuestionChanges(idx, enunciation, items)}
                onDelete={() => handleQuestionDelete(idx)} />
            );
          })
        }
        {
          addingQuestion?
            <QuestionCreationComponent
              onSave={handleAddQuestion}
              onCancel={() => setAddingQuestion(false)}/> :
            null
        }
      </div>
    </div> :
    <div className={classes.rootLoading}>
      <CircularProgress />
    </div>
  );
};

export default EditQuizPage;
