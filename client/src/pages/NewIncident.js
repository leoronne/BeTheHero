import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../assets/css/newincident.css';

import logo from '../assets/img/logo.png';

export default function NewIncident() {
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
                              <input type='text' placeholder='Title' />
                              <p>
                                    Description:
                              </p>
                              <textarea placeholder="Incident's description" style={{fontFamily: 'Roboto'}}/>
                              <p>
                                    Value ($):
                              </p>
                              <input type='text' placeholder='Value' />

                              <button class='button' type='submit'>Create</button>
                        </form>
                  </div>

            </div>
      )
};