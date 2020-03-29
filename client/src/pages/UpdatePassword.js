import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { DotLoader } from 'react-spinners';
import {
      Button
} from 'reactstrap';

import isAuthenticated from '../services/auth';
import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/confirm.css';

import logo from '../assets/img/logo.png';

export default function UpdatePassword() {
      const [loading, setLoading] = useState(false);
      const [password, setPassword] = useState('');
      const [cpassword, setCPassword] = useState('');

      const history = useHistory();


      function useQuery() {
            return new URLSearchParams(useLocation().search);
      }

      const params = useQuery();

      useEffect(() => {
            if (params.getAll('token')[0] === '' || params.getAll('token')[0] === undefined || params.getAll('passtoken')[0] === '' || params.getAll('passtoken')[0] === undefined) {
                  notify(`Error while identifying NGO!`, '⚠️', 'error', 'top-right');
                  history.push('/');
            }
            api.get('ngo/validPasswordToken', {
                  params: {
                        passtoken: params.getAll('passtoken')[0],
                        token: params.getAll('token')[0],
                  }
            })
                  .then((response) => {
                        return true
                  })
                  .catch((err) => {
                        notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                        setLoading(false);
                        setTimeout(
                              function () {
                                    history.push('/')
                              },
                              600
                        );
                        return false
                  });
      }, []);

      async function handleUpdatePassword() {
            setLoading(true);
            if (await inputValidation()) {
                  const data = {
                        "PASSWORD": password
                  };

                  await api.post('ngo/updatepassword', data,
                        {
                              headers: {
                                    Authorization: params.getAll('token')[0],
                                    passtoken: params.getAll('passtoken')[0],
                              }
                        })
                        .then((response) => {
                              notify(`Password updated!`, '✔️', 'success', 'top-right');
                              setTimeout(
                                    function () {
                                          history.push('/login')
                                    },
                                    600
                              );
                        })
                        .catch((err) => {
                              notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                        });
            };
            setLoading(false);
      };

      async function inputValidation() {
            var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

            if (password === '') {
                  return notify('Password field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (cpassword === '') {
                  return notify('Please confirm your password!', '⚠️', 'error', 'top-right');
            }
            else if (password !== cpassword) {
                  return notify('Both passwords must be the same!', '⚠️', 'error', 'top-right');
            }
            else if (!strongRegex.test(password)) {
                  return notify('Your password must contain at least: 8 characters; a lowercase letter and a capital letter; a number; a special character!', '⚠️', 'error', 'top-right');
            }
            else {
                  return true;
            }
      };

      return (
            <div className='confirm-container'>
                  <section className='form'>
                        <div className='logo'>
                              <img src={logo} alt='Be The Hero' />
                        </div>
                        <form>
                              <p>
                                    Password:
                              </p>
                              <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                              <br />
                              <br />
                              <p>
                                    Confirm your Password:
                              <br />
                              </p>
                              <input type='password' placeholder='Confirm your password' value={cpassword} onChange={e => setCPassword(e.target.value)} />

                              <Button disabled={loading} className='button' type='button' onClick={handleUpdatePassword}>
                                    {loading ? <DotLoader
                                          css={`display: block;
                                                margin: 0 auto;
                                                border-color: red;
                                          `}
                                          sizeUnit={"px"}
                                          size={20}
                                          color={'#fff'} /> : 'Change Password'}
                              </Button>
                        </form>
                  </section>
            </div>
      )
};