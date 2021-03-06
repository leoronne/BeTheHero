import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import StringMask from 'string-mask';
import { DotLoader } from 'react-spinners';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import {
      Button
} from 'reactstrap';

import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/register.css';
import 'react-phone-number-input/style.css'
import logo from '../assets/img/logo.png';

import metadata from 'libphonenumber-js/metadata.min.json'
import labels from 'react-phone-number-input/locale/en.json'

export default function Register() {
      const [loading, setLoading] = useState(false);
      const [email, setEmail] = useState('');
      const [whatsapp, setWhatsapp] = useState('');
      const [password, setPassword] = useState('');
      const [cpassword, setCPassword] = useState('');
      const [name, setName] = useState('');
      const [city, setCity] = useState('');
      const [uf, setUF] = useState('');

      const history = useHistory();

      async function handleRegister() {
            setLoading(true);
            if (await inputValidation()) {
                  const data = {
                        "EMAIL": email,
                        "WHATSAPP": whatsapp,
                        "PASSWORD": password,
                        "NAME": name,
                        "CITY": city,
                        "UF": uf
                  };

                  await api.post('ngo/register', data)
                        .then((response) => {
                              notify(`NGO registered successfully!`, '✔️', 'success', 'top-right');
                              setTimeout(
                                    function () {
                                          history.push('/login');
                                    },
                                    1500
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
            var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

            if (email === '') {
                  return notify('Email field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (!expression.test(String(email).toLowerCase())) {
                  return notify('Invalid Email!', '⚠️', 'error', 'top-right');
            }
            else if (name === '') {
                  return notify('Name field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (whatsapp === '') {
                  return notify('WhatsApp field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (!isValidPhoneNumber(whatsapp)) {
                  return notify('Invalid WhatsApp number!', '⚠️', 'error', 'top-right');
            }
            else if (city === '') {
                  return notify('City field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (uf === '') {
                  return notify('UF field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (password === '') {
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
      }

      function maskPhone(e) {
            var v = e;
            v = e.replace(/\D/g, "");
            var formatter = new StringMask('(00)00000-0000');
            var result = formatter.apply(v);
            setWhatsapp(result);
      };



      return (
            <>
                  <div className='register-container'>
                        <div className='content'>
                              <section>
                                    <div className='logo'>
                                          <img src={logo} alt='Be The Hero' />
                                    </div>
                                    <h1>Register</h1>
                                    <p>
                                          Register at our platform to help people find your NGO's incidents.
                              </p>


                                    <Link className='back-link' to='/login'>
                                          <FiArrowLeft size={16} color='#E02041' />Return to Homepage
                              </Link>

                              </section>
                              <form>
                                    <p>
                                          Email:
                              </p>
                                    <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                                    <p>
                                          Name:
                              </p>
                                    <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                                    <p>
                                          WhatsApp:
                              </p>
                                    <PhoneInput
                                          placeholder="Enter phone number"
                                          value={whatsapp}
                                          onChange={setWhatsapp}
                                          labels={labels}
                                          metadata={metadata}
                                          error={whatsapp ? (isValidPhoneNumber(whatsapp) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                    />



                                    {/* <input type='tel' placeholder='WhatsApp' maxLength='14' value={whatsapp}
                                          onChange={e => maskPhone(e.target.value)} /> */}

                                    <div className='input-group'>
                                          <formgroup style={{ width: '100%' }} >
                                                <p>
                                                      City:
                                          </p>
                                                <input type='text' placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
                                          </formgroup>
                                          <formgroup style={{ marginLeft: '20px' }} >
                                                <p>
                                                      UF:
                                          </p>
                                                <input placeholder='UF'
                                                      style={{ width: '80px' }}
                                                      maxLength="2" value={uf} onChange={e => setUF(e.target.value.toUpperCase())} />
                                          </formgroup>
                                    </div>

                                    <p>
                                          Password:
                              </p>
                                    <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                                    <p>
                                          Confirm password:
                              </p>
                                    <input type='password' placeholder='Confirm password' value={cpassword} onChange={e => setCPassword(e.target.value)} />
                                    <Button disabled={loading} className='button' type='button' onClick={handleRegister}>
                                          {loading ? <DotLoader
                                                css={`
                                                      display: block;
                                                      margin: 0 auto;
                                                      border-color: red;
                                                      `}
                                                sizeUnit={"px"}
                                                size={20}
                                                color={'#fff'} /> : 'Register'}
                                    </Button>
                              </form>
                        </div>

                  </div>
            </>
      )
};