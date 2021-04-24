import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

/**
 * Gets a BoxedForm Component
 * @description BoxedForm is a box with a title and optional inputs
 * @return {React.Component} BoxedForm Component
 * @param {*} props
 */
function BoxedForm(props) {
  /**
   * Renders the component
   * @return {Component}
   */

  return (
    <Form className="w-75 border border-primary p-3">
      <h1>{props.title}</h1>
      {props.children}
      <Button className="w-100"
        onClick={props.onSubmit}>{props.submitText}</Button>
      {
          props.alternativeLinkRoute && props.alternativeLinkText?
          <div className="mt-3">
            <Link to={props.alternativeLinkRoute}>
              {props.alternativeLinkText}
            </Link>
          </div> : null
      }
    </Form>
  );
}


BoxedForm.propTypes = {
  title: PropTypes.string,
  submitText: PropTypes.string,
  children: PropTypes.any,
  alternativeLinkRoute: PropTypes.string,
  alternativeLinkText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default BoxedForm;
