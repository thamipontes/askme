import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import QuizService from '../../../../services/quiz.service';
import QuizItem from '../../../forms/QuizItem';
import './createButton.css';

/**
 * Componente de página de listagem de questionários criados por usuário
 * @return {object}
 */
export default function ListCreatedQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(async () => {
    const result = await QuizService.listCreatedQuizzes();
    console.log(result.data.data);
    setQuizzes(result.data.data);
  }, []);

  return (
    <React.Fragment>
      <Link to='/quiz/create'>
        <div id="page-quiz-create-button">
          <i className="fas fa-plus"></i>
        </div>
      </Link>
      <div id="page-quiz-list" className="container">
        <main>
          {quizzes.map((quiz, index) => {
            return <QuizItem key={index*2} quiz={quiz}/>;
          })}

        </main>
      </div>
    </React.Fragment>
  );
};
