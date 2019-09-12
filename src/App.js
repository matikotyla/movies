import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js/dist/popper';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap.js';

// Authentication Higher Order Component
import { Auth, NoAuth } from './components/Auth';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';
import List from './components/List';
import Add from './components/Add';
import Edit from './components/Edit';

const MyLogin = NoAuth(Login);

class App extends Component {
  render() {
    return(
      <Router>
        <Route path="/" component={Nav} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={(props) => <MyLogin {...props} />} />
          <Route path="/register" component={NoAuth(Register)} />
          <Route path="/list" component={Auth(List)} />
          <Route path="/add" component={Auth(Add)} />
          <Route path="/edit/:id" component={Auth(Edit)} />
        </Switch>
      </Router>
    );
  }
}

export default App;