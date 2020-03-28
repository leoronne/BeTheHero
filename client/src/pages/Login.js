import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiKey } from 'react-icons/fi';
import { DotLoader } from 'react-spinners';
import {
      Button
} from 'reactstrap';

import isAuthenticated from '../services/auth';
import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/login.css';

import heroesImg from '../assets/img/heroes.png';
import logo from '../assets/img/logo.png';

export default function Login() {
      const [loading, setLoading] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const history = useHistory();

      async function handleLogin() {
            setLoading(true);
            if (await inputValidation()) {
                  const data = {
                        "EMAIL": email,
                        "PASSWORD": password
                  };

                  await api.post('session/login', data)
                        .then((response) => {
                              localStorage.setItem('token', response.data.token)
                              localStorage.setItem('name', response.data.NAME)
                              localStorage.setItem('ngoID', response.data.ngoID)
                              setTimeout(
                                    function () {
                                          history.push('/profile');
                                    },
                                    50
                              );
                        })
                        .catch((err) => {
                              notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                        });
            };
            setLoading(false);
      };

      async function inputValidation() {
            var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

            if (email === '') {
                  return notify('Email field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (!expression.test(String(email).toLowerCase())) {
                  return notify('Invalid Email!', '⚠️', 'error', 'top-right');
            }
            else if (password === '') {
                  return notify('Password field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else {
                  return true;
            }
      };

      return (
            <div className='logon-container'>
                  <section className='form'>
                        <div className='logo'>
                              <img src={logo} alt='Be The Hero' />
                        </div>
                        <form>
                              <p>
                                    Email:
                              </p>
                              <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                              <br />
                              <br />
                              <p>
                                    Password:
                              </p>
                              <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />

                              <Button disabled={loading} className='button' type='button' onClick={handleLogin}>
                                    {loading ? <DotLoader
                                          css={`display: block;
                                                margin: 0 auto;
                                                border-color: red;
                                          `}
                                          sizeUnit={"px"}
                                          size={20}
                                          color={'#fff'} /> : 'Login'}
                              </Button>
                              <div className='links'>
                                    <Link className='back-link' to='/register'>
                                          <FiLogIn size={16} color='#E02041' />Register
                                    </Link>

                                    <Link className='back-link' to='/forgotpassword' style={{fontSize:'12px'}}>
                                          <FiKey size={13} color='#E02041' />Forgot your password?
                                    </Link>
                              </div>
                        </form>
                  </section>
                  <img src={heroesImg} className='heroes' alt='Heroes' />
            </div>
      )
};