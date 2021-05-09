import {Button, CircularProgress, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import QuizFullModel from '../../../../models/quiz/quizModel';
import QuizService from '../../../../services/quiz.service';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  all: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    width: '90%',
    maxWidth: 800,
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
  grid: {
    width: '100%',
  },
  buttonGridItems: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    width: '90%',
  },
  link: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 20,
  },
});

const QuizDetailsPage = () => {
  const classes = useStyles();
  const [quiz, setQuiz] = useState(null);
  const {id} = useParams();

  useEffect(async () => {
    const result = (await QuizService.getQuizById(id)).data.data;

    setQuiz(new QuizFullModel(id, result.title, result.questions));
  }, []);

  return (
    <div className={classes.all}>
      {
      quiz?
      <div className={classes.root}>
        <Grid container xs={12} className={classes.grid}>
          <Grid item xs={6} className={classes.buttonGridItems}>
            <Link to="/quiz" className={classes.link}>
              <Button className={classes.buttons}
                color="primary" variant="outlined">Retornar</Button>
            </Link>
          </Grid>
          <Grid item xs={6} className={classes.buttonGridItems}>
            <Link to={`/quiz/${quiz.id}/edit`}className={classes.link}>
              <Button className={classes.buttons}
                color="primary" variant="outlined">Editar questões</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container xs={12} className={classes.grid}>
          <Typography variant="h4" color="textSecondary"
            className={classes.title}>
            {quiz.title}
          </Typography>
        </Grid>
      </div> :
      <div className={classes.rootLoading}>
        <CircularProgress />
      </div>
      }
    </div>
  );
};

export default QuizDetailsPage;
