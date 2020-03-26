import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import '../assets/css/login.css';

import heroesImg from '../assets/img/heroes.png';
import logo from '../assets/img/logo.png';

export default function Login() {
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
                              <input type='email' placeholder='Email' />
                              <br />
                              <br />
                              <p>
                                    Password:
                              </p>
                              <input type='password' placeholder='Password' />

                              <button class='button' type='submit'>Login</button>
                                    <Link className='back-link' to='/register'>
                                          <FiLogIn size={16} color='#E02041' />Register
                                    </Link>
                        </form>
                  </section>
                  <img src={heroesImg} className='heroes' alt='Heroes' />
            </div>
      )
};