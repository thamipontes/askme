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
 */
class BoxedForm extends React.Component {
  /**
   * Renders the component
   * @return {Component}
   */
  render() {
    return (
      <Form className="w-75 border border-primary p-3">
        <h2>{this.props.title}</h2>
        {this.props.children}
        <Button className="w-100"
          onClick={this.props.onSubmit}>{this.props.submitText}</Button>
        {
          this.props.alternativeLinkRoute && this.props.alternativeLinkText?
          <div className="mt-3">
            <Link to={this.props.alternativeLinkRoute}>
              {this.props.alternativeLinkText}
            </Link>
          </div> : null
        }
      </Form>
    );
  }
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
