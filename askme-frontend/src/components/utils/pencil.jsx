import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  pencil: {
    marginLeft: 5,
    height: 20,
  },
});

const Pencil = (props) => {
  const classes = useStyles();

  return (
    <CreateOutlinedIcon onClick={props.onClick} className={classes.pencil} />
  );
};

Pencil.propTypes = {
  onClick: PropTypes.func,
};

export default Pencil;
