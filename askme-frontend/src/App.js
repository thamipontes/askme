import './App.css';
import SignUpPage from './components/pages/signUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from './components/pages/loginPage';
import ListCreatedQuizzesPage from
  './components/pages/quiz/listCreatedQuizzesPage';

/**
* Gets the App to render
* @return {React.Component} App component
*/
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUpPage></SignUpPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/quiz">
          <ListCreatedQuizzesPage></ListCreatedQuizzesPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
