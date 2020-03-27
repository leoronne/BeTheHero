import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { DotLoader } from 'react-spinners';
import {
      Button
} from 'reactstrap';

import api from '../services/api';
import notify from '../services/toast';

import '../assets/css/newincident.css';
import logo from '../assets/img/logo.png';

export default function NewIncident() {
      const [loading, setLoading] = useState(false);
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [value, setValue] = useState('');

      const history = useHistory();

      async function handleNewIncident() {
            setLoading(true);
            if (await inputValidation()) {
                  const data = {
                        "TITLE": title,
                        "DESCRIPTION": description,
                        "VALUE": value
                  };

                  await api.post('incidents/create', data,
                        {
                              headers: {
                                    Authorization: localStorage.getItem('ngoID')
                              }
                        })
                        .then((response) => {
                              notify(`Incident created successfully!`, '✔️', 'success', 'top-right');
                              setTimeout(
                                    function () {
                                          history.push('/profile');
                                    },
                                    1100
                              );
                        })
                        .catch((err) => {
                              notify(`${err.response === undefined ? err.message : err.response.data.message}`, '⚠️', 'error', 'top-right');
                        });

            }
            setLoading(false);
      }

      async function inputValidation() {
            if (title === '') {
                  return notify('Title field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (description === '') {
                  return notify('Description field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else if (value === '') {
                  return notify('Value field cannot be blank!', '⚠️', 'error', 'top-right');
            }
            else {
                  return true;
            }
      }

      function handleValueChange(e) {
            var value = e.target.value;
            var t = 0;
            value = value.replace(/[^0-9,.]/g, '');
            value = value.replace(/,{1,}/g, '.');
            value = value.replace(/\.{1,}/g, '.');
            value = value.replace(/\./g, function (match) {
                  t++;
                  return (t >= 2) ? '' : match;
            });
            setValue(value)
      }

      return (
            <div className='newincident-container'>
                  <div className='content'>
                        <section>
                              <div className='logo'>
                                    <img src={logo} alt='Be The Hero' style={{ width: '50%' }} />
                              </div>
                              <h1>Create New Incident</h1>
                              <p>
                                    Describe your incident the best way you can, so you can find a hero to solve it!
                              </p>


                              <Link className='back-link' to='/profile'>
                                    <FiArrowLeft size={16} color='#E02041' />Return
                        </Link>

                        </section>
                        <form>
                              <p>
                                    Title:
                              </p>
                              <input type='text'
                                    placeholder='Title'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                              />
                              <p>
                                    Description:
                              </p>
                              <textarea
                                    placeholder="Incident's description" style={{ fontFamily: 'Roboto' }}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                              />
                              <p>
                                    Value ($):
                              </p>
                              <input type='text'
                                    placeholder='Value'
                                    value={value}
                                    onChange={e => handleValueChange(e)}
                              />

                              <Button disabled={loading} className='button' type='button' onClick={handleNewIncident}>
                                    {loading ? <DotLoader
                                          css={`display: block;
                                                margin: 0 auto;
                                                border-color: red;
                                          `}
                                          sizeUnit={"px"}
                                          size={20}
                                          color={'#fff'} /> : 'Create'}
                              </Button>
                        </form>
                  </div>

            </div>
      )
};