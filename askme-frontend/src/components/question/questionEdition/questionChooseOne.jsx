// eslint-disable-next-line max-len
import {Radio, makeStyles, Paper} from '@material-ui/core';
import AddOutlined from '@material-ui/icons/AddOutlined';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import Pencil from '../../utils/pencil';
import EditableText from '../../utils/editableText';

const useStyles = makeStyles({
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
    marginTop: 10,
  },
  itemContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: 5,
  },
});

const QuestionChooseOneEditComponent = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState(props.items || []);
  const [itemEditing, setItemEditing] = useState(-1);

  const handleItemChange = (value) => {
    const itemsTemp = items;
    if (!value || value === '') {
      itemsTemp.splice(itemEditing, 1);
    } else {
      itemsTemp[itemEditing] = value;
    }

    console.log(itemsTemp);
    setItems(itemsTemp);
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
      {
        items.map((opt, idx) => {
          console.log(opt);
          return (
            <div key={idx} className={classes.itemContainer}>
              <Radio />
              <EditableText key={idx} value={opt}
                editing={itemEditing===idx}
                onSave={handleItemChange}
                onEdit={() => setItemEditing(idx)} />
            </div>
          );
        })
      }
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
