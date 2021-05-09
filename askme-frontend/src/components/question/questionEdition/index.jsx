// eslint-disable-next-line max-len
import {CardContent, Typography, Card, makeStyles, Container, TextField, CardActions, Button} from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import QuestionTypes from '../../../models/question/questionType';
import QuestionOpenEditComponent from './questionOpenEdit';
import QuestionChooseOneEditComponent from './questionChooseOne';
import QuestionTrueOrFalseEditComponent from './questionTrueOrFalse';

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    width: '90%',
    paddingBottom: 20,
  },
  title: {
    marginBottom: 15,
    fontSize: 15,
  },
  editText: {
    marginBottom: 15,
    fontSize: 12,
  },
  enunciation: {
    fontSize: 17,
    marginBottom: 20,
  },
  enunciationTextField: {
    width: '100%',
    marginBottom: 5,
  },
  pencil: {
    marginLeft: 3,
  },
});

/**
 * Componente base para questões
 * @return {React.Component}
 * @param {*} props
 */
const QuestionEditionComponent = (props) => {
  const [editingEnunciation, setEditingEnunciation] = useState(false);
  const [enunciation, setEnunciation] = useState(props.enunciation);
  const [items, setItems] = useState(props.items);
  const classes = useStyles();
  const pencil =
    <CreateOutlinedIcon className={classes.pencil}
      onClick={() => setEditingEnunciation(!editingEnunciation)}>
    </CreateOutlinedIcon>;

  const handleEnunciationChange = (event) => {
    setEnunciation(event.target.value);
    props.onChanges(enunciation, items);
  };

  const handleItemsChange = (newItems) => {
    setItems(newItems);
    props.onChanges(enunciation, items);
  };

  const renderQuestionType = (type) => {
    switch (type) {
      case QuestionTypes.Open:
        return <QuestionOpenEditComponent />;
      case QuestionTypes.ChooseOne:
        return <QuestionChooseOneEditComponent
          items={props.items}
          onItemsChange={handleItemsChange} />;
      case QuestionTypes.TrueOrFalse:
        return <QuestionTrueOrFalseEditComponent
          items={props.items}
          onItemsChange={handleItemsChange} />;
    }
  };

  return (
    <Container className={classes.root}>
      <Card>
        <CardContent>
          <Typography className={classes.title} color='textSecondary'>
            Questão {props.number}
          </Typography>
          {
            editingEnunciation?
              <React.Fragment>
                <Typography className={classes.editText}>
                  Digite o novo enunciado da questão:
                </Typography>
                <TextField multiline label="Enunciado"
                  value={enunciation || ''}
                  rows={2} variant="outlined"
                  onChange={handleEnunciationChange}
                  className={classes.enunciationTextField}
                  autoFocus>
                </TextField>
              </React.Fragment> :
              <React.Fragment>
                <Typography className={classes.enunciation}>
                  {enunciation}
                  {pencil}
                </Typography>
                {
                  renderQuestionType(props.type)
                }
              </React.Fragment>
          }
        </CardContent>
        <CardActions>
          {
            editingEnunciation?
              <Button onClick={() => setEditingEnunciation(!editingEnunciation)}
                variant="contained" color="primary">Salvar</Button> :
              <Button onClick={props.onDelete}
                variant="contained" color='secondary'>Deletar</Button>
          }
        </CardActions>
      </Card>
    </Container>
  );
};

QuestionEditionComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  number: PropTypes.number,
  enunciation: PropTypes.string,
  onChanges: PropTypes.func,
  onDelete: PropTypes.func,
};

export default QuestionEditionComponent;
