import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import queryString from 'query-string';
import { DotLoader } from 'react-spinners';
import {
      Button
} from 'reactstrap';

import isAuthenticated from '../services/auth';
import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/confirm.css';

import logo from '../assets/img/logo.png';

export default function Confirm(props) {
      const [loading, setLoading] = useState(true);
      const [email, setEmail] = useState('');

      const history = useHistory();

      function useQuery() {
            return new URLSearchParams(useLocation().search);
      }

      const params = useQuery();

      useEffect(() => {
            if (params.getAll('ngoid')[0] === '' || params.getAll('ngoid')[0] === undefined) {
                  notify(`Error while identifying NGO's ID!`, '⚠️', 'error', 'top-right');
                  history.push('/');
            }
            api.post('ngo/confirm', {
                  "ID": params.getAll('ngoid')[0]
            })
                  .then((response) => {
                        notify(`Account verified, thank you!`, '✔️', 'success', 'top-right');
                        setTimeout(
                              function () {
                                    history.push('/login')
                              },
                              600
                        );
                        return true
                  })
                  .catch((err) => {
                        notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                        setLoading(false);
                        return false
                  });
      }, []);


      async function inputValidation() {
            var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            if (email === '') {
                  return notify('Email field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (!expression.test(String(email).toLowerCase())) {
                  return notify('Invalid Email!', '⚠️', 'error', 'top-right');
            }
            else {
                  return true;
            }
      }
      async function handleEmailVerification() {
            setLoading(true);
            if (await inputValidation()) {
                  const data = {
                        "EMAIL": email,
                  };
                  await api.post('session/sendemailverification', data)
                        .then((response) => {
                              notify(`Email sent successfully, please check your inbox!`, '✔️', 'success', 'top-right');
                              setTimeout(
                                    function () {
                                          window.close();
                                    },
                                    2600
                              );
                        })
                        .catch((err) => {
                              notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                              setLoading(false);
                        });
            }
            setLoading(false);
      };

      return (
            <div className='confirm-container'>
                  <section className='form'>
                        <div className='logo'>
                              <img src={logo} alt='Be The Hero' />
                        </div>
                        <form>
                              <div style={{ display: loading ? 'none' : '' }}>
                                    <p>
                                          Email:
                              </p><br />
                                    <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
                              </div><br />
                              <Button disabled={loading} className='button' type='button' onClick={handleEmailVerification}>
                                    {loading ? <DotLoader
                                          css={`
                                                      display: block;
                                                      margin: 0 auto;
                                                      border-color: red;
                                                      `}
                                          sizeUnit={"px"}
                                          size={20}
                                          color={'#fff'} /> : 'Send new email verification!'}
                              </Button>
                              <Link className='back-link' to='/'>
                                    <FiArrowLeft size={16} color='#E02041' />Return to Homepage
                              </Link>
                        </form>
                  </section>
            </div>
      )
};