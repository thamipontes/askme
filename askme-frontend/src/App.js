import './App.css';
import SignUpPage from './components/pages/signUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/global.css';
import logo from './assets/icons/rocket.svg';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './components/pages/loginPage';
import ListCreatedQuizzesPage from
  './components/pages/quiz/listCreatedQuizzesPage';
import {Navbar} from 'react-bootstrap';
import CreateQuizPage from './components/pages/quiz/createQuizPage';
import EditQuizPage from './components/pages/quiz/editQuizPage';
import QuizDetailsPage from './components/pages/quiz/quizDetailsPage';
import AdminLoginPage from './components/pages/adminLoginPage';

/**
* Gets the App to render
* @return {React.Component} App component
*/
function App() {
  return (
    <div>
      {/* issue: I-13 */}
      <Navbar>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
      Cyber Questionário
        </Navbar.Brand>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/quiz">
            <ListCreatedQuizzesPage />
          </Route>
          <Route exact path="/quiz/create">
            <CreateQuizPage />
          </Route>
          <Route exact path="/quiz/:id">
            <QuizDetailsPage />
          </Route>
          <Route exact path="/quiz/:id/edit">
            <EditQuizPage />
          </Route>
          <Route exac path="/admin">
            <AdminLoginPage />
          </Route>
          <Redirect exact from="/" to="/login"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
