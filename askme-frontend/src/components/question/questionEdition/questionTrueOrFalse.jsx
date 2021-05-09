import {Radio, Typography, Paper} from '@material-ui/core';
import AddOutlined from '@material-ui/icons/AddOutlined';
import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import EditableText from '../../utils/editableText';

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
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

const QuestionTrueOrFalseEditComponent = (props) => {
  const classes = useStyles();
  const [itemEditing, setItemEditing] = useState(-1);
  const [items, setItems] = useState(props.items);

  const handleItemChange = (value) => {
    const itemsTemp = items;

    if (!value || value == '') {
      itemsTemp.splice(itemEditing, 1);
    } else {
      itemsTemp[itemEditing] = value;
    }

    setItems(itemsTemp);
    setItemEditing(-1);
    props.onItemsChange(items);
  };

  const addItem = () => {
    const itemsTemp = items;
    itemsTemp.push('');
    setItems(itemsTemp);
    setItemEditing(items.length - 1);
    props.onItemsChange(items);
  };

  return (
    <React.Fragment>
      {
        items.map((item, idx) => {
          return (
            <div key={idx} className={classes.itemContainer}>
              <Typography className={classes.trueOrFalseLabel}>V</Typography>
              <Radio />
              <Typography className={classes.trueOrFalseLabel}>F</Typography>
              <Radio />
              <EditableText key={idx} value={item}
                onSave={handleItemChange}
                editing={itemEditing===idx}
                onEdit={() => setItemEditing(idx)}
              />
            </div>
          );
        })
      }
      <Paper variant="outlined"
        className={classes.addButton} onClick={addItem}>
        <AddOutlined />
      </Paper>
    </React.Fragment>
  );
};

QuestionTrueOrFalseEditComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onItemsChange: PropTypes.func,
};

export default QuestionTrueOrFalseEditComponent;
