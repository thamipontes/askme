import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

// Importando as fotos
// import whatsIcon from '../../assets/images/icons/whatsapp.svg';
import verMais from '../../../assets/icons/verMais.svg';
import {Link} from 'react-router-dom';


/**
 * @param  {*} {quiz}
 * @return {React.Component}
 */
function QuizItem({quiz}) {
  /**
   */
  return (
    <article className="quiz-item">
      <header>
        <div>
          <strong>{quiz.title}</strong>
        </div>
      </header>
      <footer>
        <div className="buttons-container">
          <Link to="/login" className="info">
            <img src={verMais} alt="Quiz"/>
                        Ver mais
          </Link>
          <Link to="/login" className="delete">
            <img src={verMais} alt="Deletar"/>
                        Deletar
          </Link>
        </div>
      </footer>
    </article>

  );
};

QuizItem.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default QuizItem;
