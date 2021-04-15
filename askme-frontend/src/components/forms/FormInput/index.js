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
        <Form.Control type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange}
          name={this.props.name}></Form.Control>
      </Form.Group>
    );
  }
}

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FormInput;
