import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  check: {
    marginLeft: 5,
    height: 20,
  },
});

const Check = (props) => {
  const classes = useStyles();

  return (
    <CheckIcon onClick={props.onClick} className={classes.check} />
  );
};

Check.propTypes = {
  onClick: PropTypes.func,
};

export default Check;
