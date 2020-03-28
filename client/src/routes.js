import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";

import { BrowserRouter, Route, Switch, Redirect, Router } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword.jsx';
import UpdatePassword from './pages/UpdatePassword';
import Confirm from './pages/Confirm';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

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

      // var authenticated;
      // useEffect(() => {
      //       if (localStorage.hasOwnProperty('token')) {
      //             api.get('session/validatetoken', {
      //                   params: {
      //                         token: localStorage.getItem('token')
      //                   }
      //             })
      //                   .then((response) => {
      //                         localStorage.setItem('ngoID', response.data.ID);
      //                         localStorage.setItem('name', response.data.NAME);
      //                         localStorage.setItem('email', response.data.EMAIL);
      //                         localStorage.setItem('whatsapp', response.data.WHATSAPP);
      //                         localStorage.setItem('city', response.data.CITY);
      //                         localStorage.setItem('uf', response.data.UF);
      //                         authenticated = true;
      //                         return true
      //                   })
      //                   .catch((err) => {
      //                         // notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
      //                         authenticated = false;
      //                         return false
      //                   });
      //       }
      //       else {
      //             authenticated = false;
      //             return false
      //       }
      //       // console.log(authenticated)
      // }, []);

      return (
            <BrowserRouter basename={window.location.pathname || ''} >
                  <Router history={hist} basename={window.location.pathname || ''}>
                        <Switch>

                              <PrivateRoute path="/profile/newincident" component={NewIncident} />
                              <PrivateRoute path="/profile" component={Profile} />

                              <PublicRoute exact path='/updatepassword' component={UpdatePassword} />
                              <PublicRoute exact path='/forgotpassword' component={ForgotPassword} />
                              <PublicRoute exact path='/register' component={Register} />
                              <PublicRoute exact path='/' component={Login} />
                              <Route path='/confirm' render={() => (
                                    <Confirm />
                              )} />
                        </Switch>
                  </Router>
            </BrowserRouter>
      )
};