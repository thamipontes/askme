import React, {useEffect, useState} from 'react';
import QuizService from '../../../../services/quiz.service';

/**
 * Componente de página de listagem de questionários criados por usuário
 * @return {object}
 */
export default function ListCreatedQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(async () => {
    const result = await QuizService.listCreatedQuizzes();

    setQuizzes(result.data.data);
  }, []);

  return (
    <div>
      {
        quizzes? quizzes : <p>Failed</p>
      }
    </div>
  );
};
