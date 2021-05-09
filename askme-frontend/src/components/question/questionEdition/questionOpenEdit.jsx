import {makeStyles, TextField} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  textField: {
    width: '100%',
  },
});

const QuestionOpenEditComponent = () => {
  const classes = useStyles();

  return (
    <TextField multiline label="Resposta"
      value={''}
      rows={4} variant="outlined"
      className={classes.textField}>
    </TextField>
  );
};

export default QuestionOpenEditComponent;
