import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Form from 'react-bootstrap/Form';

/**
 * Gets a FormInput Component
 * @description FormInput is a component used to create forms easily
 * @return {Component} FormInput Component
 * @param {any} props propriedade
 */
function FormInput(props) {
  /**
   * Renders the component
   * @return {Component}
   */
  return (
    <Form.Group className="input-block">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type}
        value={props.value}
        onChange={props.onChange}
        name={props.name}></Form.Control>
    </Form.Group>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FormInput;
