import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Form from 'react-bootstrap/Form';

/**
 * Gets a FormInput Component
 * @description FormInput is a component used to create forms easily
 * @return {Component} FormInput Component
 */
class FormInput extends Component {
  /**
   * Renders the component
   * @return {Component}
   */
  render() {
    return (
      <Form.Group>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control type={this.props.type}></Form.Control>
      </Form.Group>
    );
  }
}

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

export default FormInput;
