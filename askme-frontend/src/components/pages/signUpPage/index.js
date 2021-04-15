import React from 'react';
import BoxedForm from '../../forms/BoxedForm';
import FormInput from '../../forms/FormInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../../../services/user.service';

/**
 * Gets the SignUpPage Component
 * @return {React.Component} SignUpPage Component
 */
class SignUpPage extends React.Component {
  /**
   * Construtor para SignUpPage
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      passwordConfirmation: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Altera o estado conforme as inputs
   * @param {*} event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Realiza requisição de envio
   * @param {*} event
   */
  async handleSubmit(event) {
    await UserService.createUser(
        this.state.name,
        this.state.password,
        this.state.passwordConfirmation,
    );

    event.preventDefault();
  }

  /**
   * Retorna o componente a ser renderizado
   * @return {React.Component}
   */
  render() {
    return (
      <Container className="w-100">
        <Row>
          <Col className="d-flex justify-content-center">
            <BoxedForm title="Cadastre-se"
              submitText="Cadastrar!" onSubmit={this.handleSubmit}>
              <FormInput label="Nome"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}></FormInput>
              <FormInput label="Senha"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}></FormInput>
              <FormInput label="Confirmação de senha"
                name="passwordConfirmation"
                type="password"
                value={this.state.passwordConfirmation}
                onChange={this.handleChange}></FormInput>
            </BoxedForm>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUpPage;
