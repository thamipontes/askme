import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import QuizService from '../../../../services/quiz.service';
import QuizItem from '../../../forms/QuizItem';
import FixedAddButton from '../../../utils/fixedAddButton';
import './index.css';

/**
 * Componente de página de listagem de questionários criados por usuário
 * @return {object}
 */
export default function ListCreatedQuizzesPage() {
  // issue: I-14
  const [quizzes, setQuizzes] = useState([]);

  useEffect(async () => {
    const result = await QuizService.listCreatedQuizzes();
    console.log(result.data.data);
    setQuizzes(result.data.data);
  }, []);

  return (
    <React.Fragment>
      {/* issue: I-23 */}
      <Link to='/quiz/create'>
        <FixedAddButton />
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
