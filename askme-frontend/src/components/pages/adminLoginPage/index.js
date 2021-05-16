import React from 'react';
import BoxedForm from '../../forms/BoxedForm';
import FormInput from '../../forms/FormInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../../../services/user.service';
import './index.css';

/**
 * Componente da página de login de admin
 * @return {React.Component}
 */
class AdminLoginPage extends React.Component { // issue: I-32
  /**
   * Construtor para AdminLoginPage
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
    UserService.loginAdmin(
        this.state.email,
        this.state.password,
    ).then(() => {
      location.href = '/admin/dashboard';
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
              <BoxedForm title="Administração"
                submitText="Entrar"
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

export default AdminLoginPage;
