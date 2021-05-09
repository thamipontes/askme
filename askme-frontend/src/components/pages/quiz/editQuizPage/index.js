import {Typography, makeStyles} from '@material-ui/core';
import React, {useState} from 'react';
import QuestionItem from '../../../../models/question/questionItem';
import QuestionModel from '../../../../models/question/questionModel';
import QuestionTypes from '../../../../models/question/questionType';
import QuizModel from '../../../../models/quiz/quizModel';
import QuestionEditionComponent from '../../../question/questionEdition';

const useStyles = makeStyles({
  root: {
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

const EditQuizPage = () => {
  const classes = useStyles();
  const [model] = useState(mock);

  const handleQuestionChanges = (index, enunciation, items) => {
    model.questions[index].enunciation = enunciation;
    model.questions[index].items = items;
    console.log(model);
  };

  return (
    <div className={classes.root}>
      <Typography variant="p" color="textSecondary">
        Edição de questões</Typography>
      <Typography variant="h3">{model.title}</Typography>
      {
        model.questions.map((question, idx) => {
          return (
            <QuestionEditionComponent
              key={idx}
              type={question.type}
              number={question.number} enunciation={question.enunciation}
              items={question.items.map((i) => i.enunciation)}
              onChanges={(enunciation, items) =>
                handleQuestionChanges(idx, enunciation, items)} />
          );
        })
      }
    </div>
  );
};

export default EditQuizPage;
