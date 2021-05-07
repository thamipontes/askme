import {Radio, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import {TrueOrFalseOptions} from '../../../models/question/questionType';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  trueOrFalseItem: {
    display: 'flex',
    alignItems: 'center',
  },
  trueOrFalseRadio: {
    margin: 1,
  },
  trueOrFalseLabel: {
    fontSize: 10,
  },
});

const TrueOrFalseItemEditComponent = (props) => {
  console.log('OK');
  const classes = useStyles();
  const [answer, setAnswer] = useState(TrueOrFalseOptions.Blank);

  return (
    <div className={classes.trueOrFalseItem}>
      <Typography className={classes.trueOrFalseLabel}>T</Typography>
      <Radio checked={answer===TrueOrFalseOptions.True}
        onChange={() => setAnswer(TrueOrFalseOptions.True)}
        className={classes.trueOrFalseRadio}/>
      <Typography className={classes.trueOrFalseLabel}>F</Typography>
      <Radio checked={answer===TrueOrFalseOptions.False}
        onChange={() => setAnswer(TrueOrFalseOptions.False)}
        className={classes.trueOrFalseRadio}/>
      <Typography>Test</Typography>
    </div>
  );
};

TrueOrFalseItemEditComponent.propTypes = {
  editing: PropTypes.bool,
};

const QuestionTrueOrFalseEditComponent = (props) => {
  const [itemEditing] = useState(-1);
  const [items] = useState(props.items);
  console.log('OK');

  return (
    <React.Fragment>
      {
        items.forEach((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <TrueOrFalseItemEditComponent
                editing={itemEditing == idx}>
              </TrueOrFalseItemEditComponent>
            </React.Fragment>
          );
        })
      }
    </React.Fragment>
  );
};

QuestionTrueOrFalseEditComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default QuestionTrueOrFalseEditComponent;
