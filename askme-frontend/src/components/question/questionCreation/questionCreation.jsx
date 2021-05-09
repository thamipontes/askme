// eslint-disable-next-line max-len
import {Card, CardContent, Container, Typography, Radio, CardActions, Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import QuestionTypes from '../../../models/question/questionType';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    width: '90%',
    paddingBottom: 20,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGridItems: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    width: '90%',
  },
});

const QuestionTypeOption = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.option}>
      <Radio checked={props.selected} onClick={props.onSelect} />
      <Typography>{props.type}</Typography>
    </div>
  );
};

QuestionTypeOption.propTypes = {
  onSelect: PropTypes.func,
  type: PropTypes.string,
  selected: PropTypes.bool,
};

const QuestionCreationComponent = (props) => {
  const classes = useStyles();
  const [selectedType, setSelectedType] = useState(QuestionTypes.Open);

  return (
    <Container className={classes.root}>
      <Card>
        <CardContent>
          <Typography>Nova questão</Typography>
          <Typography color="textSecondary">
            Selecione o tipo de questão
          </Typography>
        </CardContent>
        <QuestionTypeOption selected={selectedType==QuestionTypes.Open}
          onSelect={() => setSelectedType(QuestionTypes.Open)}
          type={'Preenchimento de campos'}></QuestionTypeOption>
        <QuestionTypeOption selected={selectedType==QuestionTypes.TrueOrFalse}
          onSelect={() => setSelectedType(QuestionTypes.TrueOrFalse)}
          type={'Verdadeiro ou false'}></QuestionTypeOption>
        <QuestionTypeOption selected={selectedType==QuestionTypes.ChooseOne}
          onSelect={() => setSelectedType(QuestionTypes.ChooseOne)}
          type={'Múltipla escolha'}></QuestionTypeOption>
        <CardActions>
          <Grid container xs={12}>
            <Grid item xs={6} className={classes.buttonGridItems}>
              <Button className={classes.buttons}
                color="primary" variant="contained"
                onClick={() => props.onSave(selectedType)}>Criar</Button>
            </Grid>
            <Grid item xs={6} className={classes.buttonGridItems}>
              <Button className={classes.buttons}
                color="secondary" variant="contained"
                onClick={() => props.onCancel()}>Cancelar</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

QuestionCreationComponent.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default QuestionCreationComponent;
