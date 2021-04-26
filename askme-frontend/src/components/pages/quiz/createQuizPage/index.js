import React, {useState} from 'react';
import BoxedForm from '../../../forms/BoxedForm';
import FormInput from '../../../forms/FormInput';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuizService from '../../../../services/quiz.service';

/**
 * Obtem o componente da pagina de cadastro de quesitonário
 * @return {React.Component}
 */
const CreateQuizPage = () => { // issue: I-23
  const [title, setTitle] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  /**
   * Altera o estado conforme as inputs
   * @param {*} event
   */
  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const nameReceived = target.name;
    switch (nameReceived) {
      case 'title':
        setTitle(value);
        break;
      case 'isAnonymous':
        setIsAnonymous(value);
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
    QuizService.createQuiz(title, isAnonymous).then(() => {
      location.href = '/quiz';
    });

    event.preventDefault();
  }

  /**
   * Retorna o componente a ser renderizado
   * @return {React.Component}
   */
  return (
    <Container className="w-100">
      <Row>
        <Col className="d-flex justify-content-center">
          <BoxedForm title="Criar questionário"
            submitText="Criar!"
            onSubmit={handleSubmit}>
            <FormInput label="Título"
              name="title"
              type="text"
              value={title}
              onChange={handleChange}></FormInput>
            <FormInput label="É questionário anônimo"
              name="isAnonymous"
              type="checkbox"
              value={isAnonymous}
              onChange={handleChange}></FormInput>
          </BoxedForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuizPage;
