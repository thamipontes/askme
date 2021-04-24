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
import {Navbar} from 'react-bootstrap';

/**
* Gets the App to render
* @return {React.Component} App component
*/
function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
      React Bootstrap
        </Navbar.Brand>
      </Navbar>
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
          </Switch>
      </Router>
    </div>
  );
}

export default App;
