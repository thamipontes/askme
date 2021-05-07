import React from 'react';
import QuestionTypes from '../../../../models/question/questionType';
import QuestionEditionComponent from '../../../question/questionEdition';

const EditQuizPage = () => {
  return (
    <React.Fragment>
      <QuestionEditionComponent
        type={QuestionTypes.Open}
        number={1} enunciation="abacaxi">
      </QuestionEditionComponent>
      <QuestionEditionComponent
        type={QuestionTypes.ChooseOne}
        number={2} enunciation="abacaxi"
        items={['test', 'batata']}>
      </QuestionEditionComponent>
      <QuestionEditionComponent
        type={QuestionTypes.TrueOrFalse}
        number={3} enunciation="abacaxi"
        items={['test', 'batata']}>
      </QuestionEditionComponent>
    </React.Fragment>
  );
};

export default EditQuizPage;
