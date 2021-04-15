import React from 'react';
import BoxedForm from '../../forms/BoxedForm';
import FormInput from '../../forms/FormInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Gets the SignUpPage Component
 * @return {React.Component} SignUpPage Component
 */
function SignUpPage() {
  return (
    <Container className="w-100">
      <Row>
        <Col className="d-flex justify-content-center">
          <BoxedForm title="Cadastre-se"
            submitText="Cadastrar!" onSubmit={() => alert('ok')}>
            <FormInput label="Nome" name="text" type="text"></FormInput>
            <FormInput label="Senha" name="password"
              type="password"></FormInput>
            <FormInput label="Confirmação de senha"
              name="password" type="password"></FormInput>
          </BoxedForm>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
