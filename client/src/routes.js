import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

import isAuthenticated from './services/auth';

import api from './services/api';
import notify from './services/toast';

export default function Routes() {
      const authenticated = isAuthenticated();

      // console.log(authenticated)

      return (
            <BrowserRouter>
                  <Switch>
                        <Route exact path='/' render={() => (
                              authenticated === true ? (
                                    <Redirect to="/profile" />
                              ) : (
                                          <Login />
                                    )
                        )} />
                        <Route exact path='/register' render={() => (
                              authenticated === true ? (
                                    <Redirect to="/profile" />
                              ) : (
                                          <Register />
                                    )
                        )} />
                        <Route path='/profile' render={() => (
                              // authenticated === true ? (
                                    <Profile />
                              // ) : (
                                          // <Redirect to="/" />
                                    // )
                        )} />
                        <Route path='/incidents/new' render={() => (
                              // authenticated === true ? (
                                    <NewIncident />
                              // ) : (
                                          // <Redirect to="/" />
                                    // )
                        )} />
                  </Switch>
            </BrowserRouter>
      )
};