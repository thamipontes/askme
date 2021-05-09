import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Obtém o componente da pagina de responder os questionários
 * @return {React.Component}
 */
const AnswerQuizPage = () => { // issue: I-27
  /**
   * Retorna o componente a ser renderizado
   * @return {React.Component}
   */
  return (
    <Container className="w-100">
      <Row>
        <Col className="d-flex justify-content-center">
          Página de responder questionários em contrução!
        </Col>
      </Row>
    </Container>
  );
};

export default AnswerQuizPage;
