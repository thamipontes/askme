import React, {useEffect, useState} from 'react';
import QuizService from '../../../../services/quiz.service';
import QuizItem from '../../../forms/QuizItem';

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
    <div id="page-quiz-list" className="container">
      <main>
        {quizzes.map((quiz, index) => {
          return <QuizItem key={index*2} quiz={quiz}/>;
        })}

      </main>
    </div>
    // <div>
    //   {
    //     quizzes? quizzes : <p>Failed</p>
    //   }
    // </div>
  );
};
