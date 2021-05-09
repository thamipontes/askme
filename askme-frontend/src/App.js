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
          <Route paht="/test">
            <EditQuizPage></EditQuizPage>
          </Route>
          <Route path="/signup">
            <SignUpPage></SignUpPage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/quiz">
            <ListCreatedQuizzesPage></ListCreatedQuizzesPage>
          </Route>
          <Route path="/quiz/create" component={CreateQuizPage}>
          </Route>
          <Redirect exact from="/" to="/login"></Redirect>
          <Redirect from="*" to="/test"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
