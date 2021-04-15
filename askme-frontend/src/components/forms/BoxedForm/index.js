import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/**
 * Gets a BoxedForm Component
 * @description BoxedForm is a box with a title and optional inputs
 * @return {React.Component} BoxedForm Component
 */
class BoxedForm extends React.Component {
  /**
   * Renders the component
   * @return {Component}
   */
  render() {
    return (
      <Form className="w-75 border border-primary p-3">
        <h1>{this.props.title}</h1>
        {this.props.children}
        <Button className="w-100"
          onClick={this.props.onSubmit}>{this.props.submitText}</Button>
      </Form>
    );
  }
}

BoxedForm.propTypes = {
  title: PropTypes.string,
  submitText: PropTypes.string,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
};

export default BoxedForm;
