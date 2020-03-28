import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";

import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword.jsx';
import UpdatePassword from './pages/UpdatePassword';
import Confirm from './pages/Confirm';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Index from './pages/Index';

import isAuthenticated from './services/auth';
import api from './services/api';

const hist = createBrowserHistory();


const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
            <Route
                  {...rest}
                  render={props =>
                        isAuthenticated() ? (
                              <Component {...props} />
                        ) : (
                                    <Redirect from="/profile"
                                          to={{
                                                pathname: '/',
                                                state: { message: 'Usuário não autorizado' }
                                          }}
                                    />
                              )}
            />
      );
};


const PublicRoute = ({ component: Component, ...rest }) => {
      return (
            <Route
                  {...rest}
                  render={props =>
                        !isAuthenticated() ? (
                              <Component {...props} />
                        ) : (
                                    <Redirect from="/session"
                                          to={{
                                                pathname: '/profile',
                                                state: { message: 'Usuário logado' }
                                          }}
                                    />
                              )}
            />
      );
};

export default function Routes() {
      return (
            <BrowserRouter basename={window.location.pathname || ''} >
                  <Router history={hist} basename={window.location.pathname || ''}>
                        <Switch>

                              <PrivateRoute path="/profile/newincident" component={NewIncident} />
                              <PrivateRoute path="/profile" component={Profile} />

                              <PublicRoute exact path='/updatepassword' component={UpdatePassword} />
                              <PublicRoute exact path='/forgotpassword' component={ForgotPassword} />
                              <PublicRoute exact path='/register' component={Register} />
                              <PublicRoute exact path='/login' component={Login} />
                              <PublicRoute exact path='/' component={Homepage} />
                              <Route path='/confirm' render={() => (
                                    <Confirm />
                              )} />
                              <Route path='/index' render={() => (
                                    <Index />
                              )} />
                        </Switch>
                  </Router>
            </BrowserRouter>
      )
};