// eslint-disable-next-line max-len
import {FormControl, FormControlLabel, RadioGroup, Radio, makeStyles, Paper, TextField, Typography} from '@material-ui/core';
import AddOutlined from '@material-ui/icons/AddOutlined';
import Check from '@material-ui/icons/Check';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  pencil: {
    marginLeft: 5,
    height: 20,
  },
  check: {
    marginLeft: 10,
  },
  addButton: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ItemEdition = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.label);
  const check = <Check className={classes.check}
    onClick={() => props.onSave(value)}></Check>;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    props.editing?
    <React.Fragment>
      <Radio />
      <TextField variant="outlined" autoFocus
        onChange={handleChange}
        value={value}
      ></TextField>
      {check}
    </React.Fragment>:
    <React.Fragment>
      <Radio />
      <Typography>{props.label}</Typography>
    </React.Fragment>
  );
};

ItemEdition.propTypes = {
  editing: PropTypes.bool,
  label: PropTypes.string,
  onSave: PropTypes.func,
};


const Pencil = (props) => {
  const classes = useStyles();

  return (
    <CreateOutlinedIcon onClick={props.onClick} className={classes.pencil}>
    </CreateOutlinedIcon>
  );
};

Pencil.propTypes = {
  onClick: PropTypes.func,
};

const QuestionChooseOneEditComponent = (props) => {
  const classes = useStyles();
  const [value] = useState('');
  const [items, setItems] = useState(props.items || []);
  const [itemEditing, setItemEditing] = useState(-1);

  const handleItemChange = (value) => {
    if (!value || value === '') {
      items.splice(itemEditing, 1);
    } else {
      items[itemEditing] = value;
    }

    setItems(items);
    setItemEditing(-1);
    props.onItemsChange(items);
  };

  const addItem = () => {
    items.push('');
    setItems(items);
    setItemEditing(items.length - 1);
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <RadioGroup
          value={value}>
          {
            items.map((opt, idx) => {
              return (
                <React.Fragment key={idx}>
                  <FormControlLabel key={idx} value={opt}
                    control={
                      <React.Fragment>
                        <ItemEdition editing={itemEditing==idx}
                          label={opt}
                          onSave={handleItemChange}
                        />
                        {
                          itemEditing == idx?null:
                          <Pencil onClick={() => setItemEditing(idx)}/>
                        }
                      </React.Fragment>
                    }
                  />
                </React.Fragment>
              );
            })
          }
        </RadioGroup>
      </FormControl>
      <Paper variant="outlined" className={classes.addButton} onClick={addItem}>
        <AddOutlined />
      </Paper>
    </React.Fragment>
  );
};

QuestionChooseOneEditComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onItemsChange: PropTypes.func,
};

export default QuestionChooseOneEditComponent;
