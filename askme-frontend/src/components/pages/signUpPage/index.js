import React, {useState} from 'react';
import BoxedForm from '../../forms/BoxedForm';
import FormInput from '../../forms/FormInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../../../services/user.service';
import './index.css';

/**
 * Obtem o componente da pagina de cadastro
 * @return {React.Component} SignUpPage Component
 */
function SignUpPage() { // issue: I-12
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  /**
   * Altera o estado conforme as inputs
   * @param {*} event
   */
  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const nameReceived = target.name;
    switch (nameReceived) {
      case 'email':
        setEmail(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirmation':
        setPasswordConfirmation(value);
        break;
      default:
        break;
    }
  }

  /**
   * Realiza requisição de envio
   * @param {*} event
   */
  async function handleSubmit(event) {
    await UserService.createUser(
        email,
        name,
        password,
        passwordConfirmation,
    );

    event.preventDefault();
  }

  /**
   * Retorna o componente a ser renderizado
   * @return {React.Component}
   */
  return (
    <div className='login-background'>
      <Container className='container'>
        <Row>
          <Col>
            <BoxedForm title="Cadastre-se"
              submitText="Cadastrar!"
              alternativeLinkRoute="/login"
              alternativeLinkText="Já tenho uma conta"
              onSubmit={handleSubmit}>
              <FormInput label="Email"
                name="email"
                type="text"
                value={email}
                onChange={handleChange}></FormInput>
              <FormInput label="Nome"
                name="name"
                type="text"
                value={name}
                onChange={handleChange}></FormInput>
              <FormInput label="Senha"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}></FormInput>
              <FormInput label="Confirmação de senha"
                name="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={handleChange}></FormInput>
            </BoxedForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUpPage;
