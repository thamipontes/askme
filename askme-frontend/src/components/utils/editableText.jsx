import {TextField, Typography} from '@material-ui/core';
import Pencil from './pencil';
import Check from './check';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  editableTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  paragraph: {
    wordBreak: 'break-word',
  },
});

const EditableText = (props) => {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState(props.value);

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
    if (props.onChange) {
      props.onChange(currentValue);
    }
  };

  return (
    <React.Fragment>
      {
      props.editing?
        <div className={classes.editableTextContainer}>
          <TextField
            variant='outlined'
            autoFocus multiline rows={4}
            onChange={handleChange}
            value={currentValue}
            className={classes.textField}
          ></TextField>
          <Check onClick={() => props.onSave(currentValue)}></Check>
        </div> :
        <div className={classes.editableTextContainer}>
          <Typography className={classes.paragraph}>
            {props.value}
          </Typography>
          <Pencil onClick={() => props.onEdit()}></Pencil>
        </div>
      }
    </React.Fragment>
  );
};

EditableText.propTypes = {
  value: PropTypes.string,
  editing: PropTypes.bool,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onSave: PropTypes.func,
};

export default EditableText;
