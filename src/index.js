import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route } from 'react-router';

import CreateUser from './CreateUser';
import App from './App';

import './index.css';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/user/new" component={CreateUser} />
  </Router>
), document.getElementById('root'))

