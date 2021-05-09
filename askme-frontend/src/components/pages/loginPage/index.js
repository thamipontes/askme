import React from 'react';
import BoxedForm from '../../forms/BoxedForm';
import FormInput from '../../forms/FormInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../../../services/user.service';
import './index.css';

/**
 * Componente da página de login
 * @return {React.Component}
 */
class LoginPage extends React.Component { // issue: I-16
  /**
   * Construtor para LoginPage
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
    UserService.login(
        this.state.email,
        this.state.password,
    ).then(() => {
      location.href = 'quiz';
    });

    event.preventDefault();
  }

  /**
   * Retorna o componente a ser renderizado
   * @return {React.Component}
   */
  render() {
    return (
      <div className='login-background'>
        <Container className='container'>
          <Row>
            <Col>
              <BoxedForm title="Login"
                submitText="Entrar"
                alternativeLinkRoute="/signup"
                alternativeLinkText="Não tenho uma conta"
                onSubmit={this.handleSubmit}>
                <FormInput label="Email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}></FormInput>
                <FormInput label="Senha"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}></FormInput>
              </BoxedForm>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginPage;
