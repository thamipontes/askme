import {Typography, makeStyles} from '@material-ui/core';
import React, {useState} from 'react';
import QuestionItem from '../../../../models/question/questionItem';
import QuestionModel from '../../../../models/question/questionModel';
import QuestionTypes from '../../../../models/question/questionType';
import QuizModel from '../../../../models/quiz/quizModel';
// eslint-disable-next-line max-len
import QuestionCreationComponent from '../../../question/questionCreation/questionCreation';
import QuestionEditionComponent from '../../../question/questionEdition';
import FixedAddButton from '../../../utils/fixedAddButton';

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
});

const mock = new QuizModel('test quiz', [
  new QuestionModel('test question', QuestionTypes.ChooseOne, 4, [
    new QuestionItem('test item'),
  ]),
]);

const EditQuizPage = (props) => {
  const classes = useStyles();
  const [model, setModel] = useState(mock);
  const [addingQuestion, setAddingQuestion] = useState(false);

  const handleQuestionChanges = (index, enunciation, items) => {
    const modelTemp = model;
    modelTemp.questions[index].enunciation = enunciation;
    modelTemp.questions[index].items = items;
    setModel(modelTemp);
  };

  const handleQuestionDelete = (index) => {
    console.log('delet');
    const questionsTemp = model.questions;
    questionsTemp.splice(index, 1);
    const modelTemp = model;
    modelTemp.questions = questionsTemp;
    setModel(modelTemp);
    console.log(model);
  };

  const handleAddQuestion = (type) => {
    const questionsTemp = model.questions;
    questionsTemp.push(
        new QuestionModel('', type, questionsTemp.length + 1, []));
    const modelTemp = model;
    modelTemp.questions = questionsTemp;
    setModel(modelTemp);
    setAddingQuestion(false);
  };

  return (
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
    </div>
  );
};

export default EditQuizPage;
