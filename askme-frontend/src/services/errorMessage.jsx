import {CardContent} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, {useState} from 'react';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

const classes = {
  content: {
    display: 'flex', justifyContent: 'start', alignItems: 'center',
  },
};

const ErrorMessageComponent = (props) => {
  const [show, setShow] = useState(true);

  return (
    show?
    <Card style={{padding: 0}}>
      <CardContent style={classes.content}>
        <p style={{margin: 0}}>{props.message}</p>
        <CloseIcon style={{marginLeft: 20}} onClick={() => setShow(false)}/>
      </CardContent>
    </Card> :
    null
  );
};

ErrorMessageComponent.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessageComponent;
