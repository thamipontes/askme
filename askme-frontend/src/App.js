import './App.css';
import SignUpPage from './components/pages/signUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
        <Redirect from="*" to="/signup"></Redirect>
        <Switch>
          <Route path="/signup">
            <SignUpPage></SignUpPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
